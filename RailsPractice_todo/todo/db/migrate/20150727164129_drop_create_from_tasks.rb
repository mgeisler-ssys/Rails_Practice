class DropCreateFromTasks < ActiveRecord::Migration
  def change
    remove_column :tasks, :created
  end
end
