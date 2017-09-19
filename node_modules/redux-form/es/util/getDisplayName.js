import * as React from 'react';

var getDisplayName = function getDisplayName(Comp) {
  return Comp.displayName || Comp.name || 'Component';
};

export default getDisplayName;