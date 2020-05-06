
function JSONToExcelConvertor(JSONData, FileName, ShowLabel) {
    //先转化json 
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData; 
    var excel = '<table>';
    //生成表头 
    var row = "<tr>"; 
    for (var i = 0; i < ShowLabel.length; i++) { 
        row += "<td rowspan='2'>" + ShowLabel[i] + '</td>';
    } 
    excel += row + "</tr>";
    //循环生成表身 
    for (var i = 0; i < arrData.length; i++) { 
        var row = "<tr>"; 
        for (var j in arrData[i]) { 
            // var name = arrData[i][index].name === "." ? "" : arrData[i][index].name; 
            var td = arrData[i][j]; 
            row += '<td>' + td + '</td>'; 
        } 
        excel += row + "</tr>"; 
    }
    excel += "</table>"; 
    console.log(excel); 
    var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " + "xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>"; 
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">'; 
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel'; 
    excelFile += '; charset=UTF-8">'; 
    excelFile += "<head>"; 
    excelFile += "<!--[if gte mso 9]>"; 
    excelFile += "<xml>"; 
    excelFile += "<x:ExcelWorkbook>"; 
    excelFile += "<x:ExcelWorksheets>"; 
    excelFile += "<x:ExcelWorksheet>"; 
    excelFile += "<x:Name>"; 
    excelFile += "sheet"; 
    excelFile += "</x:Name>"; 
    excelFile += "<x:WorksheetOptions>"; 
    excelFile += "<x:DisplayGridlines/>"; 
    excelFile += "</x:WorksheetOptions>"; 
    excelFile += "</x:ExcelWorksheet>"; 
    excelFile += "</x:ExcelWorksheets>"; 
    excelFile += "</x:ExcelWorkbook>"; 
    excelFile += "</xml>"; 
    excelFile += "<![endif]-->"; 
    excelFile += "</head>"; 
    excelFile += "<body>"; 
    excelFile += excel; 
    excelFile += "</body>"; 
    excelFile += "</html>";
    var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile); 
    var link = document.createElement("a"); 
    link.href = uri; link.style = "visibility:hidden"; 
    link.download = FileName + ".xls"; 
    document.body.appendChild(link); 
    link.click(); 
    document.body.removeChild(link); 
    }
    export {JSONToExcelConvertor}