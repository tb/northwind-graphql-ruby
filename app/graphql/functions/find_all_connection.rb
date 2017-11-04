class Functions::FindAllConnection < Functions::FindAll
  attr_reader :type

  def initialize(model, resolve_func = nil)
    @model = model
    @resolve_func = resolve_func
    @type =
        begin
          Types.const_get("Types::#{model.name}TypeConnection")
        rescue
          Types.const_set(
              "#{model.name}TypeConnection",
              Types.const_get("Types::#{model.name}Type").define_connection do
                name "#{model.name}TypeConnection"
                field :count do
                  type types.Int
                  resolve ->(obj, args, ctx) { obj.nodes.count }
                end
                field :totalCount do
                  type types.Int
                  resolve ->(obj, args, ctx) { obj.nodes.offset(0).limit(999999).count }
                end
                field :nodes do
                  type Types.const_get("Types::#{model.name}Type").to_list_type
                  resolve ->(obj, args, ctx) { obj.nodes }
                end
              end
          )
        end
  end
end
