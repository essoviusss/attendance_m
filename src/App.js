import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignIn from './SignIn-SignUp_Page/SignIn';
import SignUp from './SignIn-SignUp_Page/SignUp';
import DashBoard from './pages/DashBoard';
import GenerateQR from './pages/GenerateQR';
import ClippedDrawer from './ClippedDrawer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignIn/>} />
        <Route path='/SignUp' element={<SignUp/>} />
        <Route path='/ClippedDrawer' element={<ClippedDrawer/>} />
        <Route path='/DashBoard' element={<DashBoard/>} />
        <Route path='/GenerateQR' element={<GenerateQR/>} />
      </Routes>
    </Router>
  );
}

export default App;
