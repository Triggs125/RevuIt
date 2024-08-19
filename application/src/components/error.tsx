import { useTranslation } from "react-i18next"
import { View } from "react-native";
import { Text } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

const Error = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text variant="titleMedium">{t('error')}</Text>
      </View>
    </SafeAreaView>
  )
}

export { Error };
