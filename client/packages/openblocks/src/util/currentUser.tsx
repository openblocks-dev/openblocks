import { useSelector } from "react-redux";
import { getCurrentUser } from "redux/selectors/usersSelectors";

export function useCurrentUser() {
  const currentUser = useSelector(getCurrentUser);
  return currentUser;
}
