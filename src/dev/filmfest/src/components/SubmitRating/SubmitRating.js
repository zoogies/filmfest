import Stars from "../Stars/Stars"
import { BsStar } from "react-icons/bs";
import React from "react";
import '../../resources/Shared.css';
import basicxhr from "../../resources/xhr";
import './SubmitRating.css';

export default class SubmitRating extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ability:props.ability,
            videoid:props.videoid,
        }
    }

    submitrating(num){
        basicxhr("ratevideo",{"videoid":this.props.videoid,"id":window.localStorage.getItem('gerdyid'),"key":window.localStorage.getItem('gerdykey'),"rating":num}).then(
            (response) => {
                if(response === 'unauthorized'){
                    window.localStorage.clear();
                    window.location.href = "http://localhost:3000/login";
                }
                else{
                    this.setState({ability:"submitted"});
                    window.location.reload();
                }
            }
        );
    }

    render(){
        if(this.state.ability && this.state.ability !== "submitted"){
            return(
                <div className="level1 topsubmit">
                    <h2>Submit A Rating:</h2>
                    <div className="starsubmit">
                        <BsStar onClick={this.submitrating.bind(this,1)} size={40} color="gray"/>
                        <BsStar onClick={this.submitrating.bind(this,2)} size={40} color="gray"/>
                        <BsStar onClick={this.submitrating.bind(this,3)} size={40} color="gray"/>
                        <BsStar onClick={this.submitrating.bind(this,4)} size={40} color="gray"/>
                        <BsStar onClick={this.submitrating.bind(this,5)} size={40} color="gray"/>
                    </div>
                </div>
            )
        }
        else if(this.state.ability === "submitted"){
            return(
                <p>Rating Submitted!</p>
            ) //TODO UI NEEDS WORK
        }
        else{
            return(
                <></>
            )
        }
    }
}