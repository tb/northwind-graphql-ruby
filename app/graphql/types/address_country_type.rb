Types::AddressCountryType = GraphQL::ObjectType.define do
  name 'AddressCountry'

  field :code, types.String
end
