import React from 'react'

function NoteItem(props) {
    return (
        <div className="card mx-2 my-2" style={{ width: "18rem" }}>
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{props.note.title}</h5>
                <p className="card-text">{props.note.description}</p>
                <p className="light-text">{props.note.tag}</p>
                <a href="https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    )
}

export default NoteItem