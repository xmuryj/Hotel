/* =========================================================
 * bootstrap-modal.js v2.0.0
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================
 *
 * With modifications by OraMetrix
 */




!function( $ ){

  "use strict";

 /* OVERAY CLASS DEFINITION
  * ======================= */

  var Overlay = function ( content, options ) {
    this.options = $.extend({ moving: false, pos_x: 0, pos_y: 0 }, $.fn.overlay.defaults, options);
    this.$element = $(content);
    var id = this.$element.attr('id');
    this.$element.delegate('[data-dismiss="overlay"]', 'click.dismiss' + id, $.proxy(this.hide, this))
  };

  Overlay.prototype = {

      constructor: Overlay

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        if (this.isShown) return;

        this.isShown = true;
        this.$element.trigger('show');

        escape.call(this);

	    showOverlay.call(this);
      }

    , hide: function ( e ) {
        e && e.preventDefault();

        if (!this.isShown) return;

        this.isShown = false;

        escape.call(this);

        this.$element
          .trigger('hide')
          .removeClass('in');

      	hideOverlay.call(this);
      }
  };


 /* MODAL PRIVATE METHODS
  * ===================== */

  function showOverlay() {
    if (this.options.slide) {
      this.$element.slideDown('fast').trigger('shown');
    } else {
      this.$element.show().trigger('shown');
    }
  }

  function hideOverlay() {
    if (this.options.slide) {
      this.$element.slideUp('fast').trigger('hidden');
    } else {
      this.$element.hide().trigger('hidden');
    }
  }

  function escape() {
    var that = this;
    var id = this.$element.attr('id');
    if (this.isShown) {
      if (this.options.keyboard) {
        $(document).on('keyup.dismiss.' + id, function ( e ) {
          e.which == 27 && that.hide()
        });
      }
      $(document).on('click.dismiss.' + id, function(e) {
        //console.log('overlay click event');
        if (that.options.moving) {
          that.options.moving = false;
          e.preventDefault();
          return;
        }
        if (that.options.autohide) {
          // Check if the mouse click was outside the overlay element,
          // but not over an element named like $id + '_toggle'.
          // In the later case ignore the click because the toggle element
          // will be hit and hide the overlay.
          var element_toggle_selector = '#' + that.$element.attr('id') + '_toggle';
          if (!$(e.target).closest(that.$element).length &&
              !$(e.target).closest(element_toggle_selector).length) {
            that.hide();
          }
        }
      })
      .on('mousedown.' + id, function (e) {
	    //console.log('overlay mousedown event', e, e.clientX, e.clientY);
        // Check if mouse down is inside the overlay h3 element or
        // inside the overlay and above the overlay h3 element
        // and movable option is set.
	    var selector = '#' + that.$element.attr('id') + ' h3';
        if (that.options.movable &&
            ($(e.target).closest(selector).length ||
                $(e.target).closest(that.$element).length &&
                e.clientY < $(selector).offset().top)) {
	      that.options.moving = true;
	      that.options.pos_x = e.clientX;
	      that.options.pos_y = e.clientY;
	      e.preventDefault();
        }
      })
      .on('mousemove.' + id, function (e) {
        // check if mouse is still inside browser window in order to prevent
        // moving the overlay completely out of the visible area
	    if (that.options.moving &&
            e.pageX >= 0 && e.pageX < $(window).width() &&
            e.pageY >= $('#navbar').height() && e.pageY < $(window).height()) {
	      var dx = e.clientX - that.options.pos_x;
	      var dy = e.clientY - that.options.pos_y;
	      that.options.pos_x = e.clientX;
	      that.options.pos_y = e.clientY;
	      that.$element.css({ left: "+=" + dx + "px", top: "+=" + dy + "px" });
	    }
        //if (that.options.moving) {
        //  console.log('overlay mousemove event', e, $(document).width(), $('#navbar').height(), $(document).height());
        //}
      })
    } else if (!this.isShown) {
      $(document)
	  .off('keyup.dismiss.' + id)
	  .off('click.dismiss.' + id)
      .off('mousedown.' + id)
	  .off('mousemove.' + id)
    }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  $.fn.overlay = function ( option ) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('overlay');
      var options = typeof option == 'object' && option;
      if (!data) {
        $this.data('overlay', (data = new Overlay(this, options)));
        // show if constructor is called and option 'show' is set
        if (options && data.options.show) {
          data.show();
        }
      }
      if (typeof option == 'string') {
	    data[option]();
      }
    })
  };

  $.fn.overlay.defaults = {
      slide: true
    , keyboard: true
    , show: true
    , movable: true
    , autohide: true
  };

  $.fn.overlay.Constructor = Overlay;


 /* MODAL DATA-API
  * ============== */

  $(function () {
    $('body').on('click.overlay.data-api', '[data-toggle="overlay"]', function ( e ) {
      var $this = $(this), href
        , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        , option = $target.data('overlay') ? 'toggle' : $.extend({}, $target.data(), $this.data());

      e.preventDefault();
      $target.overlay(option);
    })
  })

}( window.jQuery );

