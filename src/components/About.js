import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import { useEffect } from 'react'
export default function About() {
    const a = useContext(noteContext)
    useEffect(() => {
      a.update()
    }, [])
    
    return (
        <>
        {a.state.name}
        {a.state.class}
        <h1>This is About</h1>
        </>
    )
}
