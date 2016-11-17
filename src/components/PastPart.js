'use strict';

import React from 'react';

// JSON data beeing imported
import Defaults from './defaults.json';

import BotPart from './BotPart.js';
import Bubble  from './Bubble.js';

const PastPart = ({step, stepIndex, conversation, userTxtInput}) => {
  const {stepId, answerBtnNo, type} = step;
  const conversationStep = conversation[stepId];
  // Getting the text from the right source - desicion by type
  const userBubbleText = (type === 'input') ? userTxtInput[step.inputProperty] : conversationStep.user.answers[answerBtnNo].text;

  const varData = {...userTxtInput, ...Defaults};
  return (
    <div key={'conv_'+stepIndex} style={style()}>
      <BotPart botIdentity={Defaults.botIdentitys[conversationStep.bot.name]} type="past">
        {conversation[stepId].bot.texts.map((botText, botBubbleIndex) => {
          return (
            <Bubble key={botBubbleIndex}>
              {eval('`' + botText + '`')}
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
