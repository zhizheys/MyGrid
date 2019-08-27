
(
    function(window,document,$){

        function createGrid(container,opt){
   
            var data = opt.data;
            var columns =opt.columns;
            var width = opt.width;
            var height= opt.height;
            var showRowNumber = opt.showRowNumber==null?false:opt.showRowNumber;
            
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
            view.onHeaderClick=function(headerId,isAscSort){
                board.sort(headerId,isAscSort);
            }


            var board = new Grid(data,columns);
            board.init();

            board.onSortComplete=function(){
                view.sort();
            }

            return view;
        }

        window['createGrid'] = createGrid;

    }

)(window,document,jQuery)