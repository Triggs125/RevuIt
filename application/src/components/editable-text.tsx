import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Keyboard, TextInput, TextInputProps, TouchableWithoutFeedback } from "react-native"
import { useTheme } from "../../utils/theme";

export type EditableTextProps = Omit<TextInputProps, 'ref'> & {
  size?: 'small' | 'medium' | 'large' | 'x-large';
  color?: string;
  filter?: RegExp | ((text: string) => string);
}

const EditableText = ({
  value, onChangeText = () => {}, size, color, style, filter,
  blurOnSubmit = true, autoCapitalize = 'sentences',
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
    <TouchableWithoutFeedback onBlur={() => onChangeText(text)}>
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
    </TouchableWithoutFeedback>
  )
}

export { EditableText };
