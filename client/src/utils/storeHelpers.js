export const storeAdd = (store, query, key, object) => {
  const data = store.readQuery({ query });
  data[key].splice(0,0,object);
  store.writeQuery({ query, data });
};

export const storeUpdate = (store, query, key, object, id) => {
  const data = store.readQuery({ query });
  data[key] = data[key].map((supplier) => id === supplier.id
    ? { ...supplier, ...object } : supplier
  );
  store.writeQuery({ query, data });
};

export const storeRemove = (store, query, key, object) => {
  const data = store.readQuery({ query });
  data[key] = data[key].filter(({id}) => id !== object.id)
  store.writeQuery({ query, data });
};
