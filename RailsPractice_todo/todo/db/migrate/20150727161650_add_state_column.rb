class AddStateColumn < ActiveRecord::Migration
  def up
    rename_column(:tasks, :completed, :date_completed)
    add_column :tasks, :completed, :boolean, :default => 'false'
  end

  def down
    remove_column :tasks, :completed, :boolean
    rename_column(:tasks, :completed, :date_completed)
  end
end
