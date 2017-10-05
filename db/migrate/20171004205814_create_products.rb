# frozen_string_literal: true

class CreateProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.references :supplier
      t.string :product_code, null: false
      t.string :product_name, null: false
      t.decimal :standard_cost
      t.decimal :list_price
      t.integer :reorder_level, null: false, default: 0
      t.integer :target_level, null: false, default: 0
      t.boolean :discontinued, null: false, default: false
      t.integer :minimum_reorder_quantity, null: false, default: 0
      t.string :category, null: false
    end
  end
end
