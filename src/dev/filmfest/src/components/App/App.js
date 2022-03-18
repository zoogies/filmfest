import './App.css';
import Home from '../Home/Home.js';
import Archive from '../Archive/Archive.js';
import '../../resources/Shared.css';
import TitleBar from "../TitleBar/TitleBar";
import Redirect from "../Redirect/Redirect";
import Watch from "../Watch/Watch";
import Notfound from "../Notfound/Notfound";
import User from "../User/User";
import checkcreds from '../../resources/checkcreds';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Signin from '../Signin/Signin';
import Signup from '../Signup/Signup';
import Edit from '../Edit/Edit';
import AdminPanel from '../AdminPanel/AdminPanel';
import UploadWrapper from '../Upload/Upload';

function App() {
  checkcreds();
  return (
    <Router>
      <TitleBar/>
      <Routes>
        <Route path="/" element={<Redirect/>}/>
        <Route path="/browse" element={<Home/>}/>
        <Route path="/archive" element={<Archive/>}/>
        <Route path="/watch/:videoid" element={<Watch/>}/>
        <Route path="/user/:userid" element={<User/>}/>
        <Route path="/user/:userid/edit" element={<Edit/>}/>
        <Route path="/login" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/admin" element={<AdminPanel/>}/>
        <Route path="/upload" element={<UploadWrapper/>}/>
        <Route path="*" element={<Notfound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
