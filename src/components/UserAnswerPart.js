'use strict';

import React from 'react';

// Components
import Bubble from './Bubble.js';

// Component styles
const Styl = {
  component: {
    display: 'inline-block',
    minWidth: '10%'
  },
  input: {
    border: '0',
    borderColor: 'transparent',
    boxShadow: 0
  }
}

const UserAnswerPart = ({ answers, callbacks }) => {
  const {handleInputfieldEnter, handleForwardTimeout, updateStepIdState} = callbacks;
  return (
    <div style={Styl.component}>
      {answers.map(({type, text, placeholder}, answerIndex) => {
          switch (type) {
            case 'input':
              return <Bubble key={answerIndex} type={type}>
                  <input style={Styl.input} type="text" placeholder={placeholder}
                    autoFocus={true}
                    onKeyPress={(evt) => { handleInputfieldEnter({evt}) }} />
                  </Bubble>;

            case 'button':
              return <Bubble key={answerIndex} type={type}
                onClick={evt => {updateStepIdState({evt, answerIndex})}}>
                  {text}
                </Bubble>;

            case 'disabled':
              return <Bubble key={answerIndex}  type={type}> { text } </Bubble>;

            case 'forward':
              handleForwardTimeout({answerIndex: 0});
              break;
          }
        })}
    </div>);
}

UserAnswerPart.displayName = 'UserAnswerPart';

export default UserAnswerPart;
