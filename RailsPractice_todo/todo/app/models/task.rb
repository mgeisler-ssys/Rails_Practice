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


  def update_completed(task_id)
    task = Task.find(task_id)
    task.update_column(:completed, !task[:completed])

    if task[:completed] == true
      task[:date_completed] = Date.today
    else
      task[:date_completed] = nil
    end
    task.save!
  end

end
