module Services
  module OrderBy
    def self.call(records, param)
      return records if !param
      order = param && param.start_with?('-') ? 'DESC' : nil
      records.reorder("#{order ? param[1..-1] : param} #{order}".squish)
    end
  end
end
