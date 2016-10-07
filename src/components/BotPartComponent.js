'use strict';

import React from 'react';

import IconComponent      from './IconComponent.js';
import BotBubbleComponent from './BotBubbleComponent.js';

class BotPartComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="botbubble-component">
        <IconComponent {...{
          name: this.props.bot.name,
          src: this.props.bot.avatar.src,
          alt: this.props.bot.avatar.alt,
          botId: this.props.bot.id
        }} />
        <div className="botbubble-container">
          {this.renderIndividualBubbles(this.props.texts)}
        </div>
      </div>
    );
  }

  renderIndividualBubbles(texts) {
    return texts.map((text, key) => {

      // Handle random Bot bubble feature
      if(Array.isArray(text)) {
        const rand            = Math.floor(Math.random()*text.length);
        this.props.texts[key] = text[rand];
        text                  = text[rand];
      }
      const props = {
        key,
        text,
        name: this.props.name,
        email: this.props.email,
        fieber: this.props.fieber
      };
      return <BotBubbleComponent {...props} />
    });
  }
}

BotPartComponent.displayName = 'BotPartComponent';

// Uncomment properties you need
// BotPartComponent.propTypes = {};
// BotPartComponent.defaultProps = {};

export default BotPartComponent;
