module Services
  module Filter
    def self.call(records, filters)
      filters && filters.each do |key, value|
        records = records.public_send(key, value) if value.present?
      end
      records
    end
  end
end