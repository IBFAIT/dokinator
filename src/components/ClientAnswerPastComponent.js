'use strict';

import React    from 'react';

import ClientButtonPastComponent   from './ClientButtonPastComponent.js';


const ClientAnswerPastComponent = ({className = 'user-answers-past', ...props}) => {
  return (
    <div {...{className}}>
      { renderClientBubble(props) }
    </div>
  );
}

const renderClientBubble = ({
  answer,
  stateAtPos,
  index,
  subClassNames = {
    clientButtonPast: 'clientbuttonpast-component'
  }
}) => {
  if(index === null) { index = 0;}
  if(answer.length == 1 && answer[0].type == 'forward') {
    return <div></div>;
  }
  if (answer[index].type == 'input') {
    return <ClientButtonPastComponent {...{
      text: stateAtPos.usersInput,
      className: subClassNames.clientButtonComponent
    }} />;
  } else {
    return <ClientButtonPastComponent {...{
      index,
      text: answer[index].text,
      className: subClassNames.clientButtonComponent
    }} />;
  }
}

ClientAnswerPastComponent.displayName = 'ClientAnswerPastComponent';

export default ClientAnswerPastComponent;
