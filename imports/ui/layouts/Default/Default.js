import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

function Default({ children }) {
  return (
    <MuiThemeProvider>
      <div>{children}</div>
    </MuiThemeProvider>
  );
}

export default Default;
