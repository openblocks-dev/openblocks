import "comps/comps/layout/navLayout";
import "comps/comps/layout/mobileTabLayout";
import { ModalComp } from "comps/hooks/modalComp";
import { ButtonComp } from "./comps/buttonComp/buttonComp";
import { DropdownComp } from "./comps/buttonComp/dropdownComp";
import { LinkComp } from "./comps/buttonComp/linkComp";
import { ContainerComp, defaultContainerData } from "./comps/containerComp/containerComp";
import { CustomComp } from "./comps/customComp/customComp";
import { DatePickerComp, DateRangeComp } from "./comps/dateComp/dateComp";
import { DividerComp } from "./comps/dividerComp";
import { FileComp } from "./comps/fileComp/fileComp";
import { FileViewerComp } from "./comps/fileViewerComp";
import { ImageComp } from "./comps/imageComp";
import { JsonSchemaFormComp } from "./comps/jsonSchemaFormComp/jsonSchemaFormComp";
import { NumberInputComp } from "./comps/numberInputComp/numberInputComp";
import { RangeSliderComp } from "./comps/numberInputComp/rangeSliderComp";
import { SliderComp } from "./comps/numberInputComp/sliderComp";
import { ProgressCircleComp } from "./comps/progressCircleComp";
import { ProgressComp } from "./comps/progressComp";
import { RatingComp } from "./comps/ratingComp";
import { RichTextEditorComp } from "./comps/richTextEditorComp";
import { CascaderWithDefault } from "./comps/selectInputComp/cascaderComp";
import { CheckboxComp } from "./comps/selectInputComp/checkboxComp";
import { MultiSelectComp } from "./comps/selectInputComp/multiSelectComp";
import { RadioComp } from "./comps/selectInputComp/radioComp";
import { SegmentedControlComp } from "./comps/selectInputComp/segmentedControl";
import { SelectComp } from "./comps/selectInputComp/selectComp";
import { SwitchComp } from "./comps/switchComp";
import { defaultTableData } from "./comps/tableComp/mockTableComp";
import { TabbedContainerComp } from "./comps/tabs";
import { TextComp } from "./comps/textComp";
import { InputComp } from "./comps/textInputComp/inputComp";
import { PasswordComp } from "./comps/textInputComp/passwordComp";
import { TextAreaComp } from "./comps/textInputComp/textAreaComp";
import { TimePickerComp, TimeRangeComp } from "./comps/dateComp/timeComp";

import {
  AudioCompIcon,
  ButtonCompIcon,
  CalendarCompIcon,
  CarouselCompIcon,
  CascaderCompIcon,
  ChartCompIcon,
  CheckboxCompIcon,
  CollapsibleContainerCompIcon,
  ContainerCompIcon,
  CustomCompIcon,
  DateCompIcon,
  DateRangeCompIcon,
  DividerCompIcon,
  DrawerCompIcon,
  DropdownCompIcon,
  FileViewerCompIcon,
  FormCompIcon,
  GridCompIcon,
  IFrameCompIcon,
  ImageCompIcon,
  imageEditorIcon,
  InputCompIcon,
  JsonEditorCompIcon,
  JsonExplorerCompIcon,
  JsonFormCompIcon,
  LinkCompIcon,
  ListViewIcon,
  ModalCompIcon,
  MultiSelectCompIcon,
  NavComIcon,
  NumberInputCompIcon,
  PasswordCompIcon,
  ProcessCircleCompIcon,
  ProgressCompIcon,
  QRCodeCompIcon,
  RadioCompIcon,
  RangeSliderCompIcon,
  RatingCompIcon,
  RichTextEditorCompIcon,
  ScannerIcon,
  SegmentedCompIcon,
  SelectCompIcon,
  SignatureIcon,
  SliderCompIcon,
  SwitchCompIcon,
  TabbedContainerCompIcon,
  TableCompIcon,
  TextAreaCompIcon,
  TextCompIcon,
  TimeCompIcon,
  TimeRangeCompIcon,
  ToggleButtonCompIcon,
  TreeIcon,
  TreeSelectIcon,
  UploadCompIcon,
  VideoCompIcon,
} from "openblocks-design";

