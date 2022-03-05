
import NoteContext from './noteContext'
import { useState } from 'react'

const NoteState = (props)=>{
    const notesinitial = [
        {
          "_id": "620fa64e2acedc8fc9fdcf6c",
          "user": "620728f8f7eea31b81cfb6f0",
          "title": "This is my tittle and 1st note",
          "description": "This is my description",
          "tag": "firstnote",
          "date": "1645192782660",
          "__v": 0
        },
        {
          "_id": "6222de8eb4667d7415119176",
          "user": "620728f8f7eea31b81cfb6f0",
          "title": "New Note",
          "description": "This is my 60th Video",
          "tag": "60",
          "date": "1646452366423",
          "__v": 0
        }
      ]
      const [notes, setnotes] = useState(notesinitial)
return (
        <NoteContext.Provider value={{notes,setnotes}}>
            {props.children }
        </NoteContext.Provider>
    )
}

export default NoteState;