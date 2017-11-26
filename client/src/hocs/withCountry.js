import {connect} from 'react-redux';
import {setCountry} from '../store/country/actions';

export const withCountry = WrappedComponent => {
  const mapStateToProps = state => ({country: state.country});

  const mapDispatchToProps = {setCountry};

  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
};
