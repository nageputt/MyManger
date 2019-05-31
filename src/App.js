import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './component/toolbar/Header';
import firebase from './component/dataBase/Firebase';
import CardGrid from './component/dashBoard/CardGrid';
import withFirebaseAuth from 'react-with-firebase-auth';
import Searchbar from './component/dashBoard/Searchbar';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.ref = firebase.firestore().collection('boards');
    this.unsubscribe = null;
    this.state = {
      boards: []
    };
  }
  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const { title, description, author } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        author,
      });
    });
    this.setState({
      boards
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <div className="container">
        <div className="panel panel-default">
          <div className="search-bar">
            <Searchbar/>
          </div>
          <div className="card-grid">
          <CardGrid/>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
