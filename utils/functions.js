
export const getYear = (date) => {
    return date?.slice(0, 4);
  };
export const covertToLinkWords = (title) => {
  var s = removeSpecialCharacters(title);
  return s.replace(/\s+/g, "-").toLowerCase();
};

export  const removeSpecialCharacters=(title)=>{
  return title.replace(/[&#,+()$~%'.":!*?<>{}]/g, '')
}

export  const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getDate = (date) => {
  if(!date)   return "N/A"
  return (
      months[date?.split("-")[1] - 1] +
      " " +
      date?.split("-")[2] +
      ", " +
      date?.split("-")[0]
  );
};

export const getMonth = (date) => {
  return months[date?.slice(5, 7) - 1];
};

export const getHour = (runtime) => {
  return " " + Math.floor(runtime / 60).toString();
};

export const getMinute = (runtime) => {
  return runtime % 60;
};


export function convertMoney(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
      ? Number(Math.abs(Number(labelValue) / 1.0e9).toFixed(2)) + " billion"
      : // Six Zeroes for Millions
      Math.abs(Number(labelValue)) >= 1.0e6
          ? Number(Math.abs(Number(labelValue) / 1.0e6).toFixed(2)) + " million"
          : // Three Zeroes for Thousands
          Math.abs(Number(labelValue)) >= 1.0e3
              ? Number(Math.abs(Number(labelValue) / 1.0e3).toFixed(2)) + " thousand"
              : Math.abs(Number(labelValue));
}
