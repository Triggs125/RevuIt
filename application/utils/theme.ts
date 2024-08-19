import { useColorScheme } from 'react-native';
import {
  MD3DarkTheme,
  // MD3LightTheme
} from 'react-native-paper';

const darkColors = {
  primary: '#365F7F',
  secondary: '#546A7B',
  tertiary: '#FB8500',
  rated: '#F14242',
  error: '#E34444',
  text: '#FDFDFD',
  background: '#2B2E30',
  choices: {
    1: '#354B5C',
    2: '#905D25',
    3: '#752626',
    4: '#276538',
    5: '#423148',
    6: '#603B5C',
    7: '#40827E',
    8: '#3A3C77',
  },
  white: '#1D1D1D',
  light: '#FDFDFD',
  gray: {
    light: '#575D60',
    main: '#939CA1',
    dark: '#D9D9D9'
  },
  ratings: {
    bad: '#E34444',
    mid: '#EF7E15',
    good: '#04B200'
  }
};

const useTheme = () => {
  const colorScheme = useColorScheme();

  const spacing = (multiplier = 1) => 8 * multiplier;
  const test = {
    border: {
      borderWidth: 1,
      borderColor: 'white'
    }
  }

  const theme =
    colorScheme === 'dark'
    ? { ...MD3DarkTheme, roundness: 15, colors: { ...MD3DarkTheme.colors, ...darkColors }, spacing, test }
    : { ...MD3DarkTheme, roundness: 15, colors: { ...MD3DarkTheme.colors, ...darkColors }, spacing, test }

  return { theme };
}

export { useTheme };
