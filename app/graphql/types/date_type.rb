Types::DateType = GraphQL::ScalarType.define do
  name 'Date'

  coerce_input ->(value, _ctx) { Date.iso8601(value) }
  coerce_result ->(value, _ctx) { value.iso8601 }
end
