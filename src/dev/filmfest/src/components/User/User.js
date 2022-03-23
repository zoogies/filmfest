import { useParams } from "react-router-dom"
import '../../resources/Shared.css'
import './User.css'
import Contentpanel from '../Contentpanel/Contentpanel'
import ProfileBadge from "../ProfileBadge/ProfileBadge"
import basicxhr from "../../resources/xhr"
import { MdVerified, MdShield } from "react-icons/md"
import { CgTerminal } from "react-icons/cg";
import React from "react"

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
                    window.location.href = "http://192.168.50.80:3000/login";
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
                                    if(this.state.profiledata['priv'] === 'verified' || this.state.profiledata['priv'] === 'admin' || this.state.profiledata['priv'] === 'dev'){
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
                    <Contentpanel content={this.state.profiledata['content']}/>
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