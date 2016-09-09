'use strict';

import React from 'react';

require('styles/ChatBubble.scss');

class ChatBubbleComponent extends React.Component {

  render() {
    let data = this.props.data;
    return(
      <div className="chatbubble-component">
        { eval('`'+this.props.text+'`') }
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
