import { Chip } from "react-native-paper";
import { useTheme } from "../../../utils/theme";
import { useCallback } from "react";
import { Revu } from "../../../utils/types";

type LabelProps = {
  label: Revu['labels'][0];
  editable?: boolean;
}

const Label = ({ label, editable }: LabelProps) => {
  const { theme } = useTheme();

  const handleDeleteLabel = useCallback(() => {
    console.log('Delete Label Click:', label)
  }, [label]);

  return (
    <Chip
      mode="outlined"
      onLongPress={editable ? handleDeleteLabel : undefined}
      theme={{ roundness: 20 }}
      style={{
        backgroundColor: 'transparent',
        paddingTop: 0,
        borderColor: theme.colors.gray.light,
      }}
      textStyle={{
        color: theme.colors.text
      }}
    >
      {label}
    </Chip>
  );
}

export { Label };
