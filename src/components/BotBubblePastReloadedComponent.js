'use strict';

import React from 'react';

import IconComponent from './IconComponent.js';
import BotSingleBubbleComponent from './BotChildBubblePastReloadedComponent.js';

class BotBubblePastReloadedComponent extends React.Component {
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

BotBubblePastReloadedComponent.displayName = 'BotBubblePastReloadedComponent';

// Uncomment properties you need
// BotBubblePastReloadedComponent.propTypes = {};
// BotBubblePastReloadedComponent.defaultProps = {};

export default BotBubblePastReloadedComponent;
