module TasksHelper
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

  def get_date_completed_from_task(task_id)
    return 'N/A' if task_id.nil?
    task = Task.find(task_id)
    if task[:completed] == true
        task[:date_completed]
    else
        'Pending'
    end
  end
end
