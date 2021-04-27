import React from 'react';
import kuzzle from './services/kuzzle';
import './App.css';

class App extends React.Component() {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      message: '',
      messages: [],
      connected: false,
    }
  }

  connect = async () => {
    await kuzzle.connect();
    if (!await kuzzle.index.exists('chat')) {
      await kuzzle.index.create('chat');
      
    }
  }

}

export default App;
