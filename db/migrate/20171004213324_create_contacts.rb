class CreateContacts < ActiveRecord::Migration[5.1]
  def change
    create_table :contacts do |t|
      t.string :last_name, null: false
      t.string :first_name, null: false
      t.string :email, null: false
      t.string :job_title, null: false
      t.string :business_phone, null: false
      t.integer :contactable_id
      t.string :contactable_type
    end
  end
end
