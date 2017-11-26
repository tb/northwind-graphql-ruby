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

Types::AddressInputType = GraphQL::InputObjectType.define do
  name "AddressInput"

  argument :street_address, types.String
  argument :city, types.String
  argument :state, types.String
  argument :postal_code, types.String
  argument :country, types.String
end
