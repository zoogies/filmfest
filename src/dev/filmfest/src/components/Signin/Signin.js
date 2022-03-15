import './Signin.css';
import '../../resources/Shared.css';
import basicxhr from '../../resources/xhr';

export default function Signin(){
    return(
        <div className="signin">
            <div className='toppanel level2'>
            <div className='p'>
                <h1>Sign in:</h1>
                <h3>Email:</h3>
                <input className='level1' id="email" type="email"/>
                <h3>Password:</h3>
                <input className='level1' id="password" type="password"/>
                <button onClick={()=>{
                    //check data
                    const email = document.getElementById("email").value;
                    const password = document.getElementById("password").value;

                    //send request
                    basicxhr("login",{"email":email,"password":password}).then(
                        function (response){
                            if(response === 'wrong'){
                                alert('Wrong Password'); //todo placeholder
                            }
                            else{
                                const key = JSON.parse(response)['key']
                                const expires = JSON.parse(response)['expires']
                                const id = JSON.parse(response)['id']
                                window.localStorage.setItem('gerdykey',key);
                                window.localStorage.setItem('gerdyexpires',expires);
                                window.localStorage.setItem('gerdyid',id);
                                window.location.href = "http://localhost:3000/recent";
                            }
                        }
                    )

                }} className='level1 loginbtn'>Log In</button>
            </div>
            <button onClick={()=>{window.location.href = "http://localhost:3000/signup";}} className='level1 signupbtn'>Sign Up</button>
            </div>
        </div>
    )
}