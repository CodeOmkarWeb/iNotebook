import React from 'react'

function Alert(props) {
    return (
        <div style={{ height: "50px" }}>
            <div className={`alert alert-${props.type} alert-dismissible fade show`} role="alert">
                df<strong>ALert</strong>: {props.message}
            </div>
        </div>
    )
}

export default Alert
