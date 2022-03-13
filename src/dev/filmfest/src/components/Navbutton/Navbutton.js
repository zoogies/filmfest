import './Navbutton.css'
import '../../resources/Shared.css';

export default function Navbutton(props){
    return(
        <div className='level1 navbutton'>
            <h3 className='navbuttontext'>{props.text}</h3>
        </div>
    )
}