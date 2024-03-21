import { StyleProp, View, ViewStyle } from "react-native"
import { EditableText, EditableTextProps } from "./editable-text"
import { useTheme } from "../../utils/theme";

type TextFieldProps = EditableTextProps & {
  textFieldStyle?: StyleProp<ViewStyle>;
}

const TextField = (props: TextFieldProps) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        props.textFieldStyle,
        {
          backgroundColor: theme.colors.gray.light,
          paddingHorizontal: theme.spacing(2),
          borderRadius: 500
        }
      ]}
    >
      <EditableText {...props} />
    </View>
  )
}

export { TextField };
