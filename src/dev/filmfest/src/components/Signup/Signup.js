export default function Signup(){
    return(
        <div className="signin">
            <div className="level2 toppanel">
            <form className='p'>
                <h1>Sign up:</h1>
                <h3>Email:</h3>
                <input className='level1' type="email"/>
                <h3>First Name:</h3>
                <input className='level1' type="text"/>
                <h3>Last Name:</h3>
                <input className='level1' type="text"/>
                <h3>Password:</h3>
                <input className='level1' type="password"/>
                <h3>Verify Password:</h3>
                <input className='level1' type="password"/>
                <div className='signupreal'>
                <button className='level1 signupreal'>Sign Up</button>
                </div>
            </form>
            </div>
        </div>
    )
}