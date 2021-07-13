import axios from 'axios'
import {Button, Modal} from 'react-bootstrap'
import React, { Component } from 'react'
import Login from './Login';


export default class Accounts extends Component {
    state={
        accounts:[],
        show:false,
        user:"",
        email:"",
        pwd:"",
        phn:"",
        role:"",
        id:"",
    };

    componentDidMount(){
        console.log("");
        axios.get(`https://std-mern-app-default-rtdb.firebaseio.com/accounts.json`).then((resp)=>{
           let fetchedAccounts=[];

           for(const key in resp.data){
               fetchedAccounts.push({
                   id:key,
                   ...resp.data[key]
               })
           }
           console.log(fetchedAccounts);
           this.setState({
               accounts:fetchedAccounts
           })
           
        }).catch((err)=>{
            console.log(err)
        })
    }
    handleDelete=(account)=>{
        axios.delete(`https://std-mern-app-default-rtdb.firebaseio.com/accounts/${account.id}.json`).then((resp)=>{
            console.log("deleted");
           const updatedAccounts= this.state.accounts.filter((acc)=>{
                return acc.id===account.id ? null:acc
            })
            this.setState({
                accounts:updatedAccounts
            })
            
        }).catch((err)=>{
            console.log(err);
            
        })
    };
    handleClose=()=>{
        this.setState({
            show:false
        })
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
updateRecord=(acc)=>{
    const {user,email,pwd,phn,role,id}=acc;
    this.setState({
        show:true,
        user:user,
        email:email,
        pwd:pwd,
        phn:phn,
        role:role,
        id:id
    })
}

updateAccount=()=>{
    const url=`https://std-mern-app-default-rtdb.firebaseio.com/accounts/${this.state.id}.json`
    const {user,email,pwd,phn,role}=this.state
    const account={
        user,
        email,
        pwd,
        phn,
        role
    };
    axios.put(url,account).then((resp)=>{
        console.log(resp.status);

       const updated = this.state.accounts.map((acc)=>{
            return acc.id!==this.state.id ? acc:account
        })

        this.setState({
        accounts:updated,
         show:false,
        user:"",
        email:"",
        pwd:"",
        phn:"",
        role:"",
        id:"",
        })
    }).catch((err)=>{
        console.log(err);
        
    })
}
    render() {
        return (
            <div>
                <h1>account</h1>

                <table className="table table-dark">
  <thead>
    <tr>
      <th scope="col">SI.No</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone Number</th>
      <th scope="col">Designation</th>
      <th scope="col"></th>
      <th scope="col"></th>
     
    
    </tr>
  </thead>
  <tbody>
   {
       this.state.accounts.map((data,index)=>{
           return(
                <tr>
                    <td>{index+1}</td>
                    <td>{data.user}</td>
                    <td>{data.email}</td>
                    <td>{data.phn}</td>
                    <td>{data.role}</td>
                    <Button className="btn-danger" onClick={()=>{
                        this.handleDelete(data)
                    }}>Delete</Button>
                    <Button className="btn-info" onClick={()=>{
                        this.updateRecord(data)
                    }}>Update</Button>
                </tr>
           )
       })
   }
  </tbody>
</table>

<Modal
    show={this.state.show}
    animation={false}
    onHide={this.handleClose}
>
  <Modal.Header>
    <Modal.Title>Update Record</Modal.Title>
  </Modal.Header>

  <Modal.Body>
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
  
  
</form>
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={this.handleClose}>Close</Button>
    <Button variant="primary" onClick={this.updateAccount}>Save changes</Button>
  </Modal.Footer>
</Modal>
            </div>
        )
    }
}
