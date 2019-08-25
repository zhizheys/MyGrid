
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
                
                switch(sType.lower()){
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
                var tempS =compareByColumn(idColumn, isAsc, sType);
                data.sort(tempS);
                return data;
            },
            onSort:function(){
                var dataArray = this.data;
                var a = new Array();
                var c= {'name':'a','age':10}
                var d= {'name':'c','age':47}
                var e= {'name':'b','age':50}
                
                a.push(c);
                a.push(d);
                a.push(e);
        
                sortDataArray(a, 'age', false, String);
                console.log("after sort");
                console.log(a);
            },
            onSortComplete:function(){

            }
            
        }

        window['Grid'] = Grid;
    }

)(window,document,jQuery)