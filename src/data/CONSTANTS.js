export const getPageMaxPosts = (DEVICE_TYPE) => {
  switch (DEVICE_TYPE) {
  case 'MOBILE_SM':
  case 'MOBILE_LG':
  case 'TABLET_SM':
    return 6;
  case 'TABLET_MD':
  case 'TABLET_LG':
    return 9;
  case 'DESKTOP_SM':
  case 'DESKTOP_MD':
  case 'DESKTOP_LG':
    return 16;
  default:
    return 6;
  }
};
export const CONSTANTS = {
  MAX_POSTS: 200,
  CDN_IMAGE_URL_CHARACTER: 'https://starwars-visualguide.com/assets/img/characters/$id.jpg',
  CDN_IMAGE_URL_FILM: 'https://starwars-visualguide.com/assets/img/films/$id.jpg',
  CDN_IMAGE_URL_VEHICLE: 'https://starwars-visualguide.com/assets/img/vehicles/$id.jpg',
  CDN_IMAGE_URL_STARSHIP: 'https://starwars-visualguide.com/assets/img/starships/$id.jpg'
};
