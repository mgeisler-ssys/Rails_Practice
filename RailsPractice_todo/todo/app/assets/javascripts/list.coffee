# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

#$(document).on 'change', '#bots.show #bot_current_filament_id', updateTask

update_completed_flag:->
  check_boxes = $(document.getElementsById('task_completed'))
  for box in check_boxes
    console.log box


