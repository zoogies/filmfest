import './AdminOptionBar.css';
import '../../resources/Shared.css'

export default function AdminOptionBar(props){
    return(
        <div className="level2 adminOptionBar">
            <div onClick={() => {props.changePage('users')}} className='level1 adminOption'>
                <h2>users</h2>
            </div>
            <div onClick={() => {props.changePage('videos')}} className='level1 adminOption'>
                <h2>videos</h2>
            </div>
            <div onClick={() => {props.changePage('classes')}} className='level1 adminOption'>
                <h2>classes</h2>
            </div>
            <div onClick={() => {props.changePage('projects')}} className='level1 adminOption'>
                <h2>projects</h2>
            </div>
        </div>
    )
}