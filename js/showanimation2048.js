function showNumberWithAnimation(i,j,randNumber){
	var numberCell = $('#number-cell-'+i+'-'+j);

	//显示数字
	numberCell.css('background-color',getNumberBackgroundColor(randNumber));
	numberCell.css('color',getNumberColor(randNumber));
	numberCell.text(randNumber);

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