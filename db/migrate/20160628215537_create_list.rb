class CreateList < ActiveRecord::Migration
  def change
  	create_table :lists do |t|
  		t.belongs_to :retro, index: true
  		t.string :title
  	end
  end
end
