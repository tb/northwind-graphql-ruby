import React from 'react';
import {FormGroup, Label, Input, FormFeedback} from 'reactstrap';

const SelectInput = ({
  options = [],
  field: {name, ...field},
  form: {touched, errors},
  ...props
}) => (
  <FormGroup>
    {props.label && <Label>{props.label}</Label>}
    <Input type="select" {...field} name={name}>
      {options.map(({value, label}) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </Input>
    {errors[name] && <FormFeedback>{errors[name]}</FormFeedback>}
  </FormGroup>
);

export default SelectInput;
