import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import LoginContext from '../context/loginContext'

export default function Login() {
    const context=useContext(LoginContext);
    const history=useHistory();

    const login=()=>{
        console.log(context);
        context.changeLogin(true);
        console.log(context.login);
        history.push("/")
    }
    return (
        <div>
            <button onClick={login}>login</button>
        </div>
    )
}
