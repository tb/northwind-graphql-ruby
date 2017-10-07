class Supplier < ApplicationRecord
  has_one :address, as: :addressable, dependent: :destroy
  has_one :contact, as: :contactable, dependent: :destroy

  accepts_nested_attributes_for :contact

  validates :name, presence: true
  validates_associated :contact
end
