export const formatMoney = (number) =>
  Number((Math.round(number / 1000) * 1000)?.toFixed(1)).toLocaleString();

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
