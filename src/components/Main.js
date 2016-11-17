'use strict';
import React  from 'react';
import Scroll from 'smoothscroll';
// include normalize.css
require('normalize.css/normalize.css');
require('../styles/main.scss');
// JSON data with bot defaults etc
import Defaults     from './defaults.json';
import Conversation from './conversation.json';

// Components
import Bubble         from './Bubble.js';
import BotPart        from './BotPart.js';
import PastPart       from './PastPart.js';
import UserAnswerPart from './UserAnswerPart.js';

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
    this.timedNextBotBubble();
  }

  componentDidUpdate() {
    this.timedNextBotBubble();
    // ensure scrolling to the bottom on update
    const answerBottom = document.getElementById('scrollTarget').lastChild;
    if(answerBottom) {
      Scroll(answerBottom);
    } else {
      Scroll(document.getElementById('scrollTarget'));
    }
  }

  timedNextBotBubble() {
    const {stepId, stepBotTexts, answer} = this.state;
    const {bot} = this.Conversation[stepId];
    if(stepBotTexts.length < bot.texts.length) {
      this.updateTmId = setTimeout(() => {this.showNextBotBubble({stepBotTexts, bot})}, 1500, this);
    } else if(!answer) {
      this.updateTmId = setTimeout(() => {this.showUserAnswerBtn()}, 1500, this);
    }
  }
  showNextBotBubble({stepBotTexts, bot}) {
    this.setState({
      stepBotTexts: [...stepBotTexts, bot.texts[stepBotTexts.length]],
      answer: false
    })
  }
  showUserAnswerBtn() {
    this.setState({answer: true});
  }

  nextStepCb({answerBtnNo, userTxtInput}) {
    answerBtnNo = (typeof answerBtnNo === 'undefined') ? 0 : answerBtnNo; // most likeley to be removed, just as a quick ensurance for it to be 0
    const {stepId} = this.state;
    const answer = this.Conversation[stepId].user.answers[answerBtnNo];
    // setup history step Object
    const pastLogStep = { stepId, answerBtnNo, userTxtInput,
      type: answer.type, inputProperty: answer.inputProperty };
    if(pastLogStep.type === 'input') { // on user Input set property, like name for ex.
      this.pastLog.userTxtInput[answer.inputProperty] = userTxtInput;
    }
    // Push the step Opbj to the log array with cloning to prevent references
    this.pastLog.conversation.push(Object.assign({}, pastLogStep));
    this.setState({
      stepId: answer.stepId, answer: false,
      stepBotTexts: [this.Conversation[answer.stepId].bot.texts[0]]
    });
  }

  render() {
    const {stepId, stepBotTexts, answer} = this.state;
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
          <BotPart botIdentity={Defaults.botIdentitys[bot.name]} type="speaking">
            { stepBotTexts.map( (botText, bubbleIndex) => (
                <Bubble
                  key={bubbleIndex}
                  type={(bubbleIndex === stepBotTexts.length-1) ? 'speaking': 'default'}
                  answerPresent={answer}>
                  {eval('`' + botText + '`')}
                </Bubble>
              )) }
          </BotPart>
        </div>
        <div style={style('conversationPart')} id='scrollTarget'>
          {(answer===true)?<UserAnswerPart answers={user.answers} nextStepCb={this.nextStepCb} />:null}
        </div>
      </div>
    );
  }
}

// Component styles
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
  }
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
export default Main;
