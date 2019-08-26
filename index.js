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
			 name: "年龄",
			 type: "date",
			 renderer: "textInfoFormatter",
			 align:'left',
			 sortable: false,
			 width:85,
			 readOnly:true,
			 headerNameClass:"headerNameClass",
			 className: "htCenter",
			 
		 },
		 {
			id: "userWeight",
			 name: "体重",
			 type: "number",
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
   //grid.showLoading();
   //grid.hideLoading();
   //grid.setData();

	createGrid(containerObj, option);

})