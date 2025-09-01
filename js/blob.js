// === Gooey blobs animation ===
const colors = [
  "rgba(227, 163, 255, 0.7)",
  "rgba(109, 40, 217, 0.7)",
  "rgba(147, 51, 234, 0.7)",
  "rgba(85, 101, 247, 0.7)",
  "rgba(144, 205, 244, 0.7)",
  "rgba(227, 163, 255, 0.7)",
  "rgba(154, 193, 230, 0.7)"
];

const container = document.querySelector(".blob-container");
const blobCount = 7;
const blobs = [];

for(let i=0;i<blobCount;i++){
  const blob = document.createElement("div");
  blob.classList.add("blob");
  const size = 320 + Math.random()*160;
  blob.style.width = `${size}px`;
  blob.style.height = `${size}px`;
  blob.style.background = colors[i % colors.length];
  container.appendChild(blob);

  let x = Math.random()*window.innerWidth;
  let y = Math.random()*window.innerHeight;
  let dx = (Math.random()-0.5)*0.9;
  let dy = (Math.random()-0.5)*0.9;
  let squish = 1;
  let targetSquish = 1;
  blob.addEventListener('mouseenter', ()=>targetSquish=1.6);
  blob.addEventListener('mouseleave', ()=>targetSquish=1);

  function animate(){
    x+=dx;
    y+=dy;
    if(x< -size*0.5 || x>window.innerWidth + size*0.5) dx*=-1;
    if(y< -size*0.5 || y>window.innerHeight + size*0.5) dy*=-1;

    squish += (targetSquish - squish)*0.06;
    let pulse = 1 + Math.sin(Date.now()/500 + i)*0.12;
    let floatSquash = 1 + Math.sin(Date.now()/300 + i)*0.25;
    let growth = 1 + Math.sin(Date.now()/1000 + i)*0.15;
    let finalX = pulse*floatSquash*squish*growth;
    let finalY = pulse/floatSquash/squish*growth;

    blob.style.transform = `translate3d(${x}px,${y}px,0) scale(${finalX},${finalY})`;
    requestAnimationFrame(animate);
  }
  animate();
  blobs.push(blob);
}

// === Interactive mouse-follow blob ===
const mouseBlob = document.createElement('div');
mouseBlob.classList.add('blob');
mouseBlob.style.background = "rgba(140,100,255,0.8)";
mouseBlob.style.width = "250px";
mouseBlob.style.height = "250px";
mouseBlob.style.zIndex = "0";
container.appendChild(mouseBlob);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let currentX = mouseX;
let currentY = mouseY;

window.addEventListener('mousemove', e => {
  mouseX = e.clientX - 125; // center the blob
  mouseY = e.clientY - 125;
});

function animateMouseBlob(){
  currentX += (mouseX - currentX) * 0.12;
  currentY += (mouseY - currentY) * 0.12;
  const speed = Math.hypot(mouseX - currentX, mouseY - currentY);
  let scale = 1 + speed * 0.002;

  mouseBlob.style.transform = `translate3d(${currentX}px, ${currentY}px,0) scale(${scale})`;
  requestAnimationFrame(animateMouseBlob);
}
animateMouseBlob();

// Pause animations when tab is not visible for performance
document.addEventListener('visibilitychange', () => {
    const containers = document.querySelectorAll('.blob');
    if (document.hidden) {
    containers.forEach(blob => blob.style.animationPlayState = 'paused');
    } else {
    containers.forEach(blob => blob.style.animationPlayState = 'running');
    }
});