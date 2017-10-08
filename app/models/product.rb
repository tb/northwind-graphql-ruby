class Product < ApplicationRecord
  belongs_to :supplier

  scope :category, -> (category) { where category: category }
  scope :product_name_contains, -> (name) { where "product_name like ?", "%#{name}%" }
  scope :product_name_starts_with, -> (name) { where "product_name like ?", "#{name}%" }
end
