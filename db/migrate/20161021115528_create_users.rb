class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :forename
      t.string :surname
      t.string :string
      t.string :email
      t.string :password_digest
      t.string :adress_street
      t.string :adress_city

      t.timestamps null: false
    end
  end
end
