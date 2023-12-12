export function convertDateTime(inputStr: Date) {
   // Chuyển đổi chuỗi thành đối tượng Date
   const dtObject = new Date(inputStr);

   // Lấy thông tin thời gian
   const minutes = dtObject.getMinutes();
   const hours = dtObject.getHours();

   // Lấy thông tin ngày tháng năm
   const day = dtObject.getDate();
   const month = dtObject.getMonth() + 1; // Tháng bắt đầu từ 0
   const year = dtObject.getFullYear();

   // Tạo chuỗi kết quả
   const resultStr = `${hours}h${minutes}p - ${day}/${month}/${year}`;

   return resultStr;
}

export function convertShortDate(inputStr: Date) {
   // Chuyển đổi chuỗi thành đối tượng Date
   const dtObject = new Date(inputStr);
   // Lấy thông tin ngày tháng năm
   const day = dtObject.getDate();
   const month = dtObject.getMonth() + 1; // Tháng bắt đầu từ 0
   const year = dtObject.getFullYear();

   // Tạo chuỗi kết quả
   const resultStr = `${day}/${month}/${year}`;

   return resultStr;
}
