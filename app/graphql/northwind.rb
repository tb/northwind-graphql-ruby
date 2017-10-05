Northwind = GraphQL::Schema.define do
  mutation(Types::MutationType)
  query(Types::QueryType)
  use(BatchLoader::GraphQL)
end
