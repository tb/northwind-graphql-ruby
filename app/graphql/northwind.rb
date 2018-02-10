Northwind = GraphQL::Schema.define do
  mutation(Types::MutationType)
  query(Types::QueryType)
  use(BatchLoader::GraphQL)
  max_depth 10
end

GraphQL::Errors.configure(Northwind) do
  rescue_from ActiveRecord::RecordInvalid do |e|
    GraphQL::ExecutionError.new(
        'ActiveRecord::RecordInvalid',
        options: { fields: e.record.errors.messages }
    )
  end
end
