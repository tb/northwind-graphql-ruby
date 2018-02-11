class Supplier < ApplicationRecord
  has_one :address, as: :addressable, dependent: :destroy
  has_one :contact, as: :contactable, dependent: :destroy
  has_many :products

  accepts_nested_attributes_for :address, :contact

  validates_associated :address, :contact
  validates :name, presence: true, uniqueness: true

  scope :country, ->(country) { joins(:address).where(addresses: { country: country }) }
  scope :name_contains, ->(name) { where 'name ilike ?', "%#{name}%" }
  scope :name_starts_with, ->(name) { where 'name ilike ?', "#{name}%" }
end
