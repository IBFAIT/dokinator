'use strict';

import React  from 'react';
import Scroll from 'smoothscroll';

// JSON data with bot defaults etc
import Defaults     from './defaults.json';
import Conversation from './conversation.json';

// Components
import Bubble         from './Bubble.js';
import BotPart        from './BotPart.js';
import PastPart       from './PastPart.js';
import UserAnswerPart from './UserAnswerPart.js';

// include normalize.css
require('normalize.css/normalize.css');

class Main extends React.Component {
  constructor() {
    super();
    this.state  = {
      stepId: 'init',
      stepBotTexts: [Conversation['init'].bot.texts[0]],
      answer: false
    };
    this.persons      = Defaults.persons;
    this.pastLog      = { userTxtInput: {}, conversation: [] };
    this.Conversation = Conversation;
    this.nextStepCb = this.nextStepCb.bind(this);
    this.updateTmId = null;
  }

  componentDidMount() {
    this.addNextBotBubble();
  }

  componentDidUpdate() {
    this.addNextBotBubble();
    // ensure scrolling to the bottom on update
    const answerBottom = document.getElementById('scrollTarget').lastChild;
    if(answerBottom) {
      Scroll(answerBottom);
    } else {
      Scroll(document.getElementById('scrollTarget'));
    }
  }

  addNextBotBubble() {
    const {stepId, stepBotTexts, answer} = this.state;
    const {bot} = this.Conversation[stepId];
    if(stepBotTexts.length < bot.texts.length) {
      this.updateTmId = setTimeout(() => {this.delayedNextBotBubble({stepBotTexts, bot})}, 1500, this);
    } else if(!answer) {
      this.updateTmId = setTimeout(() => {this.delayedUserAnswers()}, 1500, this);
    }
  }
  delayedNextBotBubble({stepBotTexts, bot}) {
    this.setState({
      stepBotTexts: [...stepBotTexts, bot.texts[stepBotTexts.length]],
      answer: false
    })
  }
  delayedUserAnswers() {
    this.setState({
      answer: true
    });
  }

  nextStepCb({answerBtnNo, userTxtInput}) {
    answerBtnNo = (typeof answerBtnNo === 'undefined') ? 0 : answerBtnNo; // most likeley to be removed, just as a quick ensurance for it to be 0
    const {stepId} = this.state;
    const answer = this.Conversation[stepId].user.answers[answerBtnNo];
    const pastLogStep = {
      stepId, answerBtnNo, userTxtInput,
      type: answer.type, inputProperty: answer.inputProperty
    };
    if(pastLogStep.type === 'input') {
      this.pastLog.userTxtInput[answer.inputProperty] = userTxtInput;
    }
    this.pastLog.conversation.push(Object.assign({}, pastLogStep));
    clearTimeout(this.updateTmId);
    this.setState({
      stepId: answer.stepId,
      stepBotTexts: [this.Conversation[answer.stepId].bot.texts[0]],
      answer: false
    });
  }

  render() {
    const {stepId, stepBotTexts} = this.state;
    const {bot, user} = this.Conversation[stepId];
    const varData = {...this.pastLog.userTxtInput, ...Defaults}; // For the templates in bot texts

    return (
      <div style={style()}>
        <div style={style('botAndPast')}>
          {this.pastLog.conversation.map(
            (conversationStep, stepIndex) => (
              <PastPart
                key={stepIndex} stepIndex={stepIndex} step={conversationStep}
                conversation={this.Conversation}
                userTxtInput={this.pastLog.userTxtInput}/>)
            )}
          <BotPart bot={bot}>
            { stepBotTexts.map( (botText, botBubbleIndex) => (
                <Bubble key={botBubbleIndex}>{eval('`' + botText + '`')}</Bubble>
              )) }
          </BotPart>
        </div>
        <div style={style('conversationPart')} id='scrollTarget'>
          {(this.state.answer===true)?<UserAnswerPart answers={user.answers} nextStepCb={this.nextStepCb}/>:null}
        </div>
      </div>
    );
    }
}

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

export default Main;
