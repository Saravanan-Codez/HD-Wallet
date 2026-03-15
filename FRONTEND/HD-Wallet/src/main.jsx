import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Buffer } from 'buffer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import process from "process";

// Polyfill for Buffer
window.Buffer = Buffer;
// window.process = process;

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#101512',
      paper: '#1A221D',
    },
    primary: {
      main: '#8FAF8B',
      light: '#C8D8C1',
      contrastText: '#101512',
    },
    secondary: {
      main: '#C8D8C1',
      contrastText: '#101512',
    },
    error: {
      main: '#C96B5C',
    },
    text: {
      primary: '#F3F1EA',
      secondary: '#A7ADA4',
    },
  },
  typography: {
    fontFamily: 'inherit',
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
