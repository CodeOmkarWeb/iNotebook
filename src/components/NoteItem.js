import React, { useContext } from 'react'
import contextvalue from "../context/notes/noteContext"

function NoteItem(props) {
    const context = useContext(contextvalue)
    const { deleteNote } = context
    return (
        <div className="card mx-2 my-2" style={{ width: "18rem" }}>
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{props.note.title}</h5>
                <p className="card-text">{props.note.description}</p>
                <p className="light-text">{props.note.tag}</p>
                <i className="far fa-trash-alt" onClick={() => { deleteNote(props.note._id) }}></i>
                <i className="far fa-edit mx-2"></i>
            </div>
        </div>
    )
}

export default NoteItem












// https://www.youtube.com/watch?v=pgsuE05tq0U