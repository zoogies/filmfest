import Comments from "../Comments/Comments"
import Recommendations from "../Reccommendations/Reccommendations"
import "./Player.css"
import '../../resources/Shared.css'
import MiniProfile from "../MiniProfile/MiniProfile"

export default function Player(){
    return(
        <div className="player">
            <div className="videoandtitle">
                <video className="video" controls>
                    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"></source>
                    Your browser does not support the video tag.
                </video>
                <div className="videoinfo level2">
                    <h1 className="title">Title!</h1>
                    <p className="views">View Counter</p>
                    <MiniProfile data={[1,"ryan","zmuda","dev","jpg"]}/>
                </div>
                <div className="reccomended">
                    <Recommendations/>
                </div>
            </div>
            <Comments/>
        </div>
    )
}