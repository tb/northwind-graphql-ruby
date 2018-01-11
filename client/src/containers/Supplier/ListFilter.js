import React from 'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';

import CountrySelect from '../CountrySelect/CountrySelect';

export default ({table}) => {
  const onSearch = ({target: {value}}) =>
    table.setFilter({...table.params.filter, name_contains: value});

  return (
    <Form inline className="mx-1 my-2">
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label className="mr-sm-2">Search by name</Label>
        <Input
          type="text"
          autoComplete="off"
          value={table.params.filter.name_contains || ''}
          onChange={onSearch}
        />
      </FormGroup>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label className="mr-sm-2">Country</Label>
        <CountrySelect />
      </FormGroup>
    </Form>
  );
};
