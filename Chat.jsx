import Radium, {Style} from 'radium';
import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {receiveUsers} from './actions/userActions';
import {addMessage, addMessages, resetMessages, addPrivateMessages, receivePrivateChats} from './actions/chatActions';


class Chat extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            message: ''
        };

        this.changeMessage = this.changeMessage.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this._isPrivateChat = false;
        this._curRoom = 'global';
        this._canReceivePayload = true;
        this.socket = io.connect(process.env.API_SERVER);
        this.socket.on('connect', ()=> {
            this.socket.emit("subscribe", { room: this._curRoom });
        });
        this.socket.on("roomChanged", function(data) {
            console.log("roomChanged", data);
        });
    }

    componentDidMount() {
        var socket = this.socket;
        var that = this;
        socket.on('receive-comment', (comment)=>{
            console.log(comment);
            this.props.onReceiveMessage(comment);
            var scrollbox = this.refs.scrollbox;
            scrollbox.scrollTop = scrollbox.scrollHeight;

        });

        socket.on('receive-messages', (messages)=>{
            if (this._canReceivePayload){
                this.props.onReceiveMessages(messages);
                var scrollbox = this.refs.scrollbox;
                scrollbox.scrollTop = scrollbox.scrollHeight;
                this._canReceivePayload = false;
            }
        });

        socket.on('receive-chat-partners', (users)=>{
            debugger;
            this.props.onReceivePrivateChats(users);
        });

        socket.on('receive-users', (users)=>{
            this.props.onReceiveUsers(users);
        });

        socket.on('open-window', ({messages})=>{
            this.props.onChangeRoom();
            this.props.onReceivePrivateMessages(messages);
        });

        socket.on('whisper', function(data){
            alert(data.message);

        });
    }

    changeRoom(room){
        this._canReceivePayload = true;
        this._isPrivateChat = false;
        this.socket.emit('unsubscribe', {room: this._curRoom});
        this._curRoom = room;
        this.socket.emit('subscribe', { room: room });
        this.props.onChangeRoom();
    }

    changeMessage(e) {
        this.setState({message: e.currentTarget.value});
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
          this.sendMessage();
        }
    }

    sendMessage() {
        if (this._isPrivateChat){
            this.socket.emit('send-pvt-message', {message: this.state.message, targetedSocket: this._targetedUser.socket, userId: this._targetedUser.id});
            this.setState({message: ''});
        } else {
            this.socket.emit('send-comment', {comment: this.state.message});
            this.setState({message: ''});
        }
    }

    privateChat(socket, user){
        if (this.props.curUser.id === user.facebookId){
            return false;
        }

        if (this.props.curUser.id){
            this._isPrivateChat = true;
            this._curRoom = user.username;
            this._targetedUser = {socket: user.socket, id: user.facebookId};
            this._targetedSocket = user.socket;
            this._targetedFacebookId = user.facebookId;
            this.socket.emit('open-pvt-chat-window', {senderId: this.props.curUser.id, socket: user.socket || '', facebookId: user.facebookId});
        }
    }

    privateMsg(socket, user) {

        if (user.id === this.props.curUser.id){
            return;
        }

        if (this.props.curUser.id && user.loggedIn){
            this._isPrivateChat = true;
            this._curRoom = user.username;
            this._targetedUser = {socket: user.socket, id: user.id};
            this.socket.emit('open-pvt-chat', {senderId: this.props.curUser.id, socket: socket, id: user.id});
        } else {
            alert("Both users must be logged in to start a private chat.");
        }
    }

    render() {
        return (
            <div style={{
                    display: 'flex'
                  , flex: 1
                  , flexDirection: 'column'
                }}>
                <div style={{background: '#ff3850', color: '#fff', padding: 20, zIndex: 2}}>
                    {this.props.curUser.name || <a style={{color: '#fff'}} href={process.env.API_SERVER + '/auth/facebook'}>Facebook</a>}
                </div>
                <div style={{display: 'flex', justifyContent: 'center', background: '#ccc', padding: 15}}>{this._curRoom}</div>
                <div style={{display: 'flex', flexDirection: 'row', flex: 1, fontSize: this.props.dimensions.width <= 450 ? 14 : 14}}>
                    <div style={{display: 'flex', flexDirection: 'row', borderRight: `2px solid #ccc`, padding: 5}}>
                        <div>
                            <div style={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column', alignSelf: 'flex-start'}}>
                                <div style={{cursor: 'pointer'}} onClick={this.changeRoom.bind(this, 'global')}>global</div>
                                <div style={{cursor: 'pointer'}} onClick={this.changeRoom.bind(this, 'roomOne')}>room one</div>
                                <div style={{cursor: 'pointer'}} onClick={this.changeRoom.bind(this, 'roomTwo')}>room two</div>
                                <div style={{cursor: 'pointer'}} onClick={this.changeRoom.bind(this, 'roomThree')}>room three</div>
                            </div>
                            <div style={{display: 'flex', marginTop: 5, flexDirection: 'column'}}>Active Users
                                {this.props.users.map((user, i)=>
                                    <div onClick={this.privateMsg.bind(this, user.client, user)}
                                         style={{cursor:'pointer'}}
                                         key={`user-${i}`}>
                                         {user.username}</div>
                                )}
                            </div>
                            <div style={{display: 'flex', marginTop: 5, flexDirection: 'column'}}>Open Chats
                                {this.props.chats.map((user, i)=>
                                    <div onClick={this.privateChat.bind(this, user.client, user)}
                                         style={{cursor:'pointer'}}
                                         key={`user-${i}`}>
                                         {user.name}</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div ref='scrollbox' style={{display:'flex', alignItems: 'flex-start', flex: 1, flexDirection: 'column', fontSize: '1.6em', padding: 15, overflowY: 'scroll'}}>
                            {this.props.comments.map((comment, i)=>
                                <div key={`comment-${i}`} style={{}}>{comment.user.name}: {comment.comment}</div>
                            )}
                    </div>
                </div>
                    <div style={{display: 'block', width: '100%'}}>
                <div className='chat-bar' style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 20, background: '#7a8295'}}>
                    <input style={{height: 40, width: '50%', paddingLeft: 10, fontSize: 20}} onChange={this.changeMessage} onKeyPress={this.handleKeyPress} type="text" value={this.state.message}/>
                    <button style={{width: '20%'}} onClick={this.sendMessage}>send!</button>
                </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(store) {
    return {
        curUser: store.UserReducer.user,
        users: store.UserReducer.users,
        chats: store.UserReducer.chats,
        comments: store.ChatReducer.chat
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
        onReceiveMessage: (message) => {
          dispatch(addMessage(message));
      }, onReceiveMessages: (messages) => {
        dispatch(addMessages(messages));
      }, onReceivePrivateMessages: (messages) => {
        dispatch(addPrivateMessages(messages));
      }, onChangeRoom: () => {
          dispatch(resetMessages());
      }, onReceiveUsers: (users) => {
          dispatch(receiveUsers(users));
      }, onReceivePrivateChats: (users) => {
          dispatch(receivePrivateChats(users));
      }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Chat);
