import {  BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Accounts from "./components/Accounts";
import Login from "./components/Login";
import {LoginConsumer} from "./context/loginContext";


export const routing = (
  <BrowserRouter>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <li className="nav-item active">
            <Link className="navbar-brand" to="/" >
               Employee 
            </Link>
          </li> 
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">


      {

      <LoginConsumer>
    {
        (loginInfo)=>{
            if(loginInfo.login){
                return(
                    <>
                     <li className="nav-item">
            <Link className="nav-link" to="/create" >
              Register{" "}
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link " to="/show" >
              Accounts
            </Link>
          </li>
          <li className="nav-item">
            <p className="nav-link " onClick={()=>{
                loginInfo.logout()
            }} >
              Logout
            </p>
          </li>
                     </>
                );
            }else{
                return(
                <li className="nav-item">
                <Link className="nav-link " to="/login" >
                  Login
                </Link>
              </li>
                    )
            }
        }
    }
      </LoginConsumer>
    }   

          
         
          
        </ul>
      </div>
    </nav>

    <Switch>

    <Route path="/" exact component={Home}/>
    <Route path="/create" component={Register}/>
    <Route path="/show" component={Accounts}/>
    <Route path="/login" component={Login}/>
    </Switch>
  </BrowserRouter>
);