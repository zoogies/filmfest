import './Videochoice.css';
import '../../resources/Shared.css';

export default function Videochoice(props){
    const id=props.info["id"];
    const title=props.info["title"];
    const thumbnail=props.info["thumbnail"];
    return(
        <div className='videochoice level2'>
            <img className='videothumb' src={thumbnail}/>
            <p className='titletext'>{title}</p>
        </div>
    );
}