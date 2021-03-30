import React from 'react'
import Moment from 'moment'

export default function ToDoDiv(props){

    return(
        <div style={{'background': '#08E8DE'}}>
            <p>Tehtävä {props.index}: {props.toDoTask.name}, {Moment(props.toDoTask.date).format('DD.MM.YYYY')}, {props.toDoTask.time}, {props.toDoTask.duration}</p>
            <button id={props.toDoTask._id} onClick={props.delete}>Poista</button>
        </div>
    )
}