# frozen_string_literal: true

class CreateShippers < ActiveRecord::Migration[5.1]
  def change
    create_table :shippers do |t|
      t.string :name, null: false
      t.string :webpage
      t.string :notes
    end
  end
end
