Types::DecimalType = GraphQL::ScalarType.define do
  name "Decimal"

  coerce_input ->(value, ctx) { BigDecimal(value.to_s) }
  coerce_result ->(value, ctx) { BigDecimal(value).to_f }
end
