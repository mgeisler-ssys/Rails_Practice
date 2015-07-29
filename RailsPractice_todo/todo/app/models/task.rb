class Task < ActiveRecord::Base
  validates :title, :description, :created_at, presence: true
  validates :title, uniqueness: true

  def check_for_completion(task_id)
    task = Task.find(task_id)
    if task.completed == true && !task.nil?
      true
    else
      false
    end
  end

  def toggle_completed(task_id)
    task = Task.find(task_id)
    task.update_attribute(:completed, !task[:completed])
    task.save!
  end

end
