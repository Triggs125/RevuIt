import { useTranslation } from "react-i18next";
import { RevuCards } from "./revu-cards";
import { Revu } from "../../../utils/types";

type OtherRevusProps = {
  otherRevus?: Revu[];
  pinnedRevus?: Revu[];
}

const OtherRevus = ({ otherRevus = [], pinnedRevus = [] }: OtherRevusProps) => {
  const { t } = useTranslation();

  return otherRevus.length > 0 ? (
    <RevuCards revus={otherRevus} header={pinnedRevus.length > 0 ? t('others') : undefined} />
  ) : null;
}

export { OtherRevus };
