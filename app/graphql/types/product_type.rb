Types::ProductType = GraphQL::ObjectType.define do
  name "Product"

  field :id, types.ID
  field :errors, Types::JSONType
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

  field :supplier, function: Functions::HasOne.new('supplier_id', ->(ids, obj, args, ctx){
    Supplier.where(id: ids)
  }) do
    type Types::SupplierType
  end
end
