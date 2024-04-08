import moment from "moment";

export const formatTimeDifference = (compareTime: string): string => {
  const currentTime = moment();

  const diffInMinutes = currentTime.diff(compareTime, "minutes");

  let resultString: string;
  if (diffInMinutes === 0) {
    resultString = "now";
  } else if (diffInMinutes < 60) {
    resultString = diffInMinutes + " min";
  } else if (diffInMinutes < 24 * 60) {
    const hours = Math.floor(diffInMinutes / 60);
    resultString = hours + " hour ";
  } else if (diffInMinutes < 24 * 60 * 7) {
    const days = Math.floor(diffInMinutes / (24 * 60));
    resultString = days + " d ";
  } else {
    resultString = moment(compareTime).format("L");
  }

  return resultString;
};
