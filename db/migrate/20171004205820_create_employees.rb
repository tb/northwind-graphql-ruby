# frozen_string_literal: true

class CreateEmployees < ActiveRecord::Migration[5.1]
  def change
    create_table :employees do |t|
      t.string :last_name
      t.string :first_name
      t.string :email
      t.string :job_title
      t.string :business_phone
      t.string :webpage
      t.string :notes
    end
  end
end
