class Services::Filter
  def self.call(records, filtering_params)
    filtering_params && filtering_params.each do |key, value|
      records = records.public_send(key, value) if value.present?
    end
    records
  end
end
