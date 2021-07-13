// import logo from './logo.svg';
// import './App.css';
import {useState} from 'react'
import {LoginProvider} from './context/loginContext'
import {routing} from './router'

function App() {
  const[login,setLogin]=useState(false)

  const logout=()=>{
    setLogin(false)
  }
  const changeLogin=()=>{
    setLogin(true)
  }
  const loginInfo={
    login:login,
    logout:logout,
    changeLogin:changeLogin
  }

  return (
    <LoginProvider value={loginInfo}>
      {routing}
    </LoginProvider>
  );
}

export default App;
