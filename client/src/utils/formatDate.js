const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const formatDate = (date) => {
  const newDate = new Date(date);
  let formatedDate;
  const day = days[newDate.getDay()];
  const month = months[newDate.getMonth()];
  const year = newDate.getFullYear();
  const h = newDate.getHours();
  const m = newDate.getMinutes();
  const s = newDate.getSeconds()

  formatedDate = `${day}, ${h}:${m}:${s}, ${month} ${year}`;
  return formatedDate;
}

export default formatDate