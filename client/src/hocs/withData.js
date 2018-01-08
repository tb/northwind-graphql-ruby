import React from 'react';

export const withData = WrappedComponent => props => {
  const {error, loading} = props.data;

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>An unexpected error occurred</div>;
  }

  return <WrappedComponent {...props} />;
};
