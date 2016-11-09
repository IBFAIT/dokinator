'use strict';

import React from 'react';

let ClientButtonPast = ({text}) => (
  <div className="user-button-past">
    <div className="text">
      { text }
    </div>
  </div>
);

ClientButtonPast.displayName = 'ClientButtonPast';

export default ClientButtonPast;
