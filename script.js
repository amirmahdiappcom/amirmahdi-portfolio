gsap.registerPlugin(ScrollTrigger);

// HERO timeline
const heroTL = gsap.timeline({paused:true});

heroTL.from(".profile", {
  duration: 1,
  scale: 0.85,
  rotation: -2,
  opacity: 0,
  ease: "power3.out"
}, 0);

heroTL.from(".name", {duration:0.9, x:-80, opacity:0, ease:"power3.out"}, 0.15);
heroTL.from(".role", {duration:0.9, x:80, opacity:0, ease:"power3.out"}, 0.25);
heroTL.from(".tagline", {duration:0.8, y:20, opacity:0, ease:"power2.out"}, 0.45);
heroTL.from(".cta-row .btn", {duration:0.7, y:10, opacity:0, stagger:0.12, ease:"power2.out"}, 0.6);

heroTL.play();

// ScrollTrigger hero -> about
ScrollTrigger.create({
  trigger:"#about",
  start:"top 60%",
  end:"top 20%",
  scrub:0.6,
  onEnter:()=> gsap.to(".hero-inner",{y:-30, opacity:0.12, scale:0.98, duration:0.6, ease:"power1.out"}),
  onLeaveBack:()=>{
    gsap.to(".hero-inner",{y:0, opacity:1, scale:1, duration:0.6, ease:"power1.out"});
    heroTL.restart();
  }
});

// About reveal
gsap.utils.toArray(".about-inner, .about-title, .lead, .about-block, .social").forEach((el,i)=>{
  gsap.from(el,{
    scrollTrigger:{
      trigger:"#about",
      start:"top 80%",
      toggleActions:"play reverse play reverse"
    },
    opacity:0,
    y:30,
    duration:0.8,
    delay:i*0.08,
    ease:"power2.out"
  });
});

// Learn More smooth scroll
document.querySelectorAll('#toAbout').forEach(btn=>{
  btn.addEventListener('click',e=>{
    e.preventDefault();
    document.querySelector('#about').scrollIntoView({behavior:'smooth'});
  });
});

// Focus for accessibility
ScrollTrigger.create({
  trigger:"#about",
  start:"top 90%",
  onEnter:()=>{
    const about=document.querySelector('.about-inner');
    if(about) about.setAttribute('tabindex','-1'), about.focus();
  }
});


const sections = document.querySelectorAll(".section-blur");

function revealSections() {
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < window.innerHeight * 0.85) {
      sec.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);
