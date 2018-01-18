class AddNikNameToUsers < ActiveRecord::Migration
  def up
    say "Add column 'nik_name' to table users...", true
    suppress_messages do
      execute %{
      ALTER TABLE users ADD COLUMN nik_name integer AFTER surname;
    }
    end
  end

  def down
    say "Remove column 'nik_name' from table users...", true
    suppress_messages do
      execute %{
      ALTER TABLE users DROP COLUMN nik_name;
    }
    end
  end
end
