import React from 'react';
import './App.css';
import { DashboardDrawer } from './components/DashboardDrawer';
import { OverlayBuilder } from './components/OverlayBuilder';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
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

const useStyles = makeStyles({
  root: {
      display: 'flex',
  },
  content: {
      flexGrow: 1
  }
});

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <DashboardDrawer/>
        <main className={classes.content}>
          <OverlayBuilder />
        </main>
      </div>     
    </ThemeProvider>
  );
}

export default App;
