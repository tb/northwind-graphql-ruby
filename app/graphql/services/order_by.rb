class Services::OrderBy
  def self.call(model, param)
    order = nil
    if param.start_with?('-')
      order = 'DESC'
      param.slice!(0)
    end

    if model.column_names.include?(param)
      "#{param} #{order}".squish
    end
  end
end
