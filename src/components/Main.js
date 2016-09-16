// Styles
require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

// JSON data beeing imported
import Defaults from './defaults.json';
import Conversation from './conversation.json';

// Components
import BotBubbleComponent from './BotBubbleComponent.js';
import BotBubblePastComponent from './BotBubblePastComponent.js';
import ClientButtonComponent from './ClientButtonComponent.js';
import ClientButtonPastComponent from './ClientButtonPastComponent.js';
import ClientInputComponent from './ClientInputComponent.js';
import ClientDisabledComponent from './ClientDisabledComponent.js';
import ClientInputPastComponent from './ClientInputPastComponent.js';

/**
 * Main Stateful Componennt
 */
class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      // state holds the current path string
      path: 'init',
      // states that will hold user inputs
      name: null,
      email: null,
      fieber: null
    };
    this.data = Defaults;
    // This property will get the whole Conversation history appended
    this.data.conversation = [];
  }

  /**
   * Scrolling down to the bottom when new answer bubbles appear
   */
  componentDidUpdate() {
    window.scrollBy(0, document.getElementsByTagName('body')[0].scrollHeight);
  }

  render() {
    return (
      <div className="index">
        <div className="conversation-bubbles">
          { this.renderPastConversation(this.data.conversation) }
          { this.renderBotBubbles(Conversation[this.state.path].bots) }
        </div>
        <div className="conversation-part"  ref="activePart">
          <div className="user-answers" >
            { this.renderClientBubbles(Conversation[this.state.path].user.answers) }
          </div>
        </div>
      </div>
    );
  }

  /**
   * The past Conversation is beeing rendered with the this.data.conversation property
   */
  renderPastConversation(conversation) {
    return conversation.map((step, key) => {
        let stateAtPos = JSON.parse(step.stateAtPos);
        let clientBubbleParams = {
          stateAtPos,
          answer: Conversation[stateAtPos.path].user.answers[step.answerIndex],
          answerIndex: step.answerIndex
        };
      return (
        <div className="conversation-part-past" key={key}>
          { this.renderBotPastBubbles(Conversation[stateAtPos.path].bots, key) }
          <div className="user-answers-past" key={key} >
            { this.renderClientPastBubble(clientBubbleParams, key) }
          </div>
        </div>
      );
    });
  }

  renderBotPastBubbles(bubbles) {
    return bubbles.map(({id, text}, key) => {
      return <BotBubblePastComponent key={key} text={text} bot={Defaults.botIdentitys[id]} />
    });
  }

  renderClientPastBubble({answer, answerIndex, stateAtPos}, key) {
    let props = { key, name: this.state.name, avatar: Defaults.user.avatar };
    switch (answer.type) {
      case 'button':
        props.text = answer.text;
        return <ClientButtonPastComponent {...props} />;
      case 'input':
        props.valueContent = stateAtPos[answer.changeVal];
        return <ClientInputPastComponent {...props} />;
    }
  }

/**
 * CLIENT ANSWERS
 */

/**
 * Callbacks for Client Bubbles
 */

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

  handleEnter(enter, path, answerIndex) {
    if(enter.key === 'Enter') {
      this.updatePathState('', {path, answerIndex});
    }
  }

  // Uitility to get the right callback
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



  renderClientBubbles(answers) {
    return answers.map((answer, key) => {
      let props = {
        key,
        index: key // To be able to give key to the callback
      }
      switch (answer.type) {
        case 'button':
          props.text = answer.text;
          props.path = answer.path;
          props.updatePathState = this.updatePathState.bind(this);
          return <ClientButtonComponent {...props}  />;

        case 'input':
          const callback = this.getCallbackForChangeVal(answer.changeVal);
          props.path = answer.path;
          props.placeholder = answer.placeholder;
          props.changeVal = answer.changeVal;
          props.onChange = callback.bind(this);
          props.handleEnter = this.handleEnter.bind(this);
          return (
            <ClientInputComponent {...props} />
          );
        // Forwarder, that automaticly updates the state to the next path
        // on tymeout
        case 'forward':
          setTimeout(()=>{this.setState({path:answer.path})}, 2500)
          break;
        // the disabled button in context
        case 'disabled':
          props.text = answer.text;
          return <ClientDisabledComponent {...props} />;
      }
    });
  }

  renderBotBubbles(bots) {
    return bots.map(({id, text}, key) => {
      const props = {
        key,
        text,
        name: this.state.name,
        email: this.state.email,
        data: Defaults,
        bot: Defaults.botIdentitys[id]
      };
      return (
        <BotBubbleComponent {...props} />
      );
    });
  }
}

export default AppComponent;
