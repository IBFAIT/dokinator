'use strict';

import React from 'react';

require('styles/ChatBubble.scss');

class ChatBubbleComponent extends React.Component {

  render() {
console.log(this.props.text);
    let newText = `${this.props.text}`;
    return(
      <div className="chatbubble-component">
        { newText }
      </div>
    );
  }
}

ChatBubbleComponent.displayName = 'ChatBubbleComponent';

// Uncomment properties you need
ChatBubbleComponent.propTypes = {
};
// ChatBubbleComponent.defaultProps = {};

export default ChatBubbleComponent;
