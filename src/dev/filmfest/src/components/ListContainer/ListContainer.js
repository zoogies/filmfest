import './ListContainer.css';
import '../../resources/Shared.css';
import React from 'react';

export default function ListContainer(props){
    return(
        <TrueListContainer content={props.content} type={props.type}/>
    )
}

class TrueListContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            content:props.content,
            type:props.type,
        }
    }

    render(){
        if(this.state.type === 'checkbox'){
            return(
            <div className="level1 ListContainerTop">
                {
                    this.state.content.map(function(option){
                        return(
                            <div key={option[0]} className='ListContainerOption level2'>
                                <input className='ListContainerCheckbox' type="checkbox"/>
                                <p className='ListContainerOptionText'>{option[1]}</p>
                            </div>   
                        )
                    })
                }
            </div>
            )
        }
        else{
            return(
                <div className="level1 ListContainerTop">
                    {
                        this.state.content.map(function(option){
                            return(
                                <div key={option[0]} className='ListContainerOption level2'>
                                    <p className='ListContainerOptionText'>{option[1]}</p>
                                </div>   
                            )
                        })
                    }
                </div>
                ) 
        }
    }
}