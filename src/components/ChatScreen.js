import React, {Component} from 'react'
import Chatkit from '@pusher/chatkit-client'
import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'

class ChatScreen extends Component{
	
	constructor(props){
		super(props)
		this.state={
			currentUser: {},
			currentRoom: {},
			messages: []
		}
		this.sendMessage = this.sendMessage.bind(this)
	}

	sendMessage(text){
		this.state.currentUser.sendMessage({
			text, 
			roomId: this.state.currentRoom.id,
		})
	}

	componentDidMount(){
		const chatManager = new Chatkit.ChatManager({
			instanceLocator: 'v1:us1:afa1bb38-8eba-449e-adb8-4593d472ec9f',
			userId: this.props.currentUsername,
			tokenProvider: new Chatkit.TokenProvider({
				url: 'http://localhost:3001/authenticate',
			})
		})

		chatManager.connect().then(currentUser=>{
			this.setState({currentUser})
			return currentUser.subscribeToRoom({
				roomId: '19375919',
				messageList: 100,
				hooks: {
					onMessage: message => {
						this.setState({
							messages: [...this.state.messages, message],
						})
					},
				},
			})
		}).then(currentRoom=>{
				this.setState({currentRoom})
		}).catch(error=> console.error('error', error))
	}

	


	render(){
		const styles = { 
			container: {
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
			},
			chatContainer: {
				display: 'flex',
				flex: 1,
			},
			whosOnlineListContainer: {
				width: '300px',
				flex: 'none',
				padding : 20,
				backgroundColor: '#2c303b',
				color: 'white',
			},
			chatListContaine: {
				padding: 20,
				width: '85%',
				display: 'flex',
				flexDirection: 'column',
			}

		}

		return ( 
			<div style={styles.container}>
				<div style={styles.chatContainer}>
					
					<section style={styles.chatListContainer}>
						<MessageList
							messages = {this.state.messages}
							style={styles.chatlist}
						/>
						<SendMessageForm onSubmit={this.sendMessage} />
					</section>
				</div>
			</div>
		)
	}
}

export default ChatScreen