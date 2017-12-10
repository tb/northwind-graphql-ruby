class Address < ApplicationRecord
  belongs_to :addressable, polymorphic: true

  validates :country, presence: true
end
