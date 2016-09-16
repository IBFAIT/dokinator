require('normalize.css/normalize.css');
require('styles/App.scss');

import React                    from 'react';
import ReactDOM                 from 'react-dom';

// JSON Data
import Data from './defaults.json';
import chatConv from './conversation.json';

// Components
// import ConversationComponent from './ConversationComponent.js';

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
    this.data              = Data;
    this.data.conversation = [];
  }

  componentDidUpdate() {
    const itemComponent = this.refs.activePart;
    if (itemComponent) {
      const domNode = ReactDom.findDOMNode(itemComponent);
      domNode.scrollIntoView({behaviour:'smooth', block:'end'});
    }
  }

  render() {
    return (
      <div className="index">
        <div className="conversation-bubbles">
          { this.renderPastConversation(this.data.conversation) }


          { this.renderBotBubbles(chatConv[this.state.path].bots) }
        </div>
        <div className="conversation-part">
          <div className="user-answers" ref="activePart" >
            { this.renderClientBubbles(chatConv[this.state.path].user.answers) }
          </div>
        </div>
      </div>
    );
  }


  renderPastConversation(conversation) {
    return conversation.map((step, key) => {

        let stateAtPos = JSON.parse(step.stateAtPos);
        let clientBubbleParams = {
          stateAtPos,
          answer: chatConv[stateAtPos.path].user.answers[step.answerIndex],
          answerIndex: step.answerIndex
        };
      return (
        <div className="conversation-part-past" key={key}>
          { this.renderBotPastBubbles(chatConv[stateAtPos.path].bots, key) }
          <div className="user-answers-past" key={key} >
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
    let props = { key };
    switch (answer.type) {
      case 'button':
        props.text = answer.text;
        return <ClientButtonPastComponent {...props} />;
      case 'input':
        props.valueContent = stateAtPos[answer.changeVal];
        return <ClientInputPastComponent {...props} />;
      default:
       return null;

    }
  }

  updatePathState(evt, {path, answerIndex = null}) {
    this.data.conversation.push({
      stateAtPos: JSON.stringify(this.state),
      answerIndex
    });
    this.setState({
      path: path
    });
  }
  handleNameInput(inputValue) {
    this.setState({
      name: inputValue.target.value
    });
  }

  handleEmailInput(inputValue) {
    this.setState({
      email: inputValue.target.value
    });
  }

  handleFieberInput(inputValue) {
    this.setState({
      fieber: inputValue.target.value
    });
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
      let props = {
        key,
        index: key
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
        case 'forward':
          setTimeout(()=>{this.setState({path:answer.path})}, 2500)
          break;
        case 'disabled':
          props.text = answer.text;
          return <ClientDisabledComponent {...props} />;
        default:
          return null;
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
        data: Data,
        bot: Data.botIdentitys[id]
      };
      return (
        <BotBubbleComponent {...props} />
      );
    });
  }

}

AppComponent.defaultProps = {
};

export default AppComponent;
