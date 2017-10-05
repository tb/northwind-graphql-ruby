# frozen_string_literal: true

class CreateOrderDetails < ActiveRecord::Migration[5.1]
  def change
    create_table :order_details do |t|
      t.references :order
      t.references :product
      t.integer :quantity, null: false, default: 1
      t.decimal :unit_price
      t.decimal :discount
    end
  end
end
