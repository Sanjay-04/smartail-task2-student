
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "primereact/resources/themes/lara-light-indigo/theme.css"; 
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';

import { Card } from 'primereact/card';
import 'primeicons/primeicons.css';
        

        
function Login() {
    
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
   // const history = useHistory();
    const navigate=useNavigate()
    const handleRegister=()=>{
        navigate('/LoginPage')
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:5001/newlogin/${userid}`, {
            userid: userid,
            password: password
        })
        .then(response => {
            console.log(response)
            if (response.data === "success") {
                navigate('/NavPage', { state: { userid } });
            } else {
                alert('Invalid login credentials.');
            }
        })
        .catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:5001');
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error('Error:', error);
          }
        };
    
        fetchData();
      }, []);

    return (
        
        <div >
        <header> <center><h1>SANJAY GROUP OF SCHOOLS</h1></center></header>
            <Card style={{ width: '600px', margin: '0 auto' , marginTop:'100px',border:'5px solid' }}>
            <form onSubmit={handleSubmit}>
                <label >
                <strong>Welcome to Student Register<br></br></strong> 
                  <strong>Admin ID:</strong>  
                    <br /><br></br>
                    <InputText value={userid} onChange={(e) => setUserid(e.target.value)} />
                    <br />
                </label>
                <label>
                    <br />
                    <strong>Password:</strong>
                    <br /><br></br>
                    <InputText type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <br />
                </label>
                <br />
                <Button label="Login" icon="pi pi-user"  aria-label="User" style={{ width: '200px' }}/>
                <br /><br />
                
            </form>
            <Button label="Register"onClick={handleRegister}  style={{ width: '200px' }}/>
            </Card><br></br>
            <marquee>Sanjay Group of Schools aim to educate and inspire today's children to be responsible, productive and ethical world citizens.</marquee>
        </div>
        
    );
}

export default Login;