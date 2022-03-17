import Profile from "../MiniProfileAdmin/MiniProfileAdmin"
import './ProfileCollection.css'

export default function ProfileCollection(props){
    return(
        <div className="ProfileCollection">
            {
                props.profiles.map(function(profile){
                    return <Profile key={profile[0]} data={profile} />
                })
            }
        </div>
    )
}