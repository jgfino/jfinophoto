const colors = {
  black: "rgb(20, 20, 20)",
  lightBlack: "rgb(40, 40, 40)",
  white: "#ffffff",
  gray: "#c2c2c2",
  darkGray: "#666666",
};

interface ThemeColors {
  background: string;
  backgroundSecondary: string;
  text: string;
  textSecondary: string;
}

const darkThemeColors: ThemeColors = {
  background: colors.black,
  backgroundSecondary: colors.lightBlack,
  text: colors.white,
  textSecondary: colors.gray,
};

const lightThemeColors: ThemeColors = {
  background: colors.white,
  backgroundSecondary: colors.gray,
  text: colors.black,
  textSecondary: colors.darkGray,
};

interface ThemeFonts {
  main: string;
  text: string;
}

const themeFont: ThemeFonts = {
  main: "Quicksand",
  text: "Quicksand",
};

interface Theme {
  colors: ThemeColors;
  fontFamily: ThemeFonts;
}

export const lightTheme: Theme = {
  colors: lightThemeColors,
  fontFamily: themeFont,
};

export const darkTheme: Theme = {
  ...lightTheme,
  colors: darkThemeColors,
};

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
