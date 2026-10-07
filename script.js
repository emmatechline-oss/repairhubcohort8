/* script.js (Tailwind version)
   Tailwind has no JavaScript of its own. It only styles. This file does the interactivity. */
const IMG = "https://res.cloudinary.com/n99njng9/image/upload/";   // shared start of every image URL
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* Picture safety net: if any image fails to load, show an emoji instead of an empty gap. */
const emojiFor = (n) => { n = n.toLowerCase();
  return /phone/.test(n) ? "📱" : /laptop|macbook/.test(n) ? "💻" : /tv/.test(n) ? "📺" : /refrig/.test(n) ? "🧊" :
         /wash/.test(n) ? "🧺" : /speaker/.test(n) ? "🔊" : /\bac\b/.test(n) ? "❄️" : "🔧"; };
document.addEventListener("error", (e) => {
  const i = e.target;
  if (i.tagName === "IMG" && i.dataset.icon)
    i.replaceWith(Object.assign(document.createElement("span"), { textContent: i.dataset.icon, className: "text-2xl" }));
}, true);

/* STEP 1: Data. To add an image or a card, add one line here. */
const categories = [
  { name:"Phone", note:"Screen, battery, software etc.", group:"Electronics", img:"v1790952175/5851d991-f9e7-46d7-85c3-f4fe33bd665a_xvwj3q.jpg" },
  { name:"Laptop", note:"Macbook, Dell, Lenovo, HP etc etc.", group:"Electronics", img:"v1790952666/aa97a1cf-fe1f-4dbe-8b72-4e6f9f934075_r88hbi.jpg" },
  { name:"TVs", note:"screen, audio, power issues etc.", group:"Electronics", img:"v1790953557/5357cf17-22c2-4312-b9b2-95d013d52d0e_pr8ocv.jpg" },
  { name:"Refrigerator", note:"Cooling, ice maker, water dispenser etc.", group:"Appliances", img:"v1790953771/991e00ec-ebb1-4e63-82f4-99fe6f598d01_gegukh.jpg" },
  { name:"Washing machine", note:"Drum, motor, water inlet etc.", group:"Appliances", img:"v1790954640/3b72f90a-56f5-4c90-ae81-0353af4075c8_vtpzgd.jpg" },
  { name:"Speakers", note:"Bluetooth, wired, smart etc.", group:"Electronics", img:"v1790954522/3b0f47e6-54b9-4910-a61c-89a964e75637_vm3mgq.jpg" }
];
const services = [
  { name:"Phone screen repair", note:"Cracked or unresponsive screen replacement", group:"Electronics", img:"v1790956675/8466d101-7cf9-4207-b4da-3818e9b01d80_fr3uxu.jpg" },
  { name:"Refrigerator repair", note:"Cooling and leakage issues", group:"Appliances", img:"v1790957423/eff329de-7971-467b-86c3-c396876fac38_u2ddry.jpg" },
  { name:"Laptop repair", note:"Hardware, software, battery and more", group:"Electronics", img:"v1790958427/53319770-70d7-40d7-955d-101c9e39d8bc_lrstbh.jpg" },
  { name:"Washing machine repair", note:"Spin, drain and power issues", group:"Appliances", img:"v1790959000/ee6b1e7e-839e-4de0-8a83-120524b8e408_ijpxk1.jpg" },
  { name:"TV screen repair", note:"Display, audio and power issues", group:"Electronics", img:"v1790958726/53319770-70d7-40d7-955d-101c9e39d8bc_q6qqtr.jpg" },
  { name:"Speaker repair", note:"Sound and connectivity issues", group:"Electronics", img:"v1790959838/cb4e285b-3edf-4b0e-ade0-c2c2eaf09210_qjyhzx.jpg" }
];
const repairs = [
  { name:'MacBook Pro 13"', job:"Screen replacement", date:"29 Sep 2026", price:"₦20,000", status:"Completed", img:"v1790961599/1a24389c-6d7c-4db9-9afa-abf10b5aa624_velnjk.jpg" },
  { name:"iPhone 13", job:"Screen repair", date:"12 Sep 2026", price:"₦18,000", status:"Completed", img:"v1790961806/d94c9dfd-0e1a-462d-aa48-0aa495bd4745_if8q3p.jpg" },
  { name:"Samsung AC", job:"Gas refill", date:"15 Aug 2026", price:"₦25,000", status:"Cancelled", img:"v1790962173/01d61aa9-beec-42f3-9c0d-0c37fb648131_fl6u50.jpg" }
];
const steps = [
  { title:"Request", note:"Tell us what needs fixing", img:"v1790962629/e9095662-31aa-4417-86e3-e8d081e1ec42_rhglam.jpg" },
  { title:"Get quotes", note:"Receive offers from trusted technicians", img:"v1790962880/870adf63-7a79-4636-b61a-ebec8f33fdd3_tteweg.jpg" },
  { title:"Book & relax", note:"Pick a technician and get it fixed", img:"v1790963186/c30bafa6-6bc1-4acd-a1d1-de5e2d0822df_qwqbip.jpg" }
];
const sideLinks = ["🏠 Home", "🛠️ My Repairs", "🎧 Supports", "💬 Messages", "⚙️ Settings"];
const topLinks  = ["Home", "My Repairs", "Support"];
const chipNames = ["All", "Electronics", "Appliances", "Furniture", "Home Services"];

