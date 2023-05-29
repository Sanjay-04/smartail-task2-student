import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
function View_all() {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);

  const handleClick = () => {
    if (userId) {
      fetch(`http://localhost:5001/view_all/${userId}`)
        .then((response) => response.json())
        .then((data) => setUserData(data))
        .catch((error) => console.error(error));
    }
  };

  return (
    <div>
      <Card style={{ width: '600px', margin: '0 auto' , marginTop:'100px',border:'5px solid' }}>
      <div>
        <label>
          <strong>Student id:</strong>
          <br /><br></br>
          <InputText value={userId} onChange={(e) => setUserId(e.target.value)} />
          <br /><br></br>
          <Button label="View" onClick={handleClick} />
          <br />
        </label>
      </div>
      </Card>

      {/* Conditional rendering block */}
      {userData && (
        <Card style={{marginTop:'90px' , width:'400px' , margin:'0 auto'}}>
        <div>
          <h3>Student Details:</h3>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.emaill}</p>
          <p>Phone: {userData.phone}</p>
          <p>Attendace:{userData.attendance}</p>
          {/* Add more fields here */}
        </div>
        </Card>
      )}
    </div>
  );
}

export default View_all;
