'use strict';

import React    from 'react';
import ReactDOM from 'react-dom';
import Scroll   from 'smoothscroll';


class BotBubbleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.elms = {};
  }

  render() {
    const {name, email, fieber, text} = this.props;
    return (
      <div className='botsinglebubble-component' ref="container">
        <div className='text'>
          {eval('`' + text + '`')}
        </div>
      </div>
    );
  }
}

BotBubbleComponent.displayName = 'BotBubbleComponent';

// Uncomment properties you need
// BotBubbleComponent.propTypes = {};
// BotBubbleComponent.defaultProps = {};

export default BotBubbleComponent;
