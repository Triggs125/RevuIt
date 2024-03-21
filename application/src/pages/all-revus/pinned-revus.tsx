import { useGetRevus } from "../../hooks/useGetRevus.hook";
import { RevuCards } from "./revu-cards";
import { useTranslation } from "react-i18next";

const PinnedRevus = () => {
  const { t } = useTranslation();
  const { pinnedRevus, otherRevus } = useGetRevus();

  return pinnedRevus?.length > 0 ? (
    <RevuCards revus={pinnedRevus} header={otherRevus?.length > 0 ? t('pinned') : null} />
  ) : null;
}

export { PinnedRevus };
