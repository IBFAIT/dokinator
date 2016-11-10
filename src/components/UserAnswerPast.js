'use strict';

import React from 'react';

import UserButton from './UserButton.js';

const Styl = {
  component: {
    display: 'flex',
    flexDirection: 'column'
  }
}

const UserAnswerPast = (props) => {
  return (
    <div style={Styl.component}>
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
    return <UserButton type="past" text={stateAtPos.usersInput} />;
      } else {
      return <UserButton type="past" text={answer[index].text} />;
  }
}

UserAnswerPast.displayName = 'UserAnswerPast';

export default UserAnswerPast;
