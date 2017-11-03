Types::ProductType = GraphQL::ObjectType.define do
  name "Product"

  field :errors, Types::JSONType
  field :id, types.ID
  field :product_code, types.String
  field :image_url, types.String
  field :product_name, types.String
  field :standard_cost, Types::DecimalType
  field :list_price, Types::DecimalType
  field :reorder_level, types.Int
  field :target_level, types.Int
  field :discontinued, types.Boolean
  field :minimum_reorder_quantity, types.Int
  field :category, types.String
  field :supplier_id, types.ID
  field :supplier, Types::SupplierType
end

Types::ProductInputType = GraphQL::InputObjectType.define do
  name "ProductInput"

  argument :id, types.ID
  argument :product_name, types.String
  argument :image_url, types.String
  argument :list_price, types.String
  argument :category, types.String
  argument :supplier_id, types.ID
  argument :supplier, Types::SupplierInputType
end

Types::ProductFilterType = GraphQL::InputObjectType.define do
  name "ProductFilter"

  argument :supplier, types.ID
  argument :category, types.String
  argument :product_name_contains, types.String
  argument :product_name_starts_with, types.String
end
