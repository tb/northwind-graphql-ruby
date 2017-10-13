class Functions::Create < GraphQL::Function
  def initialize(model)
    @model = model
    @type = Types.const_get("Types::#{model.name}Type")
    @param_key = model.model_name.param_key
  end

  def call(obj, args, ctx)
    attributes = args[param_key].to_h
    model.create(Services::NestedAttributes.call(model, attributes))
  end

  private

  attr_reader :type, :model, :param_key
end
