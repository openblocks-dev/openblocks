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
import {
  CalendarDeleteIcon,
  DocBoldIcon,
  DownloadBoldIcon,
  DownloadedIcon,
  ErrorIcon,
} from "icons";
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
`;

const JSLibraryRecommends = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 13px 56px;
  margin-top: 10px;
  overflow: hidden;
`;

const JSLibraryCardWrapper = styled.div`
  max-height: 106px;
  border-bottom: 1px solid #f0f0f0;
  width: 280px;
  margin-bottom: -1px;
`;
const StyledDocIcon = styled(DocBoldIcon)`
  margin-right: 16px;
  cursor: pointer;
  color: ${GreyTextColor};

  :hover {
    & > g > g {
      stroke: ${ActiveTextColor};
    }
  }
`;
const StyledDownloadIcon = styled(DownloadBoldIcon)`
  cursor: pointer;

  :hover {
    & > g > g {
      stroke: ${ActiveTextColor};
    }
  }
`;

const handleDownload = (
  props: Pick<JSLibraryModalProps, "onSuccess" | "runInHost" | "onCheck" | "onLoad"> & {
    url: string;
    setLoading: (loading: boolean) => void;
    setError: (error: URLErrorType) => void;
  }
) => {
  const trimUrl = props.url.trim();
  props.setLoading(true);
  return props
    .onLoad(trimUrl)
    .then(() => {
      props.onSuccess(trimUrl);
      message.success(trans("preLoad.jsLibraryInstallSuccess"));
    })
    .catch((e) => {
      if (props.runInHost) {
        props.setError({
          title: trans("preLoad.jsLibraryInstallFailed"),
          description: trans("preLoad.jsLibraryInstallFailedHost", { message: e.message }),
        });
      } else {
        props.setError({
          title: trans("preLoad.jsLibraryInstallFailed"),
          description: (
            <TacoMarkDown>
              {trans("preLoad.jsLibraryInstallFailedCloud", { message: e.message })}
            </TacoMarkDown>
          ),
        });
      }
      log.warn(e);
      props.setLoading(false);
    });
};

const JSLibraryCard = (
  props: Pick<JSLibraryModalProps, "onSuccess" | "runInHost" | "onCheck" | "onLoad"> & {
    meta: RecommendedJSLibraryMeta;
    setError: (error: URLErrorType) => void;
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
            <StyledDownloadIcon
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

const ErrorWrapper = styled.div`
  border-radius: 8px;
  background: #fff3f1;
  padding: 10px 16px;
  white-space: pre-wrap;
  margin-top: 16px;

  .error-title {
    font-size: 14px;
    font-weight: 500;
    display: flex;
    justify-content: space-between;

    .close-button {
      width: 8px;
      height: 8px;
      margin-right: -8px;
      cursor: pointer;
      color: #8b8fa3;
      display: none;

      :hover {
        color: #000000;
      }
    }
  }

  :hover {
    .close-button {
      display: block;
    }
  }

  .error-description a {
    :hover {
      color: #315efb;
    }
  }

  .markdown-body {
    background-color: unset;
    font-size: 13px;
  }
`;
const Error = (props: {
  title: string;
  description: ReactNode;
  setError: (error: URLErrorType) => void;
}) => (
  <ErrorWrapper>
    <div className={"error-title"}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <ErrorIcon />
        {props.title}
      </div>
      <CalendarDeleteIcon className={"close-button"} onClick={() => props.setError(undefined)} />
    </div>
    <div className={"error-description"}>{props.description}</div>
  </ErrorWrapper>
);

const HelpText = styled(TacoMarkDown)`
  font-size: 13px;
  color: ${GreyTextColor};
  margin: 8px 0;
  line-height: 13px;
`;

interface JSLibraryModalProps {
  trigger: ReactNode;
  runInHost: boolean;
  onCheck: (url: string) => boolean;
  onLoad: (url: string) => Promise<any>;
  onSuccess: (url: string) => void;
}

type URLErrorType = { title: string; description: ReactNode } | undefined;

export function JSLibraryModal(props: JSLibraryModalProps) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setURL] = useState("");
  const [urlError, setURLError] = useState<string | undefined>(undefined);
  const [installError, setInstallError] = useState<URLErrorType>(undefined);

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
        afterClose={() => {
          setURLError(undefined);
          setInstallError(undefined);
          setURL("");
        }}
        destroyOnClose={true}
        showOkButton={false}
        showCancelButton={false}
        width="648px"
      >
        <div style={{ lineHeight: "10px" }}>URL</div>
        <HelpText>{trans("preLoad.urlTooltip")}</HelpText>
        <InputWrapper>
          <Input
            status={urlError || installError ? "error" : undefined}
            placeholder={"https://cdn.example.com/example.min.js"}
            value={url}
            onChange={(e) => {
              setURL(e.target.value);
              const trimUrl = e.target.value.trim();
              if (trimUrl) {
                if (!/^https?.+/.test(trimUrl)) {
                  setURLError(trans("preLoad.jsLibraryURLError"));
                  return;
                }
                if (!props.onCheck(trimUrl)) {
                  setURLError(trans("preLoad.jsLibraryExist"));
                  return;
                }
              }
              setURLError(undefined);
            }}
          />
          <TacoButton
            buttonType={"primary"}
            loading={loading}
            disabled={!!urlError}
            onClick={() => {
              setInstallError(undefined);
              return handleDownload({
                ...props,
                url,
                setLoading,
                onSuccess: (url) => {
                  props.onSuccess(url);
                  setVisible(false);
                  setLoading(false);
                },
                setError: setInstallError,
              });
            }}
            style={{ minWidth: "80px" }}
          >
            {trans("preLoad.add")}
          </TacoButton>
        </InputWrapper>

        {urlError && <div style={{ color: "#ff4d4f", fontSize: "12px" }}>{urlError}</div>}

        {typeof installError === "object" && (
          <Error
            title={installError.title}
            description={installError.description}
            setError={setInstallError}
          />
        )}

        {recommends.length > 0 && (
          <>
            <div style={{ marginTop: "24px" }}>{trans("preLoad.recommended")}</div>
            <JSLibraryRecommends>
              {recommends.map((r, idx) => (
                <JSLibraryCard key={idx} meta={r} {...props} setError={setInstallError} />
              ))}
            </JSLibraryRecommends>
          </>
        )}
      </CustomModal>
    </div>
  );
}
