'use strict';

import React from 'react';

// Components
import Icon      from './Icon.js';
import BotBubble from './BotBubble.js';

// generic styles
import genStyl from '../styles/genStyl.js';

const Styl = {
  component: {...genStyl.botbubbleFlex, ...genStyl.bubbleMarginPadding},
  bubbleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    maxWidth: '100%'
  }
}
class BotPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bubbleStep: this.props.bot.texts.length
    }
  }



  render() {
    return  (
      <div style={Styl.component}>
        <Icon id={this.props.bot.id} />
        <div style={Styl.bubbleContainer}>
          {this.props.bot.texts.map((bubbleText, bubbleIndex) => {
            // if there is multiple bot texts, pick random
            if(this.props.handleRandomBubble) {
              bubbleText = (Array.isArray(bubbleText)) ? this.props.handleRandomBubble(bubbleText, bubbleIndex) : bubbleText;
            }
            return (
              <BotBubble
                key={bubbleIndex}
                bubbleText={bubbleText}
                templateVars={this.props.templateVars}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

BotPart.displayName = 'BotPart';

export default BotPart;
