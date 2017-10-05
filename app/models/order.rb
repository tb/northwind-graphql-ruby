# frozen_string_literal: true

class Order < ApplicationRecord
  STATUSES = %w[NEW PENDING PAID SHIPPED VOID].freeze
  has_one :address, as: :addressable
  has_many :order_details
  belongs_to :customer
  belongs_to :employee
  belongs_to :shipper
end
