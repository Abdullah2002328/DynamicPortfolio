var typed = new Typed('.typed', {
  strings: ['Youtuber', 'Blogger', 'Frontend developer'],
  typeSpeed: 80,
  backSpeed: 50,
  loop: true
});


// Skill Section 
// Animate the skills bars when they come into view
const skillBars = document.querySelectorAll('.skill-bar');

function animateSkillBars() {
  skillBars.forEach(skillBar => {
    const skillLevel = skillBar.previousElementSibling.querySelector('.skill-value').textContent;
    skillBar.style.width = skillLevel;
  });
}

let observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkillBars();
      observer.unobserve(entry.target);
    }
  });
});

skillBars.forEach(skillBar => {
  observer.observe(skillBar);
});


ScrollReveal({
  reset: true,
  distance: "80px",
  duration: 2000,
  delay: 50,
});
ScrollReveal().reveal(".pic, .profile-pic, .about-img", { origin: "top" });
ScrollReveal().reveal(
  ".project",
  { origin: "bottom" }
);
ScrollReveal().reveal("#home h1, h2,h3", { origin: "left" });

const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

hamburgerMenu.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('active');
  navLinks.classList.toggle('active');
});
