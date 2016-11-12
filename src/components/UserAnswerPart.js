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

const UserAnswerPart = ({ answers, nextStepCb }) => {
  return (
    <div style={Styl.component}>
      {answers.map(({type, text, placeholder, time}, answerBtnNo) => {
          switch (type) {
            case 'input':
              return <Bubble key={answerBtnNo} type={type}>
                    <input style={Styl.input} type="text"
                      placeholder={placeholder}
                      autoFocus={true}
                      onKeyPress={(evt) => {
                        if(evt.key ==='Enter') nextStepCb({
                          userTxtInput: evt.target.value
                        });
                      }} />
                  </Bubble>;

            case 'button':
              return <Bubble key={answerBtnNo} type={type}
                onClick={() => nextStepCb({answerBtnNo})}>
                  {text}
                </Bubble>;

            case 'disabled':
              return <Bubble key={answerBtnNo}  type={type}> { text } </Bubble>;

            case 'forward':
              const timeoutTime = (time) ? time : 2000;
              setTimeout(()=>{nextStepCb({answerBtnNo})}, timeoutTime, answerBtnNo);
              break;
          }
        })}
    </div>);
}

UserAnswerPart.displayName = 'UserAnswerPart';

export default UserAnswerPart;
