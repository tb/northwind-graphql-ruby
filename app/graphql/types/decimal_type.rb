Types::DecimalType = GraphQL::ScalarType.define do
  name 'Decimal'

  coerce_input ->(value, _ctx) { BigDecimal(value.to_s) }
  coerce_result ->(value, _ctx) { BigDecimal(value).to_f }
end
