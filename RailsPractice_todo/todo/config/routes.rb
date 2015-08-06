Rails.application.routes.draw do

  resources :tasks
  root 'tasks#index'

  resources :tasks do
    post 'complete', :on => :collection
  end

end
