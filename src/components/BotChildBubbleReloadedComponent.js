'use strict';

import React from 'react';
import ReactDOM from 'react-dom';


require('styles/animations.scss');

class BotChildBubbleReloadedComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.wordsAppear();
  }

  componentDidUpdate() {
    ReactDOM.findDOMNode(this.refs.bubble).style.dislplay = 'none';
    this.wordsAppear();
  }

  wordsAppear() {
    const ilb = 'inline-block';
    const words = ReactDOM.findDOMNode(this.refs.textContainer).childNodes;
    const bubble = ReactDOM.findDOMNode(this.refs.bubble);
    let delay = new Promise((resolve)=>{setTimeout(resolve, this.props.wait)});
    delay.then(()=>{
      bubble.style.display = ilb;
      bubble.firstChild.display = ilb;
      let countUp = 0;
      Object.keys(words).map((key)=> {
        words[key].style.opacity = 0;
        words[key].classList.add('raiseWord');
        words[key].style.animationDelay = countUp + 'ms';
        countUp += words[key].textContent.length * 100;
        words[key].style.display = ilb;
        words[key].style.width = 0;
        words[key].addEventListener('animationstart', (evt) => {
          evt.target.style.width = 'initial';
        }, false);
        words[key].addEventListener('animationend', (evt) => {
          evt.target.classList.remove('raiseWord');
          evt.target.style.opacity = 1;
          evt.target.style.display = ilb;
        }, false);
      });
    })
  }

  renderWords(textChunks) {
    return textChunks.map((word, key) => {
      return <span key={key} style={{display: 'none', marginRight: '5px'}}>
        {word}
      </span>
    });
  }

  render() {
    const {name, email, fieber} = this.props;
    return (
      <div className="botsinglebubble-component" ref="bubble" style={{display: 'none'}}>
        <div className="text" ref="textContainer" >
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
