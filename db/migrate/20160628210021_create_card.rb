class CreateCard < ActiveRecord::Migration
  def change
  	create_table :cards do |t|
  		t.belongs_to :list, index: true
  		t.string :content
  	end
  end
end
