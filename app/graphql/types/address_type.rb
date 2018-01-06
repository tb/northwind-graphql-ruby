Types::AddressType = GraphQL::ObjectType.define do
  name "Address"

  field :errors, Types::JSONType
  field :id, types.ID
  field :street_address, types.String
  field :city, types.String
  field :state, types.String
  field :postal_code, types.String
  field :country, types.String
end

Types::AddressInputType = Services::InputObjectType.define(Types::AddressType) do
  name "AddressInput"
end
