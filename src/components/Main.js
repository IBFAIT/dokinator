// Styles
require('normalize.css/normalize.css');

import React  from 'react';
import Scroll from 'smoothscroll';
import _      from 'lodash';

// JSON data beeing imported
import Defaults     from './defaults.json';
import Conversation from './conversation.json';

// Components
import BotPart        from './BotPart.js';
import PastPart       from './PastPart.js';
import UserAnswerPart from './UserAnswerPart.js';


// generic Styles
import genStyl from '../styles/genStyl.js';
// Component Styles
const Style = {
  main: {
    ...{
      flex: '1 0 0',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'stretch',
      maxWidth: '100%'
    },
    ...genStyl.columnFlex
  },
  botAndPast: {
    paddingBottom: '0.5rem',
    width: '100%',
    maxWidth: '100%'
  },
  conversationPart: {
    ...genStyl.columnFlex,
    ...{
      textAlign: 'center',
      width: '100%',
      maxWidth: '100%'
    }
  }
}


class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      path: 'init',
      templateVars: {
        name:   null,
        email:  null,
        fieber: null,
        persons: Defaults.persons
      }
    };
    this.conversationLog = [];
    this.Conversation    = Conversation;

    // bind this to Callbacks
    this.updatePathState       = this.updatePathState.bind(this);
    this.handleInputfieldEnter = this.handleInputfieldEnter.bind(this);
    this.handleForwardTimeout  = this.handleForwardTimeout.bind(this);
    this.handleRandomBubble    = this.handleRandomBubble.bind(this);
  }

  componentDidUpdate() {
    const answerBottom = document.getElementsByClassName('conversation-part')[0].lastChild;
    Scroll(answerBottom);
  }

  handleForwardTimeout({index, time = 2000}) {
    // create propper path info for the log
    const params = {index, path: this.Conversation[this.state.path].user.answers[0].path};
    this.forwardTimeoutId = setTimeout(() => {
      this.updatePathState(null, params)
    }, time, this, params);
  }

  /**
   * Callbacks for Client Bubbles
   */
  updatePathState(evt, {path, index = null}) {
    // put the paths actual state to the log
    const entry = {
      stateAtPos: JSON.stringify(this.state),
      index
    };
    this.conversationLog.push(entry);
    // trigger next path
    this.setState({path: path});
  }

  handleInputfieldEnter({evt, path, index, changeVal}) {
    /* ToDo: chrome complains about this enter detection beeing deprecated */
    if(evt.key === 'Enter') {
      // make the staBotPartte change dynamicly
      let templateVars = {
        name:   this.state.templateVars.name,
        email:  this.state.templateVars.email,
        fieber: this.state.templateVars.fieber,
        persons: Defaults.persons
      };
      templateVars[changeVal] = evt.target.value;
      this.conversationLog.push({
        stateAtPos: JSON.stringify({path: this.state.path, templateVars: this.state.templateVars, usersInput:  evt.target.value}),
        index
      });
      this.setState({path, templateVars});
    }
  }

  handleRandomBubble(bubbleText, bubbleIndex) {
    // Replace multiple options with random choice in this.Conversation
    this.Conversation[this.state.path].bot.texts[bubbleIndex] = _.sample(bubbleText);
    return this.Conversation[this.state.path].bot.texts[bubbleIndex];
  }

  render() {
    const {path, templateVars} = this.state;
    const {bot, user} = this.Conversation[path];
    return (
      <div
        className="Main"
        style={Style.main}
      >
        <div
          className="bot-and-past"
          style={Style.botAndPast}
        >
          {this.conversationLog.map((conversationStep, stepIndex) => (
            <PastPart
              key={stepIndex}
              stepIndex={stepIndex}
              step={conversationStep}
              conversation={this.Conversation}
            />
          ))}
          <div  className="bot-speaking">
            <BotPart
              bot={bot}
              templateVars={templateVars}
              handleRandomBubble={this.handleRandomBubble}
            />
          </div>
        </div>
        <div
          className="conversation-part"
          style={Style.conversationPart}
        >
          <UserAnswerPart
            answers={user.answers}
            callbacks={{
              updatePathState:       this.updatePathState,
              handleForwardTimeout:  this.handleForwardTimeout,
              handleInputfieldEnter: this.handleInputfieldEnter
            }}
          />
        </div>
      </div>
    );
  }
}

export default Main;
