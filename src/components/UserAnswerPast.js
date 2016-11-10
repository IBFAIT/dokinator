'use strict';

import React from 'react';

import UserButtonPast from './UserButtonPast.js';


const UserAnswerPast = (props) => {
  return (
    <div className="user-answers-past">
      {renderClientBubble(props)}
    </div>
  );
}

const renderClientBubble = ({ answer, stateAtPos, index}) => {
  if(index === null) { index = 0;}
  if(answer.length == 1 && answer[0].type == 'forward') {
    return <div></div>;
  }
  if (answer[index].type == 'input') {
    return <UserButtonPast text={stateAtPos.usersInput} />;
  } else {
    return (
      <UserButtonPast
        index={index}
        text={answer[index].text}
      />);
  }
}

UserAnswerPast.displayName = 'UserAnswerPast';

export default UserAnswerPast;
