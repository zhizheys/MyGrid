
(
    function(window,document,$){

        function View(container,data,columns,width,height,showRowNumber){
            
            this.container =container;
            this.data = data;
            this.columns =columns;
            this.width = width;
            this.height= height;
            this.showRowNumber = showRowNumber;
            this.grid=null;
        }

        View.prototype ={
            init:function(){
                var gridObj = document.createElement("div");
                this.grid= gridObj;
				gridObj.classList.add('tg');
                gridObj.style.width= this.width + "px";
                //gridObj.style.height= this.height + "px";
                
                this.createHeader();
                this.createBody();

                this.container.appendChild(gridObj);
            },
            createHeader:function(){
                var columnInfo = this.columns;
                var header = document.createElement('div');
                header.classList.add('tg-row-header');

                for(var j=0;j<columnInfo.length;j++){
                    var columnInfoItem = columnInfo[j];
                    var cell = document.createElement("div");
                    cell.classList.add('tg-cell-header');
                    cell.innerText=columnInfoItem.name;
                    header.appendChild(cell);
                }

                this.grid.appendChild(header);
            },
            createBody:function(){
                var dataList = this.data;
                var columnInfo = this.columns;

                for(var k=0;k<dataList.length;k++){
                    var row = document.createElement('div');
                    row.classList.add('tg-row');

                    for(var j=0;j<columnInfo.length;j++){
                        var columnInfoItemId = columnInfo[j].id;
                        var cell = document.createElement("div");
                        cell.classList.add('tg-cell');
                        cell.innerText=dataList[k][columnInfoItemId]
                        row.appendChild(cell);
                    }

                    this.grid.appendChild(row);
                }

                
            },
            createFooter:function(){

            }
        }

        window['View'] = View;
    }

)(window,document,jQuery)