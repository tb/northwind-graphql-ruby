class Customer < ApplicationRecord
  has_one :address, as: :addressable, dependent: :destroy
  has_one :contact, as: :contactable, dependent: :destroy
  has_many :orders

  scope :elephant, -> (count = 5) {
    joins(:orders)
        .group('customers.id')
        .having('COUNT(orders.id) > ?', count)
  }

  validates_uniqueness_of :name

  scope :name_contains, -> (name) { where "name ilike ?", "%#{name}%" }
  scope :name_starts_with, -> (name) { where "name ilike ?", "#{name}%" }
end
