Types::CustomerType = GraphQL::ObjectType.define do
  name "Customer"

  field :errors, Types::JSONType
  field :id, types.ID
  field :name, types.String
  field :webpage, types.String
  field :notes, types.String
  field :contact, Types::ContactType
end

Types::CustomerInputType = GraphQL::InputObjectType.define do
  name "CustomerInput"

  argument :id, types.ID
  argument :name, types.String
  argument :webpage, types.String
  argument :notes, types.String
  argument :contact, Types::ContactInputType
end

Types::CustomerFilterType = GraphQL::InputObjectType.define do
  name "CustomerFilter"

  argument :name_starts_with, types.String
  argument :name_contains, types.String
  argument :elephant, types.Int
end
