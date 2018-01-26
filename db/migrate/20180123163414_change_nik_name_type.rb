class ChangeNikNameType < ActiveRecord::Migration

  def change
    say "Change NikName Type", true
        reversible do |dir|
          change_table :users do |t|
            dir.up {t.change :nik_name, :string}
            dir.down {t.change :nik_name, :int}
          end
        end
  end
end
