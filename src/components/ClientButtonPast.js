'use strict';

import React from 'react';

let ClientButtonPast = ({text}) => (
  <div className="clientbuttonpast-component">
    <div className="text">
      { text }
    </div>
  </div>
);

ClientButtonPast.displayName = 'ClientButtonPast';

export default ClientButtonPast;
