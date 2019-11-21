import React from 'react';
import './App.css';
import { OverlayDimension } from './components/OverlayDimension';

const App: React.FC = () => {
  return (
    <div className="App">
      <OverlayDimension name="Height"/>
      <OverlayDimension name="Width"/>
    </div>
  );
}

export default App;
