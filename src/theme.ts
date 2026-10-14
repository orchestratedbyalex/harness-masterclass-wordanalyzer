import { createMuiTheme } from '@material-ui/core/styles';

const systemFontFamily = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"SF Pro Text"',
  '"SF Pro Display"',
  '"Segoe UI"',
  'sans-serif',
].join(',');

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#0066cc',
      dark: '#004f9e',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f7',
      paper: '#ffffff',
    },
    text: {
      primary: '#1d1d1f',
      secondary: '#5f5f63',
    },
    divider: 'rgba(29, 29, 31, 0.12)',
  },
  typography: {
    fontFamily: systemFontFamily,
    h1: {
      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
      fontWeight: 650,
      letterSpacing: '-0.04em',
      lineHeight: 1.05,
    },
    h2: {
      fontWeight: 650,
      letterSpacing: '-0.025em',
    },
    button: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 14,
  },
  props: {
    MuiButton: {
      disableElevation: true,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        minHeight: 44,
        borderRadius: 12,
        padding: '10px 20px',
        transition: 'background-color 180ms ease, box-shadow 180ms ease, transform 180ms ease',
        '&:focus-visible': {
          outline: '3px solid #0066cc',
          outlineOffset: 2,
        },
      },
      containedPrimary: {
        '&:hover': {
          backgroundColor: '#004f9e',
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: 12,
        backgroundColor: '#ffffff',
        transition: 'box-shadow 180ms ease',
        '&.Mui-focused': {
          boxShadow: '0 0 0 3px rgba(0, 102, 204, 0.16)',
        },
      },
      notchedOutline: {
        borderColor: 'rgba(29, 29, 31, 0.18)',
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: 18,
      },
    },
    MuiListItem: {
      button: {
        borderRadius: 10,
        '&:focus-visible': {
          outline: '3px solid #0066cc',
          outlineOffset: -2,
        },
      },
    },
  },
});

export default theme;
