
(
    function(window,document,$){

        function Calendar(date){
            this.date =date;
        }

        Calendar.prototype ={
            init:function(){

            },
            createHeader:function(){
                var self=this;
                var columnInfo = self.columns;

                 //remove old node
                $(self.grid).children(".tg-div-header").remove();

                var headerDiv = document.createElement('div');
                headerDiv.classList.add('tg-div-header');

                var header = document.createElement('div');
                header.classList.add('tg-row-header');

                headerDiv.appendChild(header);

                for(var j=0;j<columnInfo.length;j++){
                    var columnInfoItem = columnInfo[j];
                    var cell = document.createElement("div");
                    cell.classList.add('tg-cell-header');
                    cell.innerText=columnInfoItem.name;
                    header.appendChild(cell);
                }

                self.grid.appendChild(headerDiv);
                

                $(".tg-cell-header").click(function(e){
                    var headerText = $(e.target).text();
                    var headerId=null;
                    var columns = self.columns;
                    
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
                        self.isAscSort=!self.isAscSort;
                        $(e.target).addClass('select-header').siblings().removeClass('select-header');
    
                        if(self.isAscSort){
                            $(e.target).addClass('toAsc').removeClass('toDesc');
                            $(e.target).siblings().removeClass('toAsc').removeClass('toDesc');
                        }else{
                            $(e.target).addClass('toDesc').removeClass('toAsc');
                            $(e.target).siblings().removeClass('toAsc').removeClass('toDesc');
                        }
    
                        self.onHeaderClick(headerId,self.isAscSort);

                    }else{
                        alert("can not find header");
                    }
                })
            }
            
        }

        window['Calendar'] = Calendar;
    }

)(window,document,jQuery)