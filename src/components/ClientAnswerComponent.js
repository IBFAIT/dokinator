'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

require('styles/animations.scss');

import ClientButtonComponent from './ClientButtonComponent.js';
import ClientInputComponent from './ClientInputComponent.js';
import ClientDisabledComponent from './ClientDisabledComponent.js';


class ClientAnswerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.els = {};
  }

  componentWillMount() {
  }
  componentDidMount() {
    this.hide();
    if(typeof this.els.comp == 'undefined') {
      this.els.comp = ReactDOM.findDOMNode(this.refs.comp);
    }
    this.props.giveNodes(this.els)
  }
  componentDidUpdate() {
    this.hide();
    if(typeof this.els.comp == 'undefined') {
      this.els.comp = ReactDOM.findDOMNode(this.refs.comp);
    }
    this.props.giveNodes(this.els)
  }
  shouldComponentUpdate() {
    this.hide();
    if(typeof this.els.comp == 'undefined') {
      this.els.comp = ReactDOM.findDOMNode(this.refs.comp);
    }
    this.props.giveNodes(this.els)
    return true;
  }


  componentWillUpdate() {
    this.hide();
    if(typeof this.els.comp == 'undefined') {
      this.els.comp = ReactDOM.findDOMNode(this.refs.comp);
    }
    this.props.giveNodes(this.els)
  }

  hide() {
    if(typeof this.els.comp == 'undefined') {
      this.els.comp = ReactDOM.findDOMNode(this.refs.comp);
    }
    this.els.comp.classList.add('nope');
    this.els.comp.classList.add('noDimensions');
  }

  render() {
    return (
      <div className="user-answers" ref="comp">
        { this.renderClientBubbles(this.props.answers) }
      </div>
    );
  }

  renderClientBubbles(answers) {
    return answers.map((answer, key) => {
      let props = {
        key,
        index: key,
        safeAppearWait: 3000
      }
      switch (answer.type) {
        // Button Component
        case 'button':
          props.text = answer.text;
          props.path = answer.path;
          props.updatePathState = this.props.updatePathState;
          return <ClientButtonComponent {...props}  />;
        // Input Component
        case 'input':
          props.path = answer.path;
          props.placeholder = answer.placeholder;
          props.changeVal = answer.changeVal;
          props.handleInputfieldEnter = this.props.handleInputfieldEnter;
          return (
            <ClientInputComponent {...props} />
          );
        case 'disabled':
          props.text = answer.text;
          return <ClientDisabledComponent {...props} />;
        default:
          return <div></div>;
      }
    });
  }

  handleForwardTimeout(params) {
    setTimeout(()=>{this.updatePathState(null, params)}, 1000 + params.botAnimationDone, this, params);
  }

  handleBotAnimFinished({botAnimationDone, answerIndex}) {
    let ansType = this.Conversation[this.state.path].user.answers[0].type;
    if(ansType == 'forward') {
      if(this.answerTmId !== null) {
        clearTimeout(this.answerTmId);
      }
      this.answerTmId = this.handleForwardTimeout({answerIndex, botAnimationDone, path: this.Conversation[this.state.path].user.answers[0].path})
    }
    this.botAnimationDone = botAnimationDone;
  }
}

ClientAnswerComponent.displayName = 'ClientAnswerComponent';

// Uncomment properties you need
// ClientAnswerComponent.propTypes = {};
// ClientAnswerComponent.defaultProps = {};

export default ClientAnswerComponent;
