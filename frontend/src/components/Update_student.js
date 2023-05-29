import { useState,useEffect } from 'react';
import "primereact/resources/themes/lara-light-indigo/theme.css"; 
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { Card } from 'primereact/card';
function Update_student(props) {
  const [userid, setUserid] = useState(props.userid || '');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [emaill, setEmaill] = useState('');
    const [attendance, setAttendance] = useState('');
    
    useEffect(() => {
      
      if (userid) {
          axios.get(`http://localhost:5001/get_student/${userid}`)
          .then(res => {
            console.log(res)
              setUsername(res.data.name);
              setPhone(res.data.phone);
              setEmaill(res.data.emaill);
              setAttendance(res.data.attendance);
          })
          .catch(err => console.log(err));
      }
  }, [userid]);

    const handleAdd = (e) => {
        e.preventDefault();
        let formData = {
          id: userid,
          name: username,
          phone: phone,
          emaill: emaill,
          attendance: attendance
        };
        axios.put(`http://localhost:5001/update_student/${userid}`, formData)
        .then((res) => {console.log(res); alert("Student updated Successfully");})
        .catch((err) => {console.log(err); alert("Student update Failed");});
    };

    return (
        <div>
            <Card style={{ width: '600px', margin: '0 auto' , marginTop:'100px',border:'5px solid' }}>
            <form onSubmit={handleAdd}>
                <label>
                    UserId:
                    <br />
                    <InputText value={userid} onChange={(e) => setUserid(e.target.value)} />
                    <br /><br />
                </label>
                <label>
                    Name:
                    <br />
                    <InputText value={username} onChange={(e) => setUsername(e.target.value)} />
                    <br /><br />
                </label>
                <label>
                    Phone:
                    <br />
                    <InputText value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <br /><br />
                </label>
                <label>
                    Email:
                    <br />
                    <InputText type='email' value={emaill} onChange={(e) => setEmaill(e.target.value)} />
                    <br /><br />
                </label>
                <label>
                    Attendance Percentage:
                    <br />
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

export default Update_student;
