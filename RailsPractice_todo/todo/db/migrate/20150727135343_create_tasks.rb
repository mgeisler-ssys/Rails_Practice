class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :description
      t.date :created
      t.date :completed

      t.timestamps null: false
    end
  end
end
