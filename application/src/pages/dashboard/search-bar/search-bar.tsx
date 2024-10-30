import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Searchbar as PaperSearchbar } from "react-native-paper";
import { useTheme } from "../../../../utils/theme";

const Searchbar = ({ setSearchText }: { setSearchText: (text: string) => void }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [searchValue, setSearchValue] = useState('');

  const inputRef = useRef(null);

  const handleChangeText = useCallback((text: string) => {
    setSearchText(text);
    setSearchValue(text);
  }, [setSearchText, setSearchValue]);

  return (
    <PaperSearchbar
      value={searchValue}
      onChangeText={handleChangeText}
      placeholder={t('search-revus')}
      // icon="menu"
      iconColor={theme.colors.text}
      onIconPress={() => (inputRef.current as any)?.focus?.()}
      // right={AccountIcon}
      elevation={3}
      theme={{ roundness: 2 }}
      cursorColor={theme.colors.text}
      returnKeyType="done"
      selectionColor={theme.colors.gray.dark}
      placeholderTextColor={theme.colors.gray.dark}
      ref={inputRef}
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
