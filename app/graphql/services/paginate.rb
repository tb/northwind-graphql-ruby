module Services
  module Paginate
    def self.call(records, args)
      records = records.limit(args[:perPage]) if args[:perPage].present?
      records = records.offset((args[:page] - 1) * args[:perPage]) if args[:page].present?
      records
    end
  end
end
