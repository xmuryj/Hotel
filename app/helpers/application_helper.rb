module ApplicationHelper

    def page_title
      if @page_title
        @page_title.to_s
      else
        'Some Hotel'
      end
    end

end