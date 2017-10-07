class Functions::Create < GraphQL::Function
  def initialize(model)
    @model = model
    @param_key = model.model_name.param_key
  end

  def call(obj, args, ctx)
    @model.create(args[@param_key].to_h)
  end
end
