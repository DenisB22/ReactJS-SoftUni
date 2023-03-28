import { useState, React} from 'react';
import FunctionContextComponent from './FunctionContextComponent';
import { ThemeProvider } from './ThemeContext';

function App() {

  return (
      <ThemeProvider>
        <FunctionContextComponent />
      </ThemeProvider>
  );
}

export default App;
