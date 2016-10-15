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
import BotPartPastComponent      from './BotPartComponent.js';
import ClientAnswerComponent     from './ClientAnswerComponent.js';
import ClientButtonPastComponent from './ClientButtonPastComponent.js';
import ClientInputPastComponent  from './ClientInputPastComponent.js';

class Main extends React.Component {

  constructor() {
    super();
    this.state = {
      path: 'init',
      templateVars: {
        name:   null,
        email:  null,
        fieber: null
      }
    };
    this.conversationLog = [];
    this.Conversation    = Conversation;

    // bind this to Callbacks
    this.updatePathState = this.updatePathState.bind(this);
    this.handleInputfieldEnter = this.handleInputfieldEnter.bind(this);
    this.handleForwardTimeout = this.handleForwardTimeout.bind(this);
  }


  componentDidUpdate() {
    // Handle smooth scrolling to the bottom
    const answerPart = ReactDOM.findDOMNode(this.refs.answerPart);
    Scroll(answerPart.lastChild);
  }

  handleForwardTimeout(answerIndex, time = 2000) {
    // create propper path info for the log
    const params = {answerIndex, path: this.Conversation[this.state.path].user.answers[0].path};
    this.forwardTimeoutId = setTimeout(() => {
      this.updatePathState(null, params)
    }, time, this, params);
  }

  /**
   * Callbacks for Client Bubbles
   */
  updatePathState(evt, {path, answerIndex = null}) {
    // put the paths actual state to the log
    this.conversationLog.push({
      stateAtPos: JSON.stringify(this.state),
      answerIndex
    });
    // trigger next path
    this.setState({path: path});
  }

  handleInputfieldEnter(evt, path, answerIndex, changeVal) {
    /* ToDo: chrome complains about this enter detection beeing deprecated */
    if(evt.key === 'Enter') {
      this.conversationLog.push({
        stateAtPos: JSON.stringify(this.state),
        answerIndex
      });
      // make the state change dynamicly
      let templateVars = {
        name:   this.state.templateVars.name,
        email:  this.state.templateVars.email,
        fieber: this.state.templateVars.fieber
      };
      templateVars[changeVal] = evt.target.value;
      this.setState({path, templateVars});
    }
  }

  render() {
    return (
      <div className="index">
        <div className="conversation-bubbles">
          { this.renderPastPart(this.conversationLog) }
          <span  ref="activePart">
            { this.renderBotPart(Conversation[this.state.path].bots) }
          </span>
        </div>
        <div className="conversation-part" ref="answerPart">
          <ClientAnswerComponent {...{
            answers:               Conversation[this.state.path].user.answers,
            updatePathState:       this.updatePathState,
            handleForwardTimeout:  this.handleForwardTimeout,
            handleInputfieldEnter: this.handleInputfieldEnter
          }} />
        </div>
      </div>
    );
  }


  /**
   * Bot Bubble render
   */
  renderBotPart(bots) {
    // map bots - > there can be more than one bot part.
    return bots.map(({id, texts}, key) => {

      /* Handle random bot text */
      texts = texts.map((text, textKey) => {
        if(!Array.isArray(text)) { // if it isn't an array there is only one option
          return text;
        } else {  // arrays contain different options for randomness
          // overwrite the Conversation thing with the actual so that
          // the log will render the random choice displaying the past
          this.Conversation[this.state.path].bots[key].texts[textKey] = text[Math.floor(Math.random()*text.length)];
          return this.Conversation[this.state.path].bots[key].texts[textKey];
        }
      });
      /* END Handle random bot text */

      return (
        <BotPartComponent {...{
          texts,
          key:          this.state.path, // because path has to be unique, use path
          index:        key,
          className:    'botbubble-component',
          botIdentity:  Defaults.botIdentitys[id],
          templateVars: this.state.templateVars
        }} />
      );
    });
  }

  /**
   * The past Conversation is beeing rendered with the this.conversationLog property
   */
  renderPastPart(conversation) {
    return conversation.map((step, key) => {
      let stateAtPos = JSON.parse(step.stateAtPos); // get the striggified state from the past
      return (
        <div className="conversation-part-past" {...{key}} >
          { this.renderBotPartsPast({
            key: stateAtPos.path, // because path has to be unique, use path
            path:         stateAtPos.path,
            bubbles:      Conversation[stateAtPos.path].bots,
            templateVars: stateAtPos.templateVars
          }) }
          <div className="user-answers-past" {...{key}} >
            { this.renderClientPastBubble(
              {
                stateAtPos,
                answer:      this.Conversation[stateAtPos.path].user.answers[step.answerIndex],
                answerIndex: step.answerIndex
              },
              key)
            }
          </div>
        </div>
      );
    });
  }

  renderBotPartsPast({bubbles, path, templateVars}) {
    return bubbles.map(({id, texts}, key) => {
      return (
        <BotPartPastComponent {...{
          texts,
          templateVars,
          key:         path,
          index:       key,
          className:   'botbubblepast-component',
          botIdentity: Defaults.botIdentitys[id]
        }}
        />
      );
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
        return <div {...{key}}></div>;
      default:
        return <div {...{key}}></div>;
    }
  }
}

export default Main;
