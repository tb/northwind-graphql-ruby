Types::SupplierType = GraphQL::ObjectType.define do
  name "Supplier"

  field :errors, Types::JSONType
  field :id, types.ID
  field :name, types.String
  field :webpage, types.String
  field :notes, types.String
  field :contact, Types::ContactType
  field :products, function: Functions::FindAll.new(Product, -> (obj, args, ctx) {
    obj.products
  }) do
    argument :filter, Types::ProductFilterType
  end
end

Types::SupplierInputType = GraphQL::InputObjectType.define do
  name "SupplierInput"

  argument :id, types.ID
  argument :name, types.String
  argument :webpage, types.String
  argument :notes, types.String
  argument :contact, Types::ContactInputType
end

Types::SupplierFilterType = GraphQL::InputObjectType.define do
  name "SupplierFilter"

  argument :name_starts_with, types.String
  argument :name_contains, types.String
end
