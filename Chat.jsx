import Radium, {Style} from 'radium';
import React from 'react';

class Chat extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            message: ''
          , comments: []
        };

        this.changeMessage = this.changeMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.socket = io.connect('http://localhost:8000');
    }

    componentDidMount() {
        var socket = this.socket;
        var that = this;
        socket.on('receive-comment', function(comment){
            console.log(comment);
            that.setState({comments: that.state.comments.concat([comment.comment.comment])})

        });

        socket.on('news', function(data) {
            console.log(data);
            socket.emit('my other event', {my: 'data'});
        });
    }

    changeMessage(e) {
        this.setState({message: e.currentTarget.value});
    }

    sendMessage() {
        this.socket.emit('send-comment', {comment: this.state.message});

    }

    render() {
        return (
            <div style={{
                    display: 'flex'
                  , flex: 1
                  , flexDirection: 'column'
                }}>
                    <div style={{bottom: 0, position: 'absolute', display: 'block', width: '100%'}}>
                    <div style={{marginLeft: '17%', fontSize: '1.6em', padding: 15}}>
                        {this.state.comments.map((comment, i)=>
                                <div key={i} style={{}}>{'>'}{comment}</div>
                            )}
                    </div>
                <div className='chat-bar' style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 20, background: '#7a8295'}}>
                    <input style={{height: 20, width: '50%', padding: 15, fontSize: 20}} onChange={this.changeMessage} type="text" value={this.state.message}/>
                    <button style={{width: '20%'}} onClick={this.sendMessage}>send!</button>
                </div>
                </div>
            </div>
        );
    }
}
// <Style
//     scopeSelector='.chat-bar'
//     rules={{
//         color: 'blue',
//         '> *': {
//             float: 'left'
//         }
//       }}
//     >
// </Style>
export default Chat;
