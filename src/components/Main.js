// Styles
require('normalize.css/normalize.css');
require('styles/App.scss');

import React    from 'react';
import ReactDOM from 'react-dom';
import Scroll   from 'smoothscroll';

// JSON data beeing imported
import Defaults     from './defaults.json';
import Conversation from './conversation.json';

// Components
import BotPartComponent          from './BotPartComponent.js';
import BotPartPastComponent      from './BotPartPastComponent.js';
import ClientAnswerComponent     from './ClientAnswerComponent.js';
import ClientButtonPastComponent from './ClientButtonPastComponent.js';
import ClientInputPastComponent  from './ClientInputPastComponent.js';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      path:   'init',
      name:   null,
      email:  null,
      fieber: null
    };
    this.data                 = Defaults;
    this.data.conversationLog = [];
    this.Conversation         = Conversation;
    this.elms = {};
  }

  componentDidUpdate() {
    const answerPart = ReactDOM.findDOMNode(this.refs.answerPart);
    Scroll(answerPart.lastChild);
  }

  handleForwardTimeout(answerIndex) {
    const params = {answerIndex, path: this.Conversation[this.state.path].user.answers[0].path};
    this.forwardTimeoutId = setTimeout(() => {
      this.updatePathState(null, params)
    }, 2000, this, params);
  }

  /**
   * Callbacks for Client Bubbles
   */
  updatePathState(evt, {path, answerIndex = null}) {
    this.data.conversationLog.push({
      stateAtPos: JSON.stringify(this.state),
      answerIndex
    });
    this.setState({
      path: path
    });
  }

  handleInputfieldEnter(evt, path, answerIndex, changeVal) {
    if(evt.key === 'Enter') {
      this.data.conversationLog.push({
        stateAtPos: JSON.stringify(this.state),
        answerIndex
      });
      let state = {path};
      state[changeVal] = evt.target.value;
      this.setState(state);
    }
  }

  render() {
    return (
      <div className="index">
        <div className="conversation-bubbles">
          { this.renderPastPart(this.data.conversationLog) }
          <span  ref="activePart">
            { this.renderBotPart(Conversation[this.state.path].bots) }
          </span>
        </div>
        <div className="conversation-part" ref="answerPart">
          <ClientAnswerComponent {...{
            answers:               Conversation[this.state.path].user.answers,
            updatePathState:       this.updatePathState.bind(this),
            handleInputfieldEnter: this.handleInputfieldEnter.bind(this),
            handleForwardTimeout:  this.handleForwardTimeout.bind(this)
          }} />
        </div>
      </div>
    );
  }

  /**
   * Bot Bubble render
   */
  renderBotPart(bots) {
    return bots.map(({id, texts}, key) => {
      return (
        <BotPartComponent {...{
          texts,
          bots,
          key:   this.state.path,
          index: key,
          name:  this.state.name,
          email: this.state.email,
          data:  Defaults,
          bot:   Defaults.botIdentitys[id]
        }} />
      );
    });
  }

  /**
   * The past Conversation is beeing rendered with the this.data.conversationLog property
   */
  renderPastPart(conversation) {
    return conversation.map((step, key) => {
        let stateAtPos = JSON.parse(step.stateAtPos);
        let clientBubbleParams = {
          stateAtPos,
          answer:      Conversation[stateAtPos.path].user.answers[step.answerIndex],
          answerIndex: step.answerIndex
        };
      return (
        <div className="conversation-part-past" key={key}>
          { this.renderBotPartsPast(Conversation[stateAtPos.path].bots, key) }
          <div className="user-answers-past" key={key} >
            { this.renderClientPastBubble(clientBubbleParams, key) }
          </div>
        </div>
      );
    });
  }

  renderBotPartsPast(bubbles) {
    return bubbles.map(({id, texts}, key) => {
      let props = {
        key,
        texts,
        name:         this.state.name,
        email:        this.state.email,
        data:         Defaults,
        classNameing: 'botbubblepast-component',
        bot:          Defaults.botIdentitys[id]
      };
      return <BotPartPastComponent {...props} />
    });
  }

  renderClientPastBubble({answer, answerIndex, stateAtPos}, key) {
    const {text, changeVal, type} = answer;
    switch (type) {
      case 'button':
        return <ClientButtonPastComponent {...{
          key,
          text,
          name:   this.state.name,
          avatar: Defaults.user.avatar
        }} />;
      case 'input':
        return <ClientInputPastComponent {...{
          key,
          name:         this.state.name,
          avatar:       Defaults.user.avatar,
          valueContent: stateAtPos[changeVal]
        }} />;
      case 'forward':
        return <div></div>;
      default:
        return <div></div>;
    }
  }
}

export default Main;
