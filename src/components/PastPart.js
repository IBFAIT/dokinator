'use strict';

import React from 'react';

// JSON data beeing imported
import Defaults     from './defaults.json';

import BotPartPast      from './BotPartPast.js';
import ClientAnswerPast from './ClientAnswerPast.js';

const PastPart = ({step, stepIndex, conversation}) => {
  const stateAtPos = JSON.parse(step.stateAtPos); // get the striggified state from the past
  const {path, templateVars} = stateAtPos;
  return (
    <div className="conversation-part-past" key={'conv_'+stepIndex} >
      <BotPartPast
        key={stepIndex}
        path={path}
        bot={conversation[path].bots}
        templateVars={templateVars}
        botIdentitys={Defaults.botIdentitys}
      />

      <ClientAnswerPast
        key={'client_'+stepIndex}
        stepIndex={stepIndex}
        answer={conversation[path].user.answers}
        index={step.index}
        stateAtPos={stateAtPos}
      />
    </div>
  );
}

PastPart.displayName = 'PastPart';

export default PastPart;
