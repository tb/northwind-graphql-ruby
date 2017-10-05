# frozen_string_literal: true

class Employee < ApplicationRecord
  has_one :address, as: :addressable
  has_many :orders
end
