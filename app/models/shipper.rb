class Shipper < ApplicationRecord
  has_one :address, as: :addressable, dependent: :destroy
  has_one :contact, as: :contactable, dependent: :destroy
  has_many :orders

  accepts_nested_attributes_for :address, :contact

  validates_associated :contact
  validates :name, presence: true, uniqueness: true

  scope :name_contains, -> (name) { where "name ilike ?", "%#{name}%" }
  scope :name_starts_with, -> (name) { where "name ilike ?", "#{name}%" }
end
