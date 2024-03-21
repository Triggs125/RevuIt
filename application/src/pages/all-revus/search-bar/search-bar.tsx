import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Searchbar as PaperSearchbar } from "react-native-paper";
import debounce from 'lodash/debounce';
import { AccountIcon } from "../../account/account-icon";
import { useTheme } from "../../../../utils/theme";

const Searchbar = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [searchValue, setSearchValue] = useState('');

  const debounceSearchText = debounce((text) => { }, 500);
  const handleChangeText = useCallback((text: string) => {
    setSearchValue(text);
    debounceSearchText(text);
  }, [debounceSearchText]);

  return (
    <PaperSearchbar
      value={searchValue}
      onChangeText={handleChangeText}
      placeholder={t('search-revus')}
      icon="menu"
      iconColor={theme.colors.text}
      onIconPress={() => console.log('Menu Pressed')}
      right={AccountIcon}
      elevation={3}
      theme={{ roundness: 2 }}
      cursorColor={theme.colors.text}
      returnKeyType="done"
      selectionColor={theme.colors.gray.dark}
      placeholderTextColor={theme.colors.gray.dark}
      inputStyle={{
        color: theme.colors.text
      }}
      style={{
        margin: theme.spacing(1),
        backgroundColor: theme.colors.primary,
        flexGrow: 1
      }}
    />
  );
}

export { Searchbar };
