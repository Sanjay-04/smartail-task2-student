import React, { useState } from "react";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
function Delete_student(props) {
  const [deleteStatus, setDeleteStatus] = useState(null);
  const [userId, setUserId] = useState(props.userid || '');
  const navigate = useNavigate()
  const deletestudent = () => {
    

    // Send DELETE request to the server
    fetch(`http://localhost:5001/delete_student/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        alert("User deleted successfully");
        console.log("User deleted successfully");
        setDeleteStatus("User deleted successfully");
        navigate('/Login')
      })
      .catch((error) => {
        console.error(error);
        setDeleteStatus("Failed to delete user");
      });
  };

  return (
    <div>
      <Card style={{width:'450px', margin:'0 auto' , marginTop:'20px ', border:'5px solid'}}>
      <Button onClick={deletestudent}>DELETE STUDENT</Button>
      {deleteStatus && <p>{deleteStatus}</p>}
      </Card>
    </div>
  );
}

export default Delete_student;
