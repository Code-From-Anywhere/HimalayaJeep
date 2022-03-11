import DataForm, {
  setConfig,
  makeInputField,
  Field,
  Keys,
  DataFormProps,
} from "react-with-native-form";

import TextInput, { TextInputType } from "react-with-native-text-input";
import PasswordInput, {
  PasswordInputType,
} from "react-with-native-password-input";
import ToggleInput, { ToggleInputType } from "react-with-native-toggle-input";
import ImageInput, { ImageInputType, ImageValue } from "./ImageInput";

// import SelectInput, { SelectInputType } from "react-with-native-select-input";
import TextAreaInput, {
  TextAreaInputType,
} from "react-with-native-textarea-input";
import DateInput, { DateInputType } from "react-with-native-date-input";
import PhoneInput, { PhoneInputType } from "react-with-native-phone-input";
import NumberInput, { NumberInputType } from "react-with-native-number-input";

export const isValidImage = (value: ImageValue | null) =>
  !!value?.base64 && !!value?.url;

const text = {
  component: TextInput,
};

const phone = {
  component: PhoneInput,
};
const date = {
  component: DateInput,
};
const password = {
  component: PasswordInput,
};

const toggle = {
  component: ToggleInput,
};

const image = {
  component: ImageInput,
};

// const select = {
//   component: SelectInput,
// };

const textArea = {
  component: TextAreaInput,
};

const number = {
  component: NumberInput,
};

const plugins = {
  text,
  password,
  toggle,
  image,
  // select,
  textArea,
  date,
  phone,
  number,
};

export const makeField = <T extends Keys<AllInputs>>(
  type: T,
  config: Omit<Field<AllInputs, T>, "type">
) => makeInputField<AllInputs, T>(type, config);

export interface AllInputs {
  text: TextInputType;
  password: PasswordInputType;
  toggle: ToggleInputType;
  image: ImageInputType;
  // select: SelectInputType;
  textArea: TextAreaInputType;
  date: DateInputType;
  phone: PhoneInputType;
  number: NumberInputType;
}

export const Form = <TState extends { [key: string]: any } = any>(
  props: DataFormProps<AllInputs, TState>
) =>
  setConfig<AllInputs, TState>(DataForm, {
    plugins,
  })(props);
