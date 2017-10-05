# frozen_string_literal: true

class CreateOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :orders do |t|
      t.references :employee
      t.references :customer
      t.date :order_date
      t.date :shipped_date
      t.references :shipper
      t.string :name
      t.decimal :shipping_fee
      t.decimal :taxes
      t.string :payment_type
      t.date :paid_date
      t.string :notes
      t.decimal :tax_rate
      t.string :status
    end
  end
end
