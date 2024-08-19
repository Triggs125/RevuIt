import { Revu } from "../../../utils/types";
import { RevuCards } from "./revu-cards";
import { useTranslation } from "react-i18next";

type PinnedRevusProps = {
  otherRevus?: Revu[];
  pinnedRevus?: Revu[];
}

const PinnedRevus = ({ otherRevus = [], pinnedRevus = [] }: PinnedRevusProps) => {
  const { t } = useTranslation();

  return pinnedRevus.length > 0 ? (
    <RevuCards revus={pinnedRevus} header={otherRevus.length > 0 ? t('pinned') : undefined} />
  ) : null;
}

export { PinnedRevus };
