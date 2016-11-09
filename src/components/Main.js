// Styles
require('normalize.css/normalize.css');
require('styles/Main.scss');

import React    from 'react';
import Scroll   from 'smoothscroll';

// JSON data beeing imported
import Defaults     from './defaults.json';
import Conversation from './conversation.json';

// Components
import BotPart          from './BotPart.js';
import PastPart         from './PastPart.js';
import UserAnswerPart     from './UserAnswerPart.js';

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
    this.updatePathState = this.updatePathState.bind(this);
    this.handleInputfieldEnter = this.handleInputfieldEnter.bind(this);
    this.handleForwardTimeout = this.handleForwardTimeout.bind(this);
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

  render() {
    const {botHere, path} = this.state;
    return (
      <div className="Main">
        <div className="bot-and-past">
          {this.conversationLog.map((step, stepIndex) => (
            <PastPart
              key={stepIndex}
              stepIndex={stepIndex}
              step={step}
              conversation={this.Conversation}
            />
          ))}
          <div  className="bot-speaking">
            { this.renderBotPart({bots: Conversation[path].bots}) }
          </div>
        </div>
        <div className="conversation-part">
          <UserAnswerPart
            answers={Conversation[path].user.answers}
            botHere={botHere}
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

  /**
   * Bot Bubble render
   */
  renderBotPart({bots}) {
    const {path} = this.state;
    // map bots - > there can be more than one bot part.
    return bots.map(({id, texts}, index) => {
      /* Handle random bot text */
      texts = texts.map((text, textKey) => {
        if(!Array.isArray(text)) { // if it isn't an array there is only one option
          return text;
        } else {  // arrays contain different options for randomness
          // overwrite the Conversation thing with the actual so that
          // the log will render the random choice displaying the past
          this.Conversation[path].bots[index].texts[textKey] = text[Math.floor(Math.random()*text.length)];
          // verwende leserliche tools, zum beispiel lodash _.sample(text)
          return this.Conversation[path].bots[index].texts[textKey];
        }
      });
      /* END Handle random bot text */

      return (
        <BotPart
          key={index}
          texts={texts}
          index={index}
          botIdentity={Defaults.botIdentitys[id]}
          templateVars={this.state.templateVars}
        />);
    });
  }
}

export default Main;
