'use strict';

import React from 'react';

require('styles/ChatBubble.scss');

const ChatBubbleComponent = ({text}) => (
  <div className="chatbubble-component">
    { text }
  </div>
);

ChatBubbleComponent.displayName = 'ChatBubbleComponent';

// Uncomment properties you need
ChatBubbleComponent.propTypes = {
};
// ChatBubbleComponent.defaultProps = {};

export default ChatBubbleComponent;
