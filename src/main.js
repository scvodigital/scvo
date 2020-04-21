document.addEventListener("DOMContentLoaded", function() {
  $('input[type=file][data-max-file-size]').on('change', function(evt) {
    var files = evt.currentTarget.files;
    var maxSize = $(evt.currentTarget).data('max-file-size') || 5;

    for (var x in files) {
      var file = files[x];
      var fileSize = ((file.size / 1024) / 1024).toFixed(4);
      if (fileSize > maxSize) {
        $(evt.currentTarget).val('');
      }
    }
  });
})