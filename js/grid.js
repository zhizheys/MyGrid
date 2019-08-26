
(
    function(window,document,$){

        function Grid(data,columns){
            this.data =data;
            this.columns=columns;
        }

        Grid.prototype ={
            init:function(){

            },
            compareByColumn:function(idColumn, isAsc, sType){
                var isAscSort = isAsc;
                var typeConvert = String;
                
                switch(sType.toLowerCase()){
                    case 'string':
                        typeConvert = String;
                        break;
                    case 'number':
                        typeConvert = Number;
                        break;
                    case 'date':
                        typeConvert = Date;
                        break;
                    
                    default:
                        typeConvert = String;
                }
                    
                return function (n1, n2) {
                
                    if (typeConvert(n1[idColumn]) < typeConvert(n2[idColumn])){
                        return isAscSort ? -1 : 1;

                    }else if (typeConvert(n1[idColumn]) > typeConvert(n2[idColumn])){

                        return isAscSort ? 1 : -1;
                    }else{

                        return 0;
                    }
                };
            },
            sortDataArray:function(dataArray, idColumn, isAsc, sType)  {
                var data = dataArray;
                var tempS =this.compareByColumn(idColumn, isAsc, sType);
                data.sort(tempS);
                return data;
            },
            sort:function(sortById,isAscSort){
                var dataArray = this.data;
                var dataType='String';
                this.sortDataArray(dataArray, sortById, isAscSort, dataType);
                this.onSortComplete();

            },
            onSort:function(){

            },
            onSortComplete:function(){

            }
            
        }

        window['Grid'] = Grid;
    }

)(window,document,jQuery)