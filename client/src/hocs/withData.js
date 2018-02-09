import React from 'react';
import {LoadingOverlay, Loader} from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';

export const withData = WrappedComponent => props => {
  const {data, table, nodes = []} = props;
  const {error, loading} = data;

  if (table) {
    if (loading) {
      if (!nodes.length) {
        return <div>Loading...</div>;
      }

      return (
        <LoadingOverlay style={{minHeight: 100}}>
          <Loader loading={loading} text={null} />
          <WrappedComponent {...props} />
        </LoadingOverlay>
      );
    }

    if (!nodes.length) {
      return <div>No data</div>;
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An unexpected error occurred</div>;
  }

  return <WrappedComponent {...props} />;
};
