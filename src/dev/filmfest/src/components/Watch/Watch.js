import { useParams } from 'react-router-dom'
import "./Watch.css"
import Player from "../Player/Player"

export default function Watch(props){
    let { videoid } = useParams();
    return(
        <div className='watch'>
            <Player videoid={videoid}/>
        </div>
    )
}