import React from 'react';
import './App.css';
import { OverlayBuilder } from './components/OverlayBuilder';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';
import deepOrange from '@material-ui/core/colors/deepOrange';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: cyan[300],
      main: cyan[500],
      dark: cyan[700],
      contrastText: '#fff',
    },
    secondary: {
      light: deepOrange[100],
      main: deepOrange[300],
      dark: deepOrange[500],
      contrastText: '#000',
    }
  },
  typography: {
    fontFamily: 'Raleway'
  }
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <OverlayBuilder />
      </div>      
    </ThemeProvider>
  );
}

export default App;
