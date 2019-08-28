$(function(){

	var dataList =[
		{
			"id":1,
			"userName":"zhan san",
			"userAge":"2011-05-12",
			"userWeight":18,
			"userAddress":"北京"
		},
		{
			"id":3,
			"userName":"li si",
			"userAge":"1954-04-15",
			"userWeight":30,
			"userAddress":"深圳"
		},
		{
			"id":2,
			"userName":"ali si",
			"userAge":"1992-07-12",
			"userWeight":40,
			"userAddress":"广州"
		}
	]

	$("#initialData").empty();
	$("#initialData").text(JSON.stringify(dataList));

	var columnsInfo =[
		{
		   id: "id",
		   name: "Id",
		   align:'left',
		   width:250,
		   readOnly:true,
		 },
		 {
			 id: "userName",
			 name: "User Name",
			 type: "text",
			 align:'left',
			 sortable: false,
			 width:85,
			 readOnly:false,
			 headerNameClass:"headerNameClass",
			 className: "htCenter",
			 
		 },
		 {
			 id: "userAge",
			 name: "年龄",
			 type: "date",
			 dataFormat:'yyyy-MM-dd',
			 align:'left',
			 sortable: false,
			 width:85,
			 readOnly:false,
			 headerNameClass:"headerNameClass",
			 className: "htCenter",
		 },
		 {
			id: "userWeight",
			 name: "体重",
			 type: "number",
			 align:'left',
			 sortable: false,
			 width:85,
			 readOnly:false,
			 headerNameClass:"headerNameClass",
			 className: "htCenter",
		 },
		 {
			id: "userAddress",
			name: "地址",
			type: "dropdown",
            dropdownSource:[
                {label:'北京',id:1},
                {label:'上海',id:2},
				{label:'深圳',id:3},
				{label:'广州',id:4}
            ],
			align:'left',
			sortable: false,
			width:85,
			readOnly:false,
			headerNameClass:"headerNameClass",
			className: "htCenter",
		 }
   ]
 
 
   var option={
	 data: dataList,
	 columns: columnsInfo,
	 width:800,
	 height: 400,
	 showRowNumber: true
   }
 
   //by id
   var containerObj = document.getElementById('mygrid_container');
 
   //var grid = new MyGrid(containerObj, option);
   //grid.showLoading();
   //grid.hideLoading();
   //grid.setData();

	var grid =createGrid(containerObj, option);

	$("#btnCurrentData").click(function(){
		var currentData = grid.getGridData();
		$("#currentData").empty();
		$("#currentData").text(JSON.stringify(currentData));

	})

	var containerCalendar = document.getElementById('calendar_container');

	//createCalendar(containerCalendar, '2019-08-24');

})