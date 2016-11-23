'use strict';

import React from 'react';

// JSON data beeing imported
import Defaults from './defaults.json';

import BotPart from './BotPart.js';
import Bubble  from './Bubble.js';

// Templating Utility
import templateing from '../actions/templating.js';

const PastPart = ({step, stepIndex, conversation, userInputValues}) => {
  const {stepId, answerBtnNo, type} = step;
  const conversationStep = conversation[stepId];
  // Getting the text from the right source - desicion by type
  const userBubbleText = (type === 'input') ? userInputValues[step.inputProperty] : conversationStep.user.answers[answerBtnNo].text;

  return (
    <div key={'conv_'+stepIndex} style={style()}>
      <BotPart botIdentity={Defaults.botIdentitys[conversationStep.bot.name]} type="past">
        {conversation[stepId].bot.texts.map((botText, botBubbleIndex) => {
          return (
            <Bubble key={botBubbleIndex}>
              {templateing({template: botText, vars: {...userInputValues, ...Defaults.botIdentitys}})}
            </Bubble>
          );
        })}
      </BotPart>
      <Bubble key={'user_'+stepIndex} type={(type !== 'forward') ? 'past' : 'invisible'}>
        {userBubbleText}
      </Bubble>
    </div>
  );
}
PastPart.displayName = 'PastPart';

// Component styles
const style = () => ({
  display:'flex',
  flexDirection: 'column'
});

export default PastPart;
