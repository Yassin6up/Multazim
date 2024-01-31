// Implement this function to schedule push notifications
import * as Notifications from 'expo-notifications';

export  const triggerNotification = async (prayer) => {
  if(prayer){
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'متبقي 10 دقائق للصلاة '+ prayer,
        body: 'قم بالوضوء واستعد لصلاة ',
        color : "#3D3B40", 
        sound: "default" , 
        vibrate : true , 


      },
      trigger: { seconds: 5 }, // Send the notification after 5 seconds
    });
    
  }else{
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "حان وقت الصلاة ! ",
        subtitle: "من فضلك لا تأخر صلاتك ",
        body : "أنقر لإيقاف الأذان ", 
        color : "#3D3B40", 
        sound: "default" , 
        vibrate : true , 
        data: { someData: 'goes here' },
        

      },
      trigger: { seconds: 1 }, // Send the notification after 5 seconds
    });
  }
    
  };
