# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
#$(document).on 'click', '#bots.index #bot-list .bot', rowClick


jQuery ->
  $(document).on( 'click', '#tasks_table tr td', ->
    table_row = $(this).parent()
    table_row.closest("tr").siblings().removeClass("highlighted");
    table_row.toggleClass("highlighted");
  )
