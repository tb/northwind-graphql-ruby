class Address < ApplicationRecord
  belongs_to :addressable, polymorphic: true, optional: true

  validates :country, presence: true
end
