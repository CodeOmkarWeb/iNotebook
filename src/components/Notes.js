import React, { useContext } from 'react'
import contextvalue from "../context/notes/noteContext"
import NoteItem from './NoteItem'
const Notes = () => {
    const context = useContext(contextvalue)
    const { notes, setnote } = context
    return (
        <>
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <NoteItem note={note} key={note._id}/>
                })}
                

            </div>
        </>
    )
}
export default Notes