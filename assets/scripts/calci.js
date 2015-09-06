var Calci = {

	init: function(){
		$('#calculator .input').click(function(){
		
			if(this.dataset.keyType == "digit"){
				Calci.handleInput(this.dataset.digit);
			} else if(this.dataset.keyType == "operator"){			
				Calci.handleOperator(this.dataset.operator);
			} else if(this.dataset.keyType == "delete"){
				Calci.handleDelete();	
			} else if(this.dataset.keyType == "equals"){
				Calci.evaluateResult();
			}
		
		});

		$('#calculator #delete').dblclick(function(){
			//$('#preview').html('');
			//$('#result').html('');
			Calci.clearPreview();
			Calci.clearReasult();
		});

		['0','1','2','3','4','5','6','7','8','9'].forEach(function(digit){
			$(document).bind('keyup', digit, function(){
				Calci.handleInput(digit);
			});
		});

		['/','*','-','+'].forEach(function(digit){
			$(document).bind('keyup', digit, function(){
				Calci.handleOperator(digit);
			});
		});

		$(document).bind('keyup', '.', function(){
			lastNumber = Calci.getLastNumber();
			// check if it has a decimal
			if(lastNumber.indexOf('.') == -1){
				if(lastNumber.length == 0){
					Calci.handleInput(0);
				}
				Calci.handleInput('.');
			}
			// 	yes: do nothing
			// 	No: add decimal
		});

		$(document).bind('keyup', 'backspace', function(){
			Calci.handleDelete();
		});

		$(document).bind('keyup', 'shift+=', function(){
			Calci.handleOperator('+');
		});

		['=','return'].forEach(function(key){
			$(document).bind('keyup', key, function(){
				Calci.evaluateResult();
			});
		});
		
	},

	handleInput: function(input){
		$('#preview').html($('#preview').html()+input);
	},

	handleOperator: function(operator){
		if($('#preview').html().length == 0){
			if(operator == '-'){
				Calci.handleInput('-');
			}
		}else{
			//lastChar = Calci.getLastChar();
			if(Calci.checkLastCharIsOperator()){
				Calci.handleDelete();
				//Calci.handleInput(operator);
			}
			Calci.handleInput(operator);
		}
	},

	handleDelete: function(){
		$('#preview').html($('#preview').html().slice(0, -1));
		if ($('#preview').html().length == 0){
			Calci.clearReasult();
		}
	},

	evaluateResult: function(){
		if(Calci.checkLastCharIsOperator()){
			Calci.handleDelete();
		}
		$('#result').html(eval($('#preview').html()));	
	},

	clearReasult: function(){
		$('#result').html('');
	},

	clearPreview: function(){
		$('#preview').html('');
	},

	getLastNumber: function(){
		var str = $('#preview').html();
		var regexp = /[+\-*\/]([0-9.])*$/;
		var matches = str.match(regexp);
		if(matches == null){
			return str;
		}else{
			return matches[0].slice(1);
		}
	},

	getLastChar: function(){
		var str1 = $('#preview').html();
		if(str1.length == 0){
			return str1;
		}else{
			return str1[str1.length - 1];
		}
	},

	checkLastCharIsOperator: function(){
		lastChar = Calci.getLastChar();
		return (['+','-','*','/'].indexOf(lastChar) != -1);
	}
}



$(document).ready(function(){
	Calci.init();
}); 