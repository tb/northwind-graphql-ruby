# frozen_string_literal: true

class CreateEmployees < ActiveRecord::Migration[5.1]
  def change
    create_table :employees do |t|
      t.string :last_name, null: false
      t.string :first_name, null: false
      t.string :email, null: false
      t.string :job_title, null: false
      t.string :business_phone, null: false
      t.string :webpage
      t.string :notes
    end
  end
end
