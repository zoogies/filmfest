import Comments from "../Comments/Comments"
import Recommendations from "../Reccommendations/Reccommendations"
import "./Player.css"
import '../../resources/Shared.css'
import MiniProfile from "../MiniProfile/MiniProfile"
import React from "react"
import basicxhr from "../../resources/xhr";
import TagBox from "../TagBox/TagBox"

function TagWrapper(props){
    if(props.tags[0] !== undefined){
        return(
            <>
            <h2 className="TagText">Tags:</h2>
            <TagBox content={props.tags}/>
            </>
        )
    }
    else{
        return(<></>)
    }
}

export default class Player extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            videoid: props.videoid,
            videodata: null,
        }
    }

    componentDidMount(){
        basicxhr("videodata",{"videoid":this.state.videoid}).then(
            (response) => {
                if(response === 'notfound'){
                    window.location.href = "http://localhost:3000/notfound";
                }
                else{
                    this.setState({videodata:JSON.parse(response)});
                }
            }
        );
    }

    render(){
        if(this.state.videodata !== null){
            return(
                <div className="player">
                    <div className="videoandtitle">
                        <video autoPlay id="video" className="video" controls>
                            <source src={this.state.videodata['location']} type="video/mp4"></source>
                            Your browser does not support the video tag.
                        </video>
                        <div className="videoinfo level2">
                            <h1 className="title">{this.state.videodata['title']}</h1>
                            <p className="views">{this.state.videodata['views'] + ' views'}</p>
                            <p className="description">{this.state.videodata['description']}</p>
                            <MiniProfile data={this.state.videodata['owner']}/>
                            
                            <TagWrapper tags={this.state.videodata['tags']}/>
                        </div>
                        <div className="reccomended">
                            <Recommendations/>
                        </div>
                    </div>
                    <Comments/>
                </div>
            )
        }
        else{
            return <p>Loading...</p> //TODO UPDATE THIS LOADING ICON REALLL!!!
        }
    }
}