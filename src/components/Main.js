require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

// JSON Data
import Data from './defaults.json';
import chatConv from './conversation.json';

// Components
import BotBubbleComponent from './BotBubbleComponent.js';
import BotBubblePastComponent from './BotBubblePastComponent.js';
import ClientButtonComponent from './ClientButtonComponent.js';
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
    return conversation.map((step) => {

        let stateAtPos = JSON.parse(step.stateAtPos);
        console.log(step, chatConv[stateAtPos.path].user.answers[step.answerIndex], stateAtPos.path);
        let clientBubbleParams = {
          stateAtPos,
          answer: chatConv[stateAtPos.path].user.answers[step.answerIndex],
          answerIndex: step.answerIndex
        };
      return (
        <div className="conversation-part">
          { this.renderBotPastBubbles(chatConv[stateAtPos.path].bots) }
          <div className="user-answers" >
            { this.renderClientPastBubble(clientBubbleParams) }
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

  renderClientPastBubble({answer, answerIndex, stateAtPos}) {
    switch (answer.type) {
      case 'button':
        return <ClientButtonComponent key={null} index={null} text={answer.text} path={null} />;
      case 'input':
        return <ClientInputPastComponent key={null} valueContent={stateAtPos[answer.changeVal]}  />;
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
    let answersLength = answers.length;
    return answers.map((answer, key) => {
      let props = {
        key,
        index: key,
        text: answer.text,
        path: answer.path,
      }
      if(answersLength == key+1) {
        props.ref = "activeAnswerBubble"
      }
      switch (answer.type) {
        case 'button':
          props.updatePathState = this.updatePathState.bind(this);
          return <ClientButtonComponent {...props} />;
        case 'input':
          let callback = this.getCallbackForChangeVal(answer.changeVal);
          props.callback = callback.bind(this);
          props.placeholder = answer.placeholder;
          props.changeVal = answer.changeVal;
          props.handleEnter= this.handleEnter.bind(this);
          return (
            <ClientInputComponent {...props} }
            />
          );
        case 'forward':
          setTimeout(()=>{this.setState({path:answer.path})}, 2500)
          break;
        case 'disabled':
          return <ClientDisabledComponent {...props} />;
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
