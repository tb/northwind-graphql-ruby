Types::QueryType = GraphQL::ObjectType.define do
  name "Query"

  field :supplier, function: Functions::FindById.new(Supplier) do
    type Types::SupplierType
  end

  field :allSuppliers, function: Functions::FindAll.new(Supplier) do
    type types[Types::SupplierType]
  end
end
