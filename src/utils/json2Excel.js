
import * as XLSX from "xlsx";

export default (
  data= [],
  sheetName = "sheet1",
  fileName = "瑞祥沣洗车行.xlsx"
) => {
  const jsonWorkSheet = XLSX.utils.json_to_sheet(data);
  
  const workBook = {
    SheetNames: [sheetName], // 指定有序 sheet 的 name
    Sheets: {
      [sheetName]: jsonWorkSheet, // 表格数据内容
    },
  };

  return XLSX.writeFile(workBook, fileName); // 向文件系统写出文件
};
