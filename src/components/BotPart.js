'use strict';
import React from 'react';

import Defaults from './defaults.json';

// Components
import Icon   from './Icon.js';
import Bubble from './Bubble.js';

const Styl = {
  component: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: '2rem',
    marginLeft: '0.4rem',
    marginRight: '0.4rem'
  },
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
    // object definition for for template string
    if(this.props.userInputData) {
      const varData = {...this.props.userInputData, ...Defaults};
    }
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
              <Bubble key={bubbleIndex}>
                {eval('`'+bubbleText+'`')}
              </Bubble>
            );
          })}
        </div>
      </div>
    );
  }
}

BotPart.displayName = 'BotPart';

export default BotPart;
