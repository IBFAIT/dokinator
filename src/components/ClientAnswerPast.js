'use strict';

import React from 'react';

import ClientButtonPast from './ClientButtonPast.js';


const ClientAnswerPast = (props) => {
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
    return <ClientButtonPast text={stateAtPos.usersInput} />;
  } else {
    return (
      <ClientButtonPast
        index={index}
        text={answer[index].text}
      />);
  }
}

ClientAnswerPast.displayName = 'ClientAnswerPast';

export default ClientAnswerPast;
