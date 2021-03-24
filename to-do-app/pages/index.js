import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Home() {

  const [savedTasks, setTask] = useState([]);

  const componentDidMount = () =>{

  }
  const saveTask = (event) => {
    console.log("menee")
  }
  return (
    <div className="container">
      <Head>
        <title>ToDO-App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

         <div className="grid">
          <div className="row">
            <div className="card">
              <h2>ToDO:</h2>
              <div className="row inputDiv">
                <div className="taskLabel"><label htmlFor="task" >Tehtävä:</label></div>
                <div className="taskInput"><input type="text"  name="task" placeholder="Siivoa vessa..."/></div>
              </div>
              <div className="row inputDiv">
                <label htmlFor="task1" className="taskLabel">Päivämäärä: </label>  
                <input type="date" className="taskInput" name="task1" placeholder="Siivoa vessa..."/>
              </div>
              <div className="row inputDiv">
                <label htmlFor="task1" className="taskLabel">Kellonaika: </label>  
                <input type="time" className="taskInput" name="task1" placeholder="Siivoa vessa..."/>
              </div>
              <div className="row inputDiv">
                <label htmlFor="task1" className="taskLabel">Tehtävän kesto h: </label>
                <input type="number" className="taskInput" name="task1" placeholder=""/>
              </div>
              <button type="submit" id="taskSubmit" onClick={saveTask}>Tallenna</button>
            </div>
            <div className="card">
            liirum laarum  liirum laarum  liirum laarum  liirum laarum
            liirum laarum  liirum   liirum laarum  liirum laarum  liirum laarum  liirum laarum  liirum laarum  liirum laarum  liirum laarum  liirum laarum  liirum laarum  liirum laarum  liirum laarum  liirum laarum  liirum laarum  liirum laarum  liirum laarum  liirum laarumlaarum  liirum laarum  liirum laarum  liirum laarum  liirum laarum  liirum laarum  liirum laarum  liirum laarum  liirum laarum  liirum laarum  liirum laarum  liirum laarum  liirum laarum  liirum laarum  liirum laarum
            </div>
          </div>
        </div>

      <footer>
        vccxvx
      </footer>

      <style jsx>{`

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
        .card {
          margin: 5%;
          flex-basis: auto;
          padding: 1.5rem 1.5rem 1.5rem 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
          width:auto;
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
        footer {
          position: absolute;
          left: 0;
          bottom: 0;
          height: 50px;
          width: 100%;
          overflow: hidden;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }
        @media (max-width: 1280px){
          .card{
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
