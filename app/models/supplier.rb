# frozen_string_literal: true

class Supplier < ApplicationRecord
  has_one :address, as: :addressable
  has_one :contact, as: :contactable
  has_many :products

  validates :name, presence: true
end
