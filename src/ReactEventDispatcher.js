import React from 'react';
import ReactEventDispatcherContext from './ReactEventDispatcherContext';

class ReactEventDispatcher extends React.Component {
  eventListeners = {};

  notify = (event, params, {multiple} = {}) => {
    let listeners = this.eventListeners[event];
    let resp;
    if (listeners) {
      if (listeners.length > 1 && multiple === undefined) {
        multiple = true;
      }
      listeners.forEach(listener => {
        let result = listener(params);
        if (multiple) {
          resp = resp || [];
          resp.push(result);
        } else {
          resp = result;
        }
      });
    }
    return resp;
  };

  listen = (event, callback) => {
    this.eventListeners[event] = this.eventListeners[event] || [];
    this.eventListeners[event].push(callback);
  };

  unlisten = (event, callback) => {
    let listeners = this.eventListeners[event];
    if (listeners && listeners.length) {
      let index = listeners.indexOf(callback);
      if (index >= 0) {
        listeners.splice(index, 1);
      }
    }
  };

  reactEventDispatcher = {
    notify: this.notify,
    listen: this.listen,
    unlisten: this.unlisten,
  };
  render() {
    return (
      <ReactEventDispatcherContext.Provider value={this.reactEventDispatcher}>
        {this.props.children}
      </ReactEventDispatcherContext.Provider>
    );
  }
}

export default ReactEventDispatcher;
