'use strict';
import React from 'react';

// Components
import Bubble from './Bubble.js';

const UserAnswerPart = ({ answers, nextStepCallback }) => {
  return (
    <div style={style()}>
      {answers.map(({type, text, placeholder, time}, answerBtnNo) => {
          switch (type) {
            case 'input': // input field for users text input
              return <Bubble key={answerBtnNo} type={type}>
                    <input style={styleInput()} type="text"
                      placeholder={placeholder}
                      autoFocus={true}
                      onKeyPress={(evt) => {
                        if(evt.key ==='Enter') {
                          nextStepCallback({answerBtnNo, userInputValues: evt.target.value});
                        }
                      }} />
                  </Bubble>;

            case 'button': // Button the user can click - it leads to the next step
              return (
                <Bubble key={answerBtnNo} type={type}
                  onClick={() => {
                    nextStepCallback({answerBtnNo})
                  }}>
                  {text}
                </Bubble>);

            case 'disabled': // button with no click handler that is just for presentation
              return <Bubble key={answerBtnNo}  type={type}> { text } </Bubble>;

            case 'forward': // Timout either from json or 2s -> leads to next step
              const timeoutTime = (time) ? time : 2000;
              setTimeout(() => {
                nextStepCallback({answerBtnNo})
              }, timeoutTime, answerBtnNo);
              break;
          }
        })}
    </div>);
}
UserAnswerPart.displayName = 'UserAnswerPart';

// Component styles

// components main style
const style = () => ({
  margin: 0,
  padding: 0,
  minWidth: '10%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center'
});

// User input style
const styleInput = () => ({
  border: '0',
  borderColor: 'transparent',
  boxShadow: 0
});

export default UserAnswerPart;
