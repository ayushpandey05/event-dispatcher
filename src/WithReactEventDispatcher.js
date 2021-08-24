import React from 'react';
import ReactEventDispatcherContext from "./ReactEventDispatcherContext"
export default Component => {
  class WithReactEventDispatcher extends React.Component {
    render() {
      return (
        <ReactEventDispatcherContext.Consumer>
          {value => {
            return <Component {...this.props} eventDispatcher={value} />;
          }}
        </ReactEventDispatcherContext.Consumer>
      );
    }
  }
  return WithReactEventDispatcher;
};
