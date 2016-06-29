class CreateRetro < ActiveRecord::Migration
  def change
  	create_table :retro do |t|
  		t.string :title
  	end
  end
end
