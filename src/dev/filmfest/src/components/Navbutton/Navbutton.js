import './Navbutton.css'
import '../../resources/Shared.css';

export default function Navbutton(props){
    return(
        <div onClick={() => {window.location.href = "http://localhost:3000/" + props.location}} className='level1 navbutton'>
            <h3 className='navbuttontext'>{props.text}</h3>
        </div>
    )
}