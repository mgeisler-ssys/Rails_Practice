class Task < ActiveRecord::Base

  validates :title, :description, :created_at, presence: true
  validates :title, uniqueness: true
  # validates_date :created_at,:updated_at, :date_completed, on_or_before: lambda { Date.current }

  def check_for_completion(task_id)
    task = Task.find(task_id)
    if task.completed == true && !task.nil?
      true
    else
      false
    end
  end


  def update_date_completed(task_id ,complete_state)
    task = Task.find(task_id)
    if complete_state == true
      task[:date_completed] = Date.today
    else
      task[:date_completed] = nil
    end
    task.save!
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

  def priority_hash
    return {1 => "Low", 2 => "Medium", 3 => "High"}
  end
end
