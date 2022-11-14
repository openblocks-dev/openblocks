import { useState } from "react";
import { getInitialsAndColorCode } from "util/stringUtils";
import { ImgWrapper } from "pages/common/profileImage";
import { fullAvatarUrl } from "util/urlUtils";

export default function OrgImage(props: {
  orgName?: string;
  className?: string;
  side?: number;
  source?: string;
}) {
  const initialsAndColorCode = getInitialsAndColorCode(props.orgName);
  const [hasErrorLoadingImage, setHasErrorLoadingImage] = useState(false);
  const sourceUrl = fullAvatarUrl(props.source);
  const shouldRenderImage = sourceUrl && !hasErrorLoadingImage;
  const backgroundColor = shouldRenderImage ? "transparent" : initialsAndColorCode[1];

  return (
    <ImgWrapper backgroundColor={backgroundColor} className={props.className} side={props.side}>
      {!shouldRenderImage ? (
        <span>{initialsAndColorCode[0]}</span>
      ) : (
        <img
          onError={() => setHasErrorLoadingImage(true)}
          onLoad={() => setHasErrorLoadingImage(false)}
          src={sourceUrl}
        />
      )}
    </ImgWrapper>
  );
}
