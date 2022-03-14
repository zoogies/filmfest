import './App.css';
import Home from '../Home/Home.js';
import Archive from '../Archive/Archive.js';
import '../../resources/Shared.css';
import TitleBar from "../TitleBar/TitleBar";
import Redirect from "../Redirect/Redirect";
import Watch from "../Watch/Watch";
import Notfound from "../Notfound/Notfound";
import User from "../User/User";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Profilehandler from '../Profilehandler/Profilehandler';
import Signin from '../Signin/Signin';
import Signup from '../Signup/Signup';

function App() {
  return (
    <Router>
      <TitleBar/>
      <Routes>
        <Route path="/" element={<Redirect/>}/>
        <Route path="/recent" element={<Home/>}/>
        <Route path="/archive" element={<Archive/>}/>
        <Route path="/watch/:videoid" element={<Watch/>}/>
        <Route path="/user/:userid" element={<User/>}/>
        <Route path="/profile" element={<Profilehandler/>}/>
        <Route path="/login" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="*" element={<Notfound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
