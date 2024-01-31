export default function subtractMinutes(timeString, minutes) {
    const [hours, originalMinutes] = timeString.split(':');
    let newMinutes = parseInt(originalMinutes, 10) - minutes;
    if (newMinutes < 0) {
      newMinutes += 60;
      const newHours = parseInt(hours, 10) - 1;
      return `${newHours < 10 ? '0' : ''}${newHours}:${newMinutes < 10 ? '0' : ''}${newMinutes}`;
    }
    return `${hours < 10 ? '0' : ''}${hours}:${newMinutes < 10 ? '0' : ''}${newMinutes}`;
  };

