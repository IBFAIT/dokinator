'use strict';

import React from 'react';

require('styles/Bubbles.scss');

let BubblesComponent = (props) => (
  <div className="bubbles-component">
    { props.bubbles }
  </div>
);

BubblesComponent.displayName = 'BubblesComponent';

// Uncomment properties you need
// BubblesComponent.propTypes = {};
// BubblesComponent.defaultProps = {};

export default BubblesComponent;
