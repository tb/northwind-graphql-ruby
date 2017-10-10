class Services::OrderBy
  def self.call(model, records, param)
    order = nil
    if param && param.start_with?('-')
      order = 'DESC'
      param.slice!(0)
    end
    if model.column_names.include?(param)
      records.reorder("#{param} #{order}".squish)
    else
      records
    end
  end
end
