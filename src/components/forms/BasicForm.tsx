import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { FormEvent } from "react";
import LoadingButton from "@mui/lab/LoadingButton";

interface ControlFormProps {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  types?: any;
}

const ControlForm = (props: ControlFormProps) => {
  let type = "text";
  if (props.name.includes("password")) {
    type = "password";
  }
  if (props.name.includes("number")) {
    type = "number";
  }
  const label = props.label.split("_").join(" ").toLowerCase();

  if (props.name.includes("type") && props.types) {
    return (
      <FormControl className="login__formControl">
        <InputLabel htmlFor={props.id}>{label}</InputLabel>
        <Select
          labelId={props.id}
          id={props.id}
          name={props.name}
          value={props.value}
          label={label}
          onChange={props.onChange}
        >
          {Object.keys(props.types[props.name]).map((key, index) => (
            <MenuItem key={index} value={key}>
              {props.types[props.name][key]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  return (
    <FormControl className="login__formControl">
      <InputLabel htmlFor={props.id}>{label}</InputLabel>
      <Input
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        type={type}
      />
    </FormControl>
  );
};

interface FormProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleChange: (e: any) => void;
  form: any;
  loading: boolean;
  submitLabel?: string;
  types?: any;
}

export default function BasicForm(props: FormProps) {
  return (
    <form className="login__form" onSubmit={props.handleSubmit}>
      {Object.keys(props.form).map((key, index) => {
        return (
          <ControlForm
            id={key}
            label={key}
            name={key}
            key={index}
            value={props.form[key] as string}
            onChange={props.handleChange}
            types={props.types}
          />
        );
      })}

      <LoadingButton
        loading={props.loading}
        variant="outlined"
        type="submit"
        className="login__submit"
      >
        {props.submitLabel ? props.submitLabel : "Submit"}
      </LoadingButton>
    </form>
  );
}
