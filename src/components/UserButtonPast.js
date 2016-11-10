'use strict';

import React from 'react';

let UserButtonPast = ({text}) => (
  <div className="user-button-past">
    <div className="text">
      { text }
    </div>
  </div>
);

UserButtonPast.displayName = 'UserButtonPast';

export default UserButtonPast;
