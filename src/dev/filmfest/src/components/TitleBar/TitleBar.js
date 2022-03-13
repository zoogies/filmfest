import '../../resources/Shared.css';
import './TitleBar.css';
import logo from '../../resources/logo.png';
import Navbutton from '../Navbutton/Navbutton';

export default function TitleBar(){
    return(
        <span id='TitleBar' className="level2">
            <div className='logoholder'>
                <img className='logo' src={logo}/>
            </div>
            <h1 id='TitleBarText'>Film Fest</h1>
            <Navbutton text="Recent"/>
            <Navbutton text="Profile"/>
            <Navbutton text="Film Fest Archive"/>
        </span>
    );
}