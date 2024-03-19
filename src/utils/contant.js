export const ratings = [
  { value: null, label: "Tất cả" },
  { value: 1, label: "1.0 trở xuống" },
  { value: 2, label: "2.0 trở xuống" },
  { value: 3, label: "3.0 trở xuống" },
  { value: 4, label: "4.0 trở xuống" },
  { value: 5, label: "5.0 trở xuống" },
];

export const price = [
  { value: "0", label: "Tất cả" },
  { value: "0,1000000", label: "Dưới 1 triệu" },
  { value: "1000000,3000000", label: "Từ 1 đến 3 triệu" },
  { value: "3000000,5000000", label: "Từ 3 đến 5 triệu" },
  { value: "5000000", label: "Trên 5 triệu" },
];

export const sortCourse = [
  { value: "createDate,DESC", label: "Ngày đăng giảm dần" },
  { value: "createDate,ASC", label: "Ngày đăng tăng dần" },
  { value: "name,ACS", label: "Theo tên, A-Z" },
  { value: "name,DESC", label: "Theo tên, Z-A" },
  { value: "price,DESC", label: "Theo giá tiền, từ cao đến thấp" },
  { value: "price,ASC", label: "Theo giá tiền, từ thấp đến cao" },
];
