'use strict';

import React from 'react';

// Components
import Bubble from './Bubble.js';

// Component styles
const Styl = {
  display: 'inline-block',
  minWidth: '10%'
}

const UserAnswerPart = ({ answers, callbacks }) => {
  const {handleInputfieldEnter, handleForwardTimeout, updateStepIdState} = callbacks;
  return (
    <div style={Styl}>
      {
        answers.map(({type, text, placeholder}, answerIndex) => {
          switch (type) {
            case 'input':
              return <Bubble key={answerIndex} type={type}>
                  <input type="text" placeholder={placeholder}
                    onKeyPress={(evt) => { handleInputfieldEnter({evt}) }} />
                  </Bubble>;

            case 'button':
              return <Bubble key={answerIndex}
                onClick={evt => {updateStepIdState({evt, answerIndex})}}
                type={type}>
                  {text}
                </Bubble>;

            case 'disabled':
              return <Bubble key={answerIndex}  type={type}> { text } </Bubble>;

            case 'forward':
              handleForwardTimeout({answerIndex: 0});
              break;
          }
        })
    }
    </div>
  );
}

UserAnswerPart.displayName = 'UserAnswerPart';

export default UserAnswerPart;
