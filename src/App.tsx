import React from 'react';
import logo from './logo.svg';
import './App.css';
import Landing_Aside from './Components/LandingPage_aside_component.ts';
import Landing_FormSide from './Components/LandingPage_FormSide.ts';

// <color name="colorPrimary">#00bcd4</color>
//    <color name="colorPrimaryLight">#4dd0e1</color>
//    <color name="colorPrimaryDark">#0097a7</color>
//    <color name="colorAccent">#ff8a65</color>
//    <color name="colorAccentLight">#ffccbc</color>
//    <color name="colorAccentDark">#ff5722</color>

const App: React.FC = () => {
  return(
        <div className="App">
            <Landing_Aside />
            <Landing_FormSide />
        </div>
    );
}

export default App;
