class CreateRetro < ActiveRecord::Migration
  def change
  	create_table :retros do |t|
  		t.string :title
  		t.string :uriHash
  	end
  end
end
