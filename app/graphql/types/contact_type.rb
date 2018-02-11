Types::ContactType = GraphQL::ObjectType.define do
  name 'Contact'

  field :id, types.ID
  field :last_name, types.String
  field :first_name, types.String
  field :email, types.String
  field :job_title, types.String
  field :business_phone, types.String
end

Types::ContactInputType = Services::InputObjectType.define(Types::ContactType) do
  name 'ContactInput'
end
