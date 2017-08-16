//获取当前设备的宽度，作为参照物
documentWidth = window.screen.availWidth;
//棋盘宽度
gridContainerWidth = 0.92*documentWidth;
//每个小方块的边长
cellSideLength = 0.18*documentWidth;
//方块间的间距
cellSpace = 0.04*documentWidth;

function getPosTop( i , j ){
    return cellSpace + i*(cellSpace+cellSideLength);
}

function getPosLeft( i , j ){
    return cellSpace + j*(cellSpace+cellSideLength);
}

function getNumberBackgroundColor(number){
	switch(number){
		case 2:return "#eee4da";break;
		case 4:return "#ede0c8";break;
		case 8:return "#f2b179";break;
		case 16:return "#f59563";break;
		case 32:return "#f67c5f";break;
		case 64:return "#f65e3b";break;
		case 128:return "#edcf72";break;
		case 256:return "#edcc61";break;
		case 512:return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 2048:return "#09c";break;
		case 4096:return "#a6c";break;
		case 8192:return "#93c";break;
	}

	return"black";
}

function getNumberColor(number){
	if(number<=4){
		return '#776e65';
	}

	return "white";
}

function nospace(board){
	//遍历board里的元素
	for( var i = 0 ; i < 4 ; i ++ ){
        for( var j = 0 ; j < 4 ; j ++ ){
        	//当当前元素的值为0时，说明还有空间
        	if(board[i][j] == 0){
        		return false;
        	}
        }
    }

    return true;
}

function canMoveLeft(board){
	//遍历右三列的元素，即1<=j<4时
	for(var i = 0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				//判断当前位置的左侧的格子是否有空间
				//判断当前位置的左侧的格子的数字是否与当前位置的数字相等
				//满足以上其中一个，说明可以向左移动，返回true
				if(board[i][j-1]==0||board[i][j-1]===board[i][j]){
					return true;
				}
			}
		}
	}

	return false;
}

function canMoveUp(board){
	for(var j = 0;j<4;j++){
		for(var i=1;i<4;i++){
			if(board[i][j]!=0){
				if(board[i-1][j]==0 || board[i-1][j]==board[i][j]){
					return true;
				}
			}
		}
	}

	return false;
}

function canMoveRight(board){
	for(var i = 0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0){
				if(board[i][j+1]==0 || board[i][j+1]===board[i][j]){
					return true;
				}
			}
		}
	}

	return false;
}

function canMoveDown(board){
	for(var j = 0;j<4;j++){
		for(var i=2;i>=0;i--){

			if(board[i][j]!=0){
				if(board[i+1][j]==0||board[i+1][j]===board[i][j]){
					return true;
				}
			}
		}
	}

	return false;
}



//判断水平线是否有障碍物
function noBlockHorizontal(row,col1,col2,board){
	for(var i=col1+1;i<col2;i++){
		//判断当前位置到落脚位置之间的位置是否有障碍物（数字）
		if(board[row][i]!=0){
			//如果有障碍物，返回false，结束该函数
			return false;
		}
	}
	//循环结束后没有返回false，说明没有障碍物，则返回true
	return true;
}

//判断垂直线是否有障碍物
function noBlockVertical(col,row1,row2,board){
	for(var i=row1+1;i<row2;i++){
		//判断当前位置到落脚位置之间的位置是否有障碍物（数字）
		if(board[i][col]!=0){
			//如果有障碍物，返回false，结束该函数
			return false;
		}
	}
	//循环结束后没有返回false，说明没有障碍物，则返回true
	return true;
}

function nomove(board){
	if( canMoveDown(board) ||
		canMoveRight(board) ||
		canMoveUp(board) ||
		canMoveLeft(board)){
		return false;
	}

	return true;
}