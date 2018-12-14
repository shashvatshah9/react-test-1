import React, { Component } from 'react'
import UsernameForm from './components/UsernameForm'
import ChatScreen from './components/ChatScreen'

class App extends Component {
  
  constructor(){
  	super()
  	this.state={
  		currentUsername: '',
  		currentScreen: 'ChatScreen'
  	}
  	this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this)
  }

  onUsernameSubmitted(username){
  	fetch('http://localhost:3001/users', {
  		method: 'POST',
  		headers: {
  			'Content-Type': 'application/json',
  		},
  		body: JSON.stringify({username}),
  	})
  	.then(response=>{
      console.log('username submits')
        
  		this.setState({
        currentUsername: username,
  			currentScreen: 'ChatScreen'
  		})
  	})
  	.catch(error=>console.error('error', error))
  }

  render() {
  	if(this.state.currentScreen === 'ChatScreen'){
      return <ChatScreen currentUsername = {this.state.currentUsername} />
    }
    if(this.state.currentScreen === 'WhatIsYourUsernameScreen'){
  		return <UsernameForm onSubmit={this.onUsernameSubmitted} />
  	}
  	
  }

}

export default App
