import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup(props) {
  document.title='Sign Up'
  const [cred, setcred] = useState({ name: "", email: "", password: "" })
  const [h_s, seth_s] = useState("-slash")
  const navigate = useNavigate();
  const {name,email,password}=cred
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })

    });

    const json = await response.json()
    localStorage.setItem('token', json.authtoken);
    navigate("/");
    props.alert("Signed In Successfully","success")


  }
  const onChange = (e) => {
    setcred({ ...cred, [e.target.name]: e.target.value })
  }
  const password_text_id = document.getElementById("chkpassword")
  const passowrd_hs = (e) => {


    if (!(password_text_id.value === "")) {
      if (password_text_id.type === "password") {
        password_text_id.type = "text"
        seth_s("")
      }
      else {
        password_text_id.type = "password"
        seth_s("-slash")
      }
    }
  }
  return (
    <>
      <form>
        <div className="mb-3 my-4">
        <h2>Create an account Now !</h2>
          <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" aria-describedby="texth" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password &nbsp;</label>
          <div className="i_p d-flex justify-content-center align-items-center">
            <input type="password" className="form-control" id="chkpassword" name="password" onChange={onChange} />
            <i className={`fa fa-eye${h_s}`} aria-hidden="true" style={{ position: "relative", top: "0px", right: "2rem", marginRight: "-1rem" }} onClick={passowrd_hs}></i>          </div>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </form>
    </>
  )
}
