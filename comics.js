document.addEventListener('DOMContentLoaded', function() {
  const comicsContent = document.querySelector('.comics-content');
  
  if (comicsContent) {
    comicsContent.style.scrollBehavior = 'smooth';
    
    document.addEventListener('keydown', function(event) {
      const scrollAmount = 200;
      
      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        event.preventDefault();
        comicsContent.scrollBy(0, scrollAmount);
      } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault();
        comicsContent.scrollBy(0, -scrollAmount);
      } else if (event.key === 'Home') {
        event.preventDefault();
        comicsContent.scrollTo(0, 0);
      } else if (event.key === 'End') {
        event.preventDefault();
        comicsContent.scrollTo(0, comicsContent.scrollHeight);
      }
    });
  }
});