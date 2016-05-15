import {Style} from 'radium';
import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './Chat';
import {fetchUsers} from './actions/apiActions';
import {Provider} from 'react-redux';
import store from './store';

class MyComponent extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        fetchUsers(this._changed);
    }

  render() {
    return(
        <div style={{
                display: 'flex',
                flex: 1,
                height:'100%'
            }}>
            <Style
                rules={{
                    'a, div': {
                        textDecoration: 'none',
                        padding: 0,
                        margin: 0,
                        fontSize: 'inherit',
                        fontFamily: 'inherit'
                    },
                    'body': {
                        margin: 0,
                        background: 'whitesmoke',
                        fontFamily: 'Arial'
                    }
                  }}
                >
            </Style>
          <Chat/>
      </div>
    );
  }
}

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Provider store={store}><MyComponent /></Provider>, document.getElementById('main'));
});
