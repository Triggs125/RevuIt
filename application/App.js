import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import './translation/i18n';
import { useTheme } from './utils/theme';
import { Container } from './container';

export default function App() {
  const { theme } = useTheme();

  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <Container />
      </Provider>
    </PaperProvider>
  );
}
