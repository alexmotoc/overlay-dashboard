import React from 'react';
import './App.css';
import { DashboardDrawer } from './components/DashboardDrawer';
import { OverlayBuilder } from './components/OverlayBuilder';
import { Settings } from './components/Settings';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';
import deepOrange from '@material-ui/core/colors/deepOrange';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";

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
      flexGrow: 1,
      marginTop: 50
  }
});

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <DashboardDrawer/>
          <Switch>
            <Route path='/overlay-builder'>
              <main className={classes.content}>
                <OverlayBuilder />
              </main>
            </Route>
            <Route path='/settings'>
              <main className={classes.content}>
                <Settings/>
              </main>
            </Route>
          </Switch>
        </div>     
      </ThemeProvider>
    </Router>
  );
}

export default App;
