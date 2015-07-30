class AddPriorityToTasks < ActiveRecord::Migration
  def up
    add_column :tasks, :priority, :integer, :default => 1
  end

  def down
    remove_column :tasks, :priority
  end
end
