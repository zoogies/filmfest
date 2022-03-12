import '../../resources/Shared.css';
import './TitleBar.css';
import logo from '../../resources/logo.png';

export default function TitleBar(){
    return(
        <span id='TitleBar' className="level2">
            <img className='logo' src={logo}/>
            <h1 id='TitleBarText'>Film Fest</h1>
        </span>
    );
}