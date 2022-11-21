import { UserConnectionSource } from "@openblocks-ee/constants/userConstants";
import { useSelector } from "react-redux";
import { getCurrentUser } from "redux/selectors/usersSelectors";
import EmailCard from "pages/setting/profile/emailCard";
import PasswordCard from "pages/setting/profile/passwordCard";
import {
  getConnectedName,
  HeadNameFiled,
  ProfileInfoItem,
} from "pages/setting/profile/profileComponets";
import { trans } from "i18n";

type ModalSettingProps = {
  setModalContent: (element: JSX.Element) => void;
  setTitle: (title: string) => void;
  setShowBackLink: (show: boolean) => void;
};

export function ProfileInfoCard(props: ModalSettingProps) {
  const user = useSelector(getCurrentUser);
  const { setModalContent, setTitle, setShowBackLink } = props;
  const hasPass = user.hasPassword;
  const email = getConnectedName(user, UserConnectionSource.email);
  const bindEmailStr = trans("profile.bindName", { name: trans("profile.email") });
  return (
    <>
      <HeadNameFiled />
      <ProfileInfoItem
        key="email"
        titleLabel={`${bindEmailStr}`}
        infoLabel={trans("profile.loginAfterBind", { name: trans("profile.email") })}
        value={email}
        actionButtonConfig={{
          label: email ? trans("profile.binding") : trans("profile.toBind"),
          disabled: !!email,
          onClick: () => {
            setModalContent(<EmailCard />);
            setTitle(bindEmailStr);
            setShowBackLink(true);
          },
        }}
      />
      <ProfileInfoItem
        key="password"
        titleLabel={trans("profile.password")}
        infoLabel={
          hasPass ? trans("profile.alreadySetPassword") : trans("profile.setPassPlaceholder")
        }
        actionButtonConfig={{
          label: hasPass ? trans("profile.modifyPassword") : trans("profile.setPassword"),
          onClick: () => {
            setModalContent(<PasswordCard hasPass={hasPass} />);
            setTitle(hasPass ? trans("profile.modifyPassword") : trans("profile.setPassword"));
            setShowBackLink(true);
          },
          hidden: false,
        }}
      />
    </>
  );
}
