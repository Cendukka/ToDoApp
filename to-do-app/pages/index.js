import Head from 'next/head'
import Link from 'next/link'
import React, {useEffect, useState } from 'react'
import Axios from 'axios'
import Moment from 'moment'
import _ from 'lodash'
import ToDoDiv from '../pages/assets/toDoDiv'

export default function Home() {

  const [savedTasks, setTasks] = useState();
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState(Moment(Date.now()).format('YYYY-MM-DD'));
  const [taskTime, setTaskTime] = useState(Moment(Date.now()).format('HH:mm'));
  const [taskDuration, setTaskDuration] = useState(0);

  const toDoApiUrl = 'http://localhost:3001/toDo/'
 
  useEffect(()=>{
    getTaskDB();

  },[])
  const getTaskDB = () =>{
    Axios.get(toDoApiUrl+'get')
    .then((res)=>{
      if(Array.isArray(res.data)){
        console.log(res.data)
        let temp = saveTasks(res.data)
        setTasks(temp)
      }
      
    }).catch((error)=>{
      console.log(error)
    })
  }
  const deleteTaskDB = (event)=>{
    
    const toDoID = event.target.id
     Axios.delete(toDoApiUrl+'delete', {data: {ID: toDoID}})
     .then(res=>{
        
        getTaskDB();
     })
     .catch((err)=>{
       console.log(err)
     })

    // })
  }
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
    })
    setTaskName("")
    setTaskDuration(0)
    
  }
  const saveTasks = (tasks)=>{
    let toDoTasks = tasks
    let taskArray = [];
    
    _.forEach(toDoTasks, (toDoTask, index)=>{
      let element = <ToDoDiv key={"todo-"+index} toDoTask={toDoTask} index={index} delete={deleteTaskDB} />
      
      taskArray.push(element)
    })
    
    return taskArray
  }
  const handleChange = (event) =>{
    switch(event.target.id){
      case "taskName":
        setTaskName(event.target.value)
        return
      case "taskDate":
        console.log(Moment(event.target.value).format('DD.MM.YYYY'))
        setTaskDate(event.target.value)
        return
      case "taskTime":
        setTaskTime(event.target.value)
        return
      case "taskDuration":
        setTaskDuration(event.target.value)
        return
      default:
        return
    }
  }
  return (
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
                <div className="row inputDiv">
                  <label htmlFor="taskDuration" className="taskLabel">Tehtävän kesto h: </label>
                  <input id="taskDuration" type="number" className="taskInput" name="taskDuration" placeholder="" value={taskDuration} onChange={handleChange}/>
                </div>
                <button type="submit" id="taskSubmit">Tallenna</button>
              </form>
            </div>
            
            <div className="card-added">
              <h2>ToDos:</h2>
              {savedTasks}
            </div>
          </div>
        </div>

      <style jsx>{`
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
          color: inherit;
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
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
          width: 40%;
          position: absolute;
          top: 0;
          right: 0;
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
        @media (max-width: 900px){
          .row{
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            width:auto;
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
