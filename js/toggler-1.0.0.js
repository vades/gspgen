/*Expand/Colapse element version 1.0.0 beta 1
-------------------------------------------------- */

(function ($) {
  /**
   * Slide matched elemnt down/up
   */
  $('.slide-it').on('click', function (e) {
    var selector = $(this);
    var target = '#' + selector.attr('aria-controls');
    var hideOthers = selector.data('hide-others');
    var targetHasHidden = $(target).attr('hidden');

    /**
     *  Slide target
     */
    $(target).slideToggle(500, function () {
      // Set hidden true/false on target
      if (targetHasHidden) {
        $(this).removeAttr('hidden');
      }else{
        $(this).attr('hidden','');
      }
      // Set aria-expanded true/false on selector
      selector.attr('aria-expanded', function (_, attr) {
        return attr == 'true' ? false : true;
      });
    });

    /**
     * Has hideOthers - hide other expanded elements and set aria-expanded to false
     */
    if (hideOthers && hideOthers.length) {
      selector.closest(hideOthers).children().not(target).not(selector).each(function () {
        var child = $(this);
        var childHasControls = child.attr('aria-controls');
        // Hide all child with id childHasControls
        if (childHasControls && childHasControls.length) {
          $('#'+ childHasControls).slideUp().attr('hidden','');
        }
        // Set aria-expanded=false to all child contain aria-expanded=true
        if (child.attr('aria-expanded') == 'true') {
          child.attr('aria-expanded', false);
        }
      });
    }

    e.preventDefault();
  });

  /**
   * Show/hide hide an element
   */
  $('.toggle-it').on('click', function (e) {
    var selector = $(this);
    var target = '#' + selector.attr('aria-controls');
    var hasAriaExpanded = $(this).attr('aria-expanded');
    var targetHasHidden = $(target).attr('hidden');
    // Set active clas
    $(target).toggleClass('is-on');
     // Set hidden true/false on target
     if (targetHasHidden) {
      $(this).removeAttr('hidden');
    }

    // Has aria-expanded attribute - main expand/collapse button
    if (hasAriaExpanded && hasAriaExpanded.length) {
      $(this).attr('aria-expanded', function (_, attr) {
        return attr == 'true' ? false : true;
      });
    }

    e.preventDefault();
  });
})(jQuery);