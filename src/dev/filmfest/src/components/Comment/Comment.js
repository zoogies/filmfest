import './Comment.css'
import '../../resources/Shared.css'

export default function Comment(props){
    const name=props.comment["name"];
    const content=props.comment["content"];
    const pfp=props.comment["pfp"];
    return(
        <div className='comment level1'>
            <div className='compfp'>
                <img className='compfpimg' src={pfp}/>
            </div>
            <div className='content'>
                <h2 className='username'>{name}</h2>
                <p className='commentbody'>{content}</p>
            </div>
        </div>
    )
}