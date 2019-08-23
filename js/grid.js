
(
    function(window,document,$){

        function Grid(data,columns){
            this.data =data;
            this.columns=columns;
        }

        Grid.prototype ={
            init:function(){

            },
            onSort:function(){

            },
            onSortComplete:function(){

            }
            
        }

        window['Grid'] = Grid;
    }

)(window,document,jQuery)