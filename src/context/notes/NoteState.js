// Clean all the Logs
//  68
import NoteContext from './noteContext'
import { useState } from 'react'
// import { useEffect } from 'react/cjs/react.development'

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesinitial = []

  // setnotes is used in User Interface to set note only in UI
  const [notes, setnotes] = useState(notesinitial)





  // Get Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', // POST
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
    });
    const json = await response.json()
    setnotes(json)
  }




  // Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', // POST
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    const note = json
    setnotes(notes.concat(note))
  }
  





  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
      }
    });
    // const json = response.json();
    const newNotes = notes.filter((note) => { return note._id !== id })
    setnotes(newNotes)
  }



  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', // Put
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token') 
      },
      body: JSON.stringify({title, description, tag})
    });
    // const json = response.json();


    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag
        break;

      }
    }
    setnotes(newNotes)
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, getNotes,editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;