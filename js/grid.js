
(
    function(window,document,$){
        function Grid(len){
            this.len =len;
            this.arr =[];
            this.score=0;
            this.winScore=50;
            this.isGameOver=false;
        }

        Grid.prototype ={
            init:function(){

                for(var arr=[],len = this.len,x=0;x<len;++x){
                    arr[x] = [];
                    
                    for(var y=0;y<len;++y){
                        arr[x][y] =0;
                    }
                }

                this.arr=arr;
            },
            generate:function(){
                var empty =[];

                for(var x=0,arr= this.arr,len=arr.length;x<len;++x){
                    for(var y=0;y<len;++y){

                        if(arr[x][y]==0){
                            empty.push({x:x,y:y});
                        }
                    }
                }

                if(empty.length<1){
                    return false;
                }

                var pos =empty[Math.floor((Math.random()*empty.length))];
                this.arr[pos.x][pos.y] = Math.random() < 0.5?2:4;
                this.onGenerate({x:pos.x,y:pos.y,num:this.arr[pos.x][pos.y]});
            },
            onGenerate:function(){
                console.log("on generate")
            },
            moveLeft:function(){
                console.log('left')
                var moved = false;

                for(var x=0,len = this.arr.length;x<len;++x){

                    var arr=this.arr[x]

                    for(var y=1;y<len;y++){
                        if(arr[y]==0){
                            continue;
                        }else{

                            for(var j=y;j>0;j--){

                                if(arr[j-1]==0){
                                    arr[j-1] =arr[j];
                                    var next=j-1;
                                    this.onMove({from:{x:x,y:j,num:arr[j]},
                                        to:{x:x,y:next,num:arr[j-1]}});
    
                                    arr[j]=0;
                                    moved=true;
    
                                }else{
                                    if(arr[j-1] == arr[j]){
                                        arr[j-1] *=2;
                                        var next=j-1;
    
                                        this.onMove({from:{x:x,y:j,num:arr[j]},
                                            to:{x:x,y:next,num:arr[j-1]}});
    
                                        arr[j]=0;
                                        moved=true;
                                    }
                                }

                            }

                        }
                    
                    }
                }

                this.onMoveComplete({moved:moved})
            },
            moveRight:function(){
                console.log('right')
                var moved = false;

                for(var x=0,len = this.arr.length;x<len;++x){
                    var arr=this.arr[x]
                    for(var y=0;y<len-1;y++){

                        if(arr[y]==0){
                            continue;
                        }else{

                            if(arr[y+1]==0){
                                arr[y+1] =arr[y];
                                var next=y+1;
                                this.onMove({from:{x:x,y:y,num:arr[y]},
                                    to:{x:x,y:next,num:arr[y+1]}});

                                arr[y]=0;
                                moved=true;

                            }else{
                                if(arr[y+1] == arr[y]){
                                    arr[y+1] *=2;
                                    var next=y+1;

                                    this.onMove({from:{x:x,y:y,num:arr[y]},
                                        to:{x:x,y:next,num:arr[y+1]}});

                                    arr[y]=0;
                                    moved=true;
                                }
                            }

                        }
                    
                    }
                }

                this.onMoveComplete({moved:moved})
            },
            moveDown:function(){
                console.log('down')
                var moved = false;
                var arr=this.arr;

                for(var x=0,len = this.arr.length;x<len-1;++x){
               
                    for(var y=0;y<len;y++){

                        if(arr[x][y]==0){
                            continue;
                        }else{

                            if(arr[x+1][y]==0){
                                arr[x+1][y] =arr[x][y];
                                var next=x+1;
                                this.onMove({from:{x:x,y:y,num:arr[x][y]},
                                    to:{x:next,y:y,num:arr[x+1][y]}});

                                arr[x][y]=0;
                                moved=true;

                            }else{
                                if(arr[x+1][y] == arr[x][y]){
                                    arr[x+1][y] *=2;
                                    var next=x+1;

                                    this.onMove({from:{x:x,y:y,num:arr[x][y]},
                                        to:{x:next,y:y,num:arr[x+1][y]}});

                                    arr[x][y]=0;
                                    moved=true;
                                }
                            }

                        }
                    
                    }
                }

                this.onMoveComplete({moved:moved})
            },
            onMove:function(){

            },
            onMoveComplete:function(){

            },
            canMove:function(){
                for(var x=0,arr=this.arr,len=arr.length;x<len;++x){
                    for(var y=0;y<len;++y){
                        if(arr[x][y]===0){
                            return true;
                        }

                        var curr= arr[x][y];
                        var right = arr[x][y+1];
                        var down= arr[x+1]?arr[x+1][y]:null;

                        if(right ===curr || down===curr){
                            return true;
                        }
                    }
                }

                return false;

            }

        }

        window['Grid'] = Grid;
    }

)(window,document,jQuery)