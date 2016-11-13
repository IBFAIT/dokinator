'use strict';

import React from 'react';

// JSON data beeing imported
import Defaults from './defaults.json';

import BotPart          from './BotPart.js';
import Bubble from './Bubble.js';

const Styl = {
  display:'flex',
  flexDirection: 'column'
}

const PastPart = ({step, stepIndex, conversation, userTxtInput}) => {
  const {stepId, answerBtnNo, type} = step;

  // Getting the text from the right source - desicion by type
  let userBubbleTxt = '';
  switch (type) {
    case 'button':
      userBubbleTxt = conversation[stepId].user.answers[answerBtnNo].text;
      break;
    case 'input':
      userBubbleTxt = userTxtInput[step.inputProperty];
      break;
  }
  const varData = {...userTxtInput, ...Defaults};
  return (
    <div key={'conv_'+stepIndex} style={Styl}>
      <BotPart bot={conversation[stepId].bot}>
        {conversation[stepId].bot.texts.map((botText, botBubbleIndex) => {
          return (
            <Bubble key={botBubbleIndex}>
              {eval('`' + botText + '`')}
            </Bubble>
          );
        })}
      </BotPart>

      <Bubble key={'user_'+stepIndex} type={step.type} userPast>
        {userBubbleTxt}
      </Bubble>
    </div>
  );
}

PastPart.displayName = 'PastPart';

export default PastPart;
