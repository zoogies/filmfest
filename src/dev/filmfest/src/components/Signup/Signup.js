import basicxhr from "../../resources/xhr";

export default function Signup(){
    return(
        <div className="signin">
            <div className="level2 toppanel">
            <div className='p'>
                <h1>Sign up:</h1>
                <h3>Email:</h3>
                <input id="email" maxLength="40" className='level1' type="email"/>
                <h3>First Name:</h3>
                <input id="first" maxLength="13" className='level1' type="text"/>
                <h3>Last Name:</h3>
                <input id="last" maxLength="13" className='level1' type="text"/>
                <h3>Password:</h3>
                <input id="pass" maxLength="20" className='level1' type="password"/>
                <h3>Verify Password:</h3>
                <input id="vpass" maxLength="20" className='level1' type="password"/>
                <div className='signupreal'>
                <button className='level1 signupreal' onClick={()=>{
                    //TODO CHANGE TO RED TEXT IF A FIELD IS WRONG
                    const email = document.getElementById('email').value;
                    const first = document.getElementById('first').value;
                    const last = document.getElementById('last').value;
                    const pass = document.getElementById('pass').value;
                    const vpass = document.getElementById('vpass').value;

                    if(email === ''){
                        alert('Email address is required.')
                    }
                    else if(email !== '' && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
                        alert('Email address is invalid.');
                    }
                    else if(first === '' || first === ' ' || last === '' || last === ' '){
                        alert('First and last name are required.')
                    }
                    else if(pass !== vpass){
                        alert('Passwords do not match.');
                    }
                    else{
                        basicxhr("signup",{
                            "email":email,
                            "first":first,
                            "last":last,
                            "password":pass,
                        }).then(function(response){
                            if(response === 'taken'){
                                alert("This email address is taken.");
                            }
                            else if(response==='created'){
                                window.localStorage.clear();
                                window.location.href = "http://192.168.50.80:3000/login";
                            }
                            else{
                                alert('A server error has occurred. Please contact an adminstrator.')
                            }
                        })
                    }
                    
                }}>Sign Up</button>
                </div>
            </div>
            </div>
        </div>
    )
}