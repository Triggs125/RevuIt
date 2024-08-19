import { EditableText, EditableTextProps } from "./editable-text"
import { useTheme } from "../../utils/theme";

type TextFieldProps = EditableTextProps

const TextField = (props: TextFieldProps) => {
  const { theme } = useTheme();

  return (
    <>
      <EditableText
        {...props}
        style={[
          {
            borderRadius: theme.roundness,
            backgroundColor: theme.colors.gray.light,
            paddingHorizontal: theme.spacing(2),
            paddingTop: theme.spacing(1.25),
            paddingBottom: theme.spacing(1)
          },
          props.style
        ]}
      />
    </>
  )
}

export { TextField };
