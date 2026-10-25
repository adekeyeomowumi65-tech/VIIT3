// ==============================
// MOBILE MENU
// ==============================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  
  navLinks.classList.toggle("show");
  
  menuBtn.innerHTML = navLinks.classList.contains("show") ?
    "✕" :
    "☰";
  
});

// ==============================
// FADE IN ANIMATION
// ==============================

const observer = new IntersectionObserver((entries) => {
  
  entries.forEach(entry => {
    
    if (entry.isIntersecting) {
      
      entry.target.classList.add("show-section");
      
    }
    
  });
  
}, {
  threshold: .15
});

document.querySelectorAll("section").forEach(section => {
  
  section.classList.add("hidden-section");
  
  observer.observe(section);
  
});

// ==============================
// Animated Statistics
// ==============================

const counters = document.querySelectorAll(".counter");

const statsObserver = new IntersectionObserver((entries) => {
  
  entries.forEach(entry => {
    
    if (!entry.isIntersecting) return;
    
    const counter = entry.target;
    const target = +counter.dataset.target;
    
    let current = 0;
    
    const increment = target / 60;
    
    function updateCounter() {
      
      current += increment;
      
      if (current < target) {
        
        counter.textContent = Math.ceil(current);
        
        requestAnimationFrame(updateCounter);
        
      } else {
        
        counter.textContent = target + "+";
        
      }
      
    }
    
    updateCounter();
    
    statsObserver.unobserve(counter);
    
  });
  
}, {
  threshold: 0.5
});

counters.forEach(counter => statsObserver.observe(counter));

// ==============================
// FAQ ACCORDION
// ==============================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  
  const button = item.querySelector(".faq-question");
  
  button.addEventListener("click", () => {
    
    faqItems.forEach(faq => {
      
      if (faq !== item) {
        
        faq.classList.remove("active");
        
        faq.querySelector(".faq-icon").textContent = "+";
        
      }
      
    });
    
    item.classList.toggle("active");
    
    const icon = item.querySelector(".faq-icon");
    
    icon.textContent = item.classList.contains("active") ? "−" : "+";
    
  });
  
});

/* ==========================================
VIIT APPLICATION FORM
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  
  const form = document.querySelector(".application-form");
  
  if (!form) return;
  
  const submitBtn = document.getElementById("submitBtn");
  const terms = document.getElementById("terms");
  const passport = document.getElementById("passport");
  const preview = document.getElementById("passport-preview");
  const uploadText = document.querySelector(".upload-box span");
  
  /* ==========================
     ENABLE SUBMIT
  ========================== */
  
  if (terms && submitBtn) {
    
    submitBtn.disabled = true;
    
    terms.addEventListener("change", () => {
      
      submitBtn.disabled = !terms.checked;
      
    });
    
  }
  
  /* ==========================
     PASSPORT PREVIEW
  ========================== */
  
  if (passport) {
    
    passport.addEventListener("change", function() {
      
      const file = this.files[0];
      
      if (!file) return;
      
      preview.src = URL.createObjectURL(file);
      
      preview.style.display = "block";
      
      uploadText.textContent = file.name;
      
      uploadText.style.color = "#22C55E";
      
    });
    
  }
  
  /* ==========================
     LIVE VALIDATION
  ========================== */
  
  const fields = form.querySelectorAll(
    
    "input[required], textarea[required]"
    
  );
  
  fields.forEach(field => {
    
    field.addEventListener("input", () => {
      
      validate(field);
      
    });
    
    field.addEventListener("blur", () => {
      
      validate(field);
      
    });
    
  });
  
  function validate(field) {
    
    const group = field.closest(".input-group");
    
    if (!group) return true;
    
    const message = group.querySelector(".error-message");
    
    let valid = true;
    
    let error = "";
    
    if (field.type === "email") {
      
      const emailPattern =
        
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      valid = emailPattern.test(field.value.trim());
      
      error = "Enter a valid email address.";
      
    }
    
    else if (
      
      field.name === "WhatsApp Number"
      
    ) {
      
      const digits = field.value.replace(/\D/g, "");
      
      valid = digits.length >= 10;
      
      error = "Enter a valid WhatsApp number.";
      
    }
    
    else {
      
      valid = field.value.trim() !== "";
      
      error = "This field is required.";
      
    }
    
    if (valid) {
      
      field.classList.remove("invalid");
      
      field.classList.add("valid");
      
      message.style.color = "#22C55E";
      
      message.innerHTML = "✔ Looks good";
      
    }
    
    else {
      
      field.classList.remove("valid");
      
      field.classList.add("invalid");
      
      message.style.color = "#EF4444";
      
      message.innerHTML = error;
      
    }
    
    return valid;
    
  }
  
  /* ==========================
     SUBMIT CHECK
  ========================== */
  
  form.addEventListener("submit", function(e) {
    
    let firstInvalid = null;
    
    fields.forEach(field => {
      
      if (!validate(field) && !firstInvalid) {
        
        firstInvalid = field;
        
      }
      
    });
    
    if (firstInvalid) {
      
      e.preventDefault();
      
      firstInvalid.focus({
        
        behavior: "smooth"
        
      });
      
    }
    
  });
  
});

/* ==========================================
SUCCESS PAGE
========================================== */

const reference = document.getElementById("referenceNumber");

const submissionDate = document.getElementById("submissionDate");

if (reference) {
  
  const random = Math.floor(100000 + Math.random() * 900000);
  
  reference.innerHTML = "VIIT-" + random;
  
}

if (submissionDate) {
  
  const today = new Date();
  
  submissionDate.innerHTML = today.toLocaleString();
  
}

/* ==========================================
COURSE SEARCH
========================================== */

const searchInput = document.getElementById("courseSearch");

if (searchInput) {
  
  searchInput.addEventListener("keyup", () => {
    
    const value = searchInput.value.toLowerCase();
    
    const cards = document.querySelectorAll(".course-card");
    
    cards.forEach(card => {
      
      const title = card.querySelector("h3").textContent.toLowerCase();
      
      if (title.includes(value)) {
        
        card.style.display = "block";
        
      } else {
        
        card.style.display = "none";
        
      }
      
    });
    
  });
  
}

/* ==========================================
SCROLL REVEAL
========================================== */

const reveals = document.querySelectorAll(".reveal");

function revealSections() {
  
  const windowHeight = window.innerHeight;
  
  reveals.forEach(section => {
    
    const top = section.getBoundingClientRect().top;
    
    if (top < windowHeight - 120) {
      
      section.classList.add("active");
      
    }
    
  });
  
}

window.addEventListener("scroll", revealSections);

window.addEventListener("load", revealSections);

