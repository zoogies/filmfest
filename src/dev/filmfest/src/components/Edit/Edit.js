import React from "react";
import './Edit.css';
import '../../resources/Shared.css'
import basicxhr from "../../resources/xhr"
import { useParams } from "react-router-dom"

export default function EditParent(){
    const {userid} = useParams();

    return <Edit uid={userid} />
}
class Edit extends React.Component{
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

    render(){
        if(this.state.profiledata !== null && this.state.profiledata !== 'notexist'){
        return(
            <form className="editTop">
                <div className="editPanel level2">
                    <h1>Edit Profile:</h1>
                    <div className="profileUpload">
                        <h3>Change Profile Picture:</h3>
                        <input accept="image/png, image/gif, image/jpeg" type="file"/>
                    </div>
                    <div>
                        <h3>First Name:</h3>
                        <input id="first" maxLength="13" className='level1' type="text" defaultValue={this.state.profiledata['first']}/>
                    </div>
                    <div>
                        <h3>Last Name:</h3>
                        <input id="last" maxLength="13" className='level1' type="text" defaultValue={this.state.profiledata['last']}/>
                    </div>
                    <div>
                        <h3>Bio:</h3>
                        <textarea id="bio" maxLength="100" className='level1' type="text" defaultValue={this.state.profiledata['bio']}/>
                    </div>
                    <a type="submit" className="level1 updateBtn">
                        <h3>Update</h3>
                    </a>
                </div>
            </form>
        )
        }
        else{
            return <p>Loading...</p> //TODO UPDATE THIS LOADING ICON REALLL!!!
        }
    }
}