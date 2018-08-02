const progressBar = document.getElementById('pbar');

window.addEventListener('scroll', () => {
    const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollYPosition = window.scrollY;

    const scrollProgress = (scrollYPosition / documentHeight) * 100;

    progressBar.style.width = `${scrollProgress}%`;
});