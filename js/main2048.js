//游戏数据
//当前board为一维数组
var board = new Array();
var score = 0;
var hasConflicted = new Array();

//当文档加载完后，启动主函数
$(document).ready(function(){
    //实现移动端的准备工作
    prepareForMobile();
    newgame();
});

function prepareForMobile(){
    //当屏幕宽度大于500px时，就不再自适应了
    if(documentWidth>500){
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }

    $('#grid-container').css('width',gridContainerWidth - 2*cellSpace);
    $('#grid-container').css('height',gridContainerWidth - 2*cellSpace);
    $('#grid-container').css('padding',cellSpace);
    $('#grid-container').css('border-radius',0.02*gridContainerWidth);

    $('.grid-cell').css('width',cellSideLength);
    $('.grid-cell').css('height',cellSideLength);
    $('.grid-cell').css('border-radius',0.02*cellSideLength);
}

function newgame(){
    //初始化棋盘格
    init();
    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

function init(){
    //生成16个背景格子
    for( var i = 0 ; i < 4 ; i ++ ){
        for( var j = 0 ; j < 4 ; j ++ ){
            //逐个获取每个小方块进行DOM操作，确定方块的位置
            var gridCell = $('#grid-cell-'+i+"-"+j);
            gridCell.css('top', getPosTop( i , j ) );
            gridCell.css('left', getPosLeft( i , j ) );
        }
    }

    //对board里的每个变量进行遍历操作，由一维数组变成二维数组
    for( var i = 0;i < 4; i++){
        //给board里的每个变量再生成一个数组，即成二维数组
        board[i] = new Array();
        hasConflicted[i] = new Array();
        //初始化board里每个变量的值
        for(var j = 0 ; j < 4 ; j++){
            board[i][j] = 0;
            //初始情况下，每个元素没有进行过碰撞
            hasConflicted[i][j] = false;
        }
    }

    //根据board变量的值，对number-cell元素进行操作
    updateBoardView();

    score = 0;
}

function updateBoardView(){
    //把当前所有含有.number-cell元素移除
    $(".number-cell").remove();
    //根据当前的board的值，添加新的.number-cell元素
    //使用双重循环遍历board变量的值
    for( var i = 0 ; i < 4 ; i ++ ){
        for( var j = 0 ; j < 4 ; j ++ ){
            //在#grid-container里再添加number-cell元素
            //并给每个元素添加唯一的id，以便后期对元素进行操作
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            //为方便对当前i和j坐标下的number-cell元素操作
            //用一个变量存储当前坐标的jQuery元素
            var theNumberCell = $('#number-cell-'+i+'-'+j);

            //根据当前number-cell元素的值进行不同的样式更改
            //当board[i][j]等于0时，该元素不显示，即宽和高为0
            if(board[i][j] === 0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j)+cellSideLength/2);
                theNumberCell.css('left',getPosLeft(i,j)+cellSideLength/2);
            }
            else{
                theNumberCell.css('width',cellSideLength);
                theNumberCell.css('height',cellSideLength);
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                //根据不同的值设置不同的背景色和文字颜色
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                //显示数字
                theNumberCell.text(board[i][j]);
            }

            hasConflicted[i][j] = false;
        }
    }

    $('.number-cell').css('line-height',cellSideLength+'px');
    $('.number-cell').css('font-size',0.6*cellSideLength+'px');
}

function generateOneNumber(){
    //判断当前的board是否还有空间
    if( nospace( board ) ){
        return false;
    }

    //随机一个位置
    var randx = parseInt( Math.floor( Math.random()  * 4 ) );
    var randy = parseInt( Math.floor( Math.random()  * 4 ) );

    //判断当前随机生成的位置是否已被数字占有
    //如果被占有，重新生成一个随机位置直到当前位置可用
    //设置一个变量times以避免陷入死循环，优化算法
    var times =0;
    while( times<50 ){
        if( board[randx][randy] == 0 ){
            break;
        }else{
        randx = parseInt( Math.floor( Math.random()  * 4 ) );
        randy = parseInt( Math.floor( Math.random()  * 4 ) );
        }

        times++;
    }

    //如果超过50次还没找到空格子就遍历棋盘寻找
    if(times===50){
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                randx = i;
                randy = j;
            }
        }
    }

    //随机一个数字，2或4，概率各为50%
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation( randx , randy , randNumber );

    return true;
}

