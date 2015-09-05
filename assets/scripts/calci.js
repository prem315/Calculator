var Calci = {

	init: function(){
		$('#calculator .input').click(function(){
		
			if(this.dataset.keyType == "digit"){
				Calci.handleInput(this.dataset.digit);
			} else if(this.dataset.keyType == "operator"){			
				Calci.handleInput(this.dataset.operator);
			} else if(this.dataset.keyType == "delete"){
				Calci.handleDelete();	
			} else if(this.dataset.keyType == "equals"){
				Calci.evaluateResult();
			}
		
		});

		$('#calculator #delete').dblclick(function(){
			$('#preview').html('');
			$('#result').html('');
		});

		['0','1','2','3','4','5','6','7','8','9'].forEach(function(digit){
			$(document).bind('keyup', digit, function(){
				Calci.handleInput(digit);
			});
		});

		$(document).bind('keyup', 'backspace', function(){
			Calci.handleDelete();
		});
	},

	handleInput: function(input){
		$('#preview').html($('#preview').html()+input);
	},

	handleDelete: function(){
		$('#preview').html($('#preview').html().slice(0, -1));
	},

	evaluateResult: function(){
		$('#result').html(eval($('#preview').html()));	
	}
}



$(document).ready(function(){
	Calci.init();
}); 