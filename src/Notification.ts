export const randomNotification=()=>{
  
  var notifTitle = 'asdf';
  var notifBody = 'Created by ';
  var notifImg = 'public/logo192.png';
  var options = {
      body: notifBody,
      icon: notifImg
  }
  var notif = new Notification(notifTitle, options);  
}