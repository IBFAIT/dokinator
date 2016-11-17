'use strict';
import React from 'react';

// Components
import Bubble from './Bubble.js';

// Component styles
const style = (type) => {
  switch (type) {
    case 'input':
      return {
        border: '0',
        borderColor: 'transparent',
        boxShadow: 0
      }
  }
  return {
    display: 'inline-block',
    minWidth: '10%'
  }
}

const UserAnswerPart = ({ answers, nextStepCb }) => {
  return (
    <div style={style()}>
      {answers.map(({type, text, placeholder, time}, answerBtnNo) => {
          switch (type) {
            case 'input': // input field for users text input
              return <Bubble key={answerBtnNo} type={type}>
                    <input style={style('input')} type="text"
                      placeholder={placeholder}
                      autoFocus={true}
                      onKeyPress={(evt) => {
                        if(evt.key ==='Enter') nextStepCb({
                          answerBtnNo,
                          userTxtInput: evt.target.value
                        });
                      }} />
                  </Bubble>;

            case 'button': // Button the user can click - it leads to the next step
              return <Bubble key={answerBtnNo} type={type}
                onClick={() => nextStepCb({answerBtnNo})}>
                  {text}
                </Bubble>;

            case 'disabled': // button with no click handler that is just for presentation
              return <Bubble key={answerBtnNo}  type={type}> { text } </Bubble>;

            case 'forward': // Timout either from json or 2s -> leads to next step
              const timeoutTime = (time) ? time : 2000;
              setTimeout(() => {
                nextStepCb({answerBtnNo})
              }, timeoutTime, answerBtnNo);
              break;
          }
        })}
    </div>);
}

UserAnswerPart.displayName = 'UserAnswerPart';

export default UserAnswerPart;
