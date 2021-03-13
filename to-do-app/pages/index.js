import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Home() {

  const [savedTasks, setTask] = useState([]);

  const componentDidMount = () =>{

  }

  return (
    <div className="container">
      <Head>
        <title>ToDO-App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
         <div className="grid">
          <div className="row">
            <div className="card">
              <h2>ToDO:</h2>
              <label htmlFor="task">Tehtävä:</label>  
              <div className="row inputDiv">
                <input type="text" className="taskInput" name="task" placeholder="Siivoa vessa..."/>
              </div>
              <label htmlFor="task1">Päivämäärä: </label>  
              <div className="row inputDiv">
                <input type="date" className="taskInput" name="task1" placeholder="Siivoa vessa..."/>
              </div>
              <label htmlFor="task1">Kellonaika: </label>  
              <div className="row inputDiv">
                <input type="time" className="taskInput" name="task1" placeholder="Siivoa vessa..."/>
              </div>
              <label htmlFor="task1">Tehtävän kesto h: </label>
              <div className="row inputDiv">
                <input type="number" className="taskInput" name="task1" placeholder=""/>
              </div>
            </div>
            <div className="card">
             liirum laarum
            
            </div>
          </div>
        </div>
      </main>

      <footer>
        
      </footer>

      <style jsx>{`

        .inputDiv{
          margin-bottom: 10px;
          display: block;
          justify: right;
          padding-left: 5em;
        }

        .row{
          display: flex;
          flex-direction: row;
        }

        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: auto;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          width:auto;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: auto;
          padding: 1.5rem 1.5rem 1.5rem 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
          width: auto;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }
       
        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
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
