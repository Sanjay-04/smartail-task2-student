import logo from './logo.svg';
import './App.css';
import { Routes  , Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import NavPage from './components/NavPage';
import Add_student from './components/Add_student';
import View_student from './components/View_student';
import Login from './components/Login';
import View_all from './components/View_all';
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/NavPage' element={<NavPage/>}/>
      <Route path='/Add_student' element={<Add_student/>}/>
      <Route path='/View' element={<View_student/>}/>
      <Route path='/LoginPage' element={<LoginPage></LoginPage>}/>
      <Route path='/View_all' element={<View_all></View_all>}/>
      <Route path='/Login' element={<Login></Login>}/>
      </Routes>
    </div>
  );
}

export default App;
