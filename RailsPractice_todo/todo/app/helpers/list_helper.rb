module ListHelper

  def get_style_from_state(task_id)
    task = Task.find(task_id)
    if task.completed == true
      return "list_completed"
    else
      return "list_odd"
    end
  end

  def get_completed_from_task(task_id)
    task = Task.find(task_id)
    task[:completed]
  end
end
