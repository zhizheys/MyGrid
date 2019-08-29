
(
    function(window,document,$){

        function View(container,data,columns,width,height,showRowNumber){
            var self=this;
            self.container =container;
            self.data = data;
            self.columns =columns;
            self.width = width;
            self.height= height;
            self.showRowNumber = showRowNumber;
            self.grid=null;
            self.isAscSort =true;
        }

        View.prototype ={
            init:function(){
                var self=this;
                var gridObj = document.createElement("div");
                self.grid= gridObj;
				gridObj.classList.add('tg');
                gridObj.style.width= self.width + "px";
                //gridObj.style.height= self.height + "px";
                self.container.appendChild(self.grid);
                
                self.createHeader();
                self.createBody();
                
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
            },
            createBody:function(){
                var self=this;
                var dataList = self.data;
                var columnInfo = self.columns;

                //remove old node
                $(self.grid).children(".tg-div-body").remove();

                var bodyDiv = document.createElement('div');
                bodyDiv.classList.add('tg-div-body');

                //create new node
                for(var k=0;k<dataList.length;k++){
                    var row = document.createElement('div');
                    row.classList.add('tg-row');

                    for(var j=0;j<columnInfo.length;j++){
                        var columnInfoItemId = columnInfo[j].id;
                        var cell = document.createElement("div");
                        cell.classList.add('tg-cell');
                        cell.setAttribute('columnid',columnInfoItemId);
                        cell.setAttribute('rowindex',k);

                        cell.innerText=dataList[k][columnInfoItemId]
                        row.appendChild(cell);
                    }

                    bodyDiv.appendChild(row);
                }

                self.grid.appendChild(bodyDiv);
        

                //bind click
                $(".tg-cell").click(function(e){
                    $(".tg-cell").removeClass('select-cell');
                    $(e.target).addClass('select-cell');

                    //get row index
                    var rowIndex = parseInt(this.getAttribute('rowindex'));

                    //get current column info
                    var columnId = this.getAttribute('columnid');
                    var currentColumnInfo = self.getColumnInfoById(columnId);

                    var isReadOnly= currentColumnInfo.readOnly==null?false:currentColumnInfo.readOnly;
                    var renderer=currentColumnInfo.renderer==null?null:currentColumnInfo.renderer;
                    var dataType=currentColumnInfo.type ==null?'text':currentColumnInfo.type;
                    var dropdownSource =currentColumnInfo.dropdownSource ==null?[]:currentColumnInfo.dropdownSource;
                    var dataFormat =currentColumnInfo.dataFormat ==null?null:currentColumnInfo.dataFormat;

                    //priority:  readOnly > renderer > type
                    if(isReadOnly){
                        return false;
                    }

                    if(renderer !=null){
                        return 'render value'
                    }

                    //var type=['number','text','dropdown','checkbox','date','currency'];

                    switch(dataType){
                        case 'text':
                                try{
                                    var width="100px";
                                    var height = "25px";

                                    var inputElement = document.createElement("input");
                                    inputElement.type = "text";
                                    inputElement.value =e.target.innerText === null ? null : e.target.innerText.trim();
                                    inputElement.classList.add('tg-cell');
                                    inputElement.style.width="100px";

                                    // inputElement.setAttribute(
                                    //   "style",
                                    //   "border:1px; border-style:solid; border-color:#0099CC;width:" + width + ";height:" + height
                                    // );
                          
                                    inputElement.onblur = function() {

                                        self.changeCellValue(rowIndex,columnId,inputElement.value);
                                        e.target.innerText = inputElement.value;
                                        inputElement.setAttribute(
                                            "style",
                                            "border:1px; border-style:solid; border-color:#0099CC;width:98%;padding:0 0;margin:0 0;"
                                        );
                                        inputElement.parentNode.replaceChild(e.target, inputElement);
                                   
                          
                                    };
                          
                                    e.target.parentNode.replaceChild(inputElement, e.target);
                                    inputElement.focus();
                                    inputElement.select();

                                }catch(ex){
                                    alert(ex)
                                }

                            break;
                        case 'number':

                            break;

                        case 'dropdown':
                            try{

                                var inputElement = document.createElement("select");
                                inputElement.classList.add('tg-cell');
                                inputElement.style.width="100px";
                                
                                for(var j=0;j<dropdownSource.length;j++){
                                    myOption = document.createElement("option"); 
                                    myOption.value = dropdownSource[j].id; 
                                    myOption.text = dropdownSource[j].label; 
                                    inputElement.appendChild(myOption); 
                                }

                                inputElement.onblur = function() {
                                    var label = '';

                                    for(var j=0;j<dropdownSource.length;j++){
                                    
                                        if(dropdownSource[j].id.toString() ===inputElement.value){
                                            label =dropdownSource[j].label;
                                            break;
                                        }
                                       
                                    }

                                    self.changeCellValue(rowIndex,columnId,inputElement.value);

                                    //change innerText and value in dataArray

                                    e.target.innerText = label;
                                    inputElement.parentNode.replaceChild(e.target, inputElement);
                               
                                };
                      
                                e.target.parentNode.replaceChild(inputElement, e.target);
                                inputElement.focus();
                                //inputElement.select();

                            }catch(ex){
                                alert(ex)
                            }

                            break;
                        case 'checkbox':

                            break;
                        case 'date':
                            var inputElement = document.createElement("div");
                            inputElement.classList.add("show-calendar");
                            var dateValue=e.target.innerText === null ? new Date() : e.target.innerText.trim();
                            var cal = createCalendar(inputElement, dateValue);
                            
                            inputElement.onmouseleave = function() {
                                self.changeCellValue(rowIndex,columnId,cal.getCurrentDate());
                                e.target.innerText=cal.getCurrentDate();
                                $(inputElement).remove();
                                
                            };

                            e.target.parentNode.appendChild(inputElement);
                            inputElement.focus();
                          
                           
                            break;
                        case 'currency':

                        break;
                            default:

                    }


                })

                $(".tg-cell").onblur = function(e) {
                    $(e.target).removeClass('select-cell');
                };
                
            },
            createFooter:function(){

            },
            onHeaderClick:function(headerId,isAscSort){

            },
            sort:function(){
                var self=this;
                self.createBody();
                self.container.appendChild(self.grid);
            },
            getColumnInfoById:function(columnId){
                var self=this;
                var columnObj= new Object();
                for(var j=0;j<self.columns.length;j++){
                    if(self.columns[j].id === columnId){
                        columnObj= self.columns[j];
                    }
                }

                return columnObj;
            },
            changeCellValue:function(rowIndex,columnId,newValue){
                var self=this;
                self.data[rowIndex][columnId]=newValue; 
            },
            getGridData:function(){
                return this.data;
            }

        }

        window['View'] = View;
    }

)(window,document,jQuery)