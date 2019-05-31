import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../dataBase/Firebase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import EmiCalculator from '../dashBoard/calculator/EmiCalculator';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('boards');
    this.state = {
      title: '',
      description: '',
      author: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  changeValue = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, author } = this.state;

    this.ref.add({
      title,
      description,
      author
    }).then((docRef) => {
      this.setState({
        title: '',
        description: '',
        author: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { title, description, author } = this.state;
    return (
      <div className="container">
        <EmiCalculator/>
            <div>
            <TextField  required  id="name" label="Full Name"  className = "name"   margin="normal"  onChange={this.changeValue('name')} />
            </div>
            <div>
            <TextField  required  id="number" label="Mobile Number"  className = "number"   margin="normal"   type="number" onChange={this.changeValue('number')} />
            </div>
            <div>
            <TextField  required  id="amount" label="amount"  className = "amount"   margin="normal"  onChange={this.changeValue('amount')} />
            </div>
            <div>
            <TextField  required  id="interest" label="Rate of interest"  className = "interest"   margin="normal"  onChange={this.changeValue('interest')} />
            </div>
            <div> 
            <TextField  required  id="duration" label="Duration"  className = "time"   margin="normal"  onChange={this.changeValue('time')} />
            </div>
            <div>
              <Link to="/">
            <Button variant="contained" className="cancel-button-class">Cancel</Button>
            </Link>
            <Button variant="contained" color="primary" className="save-button-class"> Save </Button>
            </div>
            
      </div>
    );
  }
}

export default Create;
