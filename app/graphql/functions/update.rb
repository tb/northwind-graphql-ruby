class Functions::Update < GraphQL::Function
  def initialize(model)
    @model = model
    @param_key = model.model_name.param_key
  end

  def call(obj, args, ctx)
    @model.update(args[@param_key][:id], args[@param_key].to_h.except!("id"))
  end
end
