import '../../resources/Shared.css'
import './ProfileBadge.css'
import {AiFillEye ,AiFillCode} from 'react-icons/ai';
import {MdMovieFilter, MdMovie} from 'react-icons/md';
import {BsFillCameraReelsFill} from 'react-icons/bs';

export default function ProfileBadge(props){
    if(props.type === "ma1"){
        const style = {
            backgroundColor : "#04db3a"
        }
        return(
            <div style={style} className="badge">
                <div className='icon'>
                    <MdMovie size={30}/>
                </div>
                <h3 className='badgetext'>{props.text}</h3>
            </div>
        )
    }
    else if(props.type === "ma2"){
        const style = {
            backgroundColor : "#7700cc"
        }
        return(
            <div style={style} className="badge">
                <div className='icon'>
                    <MdMovieFilter size={30}/>
                </div>
                <h3 className='badgetext'>{props.text}</h3>
            </div>
        )
    }
    else if(props.type === "views"){
        const style = {
            backgroundColor : "#db8b00"
        }
        return(
            <div style={style} className="badge">
                <div className='icon'>
                    <AiFillEye size={30}/>
                </div>
                <h3 className='badgetext'>{props.text}</h3>
            </div>
        )
    }
    else if(props.type === "dev"){
        return(
            <div className="badge dev">
                <div className='icon'>
                    <AiFillCode size={30}/>
                </div>
                <h3 className='badgetext'>{props.text}</h3>
            </div>
        )
    }
    else if(props.type === "ff"){
        const style = {
            backgroundColor : "#ff00cc"
        }
        return(
            <div style={style} className="badge">
                <div className='icon'>
                    <BsFillCameraReelsFill size={30}/>
                </div>
                <h3 className='badgetext'>{props.text}</h3>
            </div>
        )
    }
    else{
        return(<></>)
    }
    
}