export function getResources(input) {
    switch (input) {
      case "placeholder": return require('../assests/images/placeholder.png');
      case "download": return require('../assests/images/download.png');
      case "share": return require('../assests/images/share.png');
    }
  }