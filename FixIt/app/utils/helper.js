// class Helper {
//   constructor() {}

//   toJSON(object) {
//     if (
//       typeof object === 'string' ||
//       typeof object === 'bigint' ||
//       typeof object === 'boolean' ||
//       typeof object === 'number' ||
//       typeof object === 'undefined' ||
//       typeof object === 'function'
//     ) {
//       console.log(
//         '[PortalHelper] Cannot stringify object which its type is not an object.',
//       );
//       return object;
//     }
//     return JSON.stringify(object);
//   }

//   parseJSON(string) {
//     if (string != null) {
//       return JSON.parse(string);
//     }
//     return null;
//   }

//   getServiceImageName(url) {
//     if (url) {
//       return url.split('?fileName=')[1];
//     }
//     return 'humanresources_1.jpg';
//   }

//   subString = (str = null, indexEnd = 0) => {
//     if (str != null) {
//       str = str.toString();
//       return str.length < indexEnd
//         ? str
//         : `${str.substring(0, indexEnd).trim()}...`;
//     }
//     return null;
//   };

//   convertMilisecondToDHM(ms) {
//     const days = Math.floor(ms / (24 * 60 * 60 * 1000));
//     const daysms = ms % (24 * 60 * 60 * 1000);
//     const hours = Math.floor(daysms / (60 * 60 * 1000));
//     const hoursms = ms % (60 * 60 * 1000);
//     const minutes = Math.floor(hoursms / (60 * 1000));
//     const minutesms = ms % (60 * 1000);
//     const sec = Math.floor(minutesms / 1000);
//     if (days > 0) {
//       return days + 'd ' + hours + 'h ' + minutes + 'm ' + sec;
//     } else {
//       if (hours > 0) {
//         return hours + 'h ' + minutes + 'm ' + sec;
//       }
//       return minutes + 'm ' + sec;
//     }
//   }
// }

// const appHelper = new Helper();
// export default appHelper;
