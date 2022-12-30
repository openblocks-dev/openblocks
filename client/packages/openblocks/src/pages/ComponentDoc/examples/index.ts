import { UICompType } from "comps/uiCompRegistry";
import ButtonExample from "./ButtonComp/Button";
import InputExample from "./textInputComp/Input";
import PasswordExample from "./textInputComp/Password";
import TextAreaExample from "./textInputComp/TextArea";
import RichTextEditorComp from "./textInputComp/RichTextEditor";
import NumberInputExample from "./numberInputComp/NumberInput";
import SliderExample from "./numberInputComp/Slider";
import RangeSliderExample from "./numberInputComp/RangeSlider";
import RatingExample from "./numberInputComp/Rating";
import SwitchExample from "./selectInputComp/Switch";
import SelectExample from "./selectInputComp/Select";
import MultiSelectExample from "./selectInputComp/MultiSelect";
import CascaderExample from "./selectInputComp/Cascader";
import CheckboxExample from "./selectInputComp/CheckBox";
import RadioExample from "./selectInputComp/Radio";
import SegmentedControlExample from "./selectInputComp/SegmentedControl";
import FileExample from "./selectInputComp/File";
import LinkExample from "./ButtonComp/LinkButton";
import DropdownExample from "./ButtonComp/DropDownButton";
import TextExample from "./presentationComp/text";
import TableExample from "./presentationComp/table";
import ImageExample from "./presentationComp/image";
import ProgressCircleExample from "./presentationComp/progressCircle";
import ProgressExample from "./presentationComp/progress";
import ChartExample from "./presentationComp/chart";
import FileViewerExample from "./presentationComp/fileViewer";
import DividerExample from "./presentationComp/divider";
import DateExample from "./CalendarInputComp/Date";
import TimeExample from "./CalendarInputComp/Time";
import DateRangeExample from "./CalendarInputComp/DateRange";
import TimeRangeExample from "./CalendarInputComp/TimeRange";
import jsonSchemaFormExample from "./formComp/JSONSchemaform";
import NavigationExample from "./Navigation";
import IFrameExample from "./IFrame";

const examples: { [key in UICompType]?: React.FunctionComponent } = {
  button: ButtonExample,
  input: InputExample,
  textArea: TextAreaExample,
  password: PasswordExample,
  richTextEditor: RichTextEditorComp,
  numberInput: NumberInputExample,
  slider: SliderExample,
  rangeSlider: RangeSliderExample,
  rating: RatingExample,
  switch: SwitchExample,
  select: SelectExample,
  multiSelect: MultiSelectExample,
  cascader: CascaderExample,
  checkbox: CheckboxExample,
  radio: RadioExample,
  segmentedControl: SegmentedControlExample,
  file: FileExample,
  date: DateExample,
  dateRange: DateRangeExample,
  time: TimeExample,
  timeRange: TimeRangeExample,
  link: LinkExample,
  dropdown: DropdownExample,
  text: TextExample,
  table: TableExample,
  image: ImageExample,
  progressCircle: ProgressCircleExample,
  progress: ProgressExample,
  chart: ChartExample,
  fileViewer: FileViewerExample,
  divider: DividerExample,
  jsonSchemaForm: jsonSchemaFormExample,
  navigation: NavigationExample,
  iframe: IFrameExample,
};

export default examples;
