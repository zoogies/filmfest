import "./Reccommendations.css"
import '../../resources/Shared.css';
import Contentpanel from "../Contentpanel/Contentpanel";
import React from "react";
import basicxhr from "../../resources/xhr";

export default class Recommendations extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            reccomendations: null,
        }
    }
    
    componentDidMount(){
        basicxhr("getreccomendations",{"mode":"reccomended"}).then(
            (response) => {
                this.setState({ reccomendations: JSON.parse(response) });
            }
        );
    }

    render(){
        if(this.state.reccomendations !== null){
            return(
                <div className="panel level2">
                    <h1 className="similarText">Recommended:</h1>
                    <Contentpanel className="reccomendedpanel" content={this.state.reccomendations}/>
                </div>
            )
        }
        else{
            return <p>Loading...</p> //TODO UPDATE THIS LOADING ICON REALLL!!!
        }
    }
}