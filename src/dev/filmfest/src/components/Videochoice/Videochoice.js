import './Videochoice.css';
import '../../resources/Shared.css';
import MiniProfile from '../MiniProfile/MiniProfile';

export default function Videochoice(props){
    const id=props.info["id"];
    const title=props.info["title"];
    const thumbnail=props.info["thumb"];
    const views=props.info["views"];
    return(
        <div onClick={() => {window.location.href = "http://localhost:3000/watch/"+id}} className='videochoice level2'>
            <div className='videothumb'>
                <video id="video" className="thumb" preload='metadata'>
                    <source src={thumbnail} type="video/mp4"></source>
                    Your browser does not support the video tag.
                </video>
            </div>
            <p className='titletext'>{title}</p>
            <p className='viewschoice'>{views + ' views'}</p>
            <div className='videochoiceminiprofile'>
                <MiniProfile data={props.info['owner']}/>
            </div>
        </div>
    );
}