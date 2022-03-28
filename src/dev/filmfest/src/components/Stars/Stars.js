//DO NOT READ THIS CODE CLOSE THIS RIGHT NOW
import { BsStar, BsStarFill } from "react-icons/bs";

export default function Stars(props){
    //ok this is probably the worst practice way to do this but idgaf its 2:14am and the other ways dont work
    //literally nobody will ever read this code (hopefully)
    if(props.rating === 0){
        return(
            <div>
                <BsStar size={40} color="gray"/>
                <BsStar size={40} color="gray"/>
                <BsStar size={40} color="gray"/>
                <BsStar size={40} color="gray"/>
                <BsStar size={40} color="gray"/>
            </div>
        )
    }
    else if(props.rating === 1){
        return(
            <div>
                <BsStarFill size={40} color="#e3a70e"/>
                <BsStar size={40} color="gray"/>
                <BsStar size={40} color="gray"/>
                <BsStar size={40} color="gray"/>
                <BsStar size={40} color="gray"/>
            </div>
        )
    }
    else if(props.rating === 2){
        return(
            <div>
                <BsStarFill size={40} color="#e3a70e"/>
                <BsStarFill size={40} color="#e3a70e"/>
                <BsStar size={40} color="gray"/>
                <BsStar size={40} color="gray"/>
                <BsStar size={40} color="gray"/>
            </div>
        )
    }
    else if(props.rating === 3){
        return(
            <div>
                <BsStarFill size={40} color="#e3a70e"/>
                <BsStarFill size={40} color="#e3a70e"/>
                <BsStarFill size={40} color="#e3a70e"/>
                <BsStar size={40} color="gray"/>
                <BsStar size={40} color="gray"/>
            </div>
        )
    }
    else if(props.rating === 4){
        return(
            <div>
                <BsStarFill size={40} color="#e3a70e"/>
                <BsStarFill size={40} color="#e3a70e"/>
                <BsStarFill size={40} color="#e3a70e"/>
                <BsStarFill size={40} color="#e3a70e"/>
                <BsStar size={40} color="gray"/>
            </div>
        )
    }
    else{
        return(
            <div>
                <BsStarFill size={40} color="#e3a70e"/>
                <BsStarFill size={40} color="#e3a70e"/>
                <BsStarFill size={40} color="#e3a70e"/>
                <BsStarFill size={40} color="#e3a70e"/>
                <BsStarFill size={40} color="#e3a70e"/>
            </div>
        )
    }
}