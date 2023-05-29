import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
function View_student(props) {
    const [userData, setUserData] = useState(null);
    const [userId, setUserId] = useState(props.userid || '');
    console.log('useriddd = ',userId)
  
    useEffect(() => {
      if (userId) {
        fetch(`http://localhost:5001/view_student/${userId}`)
          .then(response => response.json())
          .then(data => setUserData(data))
          .catch(error => console.error(error));
      }
    }, [userId]);
  
    if (!userData) {
      return <div>Loading user details...</div>;
    }
  
    return (
      <div>
        <Card style={{ width: '600px', margin: '0 auto' , marginTop:'100px',border:'5px solid' }}>
        <h1>User Details</h1>
        <p>Name: {userData.name}</p>
        <p>Email: {userData.emaill}</p>
        <p>Phone: {userData.phone}</p>
        <p>Attendace : {userData.attendance}</p>
        </Card>
      </div>
    );
  }
  

export default View_student


// useeffect => function api call = state 
