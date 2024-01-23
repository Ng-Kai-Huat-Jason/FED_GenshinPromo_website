
function openVideo(){
  const youtubeVideo = document.getElementById('youtubeVideo');
  const videoOverlay = document.getElementById('videoOverlay');
  youtubeVideo.style.display = 'block';
  youtubeVideo.style.zIndex = 2;
  videoOverlay.style.display = 'block';
  videoOverlay.style.zIndex = 1;
  youtubeVideo.src = 'https://www.youtube.com/embed/xaNGh-fUrrA?si=E_Qxpi6OLpmYELXA&autoplay=1'; 
}

function closeVideo(){
    const youtubeVideo = document.getElementById('youtubeVideo');
    const videoOverlay = document.getElementById('videoOverlay');
    youtubeVideo.style.display = 'none';
    youtubeVideo.style.zIndex = 0;
    videoOverlay.style.display = 'none';
    videoOverlay.style.zIndex = 0;
    youtubeVideo.src = '';
}

window.addEventListener('click', (event) => {
    if (event.target !== document.getElementById('youtubeVideo') 
    && !event.target.closest('.trailer-container')){
      closeVideo();
    }

    if (event.target === document.getElementById('videoOverlay')){
      closeVideo();
    }
  });


  