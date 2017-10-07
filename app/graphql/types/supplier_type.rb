Types::SupplierType = GraphQL::ObjectType.define do
  name "Supplier"

  field :id, !types.ID
  field :name, types.String
  field :webpage, types.String
  field :notes, types.String
  field :errors, Types::JSONType

  field :contact, function: Functions::HasOne.new('id', -> (ids, obj, args, ctx) {
    Contact.where(contactable_id: ids, contactable_type: 'Supplier')
  }) do
    type Types::ContactType
  end

  field :products, function: Functions::FindAll.new(Product, -> (obj, args, ctx) {
    obj.products
  }) do
    type types[Types::ProductType]
  end
end

Types::SupplierInputType = GraphQL::InputObjectType.define do
  name "SupplierInput"

  argument :id, types.ID
  argument :name, types.String
  argument :webpage, types.String
  argument :notes, types.String
end
