import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(props) {
  document.title='Login to continue..'
  
  const [cred, setcred] = useState({ email: "", password: "" })
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email:cred.email, password:cred.password })

    });

    const json = await response.json()
    if(json.success===true){
      localStorage.setItem('token',json.authtoken);
      navigate("/");

      props.alert("Logged in Successfully","success")
    }
    else{
      alert("Invalid Credentials")
    }
  }
  const onChange = (e) => {
    setcred({ ...cred, [e.target.name]: e.target.value })
  }
  return (
    <>
      <form>
        <div className="mb-3 my-4">
          <h2>Already have an account ?  Login now !</h2>
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="email" name="password" onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </form>
    </>
  )
}
