import './Comment.css'
import '../../resources/Shared.css'
import MiniProfile from '../MiniProfile/MiniProfile';
import Stars from '../Stars/Stars';

export default function Comment(props){
    return(
        <div className='comment level1'>
            <MiniProfile data={props.comment['owner']}/>
            <Stars rating={props.comment['rating']}/>
        </div>
    )
}