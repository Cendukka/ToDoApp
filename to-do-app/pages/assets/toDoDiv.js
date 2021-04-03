import React from 'react'
import Moment from 'moment'

export default function ToDoDiv(props){
    
    if(props){
        return(
            <div className="toDoDiv" style={{'background': '#08E8DE'}}>
                <span>
                    Tehtävä {props.index}: {props.toDoTask.name}  {Moment(props.toDoTask.date).format('DD.MM.YYYY')}  {props.toDoTask.time}
                </span>
                <button className="deleteButton" id={props.toDoTask._id} onClick={props.delete}>Poista</button>
                <style jsx>{`
                    .toDoDiv{
                        border:1px solid;
                        border-radius: 7px;
                        margin-bottom:2%
                    }
                    .deleteButton{
                        margin:10px
                        position:fixed;
                        float:right;
                        border-radius: 7px
                    }
                `}</style>
            </div>

            
        )
    }
    
}