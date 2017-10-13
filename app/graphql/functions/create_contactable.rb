class Functions::CreateContactable < GraphQL::Function
  def initialize(model)
    @model = model
    @type = Types.const_get("Types::#{model.name}Type")
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

  private

  attr_reader :type
end
