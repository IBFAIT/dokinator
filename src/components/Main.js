'use strict';

import React  from 'react';
import Scroll from 'smoothscroll';
import _      from 'lodash';

// JSON data with bot defaults etc
import Defaults     from './defaults.json';
import Conversation from './conversation.json';

// Components
import BotPart        from './BotPart.js';
import PastPart       from './PastPart.js';
import UserAnswerPart from './UserAnswerPart.js';

// include normalize.css
require('normalize.css/normalize.css');
// Component Styls
const columnFlex = {
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'stretch',
  flexBasis: 'auto'
}
const Styl = {
  main: {
    ...{
      flex: '1 0 0',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'stretch',
      maxWidth: '100%'
    },
    ...columnFlex
  },
  botAndPast: {
    paddingBottom: '0.5rem',
    width: '100%',
    maxWidth: '100%'
  },
  conversationPart: {
    ...columnFlex,
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
      stepId: 'init'
    };
    this.persons = Defaults.persons;
    this.pastLog = {
      userInputData: {},
      conversation: []
    }
    this.Conversation    = Conversation;

    // bind this to Callbacks
    this.updatestepIdState       = this.updatestepIdState.bind(this);
    this.handleInputfieldEnter = this.handleInputfieldEnter.bind(this);
    this.handleForwardTimeout  = this.handleForwardTimeout.bind(this);
    this.handleRandomBubble    = this.handleRandomBubble.bind(this);
  }

  componentDidUpdate() {
    const answerBottom = document.getElementById('scrollTarget').lastChild;
    Scroll(answerBottom);
  }

  handleForwardTimeout({index}) {
    const stepsAnswers = this.Conversation[this.state.stepId].user.answers;
    const time = (stepsAnswers.time) ? stepsAnswers.time : 2000;
    this.forwardTimeoutId = setTimeout(() => {
      this.updatestepIdState({answerIndex:index})
    }, time, this);
  }

  /**
   * Callbacks for Client Bubbles
   */
  updatestepIdState({answerIndex = 0}) {
    const {stepId} = this.state;
    const answer = this.Conversation[stepId].user.answers[answerIndex];
    // put the stepIds actual state to the log
    this.pastLog.conversation.push(Object.assign({}, { stepId, answerIndex, type:answer.type }));
    // trigger next stepId
    this.setState({stepId: this.Conversation[stepId].user.answers[answerIndex].stepId});
  }

  handleInputfieldEnter({evt}) {
    /* ToDo: chrome complains about this enter detection beeing deprecated */
    if(evt.key === 'Enter') {
      const {stepId} = this.state;
      const answer = this.Conversation[stepId].user.answers[0];
      this.pastLog.conversation.push(Object.assign({}, {
        stepId,
        answerIndex:null,
        type: answer.type,
        inputVal: evt.target.value,
        inputProperty: answer.inputProperty
      }));
      this.pastLog.userInputData[answer.inputProperty] = evt.target.value;
      this.setState({stepId: answer.stepId});
    }
  }

  handleRandomBubble(bubbleText, bubbleIndex) {
    this.Conversation[this.state.stepId].bot.texts[bubbleIndex] = _.sample(bubbleText);
    return this.Conversation[this.state.stepId].bot.texts[bubbleIndex];
  }

  render() {
    const {stepId} = this.state;
    const {bot, user} = this.Conversation[stepId];
    // Callbacks for UserAnswerPart
    const callbacks = {
      updatestepIdState:       this.updatestepIdState,
      handleForwardTimeout:  this.handleForwardTimeout,
      handleInputfieldEnter: this.handleInputfieldEnter
    };

    return (
      <div style={Styl.main}>
        <div style={Styl.botAndPast}>
          {this.pastLog.conversation.map((conversationStep, stepIndex) => (
            <PastPart key={stepIndex} stepIndex={stepIndex}
              step={conversationStep}
              conversation={this.Conversation}
              userInputData={this.pastLog.userInputData}
            />
          ))}
          <BotPart bot={bot}
            userInputData={this.pastLog.userInputData}
            handleRandomBubble={this.handleRandomBubble}
          />
        </div>
        <div style={Styl.conversationPart} id='scrollTarget'>
          <UserAnswerPart answers={user.answers} callbacks={callbacks} />
        </div>
      </div>
      );
    }
}

export default Main;
