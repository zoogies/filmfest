import './Navbutton.css'
import '../../resources/Shared.css';
import checkcreds from '../../resources/checkcreds';

export default function Navbutton(props){
    return(
        <div onClick={() => {
            if(props.location == 'profile'){
                checkcreds().then(function(response){
                    window.location.href = "http://localhost:3000/user/" + window.localStorage.getItem('gerdyid');
                })
            }
            else{
                window.location.href = "http://localhost:3000/" + props.location;
            }
            }} className='level1 navbutton'>
            <h3 className='navbuttontext'>{props.text}</h3>
        </div>
    )
}