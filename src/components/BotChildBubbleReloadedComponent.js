'use strict';

import React    from 'react';
import ReactDOM from 'react-dom';
import Scroll   from 'smoothscroll';

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

  getDotsSvg() {
    this.elms.dots = ReactDOM.findDOMNode(this.refs.dots);
    this.elms.dots.remove();
  }

  wordsAppear() {
      this.getDotsSvg();
      const {email, name, fieber, data} = this.props;
      const delay = new Promise((resolve) => {
        setTimeout(resolve, this.props.wait)
      });
      delay.then(() => {
        const ilb = 'inline-block';
        this.elms.container = (typeof this.elms.container == 'undefined')
                                  ? ReactDOM.findDOMNode(this.refs.container)
                                  : this.elms.container;

        if(typeof this.elms.txtContainer == 'undefined') {
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
        this.elms.txtContainer.appendChild(this.elms.dots);
        this.elms.container.appendChild(this.elms.outer);

      });
  }

  dotsPulse() {
    let delaySum = 0, counter = 0;
    const dots   = [
      this.dots.getElementsByClassName('img_dot_0')[0],
      this.dots.getElementsByClassName('img_dot_1')[0],
      this.dots.getElementsByClassName('img_dot_2')[0]
    ];
    this.props.textChunks.map((word, key) => {
      let wordsDelay = word.length * this.props.letterDelay;
      this.dots.style.animationDelay = delaySum + wordsDelay - 200 + 'ms';


      this.elms.dots.addEventListener('animationstart', evt => {
      });
      this.elms.dots.addEventListener('animationend', evt => {
      });
      delaySum += wordsDelay;
      counter = (counter < 3) ? counter+1 : 0;
    });
  }

  wordsAppearOld() {
    this.getDotsSvg();
    const {email, name, fieber, data} = this.props;
    const delay = new Promise((resolve) => {
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
      <div className="componentContainer" ref="container">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" ref="dots"  className="svg_dots" viewBox="0 0 744 1052">
          <defs>
            <filter
              height="1.299475"
              y="-0.1497375"
              width="1.2818588"
              x="-0.14092941"
              id="filter4502"
              style={{colorInterpolationFilters: 'sRGB'}}
            >
              <feGaussianBlur
                id="feGaussianBlur4504"
                stdDeviation="2.495625" />
            </filter>
          </defs>
          <g>
            <ellipse
              ry="20"
              rx="21.25"
              cy="556.32654"
              cx="238.19643"
              className="img_dot img_dot_0"
            />
            <ellipse
              ry="20"
              rx="21.25"
              cy="556.32654"
              cx="302.8125"
              className="img_dot img_dot_1"
            />
            <ellipse
              ry="20"
              rx="21.25"
              cy="556.32654"
              cx="367.42856"
              className="img_dot img_dot_2"
            />
          </g>
        </svg>

      </div>
    );
  }
}

BotChildBubbleReloadedComponent.displayName = 'BotChildBubbleReloadedComponent';

// Uncomment properties you need
// BotChildBubbleReloadedComponent.propTypes = {};
// BotChildBubbleReloadedComponent.defaultProps = {};

export default BotChildBubbleReloadedComponent;
