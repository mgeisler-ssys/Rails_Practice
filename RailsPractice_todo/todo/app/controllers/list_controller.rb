class ListController < ApplicationController
  helper_method :sort_column, :sort_direction

  def index
    # @tasks = Task.order(:created_at)
    @tasks = Task.order(sort_column + " " + sort_direction)
  end


  def sort_column
    Task.column_names.include?(params[:sort]) ? params[:sort] : "title"
  end

  def sort_direction
    %w[asc desc].include?(params[:direction]) ? params[:direction] : "asc"
  end
end
