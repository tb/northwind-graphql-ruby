Types::QueryType = GraphQL::ObjectType.define do
  name "Query"

  field :supplier, function: Functions::FindById.new(Supplier)
  connection :allSuppliers,
             function: Functions::FindAllConnection.new(Supplier) do
    argument :filter, Types::SupplierFilterType
  end

  field :customer, function: Functions::FindById.new(Customer)
  connection :allCustomers,
             function: Functions::FindAllConnection.new(Customer) do
    argument :filter, Types::CustomerFilterType
  end

  field :product, function: Functions::FindById.new(Product)
  connection :allProducts,
             function: Functions::FindAllConnection.new(Product) do
    argument :filter, Types::ProductFilterType
  end
  field :currencyRates, function: Functions::CurrencyRates.new
end
