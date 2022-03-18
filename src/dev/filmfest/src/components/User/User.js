import { useParams } from "react-router-dom"
import '../../resources/Shared.css'
import './User.css'
import Contentpanel from '../Contentpanel/Contentpanel'
import ProfileBadge from "../ProfileBadge/ProfileBadge"
import basicxhr from "../../resources/xhr"
import { MdVerified, MdShield } from "react-icons/md"
import { CgTerminal } from "react-icons/cg";
import React from "react"

const data = [
    {"id":"69","author":"zoogs","title":"nose guy","thumbnail":"https://media.discordapp.net/attachments/682005199132688450/950756784174403624/IMG_7551.png"},
    {"id":"420","author":"zoogs","title":"me fr","thumbnail":"https://media.discordapp.net/attachments/682005199132688450/949365838870376538/IMG_7505.png"},
    {"id":"1","author":"a","title":"1","thumbnail":"https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688?k=20&m=517188688&s=612x612&w=0&h=i38qBm2P-6V4vZVEaMy_TaTEaoCMkYhvLCysE7yJQ5Q="},
    {"id":"2","author":"b","title":"2","thumbnail":"https://th-thumbnailer.cdn-si-edu.com/vSnitgUqCQCRSx7mkHZtHZHry4U=/1072x720/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/04/8e/048ed839-a581-48af-a0ae-fac6fec00948/gettyimages-168346757_web.jpg"},
    {"id":"3","author":"c","title":"3dffhgghfghgfhfghfghfghfghfghfghfghfghfghfghgf","thumbnail":"https://media.istockphoto.com/photos/picturesque-morning-in-plitvice-national-park-colorful-spring-scene-picture-id1093110112?k=20&m=1093110112&s=612x612&w=0&h=3OhKOpvzOSJgwThQmGhshfOnZTvMExZX2R91jNNStBY="},
]


class RealUser extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userid: props.uid,
            profiledata: null,
        }
    }
    
    componentDidMount(){
        basicxhr("pdata",{"profileid":this.state.userid,"userid":window.localStorage.getItem('gerdyid'),"userkey":window.localStorage.getItem('gerdykey')}).then(
            (response) => {
                //alert(typeof JSON.parse(response))
                if(response === 'unauthorized'){
                    window.localStorage.clear();
                    window.location.href = "http://localhost:3000/login";
                }
                else if(response === 'notexist'){
                    this.setState({ profiledata: "notexist" });
                }
                else{
                    this.setState({ profiledata: JSON.parse(response) });
                }
            }
        );
    }

    render() {
        if(this.state.profiledata !== null && this.state.profiledata !== 'notexist'){
            return(
                <>
                <div className="userPage">
                    <div className="userHeader level2">
                        <div className="userImage">
                            <img className='imageAttr' alt="" src={this.state.profiledata['pfp']}/>
                        </div>
                        <div className="userInfo">
                            <div className="userName">
                                <p className="usernameText">{this.state.profiledata['first'] + " " + this.state.profiledata['last']}</p>

                                {(()=>{
                                    if(this.state.profiledata['priv'] === 'post' || this.state.profiledata['priv'] === 'admin' || this.state.profiledata['priv'] === 'dev'){
                                        return(
                                            <MdVerified tooltip="verified" color="#03b6fc" size={45}/>
                                        )
                                    }
                                })()}

                                {(()=>{
                                    if(this.state.profiledata['priv'] === 'admin' || this.state.profiledata['priv'] === 'dev'){
                                        return(
                                            <MdShield color="#ffbb00" size={40}/>
                                        )
                                    }
                                })()}
                                
                                {(()=>{
                                    if(this.state.profiledata['priv'] === 'dev'){
                                        return(
                                            <CgTerminal color="#11ff00" size={40}/>
                                        )
                                    }
                                })()}

                            </div>
                            <div> 
                                <p>{this.state.profiledata['bio']}</p>
                            </div>

                            {(()=>{
                                if(this.state.profiledata['owned'] === 'true'){
                                    return(
                                        <ProfileBadge key='edit' type='edit'/>
                                    )
                                }
                            })()}

                            <div className="userBadges">
                                {
                                    this.state.profiledata['badges'].split("_").map(function(type){
                                        if(type != '' && type != ' '){
                                            return <ProfileBadge key={type} type={type} />
                                        }
                                    })
                                }
                            </div>
                        </div>

                    </div>
                </div>
                <div className="profileVideoContent">
                    <Contentpanel content={data}/>
                </div>
                </>
            )

        }
        else if(this.state.profiledata === 'notexist'){
            return <h1>This user does not exist</h1> //TODO THIS NEEDS DESIGNED
        }
        else{
            return <p>Loading...</p> //TODO UPDATE THIS LOADING ICON REALLL!!!
        }
    }
}

export default function User(){
    const {userid} = useParams();

    return <RealUser uid={userid} />
}