require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDom from 'react-dom';

// JSON Data
import Data from './defaults.json';
import chatConv from './conversation.json';

// Components
import BotBubbleComponent from './BotBubbleComponent.js';
import BotBubblePastComponent from './BotBubblePastComponent.js';
import ClientButtonComponent from './ClientButtonComponent.js';
import ClientButtonPastComponent from './ClientButtonPastComponent.js';
import ClientInputComponent from './ClientInputComponent.js';
import ClientDisabledComponent from './ClientDisabledComponent.js';
import ClientInputPastComponent from './ClientInputPastComponent.js';

class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      path: 'init',
      name: null,
      email: null,
      fieber: null
    };
    this.data = Data;
    this.data.conversation = [];
  }
  render() {
    return (
      <div className="index">
        { this.renderConversation(this.data.conversation) }
        <div className="conversation-part">
          { this.renderBotBubbles(chatConv[this.state.path].bots) }
          <div className="user-answers" >
            { this.renderClientBubbles(chatConv[this.state.path].user.answers) }
          </div>
        </div>
      </div>
    );
  }
  renderConversation(conversation) {
    return conversation.map((step, key) => {

        let stateAtPos = JSON.parse(step.stateAtPos);
        let clientBubbleParams = {
          stateAtPos,
          answer: chatConv[stateAtPos.path].user.answers[step.answerIndex],
          answerIndex: step.answerIndex
        };
      return (
        <div className="conversation-part" key={key}>
          { this.renderBotPastBubbles(chatConv[stateAtPos.path].bots, key) }
          <div className="user-answers" >
            { this.renderClientPastBubble(clientBubbleParams, key) }
          </div>
        </div>
      );
    });
  }

  renderBotPastBubbles(bubbles) {
    return bubbles.map(({id, text}, key) => {
      return <BotBubblePastComponent key={key} text={text} bot={Data.botIdentitys[id]} />
    });
  }

  renderClientPastBubble({answer, answerIndex, stateAtPos}, key) {
    switch (answer.type) {
      case 'button':
        return <ClientButtonPastComponent key={key} text={answer.text} />;
      case 'input':
        return <ClientInputPastComponent key={key} valueContent={stateAtPos[answer.changeVal]}  />;
      default:
       return null;

    }
  }

  updatePathState(evt, {path, answerIndex = null}) {
    this.data.conversation.push({stateAtPos: JSON.stringify(this.state), answerIndex});
    this.setState({path: path});
  }

  handleNameInput(inputValue) {
    this.setState({name: inputValue.target.value});
  }

  handleEmailInput(inputValue) {
    this.setState({email: inputValue.target.value});
  }

  handleFieberInput(inputValue) {
    this.setState({fieber: inputValue.target.value});
  }

  getCallbackForChangeVal(changeVal) {
    switch (changeVal) {
      case 'name':
        return this.handleNameInput;
      case 'email':
        return this.handleEmailInput;
      case 'fieber':
        return this.handleFieberInput;
      default:
        return this.handleNameInput;
    }
  }
  handleEnter(enter, path, answerIndex) {
    if(enter.key === 'Enter') {
      this.updatePathState('', {path, answerIndex});
    }
  }

  renderClientBubbles(answers) {
    return answers.map((answer, key) => {
      switch (answer.type) {
        case 'button':
          return <ClientButtonComponent key={key} index={key} text={answer.text} path={answer.path} updatePathState={this.updatePathState.bind(this)}  />;
        case 'input':
          const callback = this.getCallbackForChangeVal(answer.changeVal);
          return (
            <ClientInputComponent key={key} index={key} placeholder={answer.placeholder} path={answer.path} changeVal={answer.changeVal} onChange={callback.bind(this)} handleEnter={this.handleEnter.bind(this)}
            />
          );
        case 'forward':
          setTimeout(()=>{this.setState({path:answer.path})}, 2500)
          break;
        case 'disabled':
          return <ClientDisabledComponent key={key} text={answer.text} />;
        default:
          return null;
      }
    });
  }

  componentDidUpdate() {
    ReactDom.findDOMNode(this).scrollIntoView();
  }

  renderBotBubbles(bots) {
    return bots.map(({id, text}, key) => {

      return (
        <BotBubbleComponent
          key={key}
          bot={Data.botIdentitys[id]}
          text={text}
          name={this.state.name}
          email={this.state.email}
          data={Data}
        />
      );
    });
  }

  RenderBubbleWithButton({path, text}) {
    return (
      <button onClick={() => this.setState({path})}>{text}</button>
    )
  }

}

AppComponent.defaultProps = {
};

export default AppComponent;
