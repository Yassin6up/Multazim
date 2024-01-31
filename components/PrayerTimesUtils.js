// PrayerTimesUtils.js
import moment from 'moment/moment';
import playSound from './SoundAdhan';
import triggerNotification from "./Notification";
import subtractMinutes from './substractMinutes';
import {  getStoredData } from './DataStorage';
const checkPrayerTimes = async () => {
const {today , prayerSettings} = getStoredData()

console.log(today)
    // console.log("today : " , today.timings)
    // console.log("prayerSettings : " , prayerSettings)

  const currentTime = moment();
  const formattedTime = currentTime.format('HH:mm');

  console.log("start checking : " + formattedTime)
  if (formattedTime ===  today.timings?.Fajr && prayerSettings.fajr) {
    console.log("Time for Fajr prayer and fajr setting is true. Playing sound.");
    playSound();
  } else if (formattedTime === today.timings?.Dhuhr && prayerSettings.duhr) {
    console.log("Time for Dhuhr prayer and duhr setting is true. Playing sound.");
    playSound();
  } else if (formattedTime === today.timings?.Asr && prayerSettings.asr) {
    console.log("Time for Asr prayer and asr setting is true. Playing sound.");
    playSound();
  } else if (formattedTime === today.timings?.Maghrib && prayerSettings.maghrib) {
    console.log("Time for Maghrib prayer and maghrib setting is true. Playing sound.");
    playSound();
  } else if (formattedTime === today.timings?.Isha && prayerSettings.isha) {
    console.log("Time for Isha prayer and isha setting is true. Playing sound.");
    playSound();
  } else {
    console.log("Not time for any prayer or the corresponding setting is false.");
  }

  const fajerAdjesment = subtractMinutes(today.timings?.Fajr || "00:00", 10);
  const duherAdjisment = subtractMinutes(today.timings?.Dhuhr || "00:00", 10);
  const asrAdjisment = subtractMinutes(today.timings?.Asr || "00:00", 10);
  const maghribAdjisment = subtractMinutes(today.timings?.Maghrib || "00:00", 10);
  const ishaAdjisment = subtractMinutes(today.timings?.Isha || "00:00", 10);

  if (formattedTime === fajerAdjesment) {
    triggerNotification("الفجر");
  } else if (formattedTime === duherAdjisment) {
    triggerNotification("الظهر");
  } else if (formattedTime === asrAdjisment) {
    triggerNotification("العصر");
  } else if (formattedTime === maghribAdjisment) {
    triggerNotification("المغرب");
  } else if (formattedTime === ishaAdjisment) {
    triggerNotification("العشاء");
  }
};

export default checkPrayerTimes;
