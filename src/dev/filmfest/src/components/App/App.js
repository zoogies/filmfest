import './App.css';
import Home from '../Home/Home.js';
import Archive from '../Archive/Archive.js';
import '../../resources/Shared.css';
import TitleBar from "../TitleBar/TitleBar";
import Redirect from "../Redirect/Redirect";
import Watch from "../Watch/Watch";
import Notfound from "../Notfound/Notfound";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <TitleBar/>
      <Routes>
        <Route path="/" element={<Redirect/>}/>
        <Route path="/recent" element={<Home/>}/>
        <Route path="/archive" element={<Archive/>}/>
        <Route path="/watch/:videoid" element={<Watch/>}/>
        <Route path="*" element={<Notfound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
