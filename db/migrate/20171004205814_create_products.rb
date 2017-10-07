# frozen_string_literal: true

class CreateProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.references :supplier
      t.string :product_code
      t.string :product_name
      t.decimal :standard_cost
      t.decimal :list_price
      t.integer :reorder_level
      t.integer :target_level
      t.boolean :discontinued
      t.integer :minimum_reorder_quantity
      t.string :category
    end
  end
end
