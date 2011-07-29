YUI().use('event','node', function(Y){
	var mainArray = [1,2,3,4,5,6,7,8,9,10], selectedArray, score = 0;
	
	var _random = function  ( n ){
	  return ( Math.floor ( Math.random ( ) * n ) );
	};
	var playTheGame = function(selArray){
		var gameboard = Y.one('#gameboard');
		
		Y.log(mainArray.length);
		Y.log(selArray.length);
		var randomMain = mainArray[_random(mainArray.length )];
		var randomSelected = selectedArray[_random(selArray.length  )];
		
		//gameboard.set('innerHTML', randomMain + ' * ' + randomSelected + ' = ');
		var formula = Y.Node.create('<div class="formula-row">' + randomMain + ' * ' + randomSelected + ' = ' + '</div>');
		var answer = Y.Node.create('<input type="text" data-answer="' +(randomMain * randomSelected) + '" />');
		answer.on('blur', function(e){
			Y.log(e.currentTarget.getAttribute('data-answer'));
			Y.log(e.currentTarget.get('value'));
			Y.log(e.currentTarget.getAttribute('data-answer') ==e.currentTarget.get('value'));
			if(e.currentTarget.getAttribute('data-answer') ==e.currentTarget.get('value')){
				score++;
				Y.one('#score').set('innerHTML', score);
				e.currentTarget.setAttribute('disabled', 'disabled');
				Y.log("score is " + score);
				playTheGame(selArray)
			}else{
				//e.currentTarget.setClass('error');
				score--;
				Y.one('#score').set('innerHTML', score);
			}
			
		});
		answer.focus();
		formula.append(answer);
		gameboard.prepend(formula);
		
	}
	
	Y.all('#numbers a').on('click', function(e){
		Y.log(e);
		Y.log(this);
		e.currentTarget.toggleClass('selected');
		e.preventDefault();
	});
	Y.one('#start').on('click', function(e){
		selectedArray =[];
		Y.all('.selected').each(function(node){
			Y.log(node.get('id'));
			selectedArray.push(parseInt(node.get('id'), 10));
		});
		Y.log(selectedArray);
		e.preventDefault();
		
		
		playTheGame(selectedArray);
	})
});