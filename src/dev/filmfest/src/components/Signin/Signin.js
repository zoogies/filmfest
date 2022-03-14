import './Signin.css';
import '../../resources/Shared.css';

export default function Signin(){
    return(
        <div className="signin">
            <div className='toppanel level2'>
            <form className='p'>
                <h1>Sign in:</h1>
                <h3>Email:</h3>
                <input className='level1' type="email"/>
                <h3>Password:</h3>
                <input className='level1' type="password"/>
                <button className='level1 loginbtn'>Log In</button>
            </form>
            <button onClick={()=>{window.location.href = "http://localhost:3000/signup";}} className='level1 signupbtn'>Sign Up</button>
            </div>
        </div>
    )
}