
import NoteContext from './noteContext'
import { useState } from 'react'

const NoteState = (props) => {
  const notesinitial = [
    {
      "_id": "620fa64e2acedsdfc8fc9fdcf6sc",
      "user": "620728f8f7eea31b81cfb6f0",
      "title": "This is my tittle and 1st note",
      "description": "This is my description",
      "tag": "firstnote",
      "date": "1645192782660",
      "__v": 0
    },
    {
      "_id": "6222de8eb4667d741ssfd5119176",
      "user": "620728f8f7eea31b81cfb6f0",
      "title": "New Note",
      "description": "This is my 60th Video",
      "tag": "60",
      "date": "1646452366423",
      "__v": 0
    },
    {
      "_id": "6222de8eb4667d741sdf5s119176",
      "user": "620728f8f7eea31b81cfb6f0",
      "title": "New Note",
      "description": "This is my 60th Video",
      "tag": "60",
      "date": "1646452366423",
      "__v": 0
    },
    {
      "_id": "6222desdf8eb4667d7415119176",
      "user": "620728f8f7eea31b81cfb6f0",
      "title": "New Note",
      "description": "This is my 60th Video",
      "tag": "60",
      "date": "1646452366423",
      "__v": 0
    },
    {
      "_id": "6222de8eb4dsf667d7415119176",
      "user": "620728f8f7eea31b81cfb6f0",
      "title": "New Note",
      "description": "This is my 60th Video",
      "tag": "60",
      "date": "1646452366423",
      "__v": 0
    }
  ]
  const [notes, setnotes] = useState(notesinitial)
  // Add a Note
  const addNote = (title, description, tag) => {
    // Todo API Call
    console.log("Adding a New Note")
    console.log(title,description,tag)
    const note = {
      "_id": "6222de8sdeab4dsfdffgfgdgdsgdgdfgdsfgdfgsdf667d7415119176",
      "user": "620728f8f7eea31b81cfb6f0",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "1646452366423",
      "__v": 0
    }
    setnotes(notes.concat(note))
  }
  // Delete a Note
  const deleteNote = (id) => {
    // Todo API Call
    // setnotes(notes.(note))
    console.log("Deleting the Note with id +", id)
    const newNotes = notes.filter((note)=>{return note._id!==id})
    setnotes(newNotes)
  }
  // Edit a Note
  const editNote = (id,title,description,tag) => {

  }
  return (
    <NoteContext.Provider value={{ notes,addNote,deleteNote}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;