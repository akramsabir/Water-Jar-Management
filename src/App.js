
import './App.css';
import CreateJar from './Pages/CreateJar';
import { Navigate, Routes, Route } from 'react-router-dom';
import ReadJar from './Pages/ReadJar';
import EditJar from './Pages/EditJar';
import Login from './Pages/Login';
import AddUser from './Pages/AddUser';
import ReadUser from './Pages/ReadUser';
import EditUser from './Pages/EditUser';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  var user_id = localStorage.getItem('user_id');
  return (
    

    <Routes>
      <Route  path='/' element={!user_id ? <Login /> : <Navigate to='/readjar' />} />
      <Route  path='/createjar' element={user_id ? <CreateJar /> : <Navigate to='/' />} />
      <Route  path='/readjar' element={user_id ? <ReadJar /> : <Navigate to='/' />} />
      <Route  path='/editjar' element={user_id ? <EditJar /> : <Navigate to='/' />} />
      {/* <Route path='/signin' element={user_id ?<AddUser/>: <Navigate to= '/' />} /> */}
      <Route path='/signin' element= {<AddUser/>} />
      <Route path='/readuser'element={user_id ?<ReadUser/>: <Navigate to='/'/>} />
      <Route path='/edituser'element={user_id ? <EditUser/> : <Navigate to='/'/>}/>
    </Routes>

  );
}

export default App;