/* STEP 2: Class strings. Write long Tailwind classes ONCE here, then reuse them.
   data-[active=true]:... means "apply this only when the element has data-active="true"". */
const sideCls = "flex w-full items-center gap-3 rounded-xl p-3 text-left font-medium text-gray-500 data-[active=true]:bg-blue-600 data-[active=true]:text-white";
const topCls  = "border-b-2 border-transparent py-1.5 font-medium text-gray-500 data-[active=true]:border-blue-600 data-[active=true]:text-blue-600";
const chipCls = "rounded-full bg-blue-50 px-5 py-2 font-medium data-[active=true]:bg-blue-600 data-[active=true]:text-white dark:bg-slate-800";
const badgeCls = {   // write full class names here. Tailwind can't see names glued together like `bg-${color}-100`
  Completed: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  Cancelled: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
};

/* STEP 3: Templates. Each one turns an object into HTML. */
const button = (cls, label, i) => `<button class="${cls}" data-active="${i === 0}">${label}${label.includes("Messages") ? '<span class="ml-auto h-2 w-2 rounded-full bg-red-500"></span>' : ""}</button>`;

const catCard = (c) => `
  <article data-card="${c.name}" class="cursor-pointer rounded-xl border border-gray-200 bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/15 dark:border-slate-700 dark:bg-slate-800">
    <div class="mb-2.5 grid h-[76px] place-items-center rounded-lg bg-gray-100 dark:bg-slate-700"><img class="h-16 max-w-full object-contain" data-icon="${emojiFor(c.name)}" src="${IMG + c.img}" alt="${c.name}"></div>
    <b class="block text-[13px]">${c.name}</b>
    <small class="block min-h-7 text-[10.5px] text-gray-500">${c.note}</small>
    <span class="ml-auto mt-1.5 grid h-[26px] w-[26px] place-items-center rounded-full bg-blue-50 text-xs text-blue-600 dark:bg-slate-700">→</span>
  </article>`;

const serviceRow = (s) => `
  <div data-card="${s.name}" class="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/15 dark:border-slate-700 dark:bg-slate-800">
    <span class="grid h-[34px] w-[34px] flex-none place-items-center rounded-lg bg-blue-50 dark:bg-slate-700"><img class="h-5 w-5" data-icon="${emojiFor(s.name)}" src="${IMG + s.img}" alt=""></span>
    <div class="min-w-0 flex-1"><b class="block text-[13px]">${s.name}</b><small class="text-[11px] text-gray-500">${s.note}</small></div><span class="text-gray-400">›</span>
  </div>`;

const repairRow = (r) => `
  <div class="mt-2.5 flex items-center gap-3 rounded-xl border border-gray-200 p-2.5 dark:border-slate-700">
    <img class="h-10 w-10 rounded-lg bg-gray-100 object-contain p-1 dark:bg-slate-700" data-icon="${emojiFor(r.name)}" src="${IMG + r.img}" alt="${r.name}">
    <div class="min-w-0 flex-1 text-[11px] text-gray-500"><b class="block text-xs text-gray-900 dark:text-slate-100">${r.name}</b>${r.job}<br>${r.date} · ${r.price}</div>
    <span class="rounded px-2 py-0.5 text-[10px] font-semibold ${badgeCls[r.status]}">${r.status}</span><span class="text-gray-400">›</span>
  </div>`;

