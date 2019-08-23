
(
    function(window,document,$){

        function game2048(opt){
            console.log("game 2048")
            var prefix = opt.prefix
            var len =opt.len
            var size = opt.size
            var margin= opt.margin;

            var view = new View(prefix,len,size,margin);
            view.init();

            var board = new Grid(len);
            board.init();

            board.onGenerate=function(e){
                //console.log(e)
                view.addNum(e.x,e.y,e.num)
            }

            board.generate();
            board.generate();

            board.onMove=function(e){

                view.move(e.from,e.to);

                if(e.to.num > e.from.num){
                    this.score = this.score + e.to.num;
                    view.updateScore(this.score);

                    if(this.score >= this.winScore){
                        this.isGameOver=true;
                        view.winGame();
                    }
                }

            }

            board.onMoveComplete = function(e){

                if(!board.canMove()){
                    this.isGameOver =true;
                    setTimeout(function(){
                        alert('本次得分: ' + this.score);
                    },300);
                }

                if(e.moved){
                    setTimeout(function(){
                        board.generate();

                    },200)
                }
            }

            $(document).keydown(
                function(e){

                    if(board.isGameOver){
                        return false;
                    }

                    switch(e.which){
                        case 37:
                            board.moveLeft();
                            break;

                        case 38:
                            board.moveUp();
                            break;

                        case 39:
                            board.moveRight();
                            break;

                        case 40:
                            console.log('to down');
                            board.moveDown();
                            break;

                        default:
                            break;
                    }

                   
                }
            )

            function start(){
                score=0;
                view.updateScore(0);
                view.cleanNum();
                board.init();
                board.generate();
                board.generate();
            }

            $('#' + prefix + '_restart').click(start);

        }

        window['game2048'] = game2048;

    }

)(window,document,jQuery)