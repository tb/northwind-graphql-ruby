Types::ContactType = GraphQL::ObjectType.define do
  name "Contact"

  field :id, types.ID
  field :errors, Types::JSONType
  field :last_name, types.String
  field :first_name, types.String
  field :email, types.String
  field :job_title, types.String
  field :business_phone, types.String
  field :errors, Types::JSONType
end
