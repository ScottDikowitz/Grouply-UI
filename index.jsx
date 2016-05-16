import {Style} from 'radium';
import React from 'react';
import Chat from './Chat';
import {setDimensions} from './actions/browserActions';
import {connect} from 'react-redux';
import {fetchUsers} from './actions/apiActions';


class Index extends React.Component{
    constructor(props) {
        super(props);

        this.setListeners = this.setListeners.bind(this);
    }

    componentWillMount() {
        this.props.setDimensions(
            { width: document.body.clientWidth,
              height: document.body.clientHeight
            }
        );
        this.setListeners();
    }

    componentDidMount() {
        fetchUsers(this._changed);
    }

    setListeners() {
        window.onresize = ()=> {
            this.props.setDimensions(
                { width: document.body.clientWidth,
                  height: document.body.clientHeight
                }
            );
        };
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
          <Chat dimensions={this.props.dimensions}/>
      </div>
    );
  }
}
function mapStateToProps(store) {
    debugger;
    return {
        dimensions: store.BrowserReducer.dimensions
    };
};

const mapDispatchToProps = (dispatch) => {
      return {
        setDimensions: (dimensions) => {
          dispatch(setDimensions(dimensions));
      }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Index);
