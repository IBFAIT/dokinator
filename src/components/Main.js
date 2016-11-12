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
const style = (part = null) => {
  switch (part) {
    case 'botAndPast':
      return {
        paddingBottom: '0.5rem',
        marginBottom: '4rem',
        width: '100%',
        maxWidth: '100%'
      }
    case 'conversationPart':
      return {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          textAlign: 'center',
          width: '100%',
          maxWidth: '100%'
      }
    default:
      return {
          flex: '1 0 0',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignContent: 'stretch',
          maxWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'stretch',
          flexBasis: 'auto'
      }
  }
}
const Styl = {
  main: {
      flex: '1 0 0',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'stretch',
      maxWidth: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignSelf: 'stretch',
      flexBasis: 'auto'
  },
  botAndPast: {
    paddingBottom: '0.5rem',
    marginBottom: '4rem',
    width: '100%',
    maxWidth: '100%'
  },
  conversationPart: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      textAlign: 'center',
      width: '100%',
      maxWidth: '100%'
  }
}

class Main extends React.Component {
  constructor() {
    super();
    this.state        = {stepId: 'init'};
    this.persons      = Defaults.persons;
    this.pastLog      = { userTxtInput: {}, conversation: [] };
    this.Conversation = Conversation;

    // bind this to Callbacks
    this.randomBotTextSample = this.randomBotTextSample.bind(this);
    this.nextStepCb = this.nextStepCb.bind(this);
  }

  componentDidUpdate() {
    const answerBottom = document.getElementById('scrollTarget').lastChild;
    Scroll(answerBottom);
  }


  nextStepCb({answerBtnNo, userTxtInput}) {
    answerBtnNo = (typeof answerBtnNo === 'undefined') ? 0 : answerBtnNo;
    const {stepId} = this.state;
    const answer = this.Conversation[stepId].user.answers[answerBtnNo];
    let pastLogStep = {
      stepId,
      type: answer.type,
      answerBtnNo,
      userTxtInput,
      inputProperty: answer.inputProperty
    };
    if(pastLogStep.type === 'input') {
      this.pastLog.userTxtInput[answer.inputProperty] = userTxtInput;
    }
    this.pastLog.conversation.push(Object.assign({}, pastLogStep));

    this.setState({stepId: answer.stepId});
  }

  randomBotTextSample(bubbleText, bubbleIndex) {
    this.Conversation[this.state.stepId].bot.texts[bubbleIndex] = _.sample(bubbleText);
    return this.Conversation[this.state.stepId].bot.texts[bubbleIndex];
  }

  render() {
    const {stepId} = this.state;
    const {bot, user} = this.Conversation[stepId];

    return (<div style={style()}>
        <div style={style('botAndPast')}>
          {this.pastLog.conversation.map(
            (conversationStep, stepIndex) => (
              <PastPart
                key={stepIndex} stepIndex={stepIndex} step={conversationStep}
                conversation={this.Conversation}
                userTxtInput={this.pastLog.userTxtInput}/>)
            )}
          <BotPart bot={bot}
            userTxtInput={this.pastLog.userTxtInput}
            randomBotTextSample={this.randomBotTextSample}/>
        </div>
        <div style={style('conversationPart')} id='scrollTarget'>
          <UserAnswerPart answers={user.answers} nextStepCb={this.nextStepCb}/>
        </div>
      </div>);
    }
}

export default Main;
