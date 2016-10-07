'use strict';

import React from 'react';

import IconComponent from './IconComponent.js';
import BotSingleBubbleComponent from './BotBubblePastComponent.js';

class BotPartPastComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const iconProps = {
      name:  this.props.bot.name,
      src:   this.props.bot.avatar.src,
      alt:   this.props.bot.avatar.alt,
      botId: this.props.bot.id
    }
    return (
      <div className="botbubble-component">
        <IconComponent {...iconProps} />
        <div className="botbubble-container">
          {this.renderIndividualBubbles(this.props.texts)}
        </div>
      </div>
    );
  }

  renderIndividualBubbles(texts) {
    return texts.map((text, key) => {
      let textChunks = text.split(' ');
      let props = {
        key,
        textChunks,
        data:  this.props.data,
        index: this.props.index,
        name:  this.props.name,
        email: this.props.email
      };
      return <BotSingleBubbleComponent {...props} />
    });
  }
}

BotPartPastComponent.displayName = 'BotPartPastComponent';

// Uncomment properties you need
// BotPartPastComponent.propTypes = {};
// BotPartPastComponent.defaultProps = {};

export default BotPartPastComponent;
