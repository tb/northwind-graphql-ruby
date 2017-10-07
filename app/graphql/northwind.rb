Northwind = GraphQL::Schema.define do
  mutation(Types::MutationType)
  query(Types::QueryType)
  use(BatchLoader::GraphQL)
  max_depth 10
  rescue_from(ActiveRecord::RecordNotFound) { "Not found" }
end
