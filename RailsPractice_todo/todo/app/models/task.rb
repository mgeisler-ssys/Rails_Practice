class Task < ActiveRecord::Base
  validates :title, :description, :created_at, presence: true
  validates :title, uniqueness: true

end
