import React, { useState } from 'react';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";      
import Add_student from './Add_student';
import View_student from './View_student';
import Update_student from './Update_student';
import View_all from './View_all';
import { TabView, TabPanel } from 'primereact/tabview';
import Delete_student from './Delete_student';
import { useLocation } from 'react-router-dom';        

function NavPage() {
     //const location = useLocation();
     //const [userid, setUserid] = useState(location.state.id);
     const location = useLocation();
  const userid = location.state.userid;
  // console.log('userid=  =',userid)
  return (
    <div className="card">
         <header> <center><h1>SANJAY GROUP OF SCHOOLS</h1></center></header>

      <TabView>
      <TabPanel header="Add Student">
      <Add_student userid={userid} />
    </TabPanel>
    <TabPanel header="View Student">
       <View_student userid={userid}></View_student>
    </TabPanel>
    <TabPanel header="View all">
       <View_all></View_all>
    </TabPanel>
    
    <TabPanel header="Update Student">
        <p className="m-0">
            <Update_student userid={userid}></Update_student>
        </p>
    </TabPanel>
    <TabPanel header="Delete Student">
        <p className="m-0">
           <Delete_student userid={userid}></Delete_student>
        </p>
    </TabPanel>
</TabView>

    </div>

    
  )
}

export default NavPage




        