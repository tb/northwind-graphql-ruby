# frozen_string_literal: true

class CreateSuppliers < ActiveRecord::Migration[5.1]
  def change
    create_table :suppliers do |t|
      t.string :name, null: false
      t.string :webpage
      t.string :notes
    end
  end
end