//当玩家按下方向键时，游戏响应（实现基于玩家响应的游戏循环）
$(document).keydown(function(event) {
    switch(event.keyCode){
        case 37: //向左
            //判断是否可以向左移动
            if(moveLeft()){
                //为了更流畅地显示游戏动画效果，延迟执行以下函数
                //移动后随机生成一个数字
                //判断游戏是否已结束
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 38: //向上
            if(moveUp()){
               setTimeout("generateOneNumber()",210);
               setTimeout("isgameover()",300);
            }
            break;
        case 39: //向右
            if(moveRight()){
               setTimeout("generateOneNumber()",210);
               setTimeout("isgameover()",300);
            }
            break;
        case 40: //向下
            if(moveDown()){
              setTimeout("generateOneNumber()",210);
              setTimeout("isgameover()",300);
            }
            break;
        default://按下非方向键无效
            break;
    }
});

function isgameover(){
    //当棋盘上没有空间且不能再移动时，游戏结束
    if( nospace( board ) && nomove( board ) ){
        gameover();
    }
}

function gameover(){
    alert("游戏结束！");
}

function moveLeft(){
    //判断当前是否可以向左移动
    if(!canMoveLeft(board)){
        return false;
    }
    //可向左移动
    //对每一个数字的左侧位置进行判断，看是否可能为落脚点
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            //判断当前位置是否有数字
            if(board[i][j]!=0){
                //遍历当前位置所有左侧的元素
                for(var k=0;k<j;k++){
                    //判断board[i][k]是否为空，即为落脚点
                    //且当前位置board[i][j]到落脚位置board[i][k]之间没有障碍物
                    if(board[i][k]==0 && noBlockHorizontal(i,k,j,board)){
                        //满足条件即可向左移动
                        showMoveAnimation(i,j,i,k);
                        //移动后，当前位置的数字为0
                        //落脚位置的数字为当前位置的数字
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //如果board[i][k]有数字，且和当前位置的数字相等
                    //同时当前位置到落脚位置之间没有障碍物
                    //同时落脚位置board[i][k]没有发生过碰撞
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
                        //满足条件即可向左移动
                        showMoveAnimation(i,j,i,k);
                        //数字叠加操作
                        board[i][k] +=board[i][j];
                        board[i][j] = 0;
                        //分数叠加,叠加值为合成后的数字
                        score += board[i][k];
                        //通知视图更改分数
                        updateScore(score);

                        //表示board[i][k]发生过碰撞
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    //showMoveAnimation()运行需要200毫秒，而完成整个for循环只需几毫秒
    //所以需要延迟运行updateBoardView()才会出现移动动画效果
    setTimeout("updateBoardView()",200);
    return true;
}

function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }

    for(var j=0;j<4;j ++){
        for(var i=1;i<4;i++){

            if(board[i][j]!=0){
                for(var k=0;k<i;k++){

                    if(board[k][j]==0 && noBlockVertical (j,k,i,board)){
                        showMoveAnimation(i,j,k,j);

                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j] === board[i][j] && noBlockVertical (j,k,i,board) && !hasConflicted[k][j]){
                        showMoveAnimation(i,j,k,j);

                        board[k][j] *=2;
                        board[i][j] = 0;

                        score += board[k][j];
                        updateScore(score);

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()",200);
    return true;

}

function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }

    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){

            if(board[i][j]!=0){
                for(var k=3;k>j;k--){
                    if(board[i][k]==0 && noBlockHorizontal(i,j,k,board)){
                        showMoveAnimation(i,j,i,k);

                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k]){
                        showMoveAnimation(i,j,i,k);

                        board[i][k] *=2;
                        board[i][j] = 0;

                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] =true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()",200);
    return true;

}

function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }

    for(var j=0;j<4;j++){
        for(var i=2;i>=0;i--){

            if(board[i][j]!=0){
                for(var k=3;k>i;k--){

                    if(board[k][j]==0 && noBlockVertical (j,k,i,board)){
                        showMoveAnimation(i,j,k,j);

                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j] === board[i][j] && noBlockVertical (j,k,i,board) && !hasConflicted[k][j]){
                        showMoveAnimation(i,j,k,j);

                        board[k][j] *=2;
                        board[i][j] = 0;

                        score += board[k][j];
                        updateScore(score);

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}