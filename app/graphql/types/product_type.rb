Types::ProductType = GraphQL::ObjectType.define do
  name "Product"

  field :id, types.ID
  field :product_code, types.String
  field :product_name, types.String
  field :standard_cost, Types::DecimalType
  field :list_price, Types::DecimalType
  field :reorder_level, types.Int
  field :target_level, types.Int
  field :discontinued, types.Boolean
  field :minimum_reorder_quantity, types.Int
  field :category, types.String
  field :errors, Types::JSONType

  field :supplier_id, types.ID
  field :supplier, function: Functions::HasOne.new('supplier_id', ->(ids, obj, args, ctx){
    Supplier.where(id: ids)
  }) do
    type Types::SupplierType
  end
end

Types::ProductInputType = GraphQL::InputObjectType.define do
  name "ProductInput"

  argument :id, types.ID
  argument :product_name, types.String
  argument :list_price, types.String
  argument :category, types.String
  argument :supplier_id, types.ID
  argument :supplier, Types::SupplierInputType
end

Types::ProductFilterType = GraphQL::InputObjectType.define do
  name "ProductFilter"

  argument :category, types.String
  argument :product_name_contains, types.String
  argument :product_name_starts_with, types.String
end
