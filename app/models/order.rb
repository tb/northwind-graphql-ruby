class Order < ApplicationRecord
  STATUSES = %w[NEW PENDING PAID SHIPPED VOID].freeze
  has_one :address, as: :addressable, dependent: :destroy
  has_many :order_details, dependent: :destroy
  belongs_to :customer
  belongs_to :employee
  belongs_to :shipper

  scope :country, ->(country) { joins(:address).where(addresses: { country: country }) }
end
