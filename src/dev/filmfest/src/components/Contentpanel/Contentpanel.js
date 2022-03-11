import Videochoice from "../Videochoice/Videochoice";

export default function Contentpanel(props){
    //console.log(props)
    return(
        <>
        {
            props.content.map(function(video){
                return <Videochoice key={video.id} info={video} />
            })
        }
        </>
    );
}