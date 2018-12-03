/*Autocomplete script - version 1.0.0
-------------------------------------------------- */

(function ($) {
  /**
   * Toggle element
   */
  $('.search-autocomplete').on('keyup', function (e) {

    var target = '#' + $(this).attr('aria-controls');
    var target_content = target + ' .content';
    var string = $(this).val();
    var settings = {
      url: $(target).attr('data-api-url') + '?search=' + string + '&per_page=10',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        autocompleteHandle(data, target);
      }
    };
    if (string.length > 2) {
      // $(target_content).empty();
      $.ajax(settings);
    } else {
      $(target).hide();
    }

  }).blur(function () {
    var target = '#' + $(this).attr('aria-controls');
    $(target).hide();
  });

  /**
   * Handle data
   */
  function autocompleteHandle(data, target) {
    var content = '';
    data_length = Object.keys(data).length;
    if (data_length < 1) {
      $(target).hide();
      return;
    }
   $.each(data, function (k, v) {
      content += '<div>' + v.title + '</div>';

    });
    $(target + ' .content').html(content);
    $(target).show();

  }
})(jQuery);