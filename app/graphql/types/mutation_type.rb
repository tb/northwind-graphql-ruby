Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :createSupplier, function: Functions::CreateContactable.new(Supplier) do
    type Types::SupplierType
    argument :supplier, !Types::SupplierInputType
  end

  field :updateSupplier, function: Functions::Update.new(Supplier) do
    type Types::SupplierType
    argument :supplier, !Types::SupplierInputType
  end

  field :deleteSupplier, function: Functions::Delete.new(Supplier) do
    type Types::SupplierType
  end
end
