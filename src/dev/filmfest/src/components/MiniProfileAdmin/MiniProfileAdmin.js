import '../MiniProfile/MiniProfile'
import '../../resources/Shared.css'
import MiniProfile from '../MiniProfile/MiniProfile'


export default function Profile(props){
    return(
        <>
        <h2 className='idSmallNumber' >#{props.data[0]}</h2>
        <input className='checkbox' type="checkbox"/>
        <MiniProfile data={props.data}/>
        </>
    )
}