
$(document).on('ready', function(){
	
	$(document).on('change', 'select#select_toy', function(e) {onChangeSelect(this);});

	function onChangeSelect(o) {
		var selected = o.value;
		$.each($('.toys').not('#'+selected), function(){
			$(this).css('display', 'none');
		});
		$('#' + selected).css('display', 'block'); 
	}
});