const stepBox = (s) => `
  <div>
    <div class="mx-auto grid h-[38px] w-[38px] place-items-center rounded-full bg-blue-50 dark:bg-slate-700"><img class="h-5 w-5" src="${IMG + s.img}" alt=""></div>
    <b class="mb-0.5 mt-1.5 block text-xs text-gray-900 dark:text-slate-100">${s.title}</b>${s.note}
  </div>`;

/* STEP 4: Draw the page. Cards depend on the active chip and search text, so they get their own render(). */
const state = { group: "All", text: "" };

function render() {
  const match = (item) =>
    (state.group === "All" || item.group === state.group) &&
    (item.name + " " + item.note).toLowerCase().includes(state.text);
  const none = '<p class="col-span-full py-4 text-gray-500">No matches yet. Try another filter or search word.</p>';
  $("#cats").innerHTML = categories.filter(match).map(catCard).join("") || none;
  $("#services").innerHTML = services.filter(match).map(serviceRow).join("") || none;
}

$("#sideNav").innerHTML = sideLinks.map((t, i) => button(sideCls, t, i)).join("");
$("#topNav").innerHTML  = topLinks.map((t, i) => button(topCls, t, i)).join("");
$("#chips").innerHTML   = chipNames.map((t, i) => button(chipCls, t, i)).join("");
$("#repairs").innerHTML = repairs.map(repairRow).join("");
$("#steps").innerHTML   = steps.map(stepBox).join("");
render();

/* STEP 5: Active state. JS only flips data-active; Tailwind's data-[active=true]: classes change the look. */
function setActive(box, btn) {
  $$("[data-active]", box).forEach((b) => (b.dataset.active = "false"));
  btn.dataset.active = "true";
}
[["#sideNav"], ["#topNav"], ["#chips"]].forEach(([id]) =>
  $(id).addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    setActive($(id), btn);
    if (id === "#chips") { state.group = btn.textContent; render(); }
  })
);

/* STEP 6: Search. Both boxes stay in sync and filter as you type. */
const searchBoxes = [$("#topSearch"), $("#heroSearch")];
function search(value) {
  searchBoxes.forEach((box) => (box.value = value));
  state.text = value.trim().toLowerCase();
  render();
}
searchBoxes.forEach((box) => box.addEventListener("input", () => search(box.value)));
$("#searchBtn").addEventListener("click", () => search($("#heroSearch").value));

/* STEP 7: Toast. JS sets data-show; the toast's data-[show=true]: classes slide it in. */
let toastTimer;
function toast(message) {
  const t = $("#toast");
  t.textContent = message;
  t.dataset.show = "true";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (t.dataset.show = "false"), 2500);
}

/* STEP 8: Request page (replaces the dialog). Two views; JS shows one and hides the other. */
const views = { home: $("#homeView"), request: $("#requestView") };
const show = (name) => { Object.entries(views).forEach(([k, v]) => v.classList.toggle("hidden", k !== name)); scrollTo(0, 0); };
$("#fService").innerHTML = services.map((s) => `<option>${s.name}</option>`).join("");
function summary() {
  const rows = [["Service", $("#fService").value], ["Problem", $("#fIssue").value.trim() || "Not described yet"], ["Date", $("#fDate").value || "Any day"]];
  $("#summary").innerHTML = rows.map(([k, v]) => `<div class="flex justify-between gap-3"><dt class="text-gray-500">${k}</dt><dd class="text-right font-semibold">${v}</dd></div>`).join("");
}
function openRequest(name) {            // "Phones" finds "Phone screen repair"; "a repair" keeps the first service
  const key = name.toLowerCase().replace(/s$/, "");
  const hit = services.find((s) => s.name.toLowerCase().includes(key));
  if (hit) $("#fService").value = hit.name;
  summary(); show("request");
}
$("#requestBtn").addEventListener("click", () => openRequest("a repair"));
$("#backBtn").addEventListener("click", () => show("home"));
["#fService", "#fIssue", "#fDate"].forEach((id) => $(id).addEventListener("input", summary));
$("#submitBtn").addEventListener("click", () => {
  if (!$("#fIssue").value.trim()) return toast("Please describe the problem first");
  toast("Request sent for " + $("#fService").value);
  $("#fIssue").value = ""; show("home");
});

