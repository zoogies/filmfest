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
                <a href='' className='forgortext'>I forgot my password</a>
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
                            else if(response === 'banned'){
                                alert('This account is banned.')
                            }
                            else if(response === 'An error has occurred'){
                                alert(response)
                            }
                            else{
                                const key = JSON.parse(response)['key']
                                const expires = JSON.parse(response)['expires']
                                const id = JSON.parse(response)['id']
                                const priv = JSON.parse(response)['priv']
                                window.localStorage.setItem('gerdykey',key);
                                window.localStorage.setItem('gerdyexpires',expires);
                                window.localStorage.setItem('gerdyid',id);
                                window.localStorage.setItem('gerdypriv',priv);
                                window.location.href = "http://localhost:3000/browse";
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