import './Profile.css'
import '../../resources/Shared.css'
import { MdVerified, MdShield } from "react-icons/md"
import { CgTerminal } from "react-icons/cg";

export default function Profile(props){
    return(
        <div className="profileSmall level2">
            <input className='checkbox' type="checkbox"/>
            <div className='circle'>
                <img className='profilePreviewSmall' alt="" src="https://i.pinimg.com/originals/d8/5a/81/d85a810820b7ba00122476110223de70.jpg"/>
            </div>
            <div className='userline'>
                <h2>{props.data[1] + ' ' +props.data[2]}</h2>
                <h2 className='idSmallNumber' >#{props.data[0]}</h2>
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