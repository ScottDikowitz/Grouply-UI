import {Style} from 'radium';
import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './Chat';
import {fetchUsers} from './actions/apiActions';

class MyComponent extends React.Component{
    constructor(props) {
        super(props);

        this._changed = this._changed.bind(this);
        this.state = {
            currentUser: ''
        };
    }

    componentDidMount() {
        fetchUsers(this._changed);
    }

    _changed(currentUser){
        this.setState({currentUser: currentUser.name});
    }

  render() {
    return(
        <div style={{
            }}>
            <Style
                rules={{
                    'a, div': {
                        textDecoration: 'none',
                        padding: 0,
                        margin: 0,
                        fontSize: 'inherit'
                    },
                    'body': {
                        margin: 0,
                        background: 'transparent'
                    }
                  }}
                >
            </Style>
            <div style={{background: '#ff3850', color: '#fff', padding: 20}}>
                {this.state.currentUser || <a style={{color: '#fff'}} href='http://localhost:8000/auth/facebook'>Facebook</a>}
            </div>
          <Chat/>
      </div>
    );
  }
}

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<MyComponent />, document.getElementById('main'));
});
