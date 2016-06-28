class CreateCard < ActiveRecord::Migration
  def change
  	create_table :cards do |t|
  		t.string :content
  	end
  end
end
