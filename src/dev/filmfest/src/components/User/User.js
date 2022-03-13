import { useParams } from "react-router-dom"

export default function User(){
    let {userid} = useParams();
    return(
        <p>user page</p>
    )
}