let count = 0;
const imgs = Array.from({length: 50}, _=> document.createElement('img'));

const imgContainer = document.getElementById('imgContainer');
imgContainer.append(...imgs);
requestAnimationFrame(function run() {
  imgs.forEach((img) => {
    img.src = `img-stream://test/${++count}`;
  });
  requestAnimationFrame(run);
});
