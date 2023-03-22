import styled from "styled-components";
import React, { ReactNode, useEffect, useState } from "react";
import { CustomModal } from "components/CustomModal";
import { trans } from "i18n";
import { DocLink } from "components/ExternalLink";
import { Input } from "components/Input";
import { TacoButton } from "components/button";
import { message, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { recommendJSLibrarySelector } from "redux/selectors/jsLibrarySelector";
import { JSLibraryInfo, JSLibraryLabel } from "components/JSLibraryTree";
import { fetchJSLibraryRecommendsAction } from "redux/reduxActions/jsLibraryActions";
import { DocBoldIcon, DownloadBoldIcon, DownloadedIcon } from "icons";
import { ActiveTextColor, GreyTextColor } from "constants/style";
import { LoadingOutlined } from "@ant-design/icons";
import { RecommendedJSLibraryMeta } from "api/jsLibraryApi";
import log from "loglevel";
import { TacoMarkDown } from "components/markdown";

const ModalLabel = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
`;
const InputWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin: 8px 0 24px;
`;

const JSLibraryRecommends = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 13px 56px;
  margin-top: 10px;
`;

const JSLibraryCardWrapper = styled.div`
  max-height: 106px;
  border-bottom: 1px solid #f0f0f0;
  width: 280px;
`;
const StyledDocIcon = styled(DocBoldIcon)`
  margin-right: 16px;
  cursor: pointer;
  color: ${GreyTextColor};

  :hover {
    color: ${ActiveTextColor};
  }
`;

const Markdown = styled(TacoMarkDown)`
  font-size: 14px;
`;

const handleDownload = (
  props: Pick<JSLibraryModalProps, "onSuccess" | "runInHost" | "onCheck" | "onLoad"> & {
    url: string;
    setLoading: (loading: boolean) => void;
  }
) => {
  const trimUrl = props.url.trim();
  if (!/^https?.+/.test(trimUrl)) {
    message.error(trans("preLoad.jsLibraryURLError"));
    return;
  }
  if (!props.onCheck(trimUrl)) {
    message.error(trans("preLoad.jsLibraryExist"));
    return;
  }
  props.setLoading(true);
  return props
    .onLoad(trimUrl)
    .then(() => {
      props.onSuccess(trimUrl);
      message.success(trans("preLoad.jsLibraryInstallSuccess"));
    })
    .catch((e) => {
      if (props.runInHost) {
        message.error(trans("preLoad.jsLibraryInstallFailedHost", { message: e.message }));
      } else {
        message.error(
          <Markdown>
            {trans("preLoad.jsLibraryInstallFailedCloud", { message: e.message })}
          </Markdown>
        );
      }
      log.warn(e);
      props.setLoading(false);
    });
};

const JSLibraryCard = (
  props: Pick<JSLibraryModalProps, "onSuccess" | "runInHost" | "onCheck" | "onLoad"> & {
    meta: RecommendedJSLibraryMeta;
  }
) => {
  const { meta } = props;

  const [loading, setLoading] = useState(false);

  const loadingChanged = props.onCheck(meta.downloadUrl);
  useEffect(() => {
    loading && setLoading(false);
  }, [loadingChanged]);

  return (
    <JSLibraryCardWrapper>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <JSLibraryLabel name={meta.name} version={meta.latestVersion} />
        <div style={{ display: "flex", alignItems: "center" }}>
          {meta.homepage && <StyledDocIcon onClick={() => window.open(meta.homepage, "_blank")} />}
          {loading ? (
            <Spin indicator={<LoadingOutlined style={{ fontSize: 15 }} spin />} />
          ) : !props.onCheck(meta.downloadUrl) ? (
            <DownloadedIcon />
          ) : (
            <DownloadBoldIcon
              cursor={"pointer"}
              onClick={() =>
                handleDownload({
                  ...props,
                  url: meta.downloadUrl,
                  setLoading,
                })
              }
            />
          )}
        </div>
      </div>
      <JSLibraryInfo description={meta.description} />
    </JSLibraryCardWrapper>
  );
};

interface JSLibraryModalProps {
  trigger: ReactNode;
  runInHost: boolean;
  onCheck: (url: string) => boolean;
  onLoad: (url: string) => Promise<any>;
  onSuccess: (url: string) => void;
}

export function JSLibraryModal(props: JSLibraryModalProps) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setURL] = useState("");

  const dispatch = useDispatch();

  const recommends = useSelector(recommendJSLibrarySelector);

  useEffect(() => {
    dispatch(fetchJSLibraryRecommendsAction());
  }, [dispatch]);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div
        onClick={() => {
          setVisible(true);
        }}
      >
        {props.trigger}
      </div>
      <CustomModal
        draggable
        visible={visible}
        title={
          <ModalLabel>
            {trans("preLoad.jsLibrary")}
            {trans("docUrls.thirdLib") && (
              <DocLink href={trans("docUrls.thirdLib")}>{trans("docUrls.thirdLibUrlText")}</DocLink>
            )}
          </ModalLabel>
        }
        onCancel={() => {
          setVisible(false);
        }}
        afterClose={() => setURL("")}
        destroyOnClose={true}
        showOkButton={false}
        showCancelButton={false}
        width="648px"
      >
        URL
        <InputWrapper>
          <Input
            placeholder={"https://cdn.example.com/example.min.js"}
            value={url}
            onChange={(e) => {
              setURL(e.target.value);
            }}
          />
          <TacoButton
            buttonType={"primary"}
            loading={loading}
            onClick={() =>
              handleDownload({
                ...props,
                url,
                setLoading,
                onSuccess: (url) => {
                  props.onSuccess(url);
                  setVisible(false);
                  setLoading(false);
                },
              })
            }
            style={{ minWidth: "80px" }}
          >
            {trans("preLoad.add")}
          </TacoButton>
        </InputWrapper>
        {trans("preLoad.recommended")}
        <JSLibraryRecommends>
          {recommends.map((r, idx) => (
            <JSLibraryCard key={idx} meta={r} {...props} />
          ))}
        </JSLibraryRecommends>
      </CustomModal>
    </div>
  );
}
