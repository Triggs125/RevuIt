import { useCallback, useMemo, useRef, useState } from "react";
import { Keyboard, StyleProp, TextInput, TextInputProps, TextStyle, TouchableWithoutFeedback, View } from "react-native"
import { useTheme } from "../../utils/theme";
import { Text } from "react-native-paper";

export type EditableTextProps = Omit<TextInputProps, 'ref'> & {
  label?: string;
  size?: 'small' | 'medium' | 'large' | 'x-large';
  color?: string;
  filter?: RegExp | ((text: string) => string);
  required?: boolean;
  helpText?: string;
  helpTextStyle?: StyleProp<TextStyle>;
}

const EditableText = ({
  value,
  onChangeText = () => {},
  size,
  color,
  style,
  filter,
  label,
  blurOnSubmit = true,
  autoCapitalize = 'sentences',
  required = false,
  helpText,
  helpTextStyle = {},
  ...props
}: EditableTextProps) => {
  const { theme } = useTheme();
  const ref = useRef<TextInput>(null);

  const [text, setText] = useState(value ?? '');

  const fontSize = useMemo(() => {
    switch (size) {
      case 'small':
        return 12;
      case 'medium':
        return 16;
      case 'large':
        return 20;
      case 'x-large':
        return 24;
      default:
        return 16;
    }
  }, [size]);

  const handleChangeText = useCallback((text: string) => {
    let newText = text;
    if (filter) {
      if (typeof filter === 'function') {
        newText = filter(newText);
      } else {
        newText = newText.replaceAll(filter, '');
      }
    }
    setText(newText);
  }, []);

  return (
    <TouchableWithoutFeedback onBlur={() => (onChangeText(text), Keyboard.dismiss())}>
      <View
        style={{
          flex: 1,
          flexGrow: 1,
          flexShrink: 1,
          alignSelf: 'stretch'
        }}
      >
        {!!label && (
          <>
            {required && (
              <Text
                variant="labelLarge"
                style={{
                  color: theme.colors.error,
                  position: 'absolute',
                  left: 0
                }}
              >
                *
              </Text>
            )}
            <Text
              variant="labelLarge"
              style={{
                marginLeft: theme.spacing(),
                color: theme.colors.text
              }}
            >
              {label}
            </Text>
          </>
        )}
        <TextInput
          {...props}
          ref={ref}
          value={text}
          onSubmitEditing={() => onChangeText(text)}
          onChangeText={handleChangeText}
          blurOnSubmit={blurOnSubmit}
          autoCapitalize={autoCapitalize}
          keyboardAppearance={theme.dark ? 'dark' : 'light'}
          cursorColor={theme.colors.text}
          selectionColor={theme.colors.text}
          placeholderTextColor={theme.colors.gray.main}
          style={[
            {
              fontSize,
              color: color ?? theme.colors.text,
              flexGrow: 1,
              flexShrink: 1
            },
            style
          ]}
        />
        {!!helpText && (
          <Text variant="labelMedium" style={[{ marginLeft: theme.spacing(), color: theme.colors.gray.dark }, helpTextStyle]}>
            {helpText}
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

export { EditableText };
