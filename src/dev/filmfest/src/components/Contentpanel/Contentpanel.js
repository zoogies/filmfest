import Videochoice from "../Videochoice/Videochoice";
import './Contentpanel.css';

export default function Contentpanel(props){
    //console.log(props)
    return(
        <div className='contentpanel'>
        {
            props.content.map(function(video){
                return <Videochoice key={video.id} info={video} />
            })
        }
        </div>
    );
}