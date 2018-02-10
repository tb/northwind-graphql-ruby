Types::SupplierType = GraphQL::ObjectType.define do
  name "Supplier"

  field :id, types.ID
  field :name, types.String
  field :webpage, types.String
  field :notes, types.String
  field :contact, Types::ContactType
  field :address, Types::AddressType
  connection :products,
             function: Functions::FindAllConnection.new(
                 Product,
                 -> (obj, args, ctx) { obj.products }) do
    argument :filter, Types::ProductFilterType
  end
end

Types::SupplierInputType = Services::InputObjectType.define(Types::SupplierType) do
  name "SupplierInput"

  argument :contact, Types::ContactInputType
  argument :address, Types::AddressInputType
end

Types::SupplierFilterType = GraphQL::InputObjectType.define do
  name "SupplierFilter"

  argument :country, types.String
  argument :name_starts_with, types.String
  argument :name_contains, types.String
end
