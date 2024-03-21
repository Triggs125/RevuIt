import { useGetRevus } from "../../hooks/useGetRevus.hook";
import { useTranslation } from "react-i18next";
import { RevuCards } from "./revu-cards";

const OtherRevus = () => {
  const { t } = useTranslation();
  const { pinnedRevus, otherRevus } = useGetRevus();

  return otherRevus?.length > 0 ? (
    <RevuCards revus={otherRevus} header={pinnedRevus?.length > 0 ? t('others') : null} />
  ) : null;
}

export { OtherRevus };
