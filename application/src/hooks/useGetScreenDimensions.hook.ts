import { Dimensions } from "react-native";

const useGetScreenDimensions = () => {
  return Dimensions.get('window');
}

export { useGetScreenDimensions };
