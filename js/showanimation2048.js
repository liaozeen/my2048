function showNumberWithAnimation(i,j,randNumber){
	var numberCell = $('#number-cell-'+i+'-'+j);

	//判断数字或文字
	if(isNaN(showtext(randNumber))){
		numberCell.css('font-size',16);
	}else{
		numberCell.css('font-size',0.6*cellSideLength+'px');
	}

	//显示数字或文字
	numberCell.css('background-color',getNumberBackgroundColor(randNumber));
	numberCell.css('color',getNumberColor(randNumber));
	numberCell.text(showtext(randNumber));


	//显示数字出现时的动画效果
	numberCell.animate({
        width:cellSideLength,
        height:cellSideLength,
        top:getPosTop( i , j ),
        left:getPosLeft( i , j )
    },50);
}

function showMoveAnimation(fromx,fromy,tox,toy){
	var numberCell = $('#number-cell-'+fromx+'-'+fromy);

	//显示数字移动时的动画效果
	numberCell.animate({
        top:getPosTop( tox , toy ),
        left:getPosLeft( tox , toy )
    },200);
}

function updateScore(score){
	$("#score").text(score);
}

function showAddAnimation(score){
	var addscore = $('#addscore');

	//显示加分
	if(score!=0){
		addscore.css('top',"90%");
		addscore.css("color",'#7F8C8D');
		addscore.text("+"+score);
	}

	addscore.animate({
		top: -70,
	}, 400);

	added = 0;
}

function showtext(number){
	switch(number){
		case 2:
			return viewboard[2];
			break;
		case 4:
			return viewboard[4];
			break;
		case 8:
			return viewboard[8];
			break;
		case 16:
			return viewboard[16];
			break;
		case 32:
			return viewboard[32];
			break;
		case 64:
			return viewboard[64];
			break;
		case 128:
			return viewboard[128];
			break;
		case 256:
			return viewboard[256];
			break;
		case 512:
			return viewboard[512];
			break;
		case 1024:
			return viewboard[1024];
			break;
		case 2048:
			return viewboard[2048];
			break;
	};
}