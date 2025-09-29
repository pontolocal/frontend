import { createTheme } from '@mui/material/styles'


declare module '@mui/material/styles' {
  interface Palette {
    infoBox: Palette['primary']
  }
  interface PaletteOptions {
    infoBox: PaletteOptions['primary']
  }
}

export const theme = createTheme({
  // --- PALETA DE CORES ---
  palette: {
    primary: {
      main: '#3C5491',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#7BB3E0',
      light: '#E3F2FD',
    },
    background: {
      default: '#E9ECF2',
      // @ts-ignore 
      alt: '#E4EBFF',
    },
    success: {
        main: '#22C55E', 
    },
    infoBox: {
        main: '#C2D2FC',
        contrastText: '#00000',
    }
  },

  // --- CUSTOMIZAÇÃO DE COMPONENTES ---
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          textTransform: 'none',
          fontWeight: 'bold',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '41px',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&.Mui-focused': {
            color: theme.palette.secondary.main,
          },
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&.Mui-focused': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.secondary.main,
            },
          },
        }),
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&.Mui-checked': {
            color: theme.palette.secondary.main,
          },
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
          },
        },
      },
    },
  },
})