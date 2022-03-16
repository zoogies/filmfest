import './Navbutton.css'
import '../../resources/Shared.css';
import checkcreds from '../../resources/checkcreds';

export default function Navbutton(props){
    return(
        <div onClick={() => {
            if(props.location === 'profile'){
                checkcreds().then(function(){
                    if(window.localStorage.getItem('gerdyid') !== null){
                        window.location.href = "http://localhost:3000/user/" + window.localStorage.getItem('gerdyid');
                    }
                    else {
                        window.localStorage.clear();
                        window.location.href = "http://localhost:3000/login";
                    }
                })
            }
            else if(props.location === 'signout'){
                //TODO MAKE THIS CLEAR SERVER SIDE KEY FOR EXTRA SECURITY I CANT BE FUCKED RIGHT NOW
                window.localStorage.clear();
                window.location.href = "http://localhost:3000/login";
            }
            else{
                window.location.href = "http://localhost:3000/" + props.location;
            }
            }} className='level1 navbutton'>
            <h3 className='navbuttontext'>{props.text}</h3>
        </div>
    )
}