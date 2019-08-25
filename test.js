
	
	function compareByColumn(idColumn, bDescending, sType) {
		var descending = bDescending;
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
                return descending ? -1 : 1;

            }else if (typeConvert(n1[idColumn]) > typeConvert(n2[idColumn])){

                return descending ? 1 : -1;
            }else{

                return 0;
            }
		};
		
	}

	
	function sortTable2(dataArray, idColumn, isAsc, sType)  {
		
		var data = dataArray;
		console.log("Sorting data...");

		var tempS =compareByColumn(idColumn, isAsc, sType);
		data.sort(tempS);
		
		console.log('after sort -----------------')
		console.log(a);

	}
	
		var a = new Array();
		
		/*var c= ['a',100];
		var d= ['c',47];
		var e= ['b',50];*/
	
		var c= {'name':'a','age':10}
		var d= {'name':'c','age':47}
		var e= {'name':'b','age':50}
		
		a.push(c);
		a.push(d);
		a.push(e);
		
		console.log('before sort -----------------')
		console.log(JSON.parse(JSON.stringify(a)));
		
		//sortTable(a, 0, false, String)
		sortTable2(a, 'age', false, String)