import { useState } from 'react';
import "primereact/resources/themes/lara-light-indigo/theme.css"; 
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { Card } from 'primereact/card';
function Add_student(props) {
    const [userid, setUserid] = useState(props.userid || '');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [emaill, setEmaill] = useState('');
    const [attendance, setAttendance] = useState('');
    
    const handleAdd = (e) => {
        e.preventDefault();
        let formData = {
          id: userid,
          name: username,
          phone: phone,
          emaill: emaill,
          attendance: attendance
        };
        axios.put(`http://localhost:5001/add_student/${userid}`, formData)
        .then((res) => {console.log(res); alert("Student updated Successfully");})
        .catch((err) => {console.log(err); alert("Student update Failed");});
    };

    return (
        <div>
            <Card style={{width:'450px', margin:'0 auto' , marginTop:'20px ', border:'5px solid'}}>
            <form onSubmit={handleAdd}>
                <label>
                    <strong>Student Id:</strong>
                    <br /><br></br>
                    <InputText value={userid} onChange={(e) => setUserid(e.target.value)} />
                    <br /><br />
                </label>
                <label>
                   <strong>Name:</strong> 
                    <br /><br></br>
                    <InputText value={username} onChange={(e) => setUsername(e.target.value)} />
                    <br /><br />
                </label>
                <label>
                    <strong>Phone:</strong>
                    <br /><br></br>
                    <InputText value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <br /><br />
                </label>
                <label>
                    <strong>Email:</strong>
                    <br /><br></br>
                    <InputText type='email' value={emaill} onChange={(e) => setEmaill(e.target.value)} />
                    <br /><br />
                </label>
                <label>
                    <strong>Attendance Percentage:</strong>
                    <br /><br></br>
                    <InputText value={attendance} onChange={(e) => setAttendance(e.target.value)} />
                    <br /><br />
                </label>
                <br />
                <Button label="Add" icon="pi pi-check" />
            </form>
            </Card>
        </div>
    );
}

export default Add_student;
