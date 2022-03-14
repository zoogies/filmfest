import Signin from "../Signin/Signin";

export default function Profilehandler(){
    if(window.localStorage.getItem("gerdykey") != null && window.localStorage.getItem("gerdyuser") != null){
        window.location.href = "http://localhost:3000/" + window.localStorage.getItem("gerdyuser");
    }
    else{
        window.location.href = "http://localhost:3000/login";
    }
}