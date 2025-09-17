import '@mui/material/styles'
import '@mui/material/Button'

// Este bloco ensina ao TypeScript sobre a sua nova cor 'alt'
declare module '@mui/material/styles' {
  interface PaletteBackground {
    alt: string
  }
  interface PaletteBackgroundOptions {
    alt?: string
  }
}
