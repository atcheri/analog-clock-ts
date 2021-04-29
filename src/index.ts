const clickBtn = document.getElementById('click-btn');
clickBtn?.addEventListener('click', (e: Event) => {
  console.log('Click button clicked with (e)', e);
});
