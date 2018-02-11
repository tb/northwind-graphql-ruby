Types::QueryType = GraphQL::ObjectType.define do
  name 'Query'

  field :addressCountries, function: Functions::AddressCountries.new

  field :supplier, function: Functions::FindById.new(Supplier)
  connection :allSuppliers,
             function: Functions::FindAllConnection.new(Supplier) do
    argument :filter, Types::SupplierFilterType
  end

  field :product, function: Functions::FindById.new(Product)
  connection :allProducts,
             function: Functions::FindAllConnection.new(Product) do
    argument :filter, Types::ProductFilterType
  end
  field :currencyRates, function: Functions::CurrencyRates.new
end
