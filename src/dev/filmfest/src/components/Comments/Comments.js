import '../../resources/Shared.css';
import './Comments.css'
import Comment from "../Comment/Comment";
import React from 'react';
import basicxhr from '../../resources/xhr';
import SubmitRating from '../SubmitRating/SubmitRating';

export default class Comments extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            videoid: props.videoid,
            commentdata:null,
            //STARTING STATE VARIABLES DETERMINE THE SEARCH VARS
        }
    }

    componentDidMount(){
        basicxhr("getvideoratings",{"videoid":this.state.videoid,"userid":window.localStorage.getItem('gerdyid')}).then(
            (response) => {
                this.setState({commentdata:JSON.parse(response)});
            }
        );
    }

    render(){
        if(this.state.commentdata !== null){
            return(
                <Commentlayout videoid={this.state.videoid} ability={this.state.commentdata['canrate']} content={this.state.commentdata['comments']}/>
            )
        }
        else{
            return (
                <div className="level2 comments">
                        <h1>Loading Ratings</h1>
                </div>
                //TODO UPDATE THIS LOADING ICON REALLL!!!
            )
        }
    }
}

function Commentlayout(props){
    if(props.content[0] !== undefined){
        return(
            <div className="level2 comments">
                <h1 className='commentstext'>Recent Ratings:</h1>
                <SubmitRating videoid={props.videoid} ability={props.ability}/>
                <div className='commentbox'>
                    {
                    props.content.map((comment) =>{
                        return( <Comment key={comment['id']} comment={comment}/> )
                    })
                    }
                </div>
            </div>
        )
    }
    else{
        //TODO be the first to rate and css not look like shit
        return (
            <div className="level2 comments">
                <h1 className='commentstext'>Recent Ratings:</h1>
                <SubmitRating videoid={props.videoid} ability={props.ability}/>
                <div className='commentbox'>
                    <h1>No Ratings!</h1> 
                </div>
            </div>
        )
    }
    
}