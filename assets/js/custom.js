// HEADER NAVIGATION
const menuOpenIcon = document.querySelector('.menu-open-icon');
const menuCloseIcon = document.querySelector('.mobile-menu-close-icon');
const mobileMenu = document.querySelector('.mobile-menu');
menuOpenIcon.addEventListener('click', openMenu);
menuCloseIcon.addEventListener('click', closeMenu);
function openMenu() {
  mobileMenu.style.transform = 'translateX(0)';
}
function closeMenu() {
  mobileMenu.style.transform = 'translateX(100%)';
}
// COUNTER
function initIntersectionObserver() {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  };
  const callback = function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounterAnimation();
        observer.unobserve(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  const targetElement = document.querySelector('.counter');
  if (targetElement) {
    observer.observe(targetElement);
  }
}
function startCounterAnimation() {
  var counterElements = document.querySelectorAll('.counter');
  counterElements.forEach(function (target) {
    var finalValue = parseInt(target.textContent, 10);
    var duration = 2000;
    var startTime = performance.now();
    function updateValue(timestamp) {
      var progress = timestamp - startTime;
      var value = Math.floor((progress / duration) * finalValue);

      if (value <= finalValue) {
        target.textContent = value;
        requestAnimationFrame(updateValue);
      } else {
        target.textContent = finalValue;
      }
    }
    requestAnimationFrame(updateValue);
  });
}
initIntersectionObserver();
// Frequently Asked Questions
function toggleAccordion(index) {
  var accordions = document.getElementsByClassName('accordion');
  var content =
    accordions[index].getElementsByClassName('accordion-content')[0];
  if (content.style.display === 'block') {
    content.style.display = 'none';
  } else {
    // Hide all other accordion contents before showing the clicked one
    for (var i = 0; i < accordions.length; i++) {
      var c = accordions[i].getElementsByClassName('accordion-content')[0];
      c.style.display = 'none';
    }
    content.style.display = 'block';
  }
}

// PRICING PLAN
document.addEventListener('DOMContentLoaded', function () {
  const monthlyBtn = document.getElementById('monthlyBtn');
  const annuallyBtn = document.getElementById('annuallyBtn');
  const plansGrid = document.getElementById('plansGrid');

  if (monthlyBtn && annuallyBtn && plansGrid) {
    monthlyBtn.addEventListener('click', function () {
      if (plansGrid.classList.contains('annually')) {
        updatePrices(1 / 12);
        plansGrid.classList.remove('annually');
        toggleButtonStyle(monthlyBtn, annuallyBtn);
        updateSubscriptionType('/mo');
      }
    });

    annuallyBtn.addEventListener('click', function () {
      if (!plansGrid.classList.contains('annually')) {
        updatePrices(12);
        plansGrid.classList.add('annually');
        toggleButtonStyle(annuallyBtn, monthlyBtn);
        updateSubscriptionType('/y');
      }
    });
  }

  function updatePrices(factor) {
    const prices = document.querySelectorAll('.text-4xl');
    prices.forEach((price) => {
      const currentPrice = parseFloat(price.textContent.replace('$', ''));
      price.textContent =
        '$' + (currentPrice * factor).toFixed(2).replace(/\.00$/, '');
    });
  }

  function toggleButtonStyle(selectedBtn, deselectedBtn) {
    selectedBtn.classList.add('bg-w-800', 'text-b-800');
    selectedBtn.classList.remove('text-w-100');
    deselectedBtn.classList.remove('bg-w-800');
    deselectedBtn.classList.add('text-w-100');
  }

  function updateSubscriptionType(type) {
    const subElements = document.querySelectorAll('.subscription-type');
    subElements.forEach(function (element) {
      element.textContent = type;
    });
  }
});

// Explore Our Blogs for Updates
let activeCategory = 'all'; // Track currently active category

function showCategory(event, category) {
  event.preventDefault();
  activeCategory = category; // Update active category

  const blogCards = document.querySelectorAll('.bg-blog-card');
  blogCards.forEach((card) => {
    const cardCategory = card.getAttribute('data-category');
    if (cardCategory === category || category === 'all') {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  // Remove active class from all category links
  document.querySelectorAll('.blog-category-link').forEach((link) => {
    link.classList.remove('b-active');
  });

  // Add active class to the clicked category link
  event.target.classList.add('b-active');
}

function showAllCategories(event) {
  showCategory(event, 'all');
}
// FAQ
function toggleAccordion(index) {
  var accordions = document.getElementsByClassName('accordion');
  for (var i = 0; i < accordions.length; i++) {
    var content = accordions[i].getElementsByClassName('accordion-content')[0];
    var svg = accordions[i].querySelector('.accordion-header svg');
    if (i === index) {
      content.style.display =
        content.style.display === 'block' ? 'none' : 'block';
      if (accordions[i].classList.contains('bg-faq-card-item')) {
        svg.classList.toggle('rotate-180');
      }
      accordions[i].classList.add('bg-faq-card-item');
    } else {
      content.style.display = 'none';
      svg.classList.remove('rotate-180');
      accordions[i].classList.remove('bg-faq-card-item');
    }
  }
}
toggleAccordion(0);


document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevents the form from submitting the default way

  let params = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      number:document.getElementById("number").value,
      message: document.getElementById("message").value
  };


  // Send email to the organization
  emailjs.send('service_d3l1d5g', 'template_1botosx', params)
      .then(function(response) {
          console.log("Email sent to organization:", response);

          // Send auto-reply to the user
          let autoReplyParams = {
              name: params.name,
              email: params.email
          };


      }, function(error) {
          alert("Failed to send email. Please try again.");
          console.error('Error sending email to organization:', error);
      });
});
