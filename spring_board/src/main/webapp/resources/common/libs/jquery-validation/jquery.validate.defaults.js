
jQuery.validator.setDefaults({
	errorPlacement: function(error, element) { 
		var elem = $(element);
		if (!error.is(':empty')) {
			elem.filter(':not(.valid)').qtip({
				overwrite: false,
				content: error,
				hide: 'blur',
				show: { event: 'focus', ready: true },
				position: {
					my: 'bottom center',
					at: 'top center',
					target: $(element),
					viewport: $(window)
				}
			})
	        .qtip('option', 'content.text', error);
		} else { elem.qtip('destroy'); }
	},
	success: $.noop
});