/* STEP 9: One click listener for the rest. Cards are re-drawn by render(), so we listen on the document. */
document.addEventListener("click", (e) => {
  if (e.target.closest('a[href="#"]')) e.preventDefault();
  const card = e.target.closest("[data-card]");
  if (card) openRequest(card.dataset.card);
  if (e.target.closest("#bell")) toast("You have no new notifications");
});
// Base API URL
const BASE_URL = 'https://repairhub-api-1.onrender.com';

// Fallback Quotation Data
const FALLBACK_QUOTATIONS = [
  {
    id: "q1",
    technicianName: "Emeka Nwosu",
    avatar: "https://res.cloudinary.com/kz6ru1lw/image/upload/v1790937080/Emeka_Nwosu_qx9mi3.png",
    rating: 4.8,
    jobsCompleted: 125,
    location: "Egbeda, Lagos 2.1km away",
    warranty: "3 months warranty",
    estimatedTime: "2-3 days",
    price: 18000,
    isRecommended: true,
    isVerified: true
  },
  {
    id: "q2",
    technicianName: "Ibrahim Dauda",
    avatar: "https://res.cloudinary.com/kz6ru1lw/image/upload/v1790937079/Ibrahim_Dauda_ylintk.png",
    rating: 4.6,
    jobsCompleted: 98,
    location: "Agege, Lagos 4.3km away",
    warranty: "1 months warranty",
    estimatedTime: "2-3 days",
    price: 20000,
    isRecommended: false,
    isVerified: true
  },
  {
    id: "q3",
    technicianName: "David Mark",
    avatar: "https://res.cloudinary.com/kz6ru1lw/image/upload/v1790937079/David_Mark_qxkrab.png",
    rating: 4.7,
    jobsCompleted: 84,
    location: "Ikeja, Lagos 6.5km away",
    warranty: "3 months warranty",
    estimatedTime: "1-2 days",
    price: 22000,
    isRecommended: false,
    isVerified: true
  },
  {
    id: "q4",
    technicianName: "Samuel Adebayo",
    avatar: "https://res.cloudinary.com/kz6ru1lw/image/upload/v1790937079/Samuel_Adebayo_veobh8.png",
    rating: 4.5,
    jobsCompleted: 67,
    location: "Alimosho, Lagos 7.8km away",
    warranty: "1 months warranty",
    estimatedTime: "2-4 days",
    price: 19000,
    isRecommended: false,
    isVerified: true
  }
];

let quotationsList = [];

// Initialize Page Data on Load
document.addEventListener('DOMContentLoaded', () => {
  const currentRequestId = 'RH-00421';
  fetchQuotationsForRequest(currentRequestId);
  setupOutsideClickListeners();
});

/**
 * RepairHub - Booking Confirmed JavaScript (script.js)
 */

// --- Base Configurations ---
const API_BASE_URL = 'https://repairhub-api-1.onrender.com/api';

// Retrieve Auth Token & Route IDs from localStorage or Query Parameters
const AUTH_TOKEN = localStorage.getItem('authToken') || '';
const urlParams = new URLSearchParams(window.location.search);

// Get IDs passed from previous step (e.g., booking-confirmed.html?appointmentId=XYZ&jobId=ABC)
const APPOINTMENT_ID = urlParams.get('appointmentId') || localStorage.getItem('lastAppointmentId');
const REPAIR_JOB_ID = urlParams.get('jobId') || localStorage.getItem('lastRepairJobId');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initUIEvents();
    
    if (APPOINTMENT_ID) {
        fetchBookingConfirmedData();
    } else {
        console.warn('No Appointment ID found in URL parameters or localStorage.');
    }
});

