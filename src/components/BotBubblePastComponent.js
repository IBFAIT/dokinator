'use strict';

import React from 'react';


class BotBubblePastComponent extends React.Component {
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
      <div className="botsinglebubble-component" style={{display: 'inline-block'}}>
        <div className="text"  style={{display: 'inline-block'}}>
          { this.renderWords(this.props.textChunks) }
        </div>
      </div>
    );
  }
}

BotBubblePastComponent.displayName = 'BotBubblePastComponent';

// Uncomment properties you need
// BotBubblePastComponent.propTypes = {};
// BotBubblePastComponent.defaultProps = {};

export default BotBubblePastComponent;
