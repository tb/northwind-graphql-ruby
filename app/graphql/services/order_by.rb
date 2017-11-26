module Services
  module OrderBy
    def self.call(records, param)
      order = nil
      if param && param.start_with?('-')
        order = 'DESC'
        param.slice!(0)
      end
      if param
        records.reorder("#{param} #{order}".squish)
      else
        records
      end
    end
  end
end
