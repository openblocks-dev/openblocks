import { ThemeType } from "api/commonSettingApi";
import { useState } from "react";
import { themeTemplateList } from "./themeConstant";
import { RadioCheckedIcon } from "openblocks-design";
import { SwitchCheckedIcon } from "openblocks-design";
import { RequiredIcon } from "openblocks-design";
import { SuccessIcon } from "openblocks-design";
import {
  CustomModalStyled,
  ModalNameDiv,
  ScrollBarStyled,
  SelectContainer,
  SelectTitle,
  SelectTitleTheme,
  ThemeBtn,
  TacoInputStyled,
} from "./styledComponents";
import { genQueryId } from "comps/utils/idGenerator";
import { trans } from "i18n";

type CreateModalProp = {
  themeList: ThemeType[] | undefined | null;
  modalVisible: boolean;
  closeModal: () => void;
  createTheme: (params: ThemeType) => void;
};

function CreateModal(props: CreateModalProp) {
  const { themeList, modalVisible, closeModal, createTheme } = props;

  const [name, setName] = useState("");
  const [exceedInput, setExceedInput] = useState(false);
  const [selectId, setSelectId] = useState(themeTemplateList[0].id);

  function handleOk() {
    const params = {
      name,
      id: genQueryId(),
      updateTime: new Date().getTime(),
      theme: (themeList?.find((theme) => theme.id === selectId)?.theme ||
        themeTemplateList.find((template) => template.id === selectId)?.theme)!,
    };
    createTheme(params);
  }

  function handleCancel() {
    closeModal();
    setName("");
    setSelectId(themeTemplateList[0].id);
  }

  const ThemeBtnContainer = (props: { theme: ThemeType }) => {
    const { theme } = props;
    return (
      <ThemeBtn
        key={theme.id}
        theme={theme.theme}
        onClick={() => setSelectId(theme.id)}
        className={selectId === theme.id ? "selected" : ""}
      >
        <SuccessIcon />
        <div>
          <div>
            <span className="name">{theme.name}</span>
            <span>
              <SwitchCheckedIcon />
            </span>
          </div>
          <div>
            <div>
              <span className="radio">
                <RadioCheckedIcon /> {trans("theme.option", { index: 1 })}
              </span>
              <span className="radio">
                <span></span> {trans("theme.option", { index: 2 })}
              </span>
            </div>
            <span>
              {trans("theme.input")}
              <span className="input-span"></span>
            </span>
          </div>
          <div>
            <span className="button-span">{trans("theme.confirm")}</span>
          </div>
        </div>
      </ThemeBtn>
    );
  };

  return (
    <CustomModalStyled
      width="602px"
      title={trans("theme.createTheme")}
      visible={modalVisible}
      onOk={handleOk}
      okButtonProps={{ disabled: !name || !selectId }}
      onCancel={handleCancel}
      destroyOnClose
      draggable={true}
    >
      <ModalNameDiv>
        <RequiredIcon />
        <span>{trans("theme.themeName")}</span>
      </ModalNameDiv>
      <TacoInputStyled
        defaultValue={name}
        className={exceedInput ? "exceed" : ""}
        placeholder={trans("theme.themeNamePlaceholder")}
        maxLength={25}
        suffix={
          <>
            <span className="input-length">{name.length}</span> / 25
          </>
        }
        onChange={(e) => {
          setName(e.target.value);
          setExceedInput(e.target.value.length > 25);
        }}
      />
      <ScrollBarStyled
        style={{
          height: themeList?.length ? (themeList?.length > 3 ? "363px" : "313px") : "156px",
          marginBottom: (!!themeList?.length && themeList?.length) > 3 ? "4px" : "0",
        }}
      >
        <SelectTitle>{trans("theme.defaultThemeTip")}</SelectTitle>
        <SelectContainer>
          {themeTemplateList.map((theme) => (
            <ThemeBtnContainer theme={theme} key={theme.id} />
          ))}
        </SelectContainer>
        {!!themeList?.length && (
          <>
            <SelectTitleTheme>{trans("theme.createdThemeTip")}</SelectTitleTheme>
            <SelectContainer>
              {themeList.map((theme) => (
                <ThemeBtnContainer theme={theme} key={theme.id} />
              ))}
            </SelectContainer>
          </>
        )}
      </ScrollBarStyled>
    </CustomModalStyled>
  );
}

export default CreateModal;