import { defaultFormData, FormComp } from "./comps/formComp/formComp";
import { IFrameComp } from "./comps/iframeComp";
import { defaultGridData, defaultListViewData, GridComp, ListViewComp } from "./comps/listViewComp";
import { ModuleComp } from "./comps/moduleComp/moduleComp";
import { NavComp } from "./comps/navComp/navComp";
import { TableComp } from "./comps/tableComp";
import { registerComp, UICompManifest, UICompType } from "./uiCompRegistry";
import { QRCodeComp } from "./comps/qrCodeComp";
import { JsonExplorerComp } from "./comps/jsonComp/jsonExplorerComp";
import { JsonEditorComp } from "./comps/jsonComp/jsonEditorComp";
import { TreeComp } from "./comps/treeComp/treeComp";
import { TreeSelectComp } from "./comps/treeComp/treeSelectComp";
import { trans } from "i18n";
import { remoteComp } from "./comps/remoteComp/remoteComp";
import { AudioComp } from "./comps/mediaComp/audioComp";
import { VideoComp } from "./comps/mediaComp/videoComp";
import { DrawerComp } from "./hooks/drawerComp";
import { CarouselComp } from "./comps/carouselComp";
import { ToggleButtonComp } from "./comps/buttonComp/toggleButtonComp";
import { defaultCollapsibleContainerData } from "./comps/containerComp/collapsibleContainerComp";
import { RemoteCompInfo } from "types/remoteComp";
import { ScannerComp } from "./comps/buttonComp/scannerComp";
import { SignatureComp } from "./comps/signatureComp";

type Registry = {
  [key in UICompType]?: UICompManifest;
};

const builtInRemoteComps: Omit<RemoteCompInfo, "compName"> = {
  source: !!REACT_APP_BUNDLE_BUILTIN_PLUGIN ? "bundle" : "npm",
  isRemote: true,
  packageName: "openblocks-comps",
};

