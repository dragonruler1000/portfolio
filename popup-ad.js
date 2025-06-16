function showAd() {
    const ad = document.getElementById('fakeAd');
    if (ad) {
      console.log('Showing ad');
      ad.classList.remove('hidden');
    }
  }
  
  function closeAd() {
    const ad = document.getElementById('fakeAd');
    if (ad) {
      console.log('Closing ad');
      ad.classList.add('hidden');
    }
  }
  
  window.closeAd = closeAd;
  
  document.addEventListener('DOMContentLoaded', () => {
    const delay = Math.random() * (90000 - 5000) + 5000; // 5–90 seconds
    console.log(`Popup ad will show in ${Math.round(delay/1000)} seconds`);
    setTimeout(showAd, delay);
  });
  