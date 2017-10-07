Types::ContactType = GraphQL::ObjectType.define do
  name "Contact"

  field :id, types.ID
  field :last_name, types.String
  field :first_name, types.String
  field :email, types.String
  field :job_title, types.String
  field :business_phone, types.String
  field :errors, Types::JSONType
end

Types::ContactInputType = GraphQL::InputObjectType.define do
  name "ContactInput"

  argument :last_name, types.String
  argument :first_name, types.String
  argument :email, types.String
  argument :job_title, types.String
  argument :business_phone, types.String
end
