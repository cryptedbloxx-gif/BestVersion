// PARTICLES

const canvas = document.getElementById("particles");

if (canvas) {
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];

  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;

      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(139,92,246,.6)";
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ===== BESTVERSION =====

let xp = Number(localStorage.getItem("xp")) || 0;

const xpCard = document.querySelector(".cards .card:nth-child(1) h2");
const levelCard = document.querySelector(".cards .card:nth-child(2) h2");

function updateStats() {
  if (xpCard) xpCard.textContent = xp;
  if (levelCard) levelCard.textContent = Math.floor(xp / 100) + 1;
}

updateStats();

// EXISTING HABIT CHECKBOXES

const checkboxes = document.querySelectorAll(".habit input");

checkboxes.forEach(box => {
  box.addEventListener("change", () => {
    if (box.checked) {
      xp += 10;
    } else {
      xp = Math.max(0, xp - 10);
    }

    localStorage.setItem("xp", xp);
    updateStats();
  });
});

// NAV BUTTONS

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    alert(link.textContent.trim() + " page coming next.");
  });
});

// PROFILE BUTTON

const profileBtn = document.querySelector(".profileBtn");

if (profileBtn) {
  profileBtn.addEventListener("click", () => {
    alert(
      "BestVersion Profile\\n\\nXP: " +
      xp +
      "\\nLevel: " +
      (Math.floor(xp / 100) + 1)
    );
  });
}
