import './Videochoice.css';
import '../../resources/Shared.css';

export default function Videochoice(props){
    const id=props.info["id"];
    const title=props.info["title"];
    const thumbnail=props.info["thumbnail"];
    return(
        <div onClick={() => {window.location.href = "http://localhost:3000/watch/"+id}} className='videochoice level2'>
            <div className='videothumb'>
                <img className='thumb' src={thumbnail}/>
            </div>
            <p className='titletext'>{title}</p>
        </div>
    );
}