module Services
  module NestedAttributes
    def self.call(model, attributes)
      nested_attributes = {}
      nested_keys = attributes.keys & model.nested_attributes_options.keys.map(&:to_s)
      nested_keys.each do |nested_key|
        nested_attributes["#{nested_key}_attributes"] = attributes.delete(nested_key)
      end
      attributes.merge(nested_attributes)
    end
  end
end
