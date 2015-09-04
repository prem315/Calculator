$(document).ready(function(){
	$('#keys .digit').click(function(){
		$('#preview').html($('#preview').html() + this.dataset.digit);
	});

	$('#delete').click(function(){
		$('#preview').html($('#preview').html().slice(0, -1));
	});
});
