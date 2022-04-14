import React, { useContext } from 'react'
import contextvalue from "../context/notes/noteContext"

function NoteItem(props) {
    const context = useContext(contextvalue)
    const { deleteNote } = context
    return (
        <div className="card mx-2 my-2" style={{ width: "18rem" }}>
            {/* <img src={props.notesrc} className="card-img-top" alt="..." /> */}
            <div className="card-body">
                <h5 className="card-title text-center">{props.note.title}</h5>
                <p className="card-text">{props.note.description}</p>
                {/* <p className="light-text">{props.note.tag}</p> */}
                <div className="d-flex justify-center align-center">
                    <i className="far fa-trash-alt note-icon" onClick={() => { deleteNote(props.note._id) }}></i>
                    <i className="far fa-edit mx-2 note-icon" onClick={() => { props.updatenote(props.note) }}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem












// https://www.youtube.com/watch?v=pgsuE05tq0U