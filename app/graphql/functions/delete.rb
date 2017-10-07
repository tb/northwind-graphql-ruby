class Functions::Delete < GraphQL::Function
  def initialize(model)
    @model = model
    @param_key = model.model_name.param_key
  end

  argument :id, !types.Int

  def call(obj, args, ctx)
    @model.destroy(args[:id])
  end
end
