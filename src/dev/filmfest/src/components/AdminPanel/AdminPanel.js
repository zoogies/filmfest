import React from "react";
import ProfileCollection from "../ProfileCollection/ProfileCollection";
import basicxhr from "../../resources/xhr"
import './Admin.css'
import './AdminOptionBar.css'
import GenericOptionBar from "../GenericOptionBar/GenericOptionBar";

export default class AdminPanel extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            page: 'blank',
            users: null,
        }
        this.pagechanger = this.pagechanger.bind(this);
        this.banselected = this.banselected.bind(this);
    }

    componentDidMount(){
        //double check user didnt just type some BS in to get here
        if(window.localStorage.getItem('gerdypriv') !== 'admin' && window.localStorage.getItem('gerdypriv') !== 'dev'){
            window.localStorage.clear();
            window.location.href = "http://192.168.50.80:3000/login";
        }

    }

    pagechanger(page){
        this.setState({page: page}, () => {
            if(this.state.page === 'users'){
                //fetch panel data
                basicxhr("userlist",{"id":window.localStorage.getItem('gerdyid'),"key":window.localStorage.getItem('gerdykey')}).then(
                    (response) => {
                        if(response === 'unauthorized'){
                            window.localStorage.clear();
                            window.location.href = "http://192.168.50.80:3000/login";
                        }
                        else{
                            this.setState({ users: JSON.parse(response) });
                            this.setState({ page: "usersready" });
                        }
                    }
                );
            }
        });
    }

    banselected(){
        alert(document.getElementById('check').value)
    }

    render(){

        if(this.state.page === 'usersready' ){
            return(
                <div className="admintop">
                <div className="adminpaneltitle">
                    <h1>ADMIN PANEL</h1>
                </div>
                <div className="adminContainer">
                    <GenericOptionBar content={[
                        {"text":"users","call":()=>{this.pagechanger('users')}},
                        {"text":"videos","call":()=>{this.pagechanger('videos')}},
                        {"text":"projects","call":()=>{this.pagechanger('projects')}},
                        {"text":"reports","call":()=>{this.pagechanger('reports')}},
                    ]}
                    />
                </div>

                <div className="adminContainer">
                    <GenericOptionBar content={[
                        {"text":"ban selected","call":()=>{this.banselected()}},
                        {"text":"verify selected","call":()=>{alert()}},
                        {"text":"promote selected","call":()=>{alert()}},
                        {"text":"demote selected","call":()=>{alert()}},
                        
                        ]}/>
                </div>

                <div className="adminContainer">
                    <ProfileCollection profiles={this.state.users}/>
                </div>
                </div>
            )
        }
        else if(this.state.page === 'blank'){
            return (
                <div className="admintop">
                    <div className="adminpaneltitle">
                        <h1>ADMIN PANEL</h1>
                    </div>
                    <div className="adminContainer">
                        <GenericOptionBar content={[
                            {"text":"users","call":()=>{this.pagechanger('users')}},
                            {"text":"videos","call":()=>{this.pagechanger('videos')}},
                            {"text":"projects","call":()=>{this.pagechanger('projects')}},
                            {"text":"reports","call":()=>{this.pagechanger('reports')}},
                        ]}
                        />
                    </div>
                </div>
            )
        }
        else{
            return <p>Loading...</p> //TODO RETURN GERDY LOADING ANIMATION HERE
        }
    }
}