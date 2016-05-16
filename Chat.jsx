import Radium, {Style} from 'radium';
import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {addMessage, resetMessages} from './actions/chatActions';


class Chat extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            message: ''
        };

        this.changeMessage = this.changeMessage.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this._curRoom = 'global';
        this.socket = io.connect('http://localhost:8000');
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
        socket.on('receive-comment', function(comment){
            console.log(comment);
            that.props.onReceiveMessage(comment);
            // that.setState({comments: that.state.comments.concat([comment.comment])})

        });

        socket.on('news', function(data) {
            console.log(data);
            socket.emit('my other event', {my: 'data'});
        });
    }

    changeRoom(room){
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
        this.socket.emit('send-comment', {comment: this.state.message});
        this.setState({message: ''});
    }

    render() {
        debugger;
        return (
            <div style={{
                    display: 'flex'
                  , flex: 1
                  , flexDirection: 'column'
                }}>
                <div style={{background: '#ff3850', color: '#fff', padding: 20, zIndex: 2}}>
                    {this.props.curUser.name || <a style={{color: '#fff'}} href='http://localhost:8000/auth/facebook'>Facebook</a>}
                </div>
                <div style={{display: 'flex', justifyContent: 'center', background: '#ccc', padding: 15}}>{this._curRoom}</div>
                <div style={{display: 'flex', flexDirection: 'row', flex: 1, fontSize: this.props.dimensions.width <= 450 ? 25 : 18}}>
                    <div style={{display: 'flex', flexDirection: 'row', borderRight: `2px solid #ccc`, padding: 5}}>
                        <div>
                            <div style={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column', alignSelf: 'flex-start'}}>
                                <div style={{cursor: 'pointer'}} onClick={this.changeRoom.bind(this, 'roomOne')}>room one</div>
                                <div style={{cursor: 'pointer'}} onClick={this.changeRoom.bind(this, 'roomTwo')}>room two</div>
                                <div style={{cursor: 'pointer'}} onClick={this.changeRoom.bind(this, 'roomThree')}>room three</div>
                            </div>
                            <div style={{display: 'flex', marginTop: 5, flexDirection: 'column'}}>Active Rooms
                                {this.props.rooms.map((room, i)=>
                                    <div key={`room-${i}`}>{room}</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div style={{display:'flex', alignItems: 'flex-end', flex: 1, flexDirection: 'row', fontSize: '1.6em', padding: 15}}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            {this.props.comments.map((comment, i)=>
                                <div key={i} style={{}}>{comment.user.name}: {comment.comment}</div>
                            )}
                        </div>
                    </div>
                </div>
                    <div style={{display: 'block', width: '100%'}}>
                <div className='chat-bar' style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 20, background: '#7a8295'}}>
                    <input style={{height: 20, width: '50%', padding: 15, fontSize: 20}} onChange={this.changeMessage} onKeyPress={this.handleKeyPress} type="text" value={this.state.message}/>
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
        rooms: store.ChatReducer.rooms,
        comments: store.ChatReducer.chat
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onReceiveMessage: (message) => {
      dispatch(addMessage(message));
  }, onChangeRoom: () => {
      dispatch(resetMessages());
  }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Chat);
