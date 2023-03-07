import { Org } from "constants/orgConstants";
import { ArrowIcon, BlurFinishInput } from "openblocks-design";
import { useDispatch, useSelector } from "react-redux";
import { updateOrgAction } from "redux/reduxActions/orgActions";
import styled from "styled-components";
import { trans } from "i18n";
import { useParams } from "react-router";
import { getUser } from "redux/selectors/usersSelectors";
import { HeaderBack } from "../permission/styledComponents";
import history from "util/history";
import { ORGANIZATION_SETTING } from "constants/routesURL";

const FieldWrapper = styled.div`
  margin-bottom: 32px;
  width: 408px;
  margin-top: 40px;
`;

const Wrapper = styled.div`
  padding: 32px 24px;
`;

export function OrgSettingContent(props: { org: Org | undefined }) {
  const orgId = useParams<{ orgId: string }>().orgId;
  const { orgs } = useSelector(getUser);
  const org = new Map(orgs.map((org) => [org.id, org])).get(orgId);
  const dispatch = useDispatch();
  if (!org) {
    return null;
  }
  return (
    <Wrapper>
      <HeaderBack>
        <span onClick={() => history.push(ORGANIZATION_SETTING)}>
          {trans("settings.organization")}
        </span>
        <ArrowIcon />
        <span>{org.name}</span>
      </HeaderBack>
      <FieldWrapper>
        <BlurFinishInput
          inputStyle={{ height: "40px" }}
          label={trans("orgSettings.orgNameLabel")}
          mustFill
          valueCheck={{
            rule: (val) => val.trim() !== "",
            message: trans("orgSettings.orgNameCheckMsg"),
          }}
          defaultValue={org.name}
          onFinish={(value) => {
            dispatch(updateOrgAction({ id: org.id, orgName: value }));
          }}
        />
      </FieldWrapper>
    </Wrapper>
  );
}

export default OrgSettingContent;
