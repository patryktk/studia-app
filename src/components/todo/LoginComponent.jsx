import { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import { useAuth } from '../security/AuthContext'
import './TodoApp.css';
export default function LoginComponent(){

    const [username,setUsername] = useState('')

    const [password, setPassword] = useState('')

    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const navigate = useNavigate();

    const authContext = useAuth()

    function handleUsernameChange(event){
        setUsername(event.target.value)
    }

    function handlePasswordChange(event){
        setPassword(event.target.value)
    }

    async function handleSubmit(){
        if(await authContext.login(username, password)){
            navigate(`/welcome/${username}`)
        }else{
            setShowErrorMessage(true)
        }
    }

    return(
        <div className="Login">
            <h1>Login</h1>
            {showErrorMessage && <div className='errorMessage alert alert-danger'>Authtication Failed. Check credentials.</div>}
            <div className='container d-flex justify-content-center'>
                <form>
                    <div>
                        <label>User Name</label>
                        <input type="text" id="username" className="form-control" name="username" value={username} onChange={handleUsernameChange}/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" id="password" className="form-control" name="password" value={password} onChange={handlePasswordChange}/>
                    </div>
                    <div>
                        <button type="button" id="loginButton" className='btn btn-primary mt-4' name="login" onClick={handleSubmit}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}