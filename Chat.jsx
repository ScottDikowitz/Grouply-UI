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
        this.socket = io.connect('http://localhost:3000');
    }

    componentDidMount() {
        var socket = this.socket;
        var that = this;
        socket.on('receive-comment', function(comment){
            that.setState({comments: that.state.comments.concat([comment.comment.comment])})

        });

        socket.on('news', function(data) {
            console.log(data);
            socket.emit('my other event', {my: 'data'});
        });


        // document.body.innerHTML += '<div id="body-div" style="width:100%;height:100%;background:#ccc;">content</div>';
        //
        // document.getElementById('send-socket').onclick = function(e){
        //     var comment = document.getElementById('comment').value;
        //     debugger;
        //     socket.emit('send-comment', {comment: comment});
        //     // socket.emit(comment);
        // };
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
                  , width: '50%'
                  , flexDirection: 'column'
                }}>
                <a href='/auth/facebook'>FACEBOOKS</a>
                <input onChange={this.changeMessage} type="text" value={this.state.message}/>
                <button style={{width: '50%'}} onClick={this.sendMessage}>send!</button>
                <div>
                    {this.state.comments.map((comment, i)=>
                            <div key={i} style={{}}>{comment}</div>
                        )}
                </div>
            </div>
        );
    }
}

export default Chat;
