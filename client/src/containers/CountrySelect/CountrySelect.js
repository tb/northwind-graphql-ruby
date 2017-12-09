import React, {Component} from 'react';
import {compose, graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {Input} from 'reactstrap';
import {map} from 'lodash';
import {withCountry} from '../../hocs/withCountry';
import getCountyOptions from '../../components/Form/getCountyOptions';

class CountrySelect extends Component {
  _onSelect = ({target: {value}}) => this.props.setCountry(value);

  render() {
    const {country} = this.props;
    const {loading, error, addressCountries} = this.props.addressCountries;

    if (loading) {
      return <div>Loading</div>;
    }

    if (error) {
      return <div>An unexpected error occurred</div>;
    }

    return (
      <Input type="select" value={country || ''} onChange={this._onSelect}>
        <option value="">All</option>
        {getCountyOptions({
          values: map(addressCountries, 'code'),
        }).map(({value, label}) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Input>
    );
  }
}

export default compose(
  withCountry,
  graphql(
    gql`
      {
        addressCountries {
          code
        }
      }
    `,
    {
      name: 'addressCountries',
      options: {
        fetchPolicy: 'cache',
      },
    },
  ),
)(CountrySelect);
