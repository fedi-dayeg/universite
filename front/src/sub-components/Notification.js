import { NotificationManager} from 'react-notifications';


export const createNotification = (type,title,message,callback=null) => {
    switch (type) {
        case 'info':
          NotificationManager.info(message,title,3000,callback);
          break;
        case 'success':
          NotificationManager.success(message,title,3000,callback);
          console.log("successsuccesssuccesssuccess")
          break;
        case 'warning':
          NotificationManager.warning(message,title,3000,callback);
          break;
        case 'error':
          NotificationManager.error(message, title, 5000,callback);
          console.log("ereuuuuuuuuuuur");
          
          break;
      }
}
