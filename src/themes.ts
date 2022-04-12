import { DefaultTheme } from "styled-components";

const colors = {
  black: "#000000",
  white: "#ffffff",
};

interface ThemeColors {
  background: string;
  text: string;
}

const darkThemeColors: ThemeColors = {
  background: colors.black,
  text: colors.white,
};

const lightThemeColors: ThemeColors = {
  background: colors.white,
  text: colors.black,
};

export const darkTheme: DefaultTheme = {
  colors: darkThemeColors,
};

export const lightTheme: DefaultTheme = {
  colors: lightThemeColors,
};

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ThemeColors;
  }
}
