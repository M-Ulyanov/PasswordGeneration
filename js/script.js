$(function(){
	
	//Переключение классов сложности
	$('#low').on('click', function(){
		$(this).addClass('low-active');
		$(this).siblings('div').removeClass('middle-active hard-active');
	});
	$('#middle').on('click', function(){
		$(this).addClass('middle-active');
		$(this).siblings('div').removeClass('low-active hard-active');
	});
	$('#hard').on('click', function(){
		$(this).addClass('hard-active');
		$(this).siblings('div').removeClass('low-active middle-active');
	});
	
	//Подсказку в ноль
	$('#low-info, #middle-info, #hard-info').css('opacity', '0')
	
	//Функции показа подсказки
	$('#low').hover(function(){
		$('#low-info').animate({'opacity':'1'})
	}, function(){
		$('#low-info').animate({'opacity':'0'})
	});
	$('#middle').hover(function(){
		$('#middle-info').animate({'opacity':'1'})
	}, function(){
		$('#middle-info').animate({'opacity':'0'})
	});
	$('#hard').hover(function(){
		$('#hard-info').animate({'opacity':'1'})
	}, function(){
		$('#hard-info').animate({'opacity':'0'})
	});
	
	//Функции
	function noTypePass(){
		$('#result-pass').append('<h2 class="error-pass">' + 'Выберите сложность пароля!' + '</h2>');
	};
	function delRepeats(){
		$('.variant-pass').remove();
	};
	function randomSort(a, b) {
		return Math.random() - 0.5;
	};
	
	//Объявляем массивы и переменные
	var RadioVal,
		variantPass,
		lowercase = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
		uppercase = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
		number = ['1','2','3','4','5','6','7','8','9','0'],
		symbols = ['!','№','$',';','%',':','?','*','(',')','_','+','#','@','=','-','~','/','<','>','[',']','{','}'];
	
	//Какая выбрана сложность
	$('.radio').on('click', function(){
		RadioVal = $(this).html();
	});
	
	//Основная функция
	$('#buttonGoPass').on('click', function(){
		if (document.all && document.querySelector && !document.addEventListener){
		}else{
			var myaudio = $("#myaudio")[0];
			myaudio.play();
		}
		$('.error-pass').remove();
		if(!RadioVal){ noTypePass(); return false};
		variantPass = $('.variant-pass').length;
		if(variantPass >= 7) delRepeats();

		var low,
			upper,
			num,
			sym;
		
		//Проверка на выбранную сложность
		if(RadioVal === 'lowVal'){
			low = 5;
			upper = 3;
		}else if(RadioVal === 'middleVal'){
			low = 6;
			upper = 3;
			num = 3;
		}else if(RadioVal === 'hardVal'){
			low = 6;
			upper = 4;
			num = 3;
			sym = 3;
		}
		
		//Результаты цикла в массив
		var arr = []	
		for(i = 0; i < low; i++){
			var elem = Math.floor( Math.random() * lowercase.length);
			arr.push(lowercase[elem]);
		}
		for(i = 0; i < upper; i++){
			var elem = Math.floor( Math.random() * uppercase.length);
			arr.push(uppercase[elem]);
		}
		for(i = 0; i < num; i++){
			var elem = Math.floor( Math.random() * number.length);
			arr.push(number[elem]);
		}
		for(i = 0; i < sym; i++){
			var elem = Math.floor( Math.random() * symbols.length);
			arr.push(symbols[elem]);
		}
		//Сортируем массив и превращаем в строку
		arr.sort(randomSort);
		arr = arr.join('');
		$('#result-pass').append('<span class="variant-pass">' + arr + '</span>');
		$('.variant-pass').last().hide().animate({height: 'show'}, 400);
	});
	
});