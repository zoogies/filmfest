import "./Reccommendations.css"
import '../../resources/Shared.css';
import Contentpanel from "../Contentpanel/Contentpanel";

const data = [
    {"id":"69","author":"zoogs","title":"nose guy","thumbnail":"https://media.discordapp.net/attachments/682005199132688450/950756784174403624/IMG_7551.png"},
    {"id":"420","author":"zoogs","title":"me fr","thumbnail":"https://media.discordapp.net/attachments/682005199132688450/949365838870376538/IMG_7505.png"},
    {"id":"1","author":"a","title":"1","thumbnail":"https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688?k=20&m=517188688&s=612x612&w=0&h=i38qBm2P-6V4vZVEaMy_TaTEaoCMkYhvLCysE7yJQ5Q="},
    {"id":"2","author":"b","title":"2","thumbnail":"https://th-thumbnailer.cdn-si-edu.com/vSnitgUqCQCRSx7mkHZtHZHry4U=/1072x720/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/04/8e/048ed839-a581-48af-a0ae-fac6fec00948/gettyimages-168346757_web.jpg"},
    {"id":"3","author":"c","title":"3dffhgghfghgfhfghfghfghfghfghfghfghfghfghfghgf","thumbnail":"https://media.istockphoto.com/photos/picturesque-morning-in-plitvice-national-park-colorful-spring-scene-picture-id1093110112?k=20&m=1093110112&s=612x612&w=0&h=3OhKOpvzOSJgwThQmGhshfOnZTvMExZX2R91jNNStBY="},
]

export default function Recommendations(){
    return(
        <div className="panel level2">
            <h1 className="similarText">Similar Videos:</h1>
            <Contentpanel className="reccomendedpanel" content={data}/>
        </div>
    )
}