import React from "react";
import './Edit.css';
import '../../resources/Shared.css'
import basicxhr from "../../resources/xhr"
import { useParams } from "react-router-dom"
import { filexhr } from "../../resources/xhr";

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
            selectedFile: null
        }
    }

    onFileChange = event => {
    
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
      
    };

    onFileUpload = () => {
        var data = {
            "id":this.state.userid,
            "key":window.localStorage.getItem('gerdykey'),
            "first":document.getElementById('first').value,
            "last":document.getElementById('last').value,
            "bio":document.getElementById('bio').value
        }
        if(data['first'].trim().length !== 0 && data['last'].trim().length !== 0){
            filexhr(this.state.selectedFile,data).then((response) => {
                if(response === 'done'){
                    window.location.href = "http://localhost:3000/user/" + window.localStorage.getItem('gerdyid');
                }
                else if(response === 'unauthorized'){
                    alert('You are unauthorized for this action');
                }
                else{
                    alert('an error has occurred');
                }
            })
        }
        else{
            alert('You need to enter text in every field.')
        }
    };
    
    componentDidMount(){
        if(this.state.userid === window.localStorage.getItem('gerdyid')){
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
        else{
            //alert('You are not permitted to edit this profile.')
            window.location.href = "http://localhost:3000/user/" + window.localStorage.getItem('gerdyid') + '/edit';
        }

    }

    render(){
        if(this.state.profiledata !== null && this.state.profiledata !== 'notexist'){
        return(
            <form className="editTop">
                <div className="editPanel level2">
                    <h1>Edit Profile:</h1>
                    <div className="profileUpload">
                        <h3>Change Profile Picture:</h3>
                        <input onChange={this.onFileChange} accept="image/png, image/gif, image/jpeg" type="file"/>
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
                    <a onClick={this.onFileUpload} type="submit" className="level1 updateBtn">
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