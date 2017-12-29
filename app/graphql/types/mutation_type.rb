Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :createProduct, function: Functions::Create.new(Product) do
    argument :product, !Types::ProductInputType
  end
  field :updateProduct, function: Functions::Update.new(Product) do
    argument :product, !Types::ProductInputType
  end
  field :deleteProduct, function: Functions::Delete.new(Product)
  field :createSupplier, function: Functions::Create.new(Supplier) do
    argument :supplier, !Types::SupplierInputType
  end
  field :updateSupplier, function: Functions::Update.new(Supplier) do
    argument :supplier, !Types::SupplierInputType
  end
  field :deleteSupplier, function: Functions::Delete.new(Supplier)
end
