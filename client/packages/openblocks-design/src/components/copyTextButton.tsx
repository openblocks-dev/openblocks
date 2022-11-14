import copy from "copy-to-clipboard";
import styled from "styled-components";
import { ReactComponent as Dcopy } from "icons/icon-copy.svg";
import { message } from "antd";
import { trans } from "i18n/design";

const Copy = styled(Dcopy)`
  :hover {
    cursor: pointer;
  }

  &:hover g {
    fill: #315efb;
  }
`;

export function CopyTextButton(props: { text: string }) {
  return (
    // <Button type="dashed" shape="circle" size="small" icon={<Copy />} onClick={(e) => copyToClipboard(props.text)} />
    <Copy
      onClick={(e) => {
        e.stopPropagation();
        if (props.text) {
          message.success(trans("notification.copySuccess"));
          return copy(props.text);
        }
        message.error(trans("notification.copyFail"));
        return;
      }}
    />
  );
}
