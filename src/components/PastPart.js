'use strict';

import React from 'react';

// JSON data beeing imported

import BotPart          from './BotPart.js';
import Bubble from './Bubble.js';

const Styl = {
  display:'flex',
  flexDirection: 'column'
}

const PastPart = ({step, stepIndex, conversation, userInputData}) => {
  const {stepId, answerIndex, type} = step;

  // Getting the text from the right source - desicion by type
  let userBubbleTxt = '';
  switch (type) {
    case 'button':
      userBubbleTxt = conversation[stepId].user.answers[answerIndex].text;
      break;
    case 'input':
      userBubbleTxt = userInputData[step.inputProperty];
      break;
  }
  return (
    <div key={'conv_'+stepIndex} style={Styl}>
      <BotPart bot={conversation[stepId].bot} userInputData={userInputData} />

      <Bubble key={'user_'+stepIndex} type={step.type} userPast>
        {userBubbleTxt}
      </Bubble>
    </div>
  );
}

PastPart.displayName = 'PastPart';

export default PastPart;
