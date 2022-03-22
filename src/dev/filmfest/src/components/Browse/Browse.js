import Contentpanel from "../Contentpanel/Contentpanel";
import React from 'react';
import basicxhr from "../../resources/xhr";

export default class Browse extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            browseContent: null
        }
    }

    componentDidMount(){
        basicxhr("getreccomendations",{"mode":"recent"}).then(
            (response) => {
                if(response === 'fail'){
                    this.setState({browseContent:'fail'});
                }
                else{
                    this.setState({browseContent:response});
                }
            }
        );
    }

    render(){
        if(this.state.browseContent !== null && this.state.browseContent !== 'fail'){
            return(
                <>
                <Contentpanel content={JSON.parse(this.state.browseContent)}/>
                </>
            );
        }
        else if(this.state.browseContent === 'fail'){
            return <p>This operation has failed. Please reload the page to try again.</p>
        }
        else{
            return <p>Loading...</p> //TODO UPDATE THIS LOADING ICON REALLL!!!
        }
    }
}