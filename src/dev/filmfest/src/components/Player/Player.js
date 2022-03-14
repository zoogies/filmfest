import Comments from "../Comments/Comments"
import Recommendations from "../Reccommendations/Reccommendations"
import "./Player.css"

export default function Player(){
    const profile = "11298537";
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
                    <div className="profile" onClick={()=>{window.location.href = "http://localhost:3000/user/" + profile}}>
                        <img className="pfp" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"/>
                        <h3 className="name">Name</h3>
                    </div>
                </div>
                <div className="reccomended">
                    <Recommendations/>
                </div>
            </div>
            <Comments/>
        </div>
    )
}