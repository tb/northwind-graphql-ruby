Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :createCustomer, function: Functions::Create.new(Customer) do
    argument :customer, !Types::CustomerInputType
  end

  field :updateCustomer, function: Functions::Update.new(Customer) do
    argument :customer, !Types::CustomerInputType
  end

  field :deleteCustomer, function: Functions::Delete.new(Customer)




















  field :createProduct, function: Functions::Create.new(Product) do
    argument :product, !Types::ProductInputType
  end
  field :updateProduct, function: Functions::Update.new(Product) do
    argument :product, !Types::ProductInputType
  end
  field :deleteProduct, function: Functions::Delete.new(Product)

  field :createSupplier, function: Functions::CreateContactable.new(Supplier) do
    argument :supplier, !Types::SupplierInputType
  end
  field :updateSupplier, function: Functions::Update.new(Supplier) do
    argument :supplier, !Types::SupplierInputType
  end
  field :deleteSupplier, function: Functions::Delete.new(Supplier)
end
