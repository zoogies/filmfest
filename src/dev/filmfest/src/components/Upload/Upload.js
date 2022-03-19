import './Upload.css';
import '../../resources/Shared.css'
import basicxhr from "../../resources/xhr"
import React from 'react';
import ListContainer from '../ListContainer/ListContainer';

export default function UploadWrapper(props){
    return(<Upload/>)
}

class Upload extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            userid: props.uid,
            profiledata: null,
            selectedFile:null,
            selectedProject:null,
            selectedClass:null
        }
    }

    onFileChange = event => {
    
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
        alert(this.state.selectedFile)
    };

    handleProjectSelect = (value) => {
        this.setState({selectedProject: value});
    }

    componentDidMount(){
        basicxhr("videouploadpre",{"profileid":this.state.userid,"userid":window.localStorage.getItem('gerdyid'),"userkey":window.localStorage.getItem('gerdykey')}).then(
            (response) => {
                //alert(typeof JSON.parse(response))
                if(response === 'unauthorized'){
                    window.localStorage.clear();
                    window.location.href = "http://localhost:3000/login";
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
                <div className="uploadTop">
                    <div className="uploadPanel level2">
                        <h1 className="uploadText">Upload:</h1>
                        <form className='uploadForm'>
                            <div className="videoUpload">
                                <h3 className='uploadVideoText'>Upload Video:</h3>
                                <input onChange={this.onFileChange} accept="video/mp4" type="file"/>
                            </div>

                            <textarea placeholder='Video Title' className="level1" type="text"/>
                            <textarea placeholder='Video Credits and Description' className="level1" type="text"/>
                            
                            <h3>Select Project:</h3>
                            <ListContainer type="checkbox" recieveSelections={this.handleProjectSelect} content={this.state.profiledata}/>

                            <a onClick={this.onFileUpload} type="submit" className="level1 UploadBtn">
                                <h3 className='uploadtxt'>Upload</h3>
                            </a>
                        </form>
                    </div>
                </div>
            )
        }
        else{
            return <p>Loading...</p> //TODO UPDATE THIS LOADING ICON REALLL!!!
        }
    }
}