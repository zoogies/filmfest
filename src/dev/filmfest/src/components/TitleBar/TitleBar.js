import '../../resources/Shared.css';
import './TitleBar.css';
import logo from '../../resources/logo.png';
import Navbutton from '../Navbutton/Navbutton';

export default function TitleBar(){
    return(
        <span id='TitleBar' className="level2">
            <div className='logoholder'>
                <img alt="" className='logo' src={logo}/>
            </div>
            <h1 id='TitleBarText'>Film Fest</h1>
            <div className='navholder'>
                <Navbutton text="Recent" location="recent"/>
                <Navbutton text="Profile" location={"profile"}/>
                <Navbutton text="Film Fest Archive" location="archive"/>
                {(()=>{
                    if(window.localStorage.getItem('gerdypriv') === 'admin' || window.localStorage.getItem('gerdypriv') === 'dev'){
                        return <Navbutton text="Admin" location="admin"/>
                    }
                })()}
                {(()=>{
                    if(window.localStorage.getItem('gerdykey') === null || window.localStorage.getItem('gerdyid') === null || window.localStorage.getItem('gerdyexpires') === null){
                        return <Navbutton text="Sign In" location="login"/>
                    }
                    else{
                        return <Navbutton text="Sign Out" location="signout"/>
                    }
                })()}
            </div>
        </span>
    );
}