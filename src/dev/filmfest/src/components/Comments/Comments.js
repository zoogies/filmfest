import '../../resources/Shared.css';
import './Comments.css'
import Comment from "../Comment/Comment";
import React from 'react';
import basicxhr from '../../resources/xhr';

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
        basicxhr("getvideoratings",{"videoid":this.state.videoid}).then(
            (response) => {
                this.setState({commentdata:JSON.parse(response)});
            }
        );
    }

    render(){
        if(this.state.commentdata !== null){
            return(
                <Commentlayout content={this.state.commentdata}/>
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
    console.log(props.content[0])
    if(props.content[0] !== undefined){
        return(
            <div className="level2 comments">
                <h1 className='commentstext'>Recent Ratings:</h1>
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
                <div className='commentbox'>
                    <h1>No Ratings!</h1> 
                </div>
            </div>
        )
    }
    
}