'use strict';

import React    from 'react';

import UserButton   from './UserButton.js';
import UserInputField    from './UserInputField.js';
import UserButtonDisabled from './UserButtonDisabled.js';



const UserAnswerPart = (props) => {
  return (
    <div className="user-answers">
      { renderClientBubbles(props) }
    </div>
  );
}

const renderClientBubbles = ({ answers, callbacks }) => {
  const {handleInputfieldEnter, handleForwardTimeout, updatePathState} = callbacks;
  return answers.map(({type, text, path, placeholder, changeVal}, index) => {
    switch (type) {
      case 'input':
        return (
          <UserInputField
            key={index}
            index={index}
            path={path}
            text={text}
            changeVal={changeVal}
            handleInputfieldEnter={handleInputfieldEnter}
          />);
      case 'button':
        return (
        <UserButton
          key={index}
          index={index}
          text={text}
          path={path}
          updatePathState={updatePathState}
        />);
      case 'disabled':
        return (
          <UserButtonDisabled
            key={index}
            index={index}
            text={text}
          />);
      case 'forward':
        handleForwardTimeout({answerIndex: 0});
        break;
      default:
        return <div key={index}></div>;
    }
  });
}

UserAnswerPart.displayName = 'UserAnswerPart';

export default UserAnswerPart;