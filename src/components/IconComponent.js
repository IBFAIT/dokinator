'use strict';

import React from 'react';

const IconComponent = ({name = 'DefaultName', src = '', alt = ''}) => (
  <div className="icon-component">
    <div className="name">{name}</div>
    <div><img src={src} alt={alt} /></div>
  </div>
);

IconComponent.displayName = 'IconComponent';

// Uncomment properties you need
// IconComponent.propTypes = {};
// IconComponent.defaultProps = {};

export default IconComponent;
