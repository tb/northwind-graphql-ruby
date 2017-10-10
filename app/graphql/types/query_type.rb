Types::QueryType = GraphQL::ObjectType.define do
  name "Query"

  field :supplier, function: Functions::FindById.new(Supplier)
  field :allSuppliers, function: Functions::FindAll.new(Supplier) do
    argument :filter, Types::SupplierFilterType
  end
  field :product, function: Functions::FindById.new(Product)
  field :allProducts, function: Functions::FindAll.new(Product) do
    argument :filter, Types::ProductFilterType
  end
  field :currencyRates, function: Functions::CurrencyRates.new
end
