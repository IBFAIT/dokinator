'use strict';

import React    from 'react';
import ReactDOM from 'react-dom';
import Scroll   from 'smoothscroll';

require('styles/animations.scss');

class BotBubbleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.elms = {};
  }

  shouldComponentUpdate() {
    this.cleanup();
    return true;
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
    this.elms.txtContainer.classList.add('noDimensions')
    this.elms.outer.classList.remove('initialDimensions');
    this.elms.outer.classList.add('noDimensions');
    this.elms.container.removeChild(this.elms.outer);
  }


  wordsAppear() {
    const {email, name, fieber, data} = this.props;
    let delay = new Promise((resolve) => {
      setTimeout(resolve, this.props.wait)
    });
    delay.then(() => {
      const ilb = 'inline-block';
      this.elms.container = (typeof this.elms.container == 'undefined')
                                ? ReactDOM.findDOMNode(this.refs.container)
                                : this.elms.container;

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
      this.elms.outer.style.display = ilb;
      this.elms.container.appendChild(this.elms.outer);
      this.elms.spans = [];
      let delaySum    = 0;
      this.props.textChunks.map((word, key) => {
        let span       = document.createElement('span');
        let wordsDelay = word.length * this.props.letterDelay;
        this.elms.outer.classList.remove('nope');
        span.textContent = eval('`'+word+'`');
        span.style.animationDelay = delaySum + wordsDelay - 200 + 'ms';
        span.style.animationDuration = '200ms';
        span.classList.add('notYetRaisedWord');
        span.classList.add('noDimensions');
        span.classList.add('raiseWord');
        this.elms.txtContainer.appendChild(span);

        // Animation Start Event
        span.addEventListener('animationstart', evt => {
          evt.target.classList.remove('notYetRaisedWord');
          evt.target.classList.remove('noDimensions');
        });

        // Animation End event
        span.addEventListener('animationend', evt => {
          evt.target.classList.remove('raiseWord');
          evt.target.classList.add('raisedWord');
          Scroll(evt.target);
        });
        this.elms.spans[key] = span;
        delaySum += wordsDelay; // Update Sum
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

BotBubbleComponent.displayName = 'BotBubbleComponent';

// Uncomment properties you need
// BotBubbleComponent.propTypes = {};
// BotBubbleComponent.defaultProps = {};

export default BotBubbleComponent;
