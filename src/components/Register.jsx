import axios from 'axios'
import React, { Component } from 'react'

export default class Register extends Component {
    state={
        user:"",
        email:"",
        pwd:"",
        phn:"",
        role:""

    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        const acc={...this.state}
        console.log(this.state);
        const url=`https://std-mern-app-default-rtdb.firebaseio.com/accounts.json`

        axios.post(url,acc).then((resp)=>{
            if(resp.status===200){
                this.props.history.push("/show")
                this.setState({
                    user:"",
                    email:"",
                    pwd:"",
                    phn:"",
                    role:"",
                });
            }
        }).catch((err)=>{
            console.log(err);
            
        });
    }
    render() {
        return (
            <div className="container">
                <h1>register</h1>

     <form className="container" onSubmit={this.handleSubmit}>
                <div className="form-group">
    <label htmlFor="exampleInputPassword1">Name</label>
    <input type="text"
           className="form-control" 
           id="name" 
           name="user"
           value={this.state.user}
           onChange={this.handleChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
     name="email"
     value={this.state.email}
     onChange={this.handleChange} />
    
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password"
           className="form-control" 
           id="exampleInputPassword1"
           name="pwd"
           value={this.state.pwd}
           onChange={this.handleChange} />
  </div>
  <div className="form-group">
    <label htmlFor="phone">Phone</label>
    <input type="number"
     className="form-control" 
     id="phn"
     name="phn"
     value={this.state.phn}
     onChange={this.handleChange} />
  </div>
  <div className="form-group">
    <label htmlFor="role">Designation</label>
    <input type="text" className="form-control" id="role"
     name="role"
     value={this.state.role}
     onChange={this.handleChange} />
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

            </div>
        )
    }
}
