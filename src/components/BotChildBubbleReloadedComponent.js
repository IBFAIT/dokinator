'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import PromiseTimeout from 'actions/PromiseTimeout.js';

require('styles/animations.scss');

class BotChildBubbleReloadedComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const words = ReactDOM.findDOMNode(this.refs.textContainer).childNodes;
    const bubble = ReactDOM.findDOMNode(this.refs.bubble);
    let delay = new Promise((resolve)=>{setTimeout(resolve, this.props.wait)});
    delay.then(()=>{
      bubble.style.display = 'inline-block';
      let countDown = this.props.textApppearTime;
      Object.keys(words).map((key)=> {
        console.log('key '+key);
      });
    })
  }
  typewrite(chunks, elm, n) {
    if(n < chunks.length) {
      elm.textContent = elm.textContent + ' ' + chunks[n];
    }
  }
  renderWords(textChunks) {
    return textChunks.map((word, key) => {
      return <span key={key} style={{display: 'none'}}>
        {word}
      </span>
    });
  }

  render() {
    const {name, email, fieber} = this.props;
    return (
      <div className="botsinglebubble-component" ref="bubble" style={{display: 'none'}}>
        <div className="text" ref="textContainer">
          { this.renderWords(this.props.textChunks) }
        </div>
      </div>
    );
  }
}

BotChildBubbleReloadedComponent.displayName = 'BotChildBubbleReloadedComponent';

// Uncomment properties you need
// BotChildBubbleReloadedComponent.propTypes = {};
// BotChildBubbleReloadedComponent.defaultProps = {};

export default BotChildBubbleReloadedComponent;
