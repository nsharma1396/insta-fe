import differenceInWeeks from "date-fns/differenceInWeeks";
import differenceInDays from "date-fns/differenceInDays";
import differenceInHours from "date-fns/differenceInHours";
import differenceInMinutes from "date-fns/differenceInMinutes";
import differenceInSeconds from "date-fns/differenceInSeconds";
export function formatTimeStamp(timestamp) {
  const createdTime = new Date(timestamp);
  let weeks = differenceInWeeks(new Date(), createdTime);
  if (weeks === 0) {
    let days = differenceInDays(new Date(), createdTime);
    if (days === 0) {
      let hours = differenceInHours(new Date(), createdTime);
      if (hours === 0) {
        let minutes = differenceInMinutes(new Date(), createdTime);
        if (minutes === 0) {
          let seconds = differenceInSeconds(new Date(), createdTime);
          return `${seconds}s`;
        }
        return `${minutes}m`;
      }
      return `${hours}h`;
    }
    return `${days}d`;
  }
  return `${weeks}w`;
}
