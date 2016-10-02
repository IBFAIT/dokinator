'use strict';

import React from 'react';
import ReactDOM from 'react-dom';


require('styles/animations.scss');

class BotChildBubbleReloadedComponent extends React.Component {
  constructor(props) {
    super(props);
    this.elms = {};
  }

  shouldComponentUpdate() {
    this.cleanup();
    return true;
  }

  componentWillUpdate() {
    // this.cleanup();
  }

  componentDidMount() {
    this.wordsAppear();
  }

  componentDidUpdate() {
    this.wordsAppear();
  }

  cleanup() {
    this.elms.spans.map(span => {
      this.elms.txtContainer.removeChild(span);
    });
    this.elms.txtContainer.classList.remove('initialDimensions');
    this.elms.txtContainer.classList.add('noDimensions');
    // this.elms.outer.removeChild(this.elms.txtContainer);
    this.elms.outer.classList.remove('initialDimensions');
    this.elms.outer.classList.add('noDimensions');
    this.elms.container.removeChild(this.elms.outer);
  }


  wordsAppear() {
    // const words = ReactDOM.findDOMNode(this.refs.textContainer).childNodes;
    let delay = new Promise((resolve)=>{setTimeout(resolve, this.props.wait)});
    delay.then(()=>{

      const ilb = 'inline-block';

      this.elms.container = (typeof this.elms.container =='undefined') ? ReactDOM.findDOMNode(this.refs.container): this.elms.container;

      if(typeof this.elms.txtContainer =='undefined') {
        this.elms.txtContainer = document.createElement('div');
        this.elms.txtContainer.classList.add('text');
      } else {
        this.elms.txtContainer.classList.remove('noDimensions');
      }

      if(typeof this.elms.outer =='undefined') {
        this.elms.outer = document.createElement('div');
        this.elms.outer.classList.add('botsinglebubble-component');
        this.elms.outer.appendChild(this.elms.txtContainer);
      } else {

        this.elms.outer.classList.remove('noDimensions');
      }

      this.elms.outer.classList.add('nope');
      this.elms.outer.classList.add('initialDimensions');

      this.elms.txtContainer.classList.add('initialDimensions');

      // const txtContainer = ReactDOM.findDOMNode(this.refs.textContainer);
      // txtContainer.innerHTML = ''; // cleanup possible present elms
      // const bubble = ReactDOM.findDOMNode(this.refs.bubble);
      // this.elms.outer.style.animationDuration = '100ms';
      // this.elms.outer.style.animationDelay = '0ms';
      // this.elms.outer.classList.add('raiseWord');
      this.elms.outer.style.display = ilb;
      this.elms.container.appendChild(this.elms.outer);
      this.elms.spans = [];
      let delaySum = 0;
      this.props.textChunks.map((word, key) => {
        this.elms.outer.classList.remove('nope');
        let appearDuration = word.length * 100;
        this.elms.spans[key] = document.createElement('span');
        this.elms.spans[key].textContent = word;
        this.elms.spans[key].style.animationDelay = delaySum + 'ms';
        this.elms.spans[key].style.animationDuration = appearDuration + 'ms';
        this.elms.spans[key].classList.add('notYetRaisedWord');
        this.elms.spans[key].classList.add('noDimensions');
        this.elms.spans[key].classList.add('raiseWord');
        this.elms.txtContainer.appendChild(this.elms.spans[key]);
        this.elms.spans[key].addEventListener('animationstart', evt => {
          // this.elms.txtContainer.classList.add('initialDimensions');
          this.elms.spans[key].classList.remove('notYetRaisedWord');
          this.elms.spans[key].classList.remove('noDimensions');
        });
        this.elms.spans[key].addEventListener('animationend', evt => {
          // this.elms.spans[key].classList.remove('noDimensions');
          // this.elms.spans[key].classList.add('initialDimensions');
          evt.target.classList.remove('raiseWord');
          evt.target.classList.add('raisedWord');
        });
        delaySum += appearDuration;
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
      <div className='componentContainer' ref="container">
      </div>
    );
  }
}

BotChildBubbleReloadedComponent.displayName = 'BotChildBubbleReloadedComponent';

// Uncomment properties you need
// BotChildBubbleReloadedComponent.propTypes = {};
// BotChildBubbleReloadedComponent.defaultProps = {};

export default BotChildBubbleReloadedComponent;