// --- API Data Fetching ---
async function fetchBookingConfirmedData() {
    try {
        // 1. Fetch Appointment Details from GET /appointments/{id}
        const appointmentResponse = await fetch(`${API_BASE_URL}/appointments/${APPOINTMENT_ID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AUTH_TOKEN}`
            }
        });

        if (!appointmentResponse.ok) {
            throw new Error(`Failed to fetch appointment: ${appointmentResponse.statusText}`);
        }

        const appointmentData = await appointmentResponse.json();
        
        // Populate Appointment-specific details
        populateAppointmentDetails(appointmentData);

        // 2. Fetch Repair Job Details if job ID is available
        const jobId = REPAIR_JOB_ID || appointmentData.repairJobId || appointmentData.repairJob?.id;
        if (jobId) {
            fetchRepairJobDetails(jobId);
        }

    } catch (error) {
        console.error('Error loading booking details:', error);
    }
}

async function fetchRepairJobDetails(jobId) {
    try {
        // Fetch Job Details from GET /repair-jobs/{id}
        const jobResponse = await fetch(`${API_BASE_URL}/repair-jobs/${jobId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AUTH_TOKEN}`
            }
        });

        if (!jobResponse.ok) {
            throw new Error(`Failed to fetch repair job: ${jobResponse.statusText}`);
        }

        const jobData = await jobResponse.json();
        
        // Populate Job-specific details
        populateJobDetails(jobData);

    } catch (error) {
        console.error('Error loading repair job details:', error);
    }
}

// --- DOM Population Helpers ---
function populateAppointmentDetails(data) {
    const appointment = data.data || data;

    // Appointment Date
    if (appointment.scheduledAt) {
        const dateElement = document.querySelector('.fa-calendar')?.closest('.flex')?.nextElementSibling;
        if (dateElement) {
            dateElement.textContent = formatDate(appointment.scheduledAt);
        }
    }

    // Service Mode (e.g., home_service, dropoff, pickup)
    if (appointment.serviceMode) {
        const modeElement = document.querySelector('.fa-house-laptop')?.closest('.flex')?.nextElementSibling;
        if (modeElement) {
            modeElement.textContent = formatServiceMode(appointment.serviceMode);
        }
    }

    // Service Address
    if (appointment.address) {
        const addressElement = document.querySelector('.fa-location-dot')?.closest('.flex')?.nextElementSibling;
        if (addressElement) {
            addressElement.textContent = typeof appointment.address === 'string' 
                ? appointment.address 
                : `${appointment.address.street || ''}, ${appointment.address.city || ''}`;
        }
    }

    // Amount / Payment
    if (appointment.quotation?.price || appointment.amount) {
        const priceValue = appointment.quotation?.price || appointment.amount;
        const paymentPriceElement = document.querySelector('.fa-credit-card')?.closest('.flex')?.nextElementSibling?.querySelector('span:first-child');
        if (paymentPriceElement) {
            paymentPriceElement.textContent = formatCurrency(priceValue);
        }
    }
}

function populateJobDetails(job) {
    const jobData = job.data || job;

    // Technician Information
    const tech = jobData.technician || jobData.counterpart;
    if (tech) {
        const techNameElem = document.querySelector('.fa-id-badge')?.closest('.flex')?.nextElementSibling?.querySelector('.font-bold');
        if (techNameElem) techNameElem.textContent = tech.fullName || `${tech.firstName} ${tech.lastName}`;

        const techAvatarElem = document.querySelector('.fa-id-badge')?.closest('.flex')?.nextElementSibling?.querySelector('img');
        if (techAvatarElem && tech.avatar) techAvatarElem.src = tech.avatar;

        const techBannerName = document.querySelector('main p span.font-semibold');
        if (techBannerName) techBannerName.textContent = tech.fullName || tech.firstName;
    }

    // Request / Job ID Banner
    if (jobData.id || jobData.requestCode) {
        const idElem = document.querySelector('.fa-receipt')?.closest('.flex')?.nextElementSibling;
        if (idElem) idElem.textContent = jobData.requestCode || `RH-${jobData.id.slice(-5).toUpperCase()}`;
    }

    // Device / Repair Details
    if (jobData.title || jobData.problemDescription) {
        const titleElem = document.querySelector('h3.text-sm.font-bold.text-slate-900');
        if (titleElem) titleElem.textContent = jobData.title || jobData.itemType || 'Device Repair';

        const descElem = titleElem?.nextElementSibling;
        if (descElem) descElem.textContent = jobData.problemDescription || jobData.categoryName || 'Repair Service';
    }
}

