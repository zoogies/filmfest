import { MdVerified, MdShield } from "react-icons/md"
import { CgTerminal } from "react-icons/cg";
import './MiniProfile.css'
import '../../resources/Shared.css'

export default function MiniProfile(props){
    return(
            <div className="profileSmall level1" onClick={()=>{
                window.location.href = "http://localhost:3000/user/"+props.data[0];
            }}>
            <div className='circle'>
                {(()=>{
                    if(props.data[4] == null){
                        return <img className='profilePreviewSmall' alt="" src={"http://127.0.0.1:5000/users/defualt/pfp.jpeg"}/>
                    }
                    else{
                        return <img className='profilePreviewSmall' alt="" src={"http://127.0.0.1:5000/users/"+props.data[0]+"/pfp."+props.data[4]}/>
                    }
                })()}

            </div>
            <div className='userline'>
                <h2>{props.data[1] + ' ' +props.data[2]}</h2>
                <div className='iconsSmallProfile'>
                    {(()=>{
                        if(props.data[3] === 'post' || props.data[3] === 'admin' || props.data[3] === 'dev'){
                            return(
                                <MdVerified tooltip="verified" color="#03b6fc" size={30}/>
                            )
                        }
                    })()}

                    {(()=>{
                        if(props.data[3] === 'admin' || props.data[3] === 'dev'){
                            return(
                                <MdShield color="#ffbb00" size={30}/>
                            )
                        }
                    })()}

                    {(()=>{
                        if(props.data[3] === 'dev'){
                            return(
                                <CgTerminal color="#11ff00" size={30}/>
                            )
                        }
                    })()}

                </div>
                </div>
            </div>
    )
}