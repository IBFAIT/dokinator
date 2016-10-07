'use strict';

import React from 'react';


class BotChildBubbleReloadedComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  renderWords(textChunks) {
    const {email, name, fieber, data} = this.props;
    return textChunks.map((word, key) => {
      return <span key={key} style={{display: 'inline-block', marginRight: '5px'}}>
        {eval('`'+word+'`')}
      </span>
    });
  }

  render() {
    const {name, email, fieber} = this.props;
    return (
      <div className="botsinglebubble-component" ref="bubble" style={{display: 'inline-block'}}>
        <div className="text" ref="textContainer" style={{display: 'inline-block'}}>
          { this.renderWords(this.props.textChunks) }
        </div>
      </div>
    );
  }
}

BotChildBubbleReloadedComponent.displayName = 'BotChildBubbleReloadedComponent';

// Uncomment properties you need
// BotChildBubbleReloadedComponent.propTypes = {};
// BotChildBubbleReloadedComponent.defaultProps = {};

export default BotChildBubbleReloadedComponent;