// --- UI Utility Functions ---
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        maximumFractionDigits: 0
    }).format(amount).replace('NGN', '₦');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

function formatServiceMode(mode) {
    const modes = {
        'onsite': 'Home Service',
        'home_service': 'Home Service',
        'pickup': 'Pickup & Delivery',
        'dropoff': 'Walk-in / Drop-off'
    };
    return modes[mode.toLowerCase()] || mode;
}

// --- Interactive UI Event Listeners ---
function initUIEvents() {
    const trackBtn = document.getElementById('trackRepairBtn');
    if (trackBtn) {
        trackBtn.addEventListener('click', () => {
            const jobId = REPAIR_JOB_ID || '';
            window.location.href = `track-repair.html?jobId=${jobId}`;
        });
    }

    const viewRepairsBtn = document.getElementById('viewMyRepairsBtn');
    if (viewRepairsBtn) {
        viewRepairsBtn.addEventListener('click', () => {
            window.location.href = 'my-repairs.html';
        });
    }
}

// =========================================================================
// SIDEBAR TAB SWITCHER FUNCTION
// =========================================================================
window.switchTab = function(tabName, clickedElement) {
    const myRepairsContent = document.getElementById('my-repairs-content');
    const emptyStateContent = document.getElementById('empty-state-content');
    const emptyTitle = document.getElementById('empty-title');
    const emptyIcon = document.getElementById('empty-icon');

    // 1. Update active tab styles on sidebar
    const allNavItems = document.querySelectorAll('#sidebar-nav .nav-item');
    allNavItems.forEach(item => {
        item.className = 'nav-item flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors';
    });

    // Style the clicked menu item as active (Blue background)
    clickedElement.className = 'nav-item flex items-center space-x-3 px-4 py-3 rounded-2xl bg-blue-600 text-white font-semibold text-sm shadow-md transition-all';

    // 2. Toggle content views based on tab selected
    if (tabName === 'my-repairs') {
        // Show Booking Confirmed / My Repairs view
        if (myRepairsContent) myRepairsContent.classList.remove('hidden');
        if (emptyStateContent) emptyStateContent.classList.add('hidden');
    } else {
        // Hide Booking Confirmed view & show empty state page
        if (myRepairsContent) myRepairsContent.classList.add('hidden');
        if (emptyStateContent) emptyStateContent.classList.remove('hidden');

        // Update empty state text & icon based on clicked tab
        if (emptyTitle) emptyTitle.textContent = tabName.replace('-', ' ');

        const iconMap = {
            'home': 'fa-house',
            'supports': 'fa-headset',
            'messages': 'fa-comment-dots',
            'settings': 'fa-gear'
        };

        if (emptyIcon) {
            emptyIcon.className = `fa-solid ${iconMap[tabName] || 'fa-folder-open'}`;
        }
    }
};

// =========================================================================
// HEADER UI DROPDOWN & NAVIGATION FUNCTIONS
// =========================================================================
window.toggleNotifications = function() {
    const dropdown = document.getElementById('notificationsDropdown');
    if (dropdown) dropdown.classList.toggle('hidden');
};

window.toggleProfileDropdown = function() {
    const dropdown = document.getElementById('profileDropdown');
    const chevron = document.getElementById('profileChevron');
    if (dropdown) dropdown.classList.toggle('hidden');
    if (chevron) chevron.classList.toggle('rotate-180');
};

window.markAllNotificationsRead = function() {
    const badge = document.getElementById('notifBadge');
    if (badge) badge.classList.add('hidden');
};

window.setActiveTopNav = function(element) {
    document.querySelectorAll('header nav a').forEach(link => {
        link.className = 'text-slate-500 hover:text-blue-600 transition-colors';
    });
    element.className = 'text-blue-600 border-b-2 border-blue-600 pb-4 pt-4 font-semibold';
};
