import Comments from "../Comments/Comments"
import Recommendations from "../Reccommendations/Reccommendations"
import "./Player.css"

export default function Player(){
    return(
        <div className="player">
            <div className="videoandrec">
                <video className="video" controls>
                    <source src="" type="video/mp4"></source>
                    Your browser does not support the video tag.
                </video>
                <Recommendations/>
            </div>
            <div className="videoinfo level2">
                <h1 className="title">Title!</h1>
                <p className="views">View Counter</p>
                <div className="profile">
                    <img className="pfp" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"/>
                    <h3 className="name">Name</h3>
                </div>
            </div>
            <Comments/>
        </div>
    )
}