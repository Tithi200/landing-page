// ==================== BUTTON ANIMATION ====================
gsap.from("#enterBtn", {
  scale: 0.9,
  yoyo: true,
  repeat: -1,
  duration: 0.8,
  ease: "bounce"
});

// ==================== PREVENT SCROLL INITIALLY ====================
document.body.classList.add("no-scroll");

// ==================== MUSIC & SCROLL AFTER BUTTON CLICK ====================
const enterBtn = document.getElementById("enterBtn");
const bgMusic = document.getElementById("bgMusic");

enterBtn.addEventListener("click", (e) => {
  e.preventDefault(); // prevent default anchor jump

  // Play soft background music
  bgMusic.volume = 0.2;
  bgMusic.play().catch(err => console.log("Audio play blocked:", err));

  // Enable scrolling now
  document.body.classList.remove("no-scroll");

  // Smoothly scroll to slideshow section
  document.querySelector("#main").scrollIntoView({ behavior: 'smooth' });
});

// ==================== SLIDESHOW ====================
let slides = gsap.utils.toArray(".slide");
let current = 0;
let slideInterval = 6000; // 6 seconds per slide

gsap.set(slides, { autoAlpha: 0 });
gsap.set(slides[0], { autoAlpha: 1 });
gsap.set(slides[0].querySelector(".quote"), { autoAlpha: 1 });

// Show slide function
function showSlide(index){
  slides.forEach((s)=>{
    gsap.to(s, { autoAlpha:0, duration:1 });
    gsap.to(s.querySelector(".quote"), { autoAlpha:0, y:-20, duration:1 });
  });
  let s = slides[index];
  gsap.to(s, { autoAlpha:1, duration:1 });
  gsap.fromTo(s.querySelector(".quote"), { autoAlpha:0, y:20 }, { autoAlpha:1, y:0, duration:1 });
}

// Auto-play slideshow
setInterval(()=>{
  current = (current+1) % slides.length;
  showSlide(current);
}, slideInterval);

// ==================== FLOATING EMOJIS (PINKISH) ====================
function createEmoji(){
  const emojis = ['💖','😍','😘','🥰','💌','😊','💕']; // pinkish theme
  const emoji = document.createElement('div');
  emoji.classList.add('emoji');
  emoji.textContent = emojis[Math.floor(Math.random()*emojis.length)];
  emoji.style.left = Math.random()*100 + "%";
  emoji.style.top = "100%";
  document.querySelector(".emoji-container").appendChild(emoji);

  gsap.to(emoji, {
    y: -500,
    duration: 8 + Math.random()*4,
    ease: "linear",
    onComplete: ()=> emoji.remove()
  });
}

setInterval(createEmoji, 500);

// ==================== FLOATING HEARTS (PINKISH) ====================
function createHeart(){
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.textContent = '💖'; // pink heart
  heart.style.left = Math.random() * 100 + "%";
  heart.style.top = "100%";
  heart.style.fontSize = (20 + Math.random()*30) + "px";
  heart.style.opacity = 0.7 + Math.random() * 0.3;
  document.querySelector(".heart-container").appendChild(heart);

  gsap.to(heart, {
    y: -500 - Math.random()*200,
    x: "+=" + (Math.random()*100 - 50),
    duration: 8 + Math.random()*4,
    ease: "power1.out",
    onComplete: ()=> heart.remove()
  });
}

setInterval(createHeart, 400);

// ==================== MOUSE HOVER PINK STARS ====================
document.addEventListener("mousemove", (e) => {
  const star = document.createElement("div");
  star.classList.add("hover-star");
  document.body.appendChild(star);

  // Position star at mouse
  star.style.left = e.pageX + "px";
  star.style.top = e.pageY + "px";
  const size = Math.random() * 6 + 4;
  star.style.width = size + "px";
  star.style.height = size + "px";

  // Animate star with GSAP
  gsap.to(star, {
    x: "+=" + (Math.random() * 40 - 20),
    y: "+=" + (Math.random() * 40 - 20),
    opacity: 0,
    scale: 0,
    duration: 1 + Math.random(),
    ease: "power1.out",
    onComplete: () => star.remove()
  });
});
