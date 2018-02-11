class Product < ApplicationRecord
  belongs_to :supplier

  accepts_nested_attributes_for :supplier

  validates_associated :supplier
  validates :product_name, presence: true, uniqueness: { scope: :supplier_id }

  scope :supplier, ->(supplier_id) { where supplier_id: supplier_id }
  scope :category, ->(category) { where category: category }
  scope :product_name_contains, ->(name) { where 'product_name ilike ?', "%#{name}%" }
  scope :product_name_starts_with, ->(name) { where 'product_name ilike ?', "#{name}%" }
end
