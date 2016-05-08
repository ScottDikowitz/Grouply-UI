import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './Chat';

class MyComponent extends React.Component{
    constructor(props) {
        super(props);

    }
  render() {
    return(
        <div style={{
                display: 'flex'
              , flex: 1
              , alignItems: 'center'
              , fontFamily: 'Arel'
              , fontSize: 25
              , justifyContent: 'center'
            }}>
          <Chat/>
      </div>
    );
  }
}

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<MyComponent />, document.getElementById('main'));
});