const uiCompMap: Registry = {
  input: {
    name: trans("uiComp.inputCompName"),
    enName: "Input",
    description: trans("uiComp.inputCompDesc"),
    categories: ["dataInputText", "common"],
    icon: InputCompIcon,
    keywords: trans("uiComp.inputCompKeywords"),
    comp: InputComp,
  },
  textArea: {
    name: trans("uiComp.textAreaCompName"),
    enName: "Text Area",
    description: trans("uiComp.textAreaCompDesc"),
    categories: ["dataInputText"],
    icon: TextAreaCompIcon,
    keywords: trans("uiComp.textAreaCompKeywords"),
    comp: TextAreaComp,
  },
  password: {
    name: trans("uiComp.passwordCompName"),
    enName: "Password",
    description: trans("uiComp.passwordCompDesc"),
    categories: ["dataInputText"],
    icon: PasswordCompIcon,
    keywords: trans("uiComp.passwordCompKeywords"),
    comp: PasswordComp,
  },
  richTextEditor: {
    name: trans("uiComp.richTextEditorCompName"),
    enName: "Rich Text Editor",
    categories: ["dataInputText"],
    description: trans("uiComp.richTextEditorCompDesc"),
    icon: RichTextEditorCompIcon,
    keywords: trans("uiComp.richTextEditorCompKeywords"),
    comp: RichTextEditorComp,
    layoutInfo: {
      w: 8,
      h: 25,
    },
  },
  numberInput: {
    name: trans("uiComp.numberInputCompName"),
    enName: "Number Input",
    description: trans("uiComp.numberInputCompDesc"),
    categories: ["dataInputNumber"],
    icon: NumberInputCompIcon,
    keywords: trans("uiComp.numberInputCompKeywords"),
    comp: NumberInputComp,
  },
  slider: {
    name: trans("uiComp.sliderCompName"),
    enName: "Slider",
    description: trans("uiComp.sliderCompDesc"),
    categories: ["dataInputNumber"],
    icon: SliderCompIcon,
    keywords: trans("uiComp.sliderCompKeywords"),
    comp: SliderComp,
    layoutInfo: {
      w: 8,
      h: 5,
    },
  },
  rangeSlider: {
    name: trans("uiComp.rangeSliderCompName"),
    enName: "Range Slider",
    description: trans("uiComp.rangeSliderCompDesc"),
    categories: ["dataInputNumber"],
    icon: RangeSliderCompIcon,
    keywords: trans("uiComp.rangeSliderCompKeywords"),
    comp: RangeSliderComp,
    layoutInfo: {
      w: 8,
      h: 5,
    },
  },
  rating: {
    name: trans("uiComp.ratingCompName"),
    enName: "Rating",
    description: trans("uiComp.ratingCompDesc"),
    categories: ["dataInputNumber"],
    icon: RatingCompIcon,
    keywords: trans("uiComp.ratingCompKeywords"),
    comp: RatingComp,
  },
  switch: {
    name: trans("uiComp.switchCompName"),
    enName: "Switch",
    description: trans("uiComp.switchCompDesc"),
    categories: ["dataInputSelect"],
    icon: SwitchCompIcon,
    keywords: trans("uiComp.switchCompKeywords"),
    comp: SwitchComp,
  },
  select: {
    name: trans("uiComp.selectCompName"),
    enName: "Select",
    description: trans("uiComp.selectCompDesc"),
    categories: ["dataInputSelect", "common"],
    icon: SelectCompIcon,
    keywords: trans("uiComp.selectCompKeywords"),
    comp: SelectComp,
  },
  multiSelect: {
    name: trans("uiComp.multiSelectCompName"),
    enName: "Multiselect",
    description: trans("uiComp.multiSelectCompDesc"),
    categories: ["dataInputSelect"],
    icon: MultiSelectCompIcon,
    keywords: trans("uiComp.multiSelectCompKeywords"),
    comp: MultiSelectComp,
    layoutInfo: {
      w: 6,
      h: 5,
    },
  },
  cascader: {
    name: trans("uiComp.cascaderCompName"),
    enName: "Cascader",
    description: trans("uiComp.cascaderCompDesc"),
    categories: ["dataInputSelect"],
    icon: CascaderCompIcon,
    keywords: trans("uiComp.cascaderCompKeywords"),
    comp: CascaderWithDefault,
    layoutInfo: {
      w: 9,
      h: 5,
    },
  },
  checkbox: {
    name: trans("uiComp.checkboxCompName"),
    enName: "Checkbox",
    description: trans("uiComp.checkboxCompDesc"),
    categories: ["dataInputSelect"],
    icon: CheckboxCompIcon,
    keywords: trans("uiComp.checkboxCompKeywords"),
    comp: CheckboxComp,
    layoutInfo: {
      w: 5,
      h: 7,
    },
  },
  radio: {
    name: trans("uiComp.radioCompName"),
    enName: "Radio",
    description: trans("uiComp.radioCompDesc"),
    categories: ["dataInputSelect"],
    icon: RadioCompIcon,
    keywords: trans("uiComp.radioCompKeywords"),
    comp: RadioComp,
    layoutInfo: {
      w: 5,
      h: 7,
    },
  },
  segmentedControl: {
    name: trans("uiComp.segmentedControlCompName"),
    enName: "Segmented Control",
    description: trans("uiComp.segmentedControlCompDesc"),
    categories: ["dataInputSelect"],
    icon: SegmentedCompIcon,
    keywords: trans("uiComp.segmentedControlCompKeywords"),
    comp: SegmentedControlComp,
  },
  file: {
    name: trans("uiComp.fileUploadCompName"),
    enName: "File Upload",
    description: trans("uiComp.fileUploadCompDesc"),
    categories: ["dataInputSelect"],
    icon: UploadCompIcon,
    keywords: trans("uiComp.fileUploadCompKeywords"),
    comp: FileComp,
  },
  date: {
    name: trans("uiComp.dateCompName"),
    enName: "Date",
    description: trans("uiComp.dateCompDesc"),
    categories: ["dataInputDate"],
    icon: DateCompIcon,
    keywords: trans("uiComp.dateCompKeywords"),
    comp: DatePickerComp,
    layoutInfo: {
      w: 6,
      h: 5,
    },
  },
  dateRange: {
    name: trans("uiComp.dateRangeCompName"),
    enName: "Date Range",
    description: trans("uiComp.dateRangeCompDesc"),
    categories: ["dataInputDate"],
    icon: DateRangeCompIcon,
    keywords: trans("uiComp.dateRangeCompKeywords"),
    comp: DateRangeComp,
    layoutInfo: {
      w: 9,
      h: 5,
    },
  },
  time: {
    name: trans("uiComp.timeCompName"),
    enName: "Time",
    description: trans("uiComp.timeCompDesc"),
    categories: ["dataInputDate"],
    icon: TimeCompIcon,
    keywords: trans("uiComp.timeCompKeywords"),
    comp: TimePickerComp,
    layoutInfo: {
      w: 6,
      h: 5,
    },
  },
  timeRange: {
    name: trans("uiComp.timeRangeCompName"),
    enName: "Time Range",
    categories: ["dataInputDate"],
    description: trans("uiComp.timeRangeCompDesc"),
    icon: TimeRangeCompIcon,
    keywords: trans("uiComp.timeRangeCompKeywords"),
    comp: TimeRangeComp,
    layoutInfo: {
      w: 9,
      h: 5,
    },
  },
  button: {
    name: trans("uiComp.buttonCompName"),
    enName: "Button",
    description: trans("uiComp.buttonCompDesc"),
    categories: ["button", "common"],
    icon: ButtonCompIcon,
    keywords: trans("uiComp.buttonCompKeywords"),
    comp: ButtonComp,
    layoutInfo: {
      w: 3,
      h: 5,
    },
    withoutLoading: true,
  },
  link: {
    name: trans("uiComp.linkCompName"),
    enName: "Link",
    description: trans("uiComp.linkCompDesc"),
    categories: ["button"],
    icon: LinkCompIcon,
    keywords: trans("uiComp.linkCompKeywords"),
    comp: LinkComp,
  },
  dropdown: {
    name: trans("uiComp.dropdownCompName"),
    enName: "Dropdown",
    description: trans("uiComp.dropdownCompDesc"),
    categories: ["button"],
    icon: DropdownCompIcon,
    keywords: trans("uiComp.dropdownCompKeywords"),
    comp: DropdownComp,
  },
  toggleButton: {
    name: trans("uiComp.toggleButtonCompName"),
    enName: "Toggle Button",
    description: trans("uiComp.toggleButtonCompDesc"),
    categories: ["button"],
    icon: ToggleButtonCompIcon,
    keywords: trans("uiComp.toggleButtonCompKeywords"),
    comp: ToggleButtonComp,
  },
  text: {
    name: trans("uiComp.textCompName"),
    enName: "Text",
    description: trans("uiComp.textCompDesc"),
    categories: ["dataDisplay", "common"],
    icon: TextCompIcon,
    keywords: trans("uiComp.textCompKeywords"),
    comp: TextComp,
  },
  table: {
    name: trans("uiComp.tableCompName"),
    enName: "Table",
    description: trans("uiComp.tableCompDesc"),
    categories: ["dataDisplay", "common"],
    icon: TableCompIcon,
    keywords: trans("uiComp.tableCompKeywords"),
    comp: TableComp,
    layoutInfo: {
      w: 15,
      h: 40,
    },
    defaultDataFn: defaultTableData,
    withoutLoading: true,
  },
  image: {
    name: trans("uiComp.imageCompName"),
    enName: "Image",
    description: trans("uiComp.imageCompDesc"),
    categories: ["dataDisplay", "common"],
    icon: ImageCompIcon,
    keywords: trans("uiComp.imageCompKeywords"),
    comp: ImageComp,
    layoutInfo: {
      w: 5,
      h: 24,
    },
  },
  progress: {
    name: trans("uiComp.progressCompName"),
    enName: "Progress",
    description: trans("uiComp.progressCompDesc"),
    categories: ["dataDisplay"],
    icon: ProgressCompIcon,
    keywords: trans("uiComp.progressCompKeywords"),
    comp: ProgressComp,
  },
  progressCircle: {
    name: trans("uiComp.progressCircleCompName"),
    enName: "Process Circle",
    description: trans("uiComp.progressCircleCompDesc"),
    categories: ["dataDisplay"],
    icon: ProcessCircleCompIcon,
    keywords: trans("uiComp.progressCircleCompKeywords"),
    comp: ProgressCircleComp,
    layoutInfo: {
      w: 4,
      h: 19,
    },
  },
  fileViewer: {
    name: trans("uiComp.fileViewerCompName"),
    enName: "File Viewer",
    description: trans("uiComp.fileViewerCompDesc"),
    categories: ["dataDisplay"],
    icon: FileViewerCompIcon,
    keywords: trans("uiComp.fileViewerCompKeywords"),
    comp: FileViewerComp,
  },
  divider: {
    name: trans("uiComp.dividerCompName"),
    enName: "Divider",
    description: trans("uiComp.dividerCompDesc"),
    categories: ["dataDisplay"],
    icon: DividerCompIcon,
    keywords: trans("uiComp.dividerCompKeywords"),
    comp: DividerComp,
    layoutInfo: {
      w: 14,
      h: 1,
    },
  },
  qrCode: {
    name: trans("uiComp.qrCodeCompName"),
    enName: "QR Code",
    description: trans("uiComp.qrCodeCompDesc"),
    categories: ["dataDisplay"],
    icon: QRCodeCompIcon,
    keywords: trans("uiComp.qrCodeCompKeywords"),
    comp: QRCodeComp,
    layoutInfo: {
      w: 4,
      h: 19,
    },
  },
  form: {
    name: trans("uiComp.formCompName"),
    enName: "Form",
    description: trans("uiComp.formCompDesc"),
    categories: ["container", "common"],
    icon: FormCompIcon,
    keywords: trans("uiComp.formCompKeywords"),
    comp: FormComp,
    withoutLoading: true,
    layoutInfo: {
      w: 9,
      h: 31,
      // static: true,
      delayCollision: true,
    },
    defaultDataFn: defaultFormData,
  },
  jsonSchemaForm: {
    name: trans("uiComp.jsonSchemaFormCompName"),
    enName: "JSON Schema Form",
    description: trans("uiComp.jsonSchemaFormCompDesc"),
    categories: ["container"],
    icon: JsonFormCompIcon,
    keywords: trans("uiComp.jsonSchemaFormCompKeywords"),
    comp: JsonSchemaFormComp,
    layoutInfo: {
      w: 8,
      h: 50,
    },
  },
  container: {
    name: trans("uiComp.containerCompName"),
    enName: "Container",
    description: trans("uiComp.containerCompDesc"),
    categories: ["container", "common"],
    icon: ContainerCompIcon,
    keywords: trans("uiComp.containerCompKeywords"),
    comp: ContainerComp,
    withoutLoading: true,
    layoutInfo: {
      w: 9,
      h: 25,
      // static: true,
      delayCollision: true,
    },
    defaultDataFn: defaultContainerData,
  },
  tabbedContainer: {
    name: trans("uiComp.tabbedContainerCompName"),
    enName: "Tabbed Container",
    description: trans("uiComp.tabbedContainerCompDesc"),
    categories: ["container", "common"],
    icon: TabbedContainerCompIcon,
    keywords: trans("uiComp.tabbedContainerCompKeywords"),
    comp: TabbedContainerComp,
    withoutLoading: true,
    layoutInfo: {
      w: 9,
      h: 27,
      // static: true,
      delayCollision: true,
    },
  },
  modal: {
    name: trans("uiComp.modalCompName"),
    enName: "Modal",
    icon: ModalCompIcon,
    description: trans("uiComp.modalCompDesc"),
    categories: ["container", "common"],
    keywords: trans("uiComp.modalCompKeywords"),
    comp: ModalComp,
    withoutLoading: true,
  },
  listView: {
    name: trans("uiComp.listViewCompName"),
    enName: "List View",
    icon: ListViewIcon,
    description: trans("uiComp.listViewCompDesc"),
    categories: ["container", "common"],
    keywords: trans("uiComp.listViewCompKeywords"),
    comp: ListViewComp,
    layoutInfo: {
      h: 47,
      w: 10,
      delayCollision: true,
    },
    defaultDataFn: defaultListViewData,
  },
  grid: {
    name: trans("uiComp.gridCompName"),
    enName: "Grid",
    icon: GridCompIcon,
    description: trans("uiComp.gridCompDesc"),
    categories: ["container"],
    keywords: trans("uiComp.gridCompKeywords"),
    comp: GridComp,
    layoutInfo: {
      h: 32,
      w: 15,
      delayCollision: true,
    },
    defaultDataFn: defaultGridData,
  },
  navigation: {
    name: trans("uiComp.navigationCompName"),
    enName: "Navigation",
    description: trans("uiComp.navigationCompDesc"),
    icon: NavComIcon,
    categories: ["other"],
    keywords: trans("uiComp.navigationCompKeywords"),
    comp: NavComp,
    layoutInfo: {
      w: 13,
      h: 5,
    },
  },
  iframe: {
    name: trans("uiComp.iframeCompName"),
    enName: "IFrame",
    description: trans("uiComp.iframeCompDesc"),
    icon: IFrameCompIcon,
    categories: ["other"],
    keywords: trans("uiComp.iframeCompKeywords"),
    comp: IFrameComp,
    layoutInfo: {
      w: 13,
      h: 52,
    },
  },
  custom: {
    name: trans("uiComp.customCompName"),
    enName: "Custom Component",
    description: trans("uiComp.customCompDesc"),
    icon: CustomCompIcon,
    categories: ["other"],
    keywords: trans("uiComp.customCompKeywords"),
    comp: CustomComp,
    layoutInfo: {
      w: 9,
      h: 26,
    },
  },
  module: {
    name: trans("uiComp.moduleCompName"),
    enName: "Module",
    icon: CustomCompIcon,
    description: trans("uiComp.moduleCompDesc"),
    categories: [],
    keywords: trans("uiComp.moduleCompKeywords"),
    comp: ModuleComp,
    layoutInfo: {
      w: 9,
      h: 26,
    },
  },
  jsonExplorer: {
    name: trans("uiComp.jsonExplorerCompName"),
    enName: "JSON Explorer",
    description: trans("uiComp.jsonExplorerCompDesc"),
    categories: ["dataDisplay"],
    icon: JsonExplorerCompIcon,
    keywords: trans("uiComp.jsonExplorerCompKeywords"),
    comp: JsonExplorerComp,
    layoutInfo: {
      w: 10,
      h: 47,
    },
  },
  jsonEditor: {
    name: trans("uiComp.jsonEditorCompName"),
    enName: "JSON Editor",
    description: trans("uiComp.jsonEditorCompDesc"),
    categories: ["dataInputText"],
    icon: JsonEditorCompIcon,
    keywords: trans("uiComp.jsonEditorCompKeywords"),
    comp: JsonEditorComp,
    layoutInfo: {
      w: 10,
      h: 42,
    },
  },
  tree: {
    name: trans("uiComp.treeCompName"),
    enName: "Tree",
    description: trans("uiComp.treeCompDesc"),
    categories: ["dataDisplay"],
    icon: TreeIcon,
    keywords: trans("uiComp.treeCompKeywords"),
    comp: TreeComp,
    layoutInfo: {
      w: 11,
      h: 35,
    },
  },
  treeSelect: {
    name: trans("uiComp.treeSelectCompName"),
    enName: "Tree Select",
    description: trans("uiComp.treeSelectCompDesc"),
    categories: ["dataInputSelect"],
    icon: TreeSelectIcon,
    keywords: trans("uiComp.treeSelectCompKeywords"),
    comp: TreeSelectComp,
    layoutInfo: {
      w: 9,
      h: 5,
    },
  },
  audio: {
    name: trans("uiComp.audioCompName"),
    enName: "Audio",
    description: trans("uiComp.audioCompDesc"),
    categories: ["dataDisplay"],
    icon: AudioCompIcon,
    keywords: trans("uiComp.audioCompKeywords"),
    comp: AudioComp,
    layoutInfo: {
      w: 10,
      h: 5,
    },
  },
  video: {
    name: trans("uiComp.videoCompName"),
    enName: "Video",
    description: trans("uiComp.videoCompDesc"),
    categories: ["dataDisplay"],
    icon: VideoCompIcon,
    keywords: trans("uiComp.videoCompKeywords"),
    comp: VideoComp,
    layoutInfo: {
      w: 15,
      h: 40,
    },
  },
  drawer: {
    name: trans("uiComp.drawerCompName"),
    enName: "Drawer",
    description: trans("uiComp.drawerCompDesc"),
    categories: ["container"],
    icon: DrawerCompIcon,
    keywords: trans("uiComp.drawerCompKeywords"),
    comp: DrawerComp,
    withoutLoading: true,
  },
  carousel: {
    name: trans("uiComp.carouselCompName"),
    enName: "Carousel",
    description: trans("uiComp.carouselCompDesc"),
    categories: ["dataDisplay"],
    icon: CarouselCompIcon,
    keywords: trans("uiComp.drawerCompKeywords"),
    comp: CarouselComp,
    withoutLoading: true,
    layoutInfo: {
      w: 11,
      h: 25,
    },
  },
  collapsibleContainer: {
    name: trans("uiComp.collapsibleContainerCompName"),
    enName: "Collapsible Container",
    description: trans("uiComp.collapsibleContainerCompDesc"),
    categories: ["container"],
    icon: CollapsibleContainerCompIcon,
    keywords: trans("uiComp.collapsibleContainerCompKeywords"),
    comp: ContainerComp,
    withoutLoading: true,
    layoutInfo: {
      w: 9,
      h: 25,
      // static: true,
      delayCollision: true,
    },
    defaultDataFn: defaultCollapsibleContainerData,
  },
  chart: {
    name: trans("uiComp.chartCompName"),
    enName: "Chart",
    description: trans("uiComp.chartCompDesc"),
    categories: ["dataDisplay", "common"],
    icon: ChartCompIcon,
    comp: remoteComp({ ...builtInRemoteComps, compName: "chart" }),
    keywords: trans("uiComp.chartCompKeywords"),
    layoutInfo: {
      w: 11,
      h: 35,
    },
  },
  imageEditor: {
    name: trans("uiComp.imageEditorCompName"),
    enName: "Image Editor",
    comp: remoteComp({ ...builtInRemoteComps, compName: "imageEditor" }),
    description: trans("uiComp.imageEditorCompDesc"),
    categories: ["dataDisplay"],
    icon: imageEditorIcon,
    keywords: trans("uiComp.imageEditorCompKeywords"),
    layoutInfo: {
      w: 15,
      h: 60,
    },
  },
  scanner: {
    name: trans("uiComp.scannerCompName"),
    enName: "Scanner",
    description: trans("uiComp.scannerCompDesc"),
    categories: ["dataInputSelect"],
    icon: ScannerIcon,
    keywords: trans("uiComp.scannerCompKeywords"),
    comp: ScannerComp,
  },
  calendar: {
    name: trans("uiComp.calendarCompName"),
    enName: "Calendar",
    description: trans("uiComp.calendarCompDesc"),
    categories: ["dataInputDate"],
    icon: CalendarCompIcon,
    keywords: trans("uiComp.calendarCompKeywords"),
    comp: remoteComp({ ...builtInRemoteComps, compName: "calendar" }),
    layoutInfo: {
      w: 24,
      h: 60,
    }
  },
  signature: {
    name: trans("uiComp.signatureCompName"),
    enName: "Signature",
    description: trans("uiComp.signatureCompDesc"),
    categories: ["dataInputSelect"],
    icon: SignatureIcon,
    keywords: trans("uiComp.signatureCompKeywords"),
    comp: SignatureComp,
    layoutInfo: {
      w: 9,
      h: 35,
    },
  },
};

export function loadComps() {
  const entries = Object.entries(uiCompMap);
  for (const [compType, manifest] of entries) {
    registerComp(compType as UICompType, manifest);
  }
}
