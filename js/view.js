
(
    function(window,document,$){

        function View(prefix,len,size,margin){
            this.prefix = prefix;
            this.len = len;
            this.margin = margin;
            this.size = size;
            //this.container = $('#' + prefix + '_container');
            this.container = $("#game_container");
            var containerSize = len * size + margin * (len+1);
            this.container.css({width:containerSize,height:containerSize})
            this.nums ={};
        }

        View.prototype ={
            getPos:function(n){
                return this.margin + n *(this.size + this.margin);
            },
            init:function(){
                for(var x=0,len=this.len;x<this.len;++x){
                    for(var y=0;y<len;++y){
                        var $cell = $('<div class="' + this.prefix + '-cell"></div>');

                        $cell.css({
                            width:this.size + 'px',
                            height:this.size + 'px',
                            top:this.getPos(x),
                            left:this.getPos(y)
                        });
                        
                        console.log("append")
                        $cell.appendTo(this.container);
                        
                    }
                }
            },
            addNum:function(x,y,num){
                var $num = $('<div class="' + this.prefix + '-num ' + this.prefix + '-num-' + num + '">');

                $num.text(num).css(
                    {
                        top:this.getPos(x) + parseInt(this.size / 2),
                        left:this.getPos(y) + parseInt(this.size /2)
                    }
                ).appendTo(this.container).animate(
                    {
                        width:this.size + 'px',
                        height:this.size + 'px',
                        lineHeight:this.size + 'px',
                        top:this.getPos(x),
                        left:this.getPos(y)
                    },100);

                this.nums[x + '-' + y ]=$num;
            },
            move:function(from,to){
                var fromIndex = from.x + '-' + from.y;
                var toIndex = to.x + '-' + to.y;
                var clean = this.nums[toIndex];

                this.nums[toIndex] = this.nums[fromIndex];
                delete this.nums[fromIndex];

                var prefix= this.prefix + '-num-';
                var pos = {top:this.getPos(to.x),
                    left:this.getPos(to.y)}

                this.nums[toIndex].finish().animate(pos,200,function(){
                    if(to.num > from.num){
                        clean.remove();
                        $(this).text(to.num).removeClass(prefix + from.num).addClass(prefix + to.num);
                    }
                })

            },
            updateScore:function(score){
                var $score = $('#' + this.prefix + '_score');
                $score.text(score);
            },
            winGame:function(){
                alert('win game');
            },
            win:function(){
                $('#' + this.prefix + '_over_info').html('<p>你胜利了</p>');
                $('#' + this.prefix + '_over').removeClass(this.prefix + '-hide');
            },
            over:function(){
                $('#' + this.prefix + '_over_info').html('<p>本次得分</p><p>' + this.score + '</p>');
                $('#' + this.prefix + '_over').removeClass(this.prefix + '-hide');
            },
            cleanNum:function(){
                this.nums={};
                $('#' + this.prefix + '_over').addClass(this.prefix  +'-hide')
                $('.'  + this.prefix + '-num').remove();
            }
        }

        window['View'] = View;
    }

)(window,document,jQuery)