Types::DateType = GraphQL::ScalarType.define do
  name "Date"

  coerce_input ->(value, ctx) { Date.iso8601(value) }
  coerce_result ->(value, ctx) { value.iso8601 }
end
