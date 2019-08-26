
(
    function(window,document,$){

        function createGrid(container,opt){
   
            var data = opt.data;
            var columns =opt.columns;
            var width = opt.width;
            var height= opt.height;
            var showRowNumber = opt.showRowNumber==null?false:opt.showRowNumber;
            var isAscSort =true;

            if(container == null){
                alert("container is null");
                return false;
            }

            if(data ==null || data.length <1){
                alert("data is null");
                return false;
            }

            if(columns ==null || columns.length <1){
                alert("columns is null");
                return false;
            }

            var view = new View(container,data,columns,width,height,showRowNumber);
            view.init();


            var board = new Grid(data,columns);
            board.init();

            board.onSortComplete=function(){
                view.sort();
            }

            $(".tg-cell-header").click(function(e){
                
                var headerText = $(e.target).text();
                var headerId=null;
                if(headerText !=null && headerText.length >0){
                    //get column id by text
                    for(var j in columns){
                        var item = columns[j];

                        if(item.name === headerText){
                            headerId = item.id;
                            break;
                        }
                    }

                    //sort by headerId
                    this.isAscSort=!this.isAscSort;
                    $(e.target).addClass('select-header').siblings().removeClass('select-header');

                    if(this.isAscSort){
                        $(e.target).addClass('toAsc').removeClass('toDesc');
                        $(e.target).siblings().removeClass('toAsc').removeClass('toDesc');
                    }else{
                        $(e.target).addClass('toDesc').removeClass('toAsc');
                        $(e.target).siblings().removeClass('toAsc').removeClass('toDesc');
                    }

                    board.sort(headerId,this.isAscSort);


                }else{
                    alert("can not find header");
                }
            })

            $(".tg-cell").click(function(e){
                $(".tg-cell").removeClass('select-cell');
                $(e.target).addClass('select-cell');
            })

        }

        window['createGrid'] = createGrid;

    }

)(window,document,jQuery)