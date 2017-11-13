import {isEmpty, mapKeys} from 'lodash';

export const storeAdd = (store, query, key, object) => {
  const data = store.readQuery({query});
  data[key].splice(0, 0, object);
  store.writeQuery({query, data});
};

export const storeUpdate = (store, query, key, object, id) => {
  const data = store.readQuery({query});
  data[key] = data[key].map(
    _object => (id === _object.id ? {..._object, ...object} : _object),
  );
  store.writeQuery({query, data});
};

export const storeRemove = (store, query, key, object) => {
  const data = store.readQuery({query});
  data[key] = data[key].filter(({id}) => id !== object.id);
  store.writeQuery({query, data});
};

export const flattenErrors = errors =>
  mapKeys(errors, (value, key) => key.split('.').pop());

export const mutationAsPromise = (name, propsFn) => props => {
  const propsFnProps = propsFn && propsFn(props);
  return {
    ...propsFnProps,
    [name]: params =>
      new Promise((resolve, reject) =>
        props[name](params).then(({data}) => {
          const {errors} = data[name];
          if (!isEmpty(errors)) {
            reject(flattenErrors(errors));
          } else {
            resolve({...data[name], data});
          }
        }),
      ),
  };
};
