class TasksController < ApplicationController
  before_action :set_task, only: [:show, :edit, :update, :destroy]
  helper_method :sort_column, :sort_direction

  # GET /tasks
  # GET /tasks.json
  def index
    # @tasks = Task.order(:created_at)
    @tasks = Task.order(sort_column + " " + sort_direction)
    @lists = List.order(sort_column + " " + sort_direction)
  end

  # GET /tasks/1
  # GET /tasks/1.json
  def show
  end

  # GET /tasks/new
  def new
    @task = Task.new
  end

  # GET /tasks/1/edit
  def edit
  end

  # POST /tasks
  # POST /tasks.json
  def create
    @task = Task.new(task_params)

    respond_to do |format|
      if @task.save
        if params[:task][:completed] == "1"
          @task.update_date_completed(@task[:id], true)
        end
        format.html { redirect_to :action => 'index', notice: 'Task was successfully created.' }
        format.json { render :show, status: :created_at, location: @task }
      else
        format.html { render :new }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tasks/1
  # PATCH/PUT /tasks/1.json
  def update
    respond_to do |format|
      if @task.update(task_params)
        format.html { redirect_to :action => 'index', notice: 'Task was successfully updated.' }
        format.json { render :show, status: :ok, location: @task }
      else
        format.html { render :edit }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  def complete
    task = Task.find(params[:task_id])
    task.update_completed(params[:task_id])
    # Task.update_all(["completed_at=?", Time.now], :id => params[:task_ids])
    redirect_to tasks_path
  end

  # DELETE /tasks/1
  # DELETE /tasks/1.json
  def destroy
    @task.destroy
    respond_to do |format|
      format.html { redirect_to @task, notice: 'Task was successfully deleted.' }
      format.json { head :no_content }
    end
  end

  def sort_column
    Task.column_names.include?(params[:sort]) ? params[:sort] : "title"
  end

  def sort_direction
    %w[asc desc].include?(params[:direction]) ? params[:direction] : "asc"
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def task_params
      params.require(:task).permit(:title, :description, :created_at, :completed, :date_completed, :priority)
    end
end
