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
        }
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
                display: 'flex'
              , flex: 1
              , flexDirection: 'column'
              , alignItems: 'center'
              , fontFamily: 'Arel'
              , fontSize: 25
              , justifyContent: 'center'
            }}>
            {this.state.currentUser}
          <Chat/>
      </div>
    );
  }
}

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<MyComponent />, document.getElementById('main'));
});
