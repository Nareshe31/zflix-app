export const getYear = (date) => {
    return date?.slice(0, 4);
  };
export  const removeSpecialCharacters=(title)=>{
    return title.replace(/[&#,+()$~%'.":!*?<>{}]/g, '')
  }

export  const covertToLinkWords=(title)=>{
    var s=removeSpecialCharacters(title)
    return s.replace(/\s+/g, '-').toLowerCase()
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

  