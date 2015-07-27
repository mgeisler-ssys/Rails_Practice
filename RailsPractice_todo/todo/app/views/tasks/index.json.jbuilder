json.array!(@tasks) do |task|
  json.extract! task, :id, :title, :description, :created_at, :completed
  json.url task_url(task, format: :json)
end
