interface IColorPallete {
  lighter: string
  light: string
  main: string
  dark: string
  darker: string
  contrastText: string
}

export interface IColor {
  primary: IColorPallete
  secondary: IColorPallete
  success: IColorPallete
  info: IColorPallete
  warning: IColorPallete
  error: IColorPallete
  grey: { [key: string]: string }
  common: {
    black: string
    white: string
  }
}

export const color: IColor = {
  primary: {
    lighter: '#00C076',
    light: '#00A365',
    main: '#018b5c',
    dark: '#016140',
    darker: '#003825',
    contrastText: '#FFFFFF',
  },
  secondary: {
    lighter: '#6690ff',
    light: '#336bff',
    main: '#0046FF',
    dark: '#0038cc',
    darker: '#002a99',
    contrastText: '#FFFFFF',
  },
  success: {
    lighter: '#D3FCD2',
    light: '#77ED8B',
    main: '#22C55E',
    dark: '#118D57',
    darker: '#065E49',
    contrastText: '#ffffff',
  },
  info: {
    lighter: '#CAFDF5',
    light: '#61F3F3',
    main: '#00B8D9',
    dark: '#006C9C',
    darker: '#003768',
    contrastText: '#FFFFFF',
  },
  warning: {
    lighter: '#FFF5CC',
    light: '#FFD666',
    main: '#FFAB00',
    dark: '#B76E00',
    darker: '#7A4100',
    contrastText: '#1C252E',
  },
  error: {
    lighter: '#FFE9D5',
    light: '#FFAC82',
    main: '#FF5630',
    dark: '#B71D18',
    darker: '#7A0916',
    contrastText: '#FFFFFF',
  },
  grey: {
    '50': '#FCFDFD',
    '100': '#F9FAFB',
    '200': '#F4F6F8',
    '300': '#DFE3E8',
    '400': '#C4CDD5',
    '500': '#919EAB',
    '600': '#637381',
    '700': '#454F5B',
    '800': '#1C252E',
    '900': '#141A21',
  },
  common: {
    black: '#000000',
    white: '#FFFFFF',
  },
}
