
(
    function(window,document,$){

        function crateGrid(container,opt){
   
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


            var board = new Grid(data,columns);
            board.init();

        }

        window['crateGrid'] = crateGrid;

    }

)(window,document,jQuery)