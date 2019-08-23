$(function(){

	var dataList =[
		{
			"id":1,
			"userName":"zhan san",
			"userAge":18,
			"userAddress":"北京"
		},
		{
			"id":2,
			"userName":"li si",
			"userAge":30,
			"userAddress":"深圳"
		}
	]

	var columnsInfo =[
		{
		   id: "id",
		   name: "Id",
		   align:'left',
		   width:250
		 },
		 {
			 id: "userName",
			 name: "User Name",
			 type: "text",
			 renderer: "textInfoFormatter",
			 align:'left',
			 sortable: false,
			 width:85,
			 readOnly:true,
			 headerNameClass:"headerNameClass",
			 className: "htCenter",
			 
		 },
		 {
			id: "userAge",
			 name: "User Age",
			 type: "text",
			 renderer: "textInfoFormatter",
			 align:'left',
			 sortable: false,
			 width:85,
			 readOnly:true,
			 headerNameClass:"headerNameClass",
			 className: "htCenter",
		 },
		 {
			id: "userAddress",
			 name: "地址",
			 type: "text",
			 renderer: "textInfoFormatter",
			 align:'left',
			 sortable: false,
			 width:85,
			 readOnly:true,
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

	crateGrid(containerObj, option);

})