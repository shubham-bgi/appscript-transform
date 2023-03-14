function transform() {
  // input sheet name
  let sheetName = 'Input';
  // input column
  let columnName = 'G';
  //name of the new sheet you want
  let newSheetName = "transformed";
  // backgroud color of the header, you can also set hex value of colors like '#D16644'
  let backgroundColor = 'orange';
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  let data = sheet.getRange(columnName + ":" + columnName).getValues();
  data = data.filter(item => item[0].length != 0);
  data = data.map(item => item[0]);
  let finalData = [];
  data.forEach(item => {
    let x = item.split('$header$:');
    x = x.filter(item => item.includes('^content^:'));
    let obj = {};
    x.forEach( item=> {
      const y = item.split('^content^:');
      y[0] = y[0].trim();
      y[1] = y[1].trim();
      obj[y[0]] = y[1];
    });
    finalData.push(obj);
  })

  let transformedSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(newSheetName);

  let headers = Object.keys(finalData[0]);
  transformedSheet.getRange(1, 1, 1, headers.length).setValues([headers]).setBackground(backgroundColor);

  let rows = [];
  for (var i = 0; i < data.length; i++) {
    rows.push(Object.values(finalData[i]));
  }
  transformedSheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  transformedSheet.getDataRange().setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  transformedSheet.getDataRange().setHorizontalAlignment("center");
  transformedSheet.getDataRange().setVerticalAlignment("Middle");
}