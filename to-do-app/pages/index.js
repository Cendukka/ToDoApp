import Head from 'next/head'
import Link from 'next/link'
import React, {useEffect, useState } from 'react'
import Axios from 'axios'
import Moment from 'moment'
import _, { reduce } from 'lodash'
import ToDoDiv from '../pages/assets/toDoDiv'
import * as THREE from "three";

export default function Home() {

  const [savedTasks, setTasks] = useState();
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState(Moment(Date.now()).format('YYYY-MM-DD'));
  const [taskTime, setTaskTime] = useState(Moment(Date.now()).format('HH:mm'));
  const [taskDuration, setTaskDuration] = useState(0);
  const [chosenDate, setChosenDate] = useState(Moment(Date.now()).format('YYYY-MM-DD'))
  const [postError, setPostError] = useState(false)
  //three.js variables
  let scene, renderer, camera, loader, cube, pointLight, frameId
  let cubeArr=[]
  const cubePosArr = []
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
 

  const toDoApiUrl = 'http://localhost:3001/toDo/'
 
  useEffect(()=>{
    getTaskDB();
    document.addEventListener('mousemove', (event)=>{mouseMove(event)},false)

    setupThreeScene()  //Setup three.js scene
    renderScene();     //Start rendering
    start();            //start animation

  },[])

 /***** THREE.JS *****/
  const setupThreeScene = () =>{
    const left = -20
    const top = 8
    console.log(left)
    //Scene and renderer
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor("#263238");
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById("root").appendChild(renderer.domElement)
    //Camera
    camera = new THREE.PerspectiveCamera(
        90,                                         //camera angle
        window.innerWidth / window.innerHeight,     //shape of the output
        0.1,                                        //near point
        1000                                         //far point
    );
    camera.position.set(0, 0, 10);
    camera.lookAt(scene.position)
    //lights
    setupLights();
    //cube
    loader = new THREE.TextureLoader();
    loader.crossOrigin = "";
    for(let i = 0; i>(-17); i-=8){
      for(let a = 0; a<41; a+=20){
        cube = new THREE.Mesh(new THREE.BoxGeometry(3,3,3), new THREE.MeshBasicMaterial({
          map: loader.load('https://i.imgur.com/HZdyZam.jpeg'),
        }));
        cube.position.set( left+a,top+i,-3)
        scene.add(cube)
        cubeArr.push(cube)
        
        cubePosArr.push(_.clone(cube.position))
      }
    }
    // cube = new THREE.Mesh(new THREE.BoxGeometry(3,3,3), new THREE.MeshBasicMaterial({
    //   map: loader.load('https://i.imgur.com/HZdyZam.jpeg'),
    // }))
    // cube.position.set( mouse.x,mouse.y,-3)
    // scene.add(cube)
  }
  const setupLights = () =>{
  // Create lights
    pointLight = new THREE.PointLight(0xEEEEEE);
    pointLight.position.set(20, 0, 20);
    scene.add(pointLight);

  }
 //Function to handle mouse movement
  const mouseMove = (event) =>{
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    _.forEach(cubeArr, (cub, index)=>{
      cub.position.x = cubePosArr[index].x + (mouse.x*3)
      cub.position.y = cubePosArr[index].y + (mouse.y*3)
    })
    
  }
  //Start animation
  const start = () => {
    if (!frameId) {
      frameId = requestAnimationFrame(animate);
    }
  };
  //Animation fuinction
  const animate = () => {
    _.forEach(cubeArr,(cub)=>{
      cub.rotation.x += mouse.x*0.3
      cub.rotation.y += mouse.y*0.3
    })
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    // render using requestAnimationFrame
    renderScene();
    frameId = window.requestAnimationFrame(animate);
  };
  //Render function
  const renderScene = () => {
    if (renderer) renderer.render(scene, camera);
  };

/***** TO DO APP *****/

//Fetch tasks on ´filtered day from DB
  const getTaskDB = () =>{
    Axios.get(toDoApiUrl+'get/'+chosenDate)
    .then((res)=>{
      
      if(Array.isArray(res.data)){
        let temp = saveTasks(res.data)
        setTasks(temp)
      }
    }).catch((error)=>{
      console.log(error)
      let element = 
        <div>
          <h4 style={{'color': 'red'}}>Couldn't get respond from DB. Try again</h4>
        </div>
        setTasks(element)
    })
  }
  //Delete task from DB
  const deleteTaskDB = (event)=>{
     Axios.delete(toDoApiUrl+'delete', {data: {ID: event.target.id}})
     .then(res=>{
        getTaskDB();
     })
     .catch((err)=>{
       console.log(err)
     })
  }
  //Save task to DB and reset form
  const saveTaskDB = (event) => {

    event.preventDefault();
    Axios.post(toDoApiUrl+'post',{
      name: taskName,
      date: taskDate,
      time: taskTime,
      duration: taskDuration
    }).then((res)=>{
      console.log(res)
      getTaskDB()
      setPostError(false)
    }).catch(error=>{
      setPostError(true)
    })
    setTaskName("")
    setTaskDuration(0)
    
  }
  //Save all tasks fetched from DB to state
  const saveTasks = (tasks)=>{
    let sortedTaskArray = _.orderBy(tasks, ['time'],['asc'])
    let taskArray = [];
    _.forEach(sortedTaskArray, (toDoTask, index)=>{
      let element = <ToDoDiv key={"todo-"+index} toDoTask={toDoTask} index={index} delete={deleteTaskDB} />
      taskArray.push(element)
    })
    if(sortedTaskArray.length == 0){
      let element = 
        <div>
          <h4 style={{'color': 'red'}}>No tasks on given date</h4>
        </div>
        taskArray.push(element)
    }
    
    return taskArray
  }
  //Handle html element's changes
  const handleChange = (event) =>{
    switch(event.target.id){
      case "taskName":
        setTaskName(event.target.value)
        return
      case "taskDate":
        setTaskDate(event.target.value)
        return
      case "taskTime":
        setTaskTime(event.target.value)
        return
      case "filterDate":
        setChosenDate(event.target.value)
        getTaskDB();
        return
      default:
        return
    }
  }
  /***** RENDER *****/
  return (
    <div>
      <div id="root"></div>
    
      <div className="container">
        <Head>
          <title>ToDO-App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

          <div className="grid">
            <div className="row">
              <div className="card-add">
                <h2>Lisää ToDO:</h2>
                <form onSubmit={saveTaskDB}>
                  <div className="row inputDiv">
                    <label className="taskLabel" htmlFor="task" >Tehtävä:</label>
                    <input id="taskName" className="taskInput" type="text" name="task" placeholder="Siivoa vessa..." value={taskName} onChange={handleChange}/>
                  </div>
                  <div className="row inputDiv">
                    <label htmlFor="taskDate" className="taskLabel">Päivämäärä: </label>  
                    <input id="taskDate" type="date" className="taskInput" name="taskDate" placeholder={taskDate} value={taskDate} onChange={handleChange}/>
                  </div>
                  <div className="row inputDiv">
                    <label htmlFor="taskTime" className="taskLabel">Kellonaika: </label>  
                    <input id="taskTime" type="text" onFocus={(e)=> e.target.type = 'time'} onBlur={(e)=> e.target.type = 'text'}
                    className="taskInput" name="taskTime" placeholder={taskTime} value={taskTime} onChange={handleChange}/>
                  </div>
                  <button type="submit" id="taskSubmit">Tallenna</button>
                </form>
                <div hidden={!postError}>
                  <h4 style={{'color': 'red'}}>Couldn't save the task. Try again.</h4>
                </div>
              </div>
              
              <div className="card-added">
                <h2>ToDos:</h2>
                <div className="filters">
                  <input id="filterDate" className="filter" type="date" value={chosenDate} onChange={handleChange}/>
                </div>
                {savedTasks}
              </div>
            </div>
          </div>
        </div>

        {/***** STYLE *****/}
      <style jsx>{`
        #root{
          position: absolute;
          z-index: -2;
          margin: 0;
          padding: 0;
          display: flex;
          width:100%;
          height:100%;
        }
        .filter{
          margin-bottom: 4%
        }
        .redBackground{
          background: red; 
        }
        .taskInput{
          margin-left: auto;
          //margin-left: 5em;
          order:2;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }
        .taskLabel{
          float: left;
          margin-right: 15rem;
        }
        .inputDiv{
          margin-bottom: 10px;
          width: auto;
          display: block;
        }
        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          width:100%;
          margin-top: -10%;
        }
        .row{
          display: flex;
          flex-direction: row;
          width: auto;
        }
        .card-add {
          margin: 5%;
          flex-basis: auto;
          padding: 1.5rem 1.5rem 1.5rem 1.5rem;
          text-align: left;
          color: white;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
          width:40%;
          height:auto;
          position: fixed;
          top: 0;
          left:0
        }
        .card-added {
          margin: 5%;
          flex-basis: auto;
          padding: 1.5rem 1.5rem 1.5rem 1.5rem;
          text-align: left;
          color: white;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
          width: 40%;
          position: absolute;
          
        }
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width:auto;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        .card-add:hover,
        .card-add:focus,
        .card-add:active,
        .card-added:hover,
        .card-added:focus,
        .card-added:active
         {
          color: #0070f3;
          border-color: #0070f3;
        }
        @media (max-width: 1475px){
          .card-add{
            width:auto;
          }
          .card-added{
            width:auto;
          }
        }
        @media (min-width:901px){
          .card-added{
            top: 0;
            right: 0;
          }
        }
        @media (max-width: 900px){
          .row{
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            width:auto;
          }
          .card-added{
            position:flex
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
