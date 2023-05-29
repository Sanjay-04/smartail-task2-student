import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "primereact/resources/themes/lara-light-indigo/theme.css"; 
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import Login from './Login';
import { Card } from 'primereact/card';
import Add_student from './Add_student';

function LoginPage() {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [registerStatus, setregisterStatus] = useState(null);
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userid || !password || !cpassword) {
      setregisterStatus("Please fill in all fields.");
    } else if (userid.length < 6) {
      setregisterStatus("User ID must be at least 6 characters long.");
    } else if (password !== cpassword) {
      setregisterStatus("Passwords do not match. Please try again.");
      setPassword('');
      setCPassword('');
    } else {
      let formData = {
        id: userid,
        password: password,
        cpassword: cpassword,
      }
      axios.post(`http://localhost:5001/login`, formData)
      .then(response => {
        console.log(response)
        if (response.data === "success") {
          console.log("yesss")
            navigate('/Login');
        } else {
            alert('Registration failed');
        }
    })
    }
  }

  return (
    <div className="card">
    <header> <center><h1>SANJAY GROUP OF SCHOOLS</h1></center></header>
      <Card style={{ width: '600px', margin: '0 auto' , marginTop:'100px',border:'5px solid'}}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              <strong>UserId:</strong>
              <br></br><br></br>
              <InputText value={userid} onChange={(e) => setUserid(e.target.value)} />
              <br></br><br></br>
            </label>
          </div>
          <div>
            <label>
              <strong>Password:</strong>
              <br></br><br></br>
              <InputText type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
          </div>
          <br></br>
          <div>
            <label>
             <strong>Confirm Password:</strong> 
              <br></br><br></br>
              <InputText type='password' value={cpassword} onChange={(e) => setCPassword(e.target.value)} />
            </label>
          </div>
          <br></br><br></br>
          <Button label="Submit" />
          {registerStatus && <p style={{color: "red"}}>{registerStatus}</p>}
        </form>
      </Card><br></br><marquee>Sanjay Group of Schools aim to educate and inspire today's children to be responsible, productive and ethical world citizens.</marquee>
    </div>
  );
}

export default LoginPage;
