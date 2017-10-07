class Functions::CreateContactable < GraphQL::Function
  def initialize(model)
    @model = model
    @param_key = model.model_name.param_key
  end

  def call(obj, args, ctx)
    attributes = args[@param_key].to_h
    record = @model.new(Services::NestedAttributes.call(@model, attributes))
    # fixes https://github.com/rails/rails/issues/29121
    record.contact&.contactable = record
    record.save
    record
  end
end
