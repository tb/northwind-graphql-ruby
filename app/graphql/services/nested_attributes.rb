class Services::NestedAttributes
  def self.call(model, attributes)
    nested_keys = attributes.keys & model.nested_attributes_options.keys.map(&:to_s)
    return attributes if nested_keys.blank?

    nested_keys.each { |key| attributes["#{key}_attributes"] = attributes.delete(key) }
    attributes
  end
end
