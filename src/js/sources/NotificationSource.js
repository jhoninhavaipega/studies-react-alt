var mockData = [
  {
    id: 1,
    path_product: 'https://www.walmart.com.br/smart-tv-led-slim-full-hd-40-samsung-un40j5300-connectshare-movie-funcao-futebol-clear-motion-rate-100hz/3076114/pr',
    title: 'Smart TV LED Slim Full HD 40" Samsung UN40J5300 ConnectShare Movie Função Futebol Clear Motion Rate 100hz',
    path_image: 'https://static.wmobjects.com.br/imgres/arquivos/ids/4657865-130-130/smart-tv-led-slim-full-hd-40--samsung-un40j5300-connectshare-movie-funcao-futebol-clear-motion-rate-100hz.jpg',
    type: 'baixou',
    created_at: '2016-12-12'
  },
  {
    id: 2,
    path_product: 'https://www.walmart.com.br/smartphone-samsung-galaxy-j5-sm-j500m-ds-dourado-dual-chip-android-5-1-lollipop-4g-wi-fi-16gb/3216998/pr',
    title: 'Smartphone Samsung Galaxy J5 SM-J500M/DS Dourado Dual Chip Android 5.1 Lollipop 4G Wi-Fi 16GB',
    path_image: 'https://static.wmobjects.com.br/imgres/arquivos/ids/4708602-130-130/smartphone-samsung-galaxy-j5-sm-j500m/ds-dourado-dual-chip-android-5-1-lollipop-4g-wi-fi-16gb.jpg',
    type: 'baixou',
    created_at: '2016-12-12'
  }
];

var NotificationSource = {
  fetch: function() {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(mockData);
      }, 250);
    });
  }
};

export default NotificationSource;