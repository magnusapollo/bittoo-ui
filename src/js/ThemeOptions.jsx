
export const themeOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  spacing: 10,
  margin: 10,
  components: {
    // Name of the component
    MuiAutocomplete: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          padding: 20,
        }
      }
    }
 }
};