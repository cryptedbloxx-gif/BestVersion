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

// =========================
// BESTVERSION APP
// =========================

let habits =
JSON.parse(localStorage.getItem("habits")) || [];

let xp =
Number(localStorage.getItem("xp")) || 0;

const xpValue =
document.getElementById("xpValue");

const levelValue =
document.getElementById("levelValue");

const progressXP =
document.getElementById("progressXP");

const habitList =
document.getElementById("habitList");

const habitInput =
document.getElementById("habitInput");

const addHabitBtn =
document.getElementById("addHabitBtn");

// SAVE

function saveData() {

localStorage.setItem(
"habits",
JSON.stringify(habits)
);

localStorage.setItem(
"xp",
xp
);

}

// LEVEL

function updateStats() {

if (xpValue)
xpValue.textContent = xp;

if (progressXP)
progressXP.textContent = xp;

if (levelValue)
levelValue.textContent =
Math.floor(xp / 100) + 1;

}

// HABITS

function renderHabits() {

if (!habitList) return;

habitList.innerHTML = "";

habits.forEach((habit, index) => {

const div =
document.createElement("div");

div.className = "habit";

div.innerHTML = `
<input type="checkbox"
${habit.done ? "checked" : ""}>

<span>${habit.name}</span>

<button class="deleteBtn">
Delete
</button>
`;

const checkbox =
div.querySelector("input");

checkbox.addEventListener(
"change",
() => {

if (
checkbox.checked &&
!habit.done
) {
xp += 10;
}

habit.done =
checkbox.checked;

saveData();
updateStats();

}
);

div.querySelector(
".deleteBtn"
).addEventListener(
"click",
() => {

habits.splice(
index,
1
);

saveData();
renderHabits();

}
);

habitList.appendChild(div);

});

}

// ADD HABIT

if (addHabitBtn) {

addHabitBtn.addEventListener(
"click",
() => {

const name =
habitInput.value.trim();

if (!name) return;

habits.push({
name,
done: false
});

habitInput.value = "";

saveData();
renderHabits();

}
);

}

// NAVIGATION

const navButtons =
document.querySelectorAll(
".navBtn"
);

const pages =
document.querySelectorAll(
".page"
);

navButtons.forEach(btn => {

btn.addEventListener(
"click",
(e) => {

e.preventDefault();

navButtons.forEach(b =>
b.classList.remove(
"active"
)
);

btn.classList.add(
"active"
);

pages.forEach(page =>
page.classList.remove(
"activePage"
)
);

const target =
btn.dataset.page;

const targetPage =
document.getElementById(
target
);

if (targetPage) {

targetPage.classList.add(
"activePage"
);

}

}
);

});

// START

updateStats();
renderHabits();