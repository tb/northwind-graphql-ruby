module Services
  module InputObjectType
    def self.define(type, options = {}, &block)
      skip_fields = %w(errors).concat(options[:skip_fields] || [])

      GraphQL::InputObjectType.define do
        type.fields.values
            .reject{|f| f.try(:connection?) || skip_fields.include?(f.name)}
            .each{ |f| argument(f.name, f.type, f.description)}

        block && instance_eval(&block)
      end
    end
  end
end
