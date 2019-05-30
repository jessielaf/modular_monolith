class CreateEmployees < ActiveRecord::Migration[5.2]
  def change
    create_table :employees do |t|
      t.string :name
      t.date :birth_date
      t.string :email

      t.timestamps
    end
  end
end
