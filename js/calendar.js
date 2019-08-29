
(
    function(window,document,$){

        function Calendar(container,dateString){
            var self=this;
            self.container =container;
            self.dateString=dateString;
            self.date = new Date();
            self.calendar=null;
            self.yyyy_MM='';
        }

        Calendar.prototype ={
            init:function(){
                var self=this;
                self.date = self.parserDate(self.dateString);

                var calendarObj = document.createElement("div");
                self.calendar= calendarObj;
                calendarObj.style.zIndex=100000;
				calendarObj.classList.add('calender-board');
                

                self.createHeader();
                self.createBody();

                self.container.appendChild(self.calendar);

                // calendarObj.onmouseout = function() {
                //     $('.calender-board').empty();
                //     $('.calender-board').remove();
                // };

                calendarObj.onblur = function() {
                    $('.calender-board').empty();
                    $('.calender-board').remove();
                };
            },
            parserDate:function (dateString) {
                var t = Date.parse(dateString);  
                if (!isNaN(t)) {  
                    return new Date(Date.parse(dateString.replace(/-/g, "/")));  
                } else {  
                    return new Date();  
                }
            },
            createHeader:function(){
                var self=this;
                var columnInfo = self.columns;

                 //remove old node
                $(self.calendar).children("calendar-div-header").remove();

                var headerDiv = document.createElement('div');
                headerDiv.classList.add('calendar-div-header');

                var prevSpan = document.createElement('span');
                prevSpan.innerText='上个月'
                prevSpan.classList.add('month-btn');
                headerDiv.appendChild(prevSpan);

                var nextSpan = document.createElement('span');
                nextSpan.innerText='下个月'
                nextSpan.classList.add('month-btn');
                headerDiv.appendChild(nextSpan);

                var closeSpan = document.createElement('span');
                closeSpan.innerText='关闭'
                closeSpan.classList.add('month-btn');
                headerDiv.appendChild(closeSpan);


                //headerDiv.appendChild(header);
                self.calendar.appendChild(headerDiv);

                $(prevSpan).click(function(e){
                    alert('prev month')
                })

                $(nextSpan).click(function(e){
                    alert('next month')
                })

                $(closeSpan).click(function(e){
                    $(self.container).hide();
                })
            },
            createBody:function(){
                var self=this;
                var nianD = self.date.getFullYear();//当前年份 
                var yueD = self.date.getMonth(); //当前月 
                var tianD = self.date.getDate(); //当前天 这保存的年月日 是为了 当到达当前日期 有对比 

                var nian = self.date.getFullYear();//当前年份 
                var yue = self.date.getMonth(); //当前月 
                var tian = self.date.getDate(); //当前天 
                self.yyyy_MM = nianD + '-' + (yueD + 1);

                 //remove old node
                $(self.calendar).children("calendar-div-body").remove();

                var bodyDiv = document.createElement('div');
                bodyDiv.classList.add('calendar-div-body');

                var monthDiv = document.createElement('div');
                monthDiv.innerText=nianD + '-' + (yueD + 1);
                monthDiv.classList.add('month-info');
                bodyDiv.appendChild(monthDiv);

                //create week
                var weekArray=['日','一','二','三','四','五','六']
                var weekDiv = document.createElement('div');
                weekDiv.classList.add('week-info');

                var weekUL = document.createElement('ul');
                weekDiv.appendChild(weekUL);

                for(var j=0;j<weekArray.length;j++){
                    var weekDay =document.createElement('li');
                    weekDay.innerText=weekArray[j];
                    weekDay.classList.add('week-day');
                    weekUL.appendChild(weekDay);
                }

                bodyDiv.appendChild(weekDiv);


                //create every date
            
                var dayDiv = document.createElement('div');
                dayDiv.classList.add('day-info');

                var dayUL = document.createElement('ul');
                

                var setDat = new Date(nian,yue + 1,1 - 1); //把时间设为下个月的1号 然后天数减去1 就可以得到 当前月的最后一天; 
                var setTian = setDat.getDate(); //获取 当前月最后一天 
                var setZhou = new Date(nian,yue,1).getDay(); //获取当前月第一天 是 周几 
                
                for(var i=0;i<setZhou ;i++){//渲染空白 与 星期 对应上 
                    var li=document.createElement('li'); 
                    dayUL.appendChild(li); 
                } 
                
                for(var i=1;i<=setTian;i++){//利用获取到的当月最后一天 把 前边的 天数 都循环 出来 
                    var li=document.createElement('li'); 
                    li.innerText = i; 
                    li.classList.add('day');

                    if(nian == nianD && yue == yueD && i == tianD){
                        li.classList.add("active-day"); 
                    }
                    
                    dayUL.appendChild(li); 
                }

            
                dayDiv.appendChild(dayUL);
                bodyDiv.appendChild(dayDiv);
                self.calendar.appendChild(bodyDiv);

                //必须使用静态的父亲节点，才能动态添加事件
                $(self.container).on('click','.day',function(e){
                
                    var selectDay = $(e.target).text();
                    self.dateString= self.yyyy_MM + '-' + selectDay;

                    $(".day").removeClass('active-day');
                    $(e.target).addClass('active-day');
                })

               
            },
            getCurrentDate:function(){
                var self = this;
                return self.dateString;
            }
        }

        window['Calendar'] = Calendar;
    }

)(window,document,jQuery)