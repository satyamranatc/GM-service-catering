/**
 * GM CUISINE FACTORY & GM SERVICE CATERERS INDORE
 * Award-Winning Luxury Catering Landing Page & Interactive Concierge Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initVCardDownloader();
  initDualNavScrollSpy();
  initEventPlannerCalculator();
  initFeastFilters();
  initStoryHighlights();
  initDirectWhatsappInput();
  initEnquiryForm();
  initStarRating();
  initGalleryLightbox();
  initShareModal();
  initCopyableElements();
});

/**
 * 1. BESPOKE FEAST PLANNER & ESTIMATOR CALCULATOR (The Showstopper Widget)
 */
function initEventPlannerCalculator() {
  const occasionChips = document.querySelectorAll('#occasionChips .occasion-chip');
  const slider = document.getElementById('guestSlider');
  const guestDisplay = document.getElementById('guestCountDisplay');
  const titleDisplay = document.getElementById('plannerRecommendationTitle');
  const metricChefs = document.getElementById('metricChefs');
  const metricCounters = document.getElementById('metricCounters');
  const metricCourses = document.getElementById('metricCourses');
  const stationLabels = document.querySelectorAll('#stationBoxes .station-checkbox-pill');
  const btnSendWa = document.getElementById('btnSendCustomPlanWa');

  if (!slider || !btnSendWa) return;

  let currentOccasion = 'Grand Royal Wedding';
  let currentGuests = parseInt(slider.value, 10) || 450;

  // Occasion selection
  occasionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      occasionChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentOccasion = chip.getAttribute('data-occasion') || chip.textContent.trim();
      updateEstimator();
    });
  });

  // Slider change
  slider.addEventListener('input', () => {
    currentGuests = parseInt(slider.value, 10);
    if (guestDisplay) guestDisplay.textContent = `${currentGuests.toLocaleString()} Guests`;
    updateEstimator();
  });

  // Station checkbox toggle visual feedback
  stationLabels.forEach(label => {
    const input = label.querySelector('input');
    if (!input) return;
    input.addEventListener('change', () => {
      label.classList.toggle('active', input.checked);
      updateEstimator();
    });
  });

  function updateEstimator() {
    // Dynamic calculation formula based on guest count & selected live stations
    const activeStations = Array.from(document.querySelectorAll('#stationBoxes input:checked')).map(i => i.value);
    const stationCount = activeStations.length;

    // Chef brigade: base 10 + 1 chef per 18 guests + 3 per active live station
    const chefCount = Math.max(8, Math.round(10 + (currentGuests / 18) + (stationCount * 3)));
    
    // Total courses: 14 base + 2 per station
    const coursesCount = Math.min(38, Math.max(16, 14 + (stationCount * 2)));

    if (titleDisplay) {
      titleDisplay.textContent = `${currentOccasion} Feast — ${currentGuests.toLocaleString()} Guests`;
    }

    if (metricChefs) metricChefs.textContent = `${chefCount} Chefs`;
    if (metricCounters) metricCounters.textContent = `${stationCount} Live Stations`;
    if (metricCourses) metricCourses.textContent = `${coursesCount} Delicacies`;
  }

  // Initial calculation
  updateEstimator();

  // WhatsApp Blueprint Dispatch
  btnSendWa.addEventListener('click', () => {
    const activeStations = Array.from(document.querySelectorAll('#stationBoxes input:checked')).map(i => i.value);
    const stationsText = activeStations.length > 0 ? activeStations.map(s => `  • ${s}`).join('\n') : '  • Standard Royal Spread';

    const waText = [
      `*BESPOKE CATERING INQUIRY — GM CUISINE FACTORY*`,
      `---------------------------------------`,
      `👑 *Event Occasion:* ${currentOccasion}`,
      `👥 *Estimated Guests:* ${currentGuests.toLocaleString()}`,
      `✨ *Selected Stations & Styles:*`,
      `${stationsText}`,
      `---------------------------------------`,
      `Please share customized menu options, chef availability, and quotation for Indore.`,
      `Sent via Official GM Cuisine Factory Portal`
    ].join('\n');

    const waUrl = `https://wa.me/919399231772?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank');
    showToast('Event blueprint prepared! Opening WhatsApp...');
  });
}

/**
 * 2. SIGNATURE FEASTS CATEGORY FILTER TABS
 */
function initFeastFilters() {
  const filterBtns = document.querySelectorAll('#feastsFilterBar .filter-chip');
  const cards = document.querySelectorAll('#productsGrid .product-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';

      cards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 3. INTERACTIVE STORY HIGHLIGHTS
 */
function initStoryHighlights() {
  const storyBubbles = document.querySelectorAll('.story-bubble-item');
  if (!storyBubbles.length) return;

  storyBubbles.forEach(bubble => {
    bubble.addEventListener('click', (e) => {
      const filter = bubble.getAttribute('data-filter');
      if (filter) {
        // Activate matching filter chip in feasts section
        const targetChip = document.querySelector(`#feastsFilterBar [data-filter="${filter}"]`);
        if (targetChip) {
          targetChip.click();
        }
      }
    });
  });
}

/**
 * 4. DUAL NAVIGATION SCROLL-SPY (DESKTOP TOP NAV & MOBILE BOTTOM DOCK)
 */
function initDualNavScrollSpy() {
  const desktopLinks = document.querySelectorAll('.nav-desktop-links .nav-link');
  const mobileLinks = document.querySelectorAll('.footer-menu-link');

  const sectionIds = ['homesection', 'ProductsServicesSection', 'eventPlannerSection', 'AboutUsSection', 'gallerysection', 'feedbacksection', 'PaymentOptionsSection', 'enquirysection'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  const onScroll = () => {
    const scrollPos = window.scrollY + 180;
    let currentId = '';

    for (let i = sections.length - 1; i >= 0; i--) {
      const sec = sections[i];
      if (sec.offsetTop <= scrollPos) {
        currentId = sec.id;
        break;
      }
    }

    if (currentId) {
      desktopLinks.forEach(link => {
        const href = link.getAttribute('href').replace('#', '');
        link.classList.toggle('active', href === currentId);
      });

      mobileLinks.forEach(link => {
        const targetId = link.getAttribute('data-nav') || link.getAttribute('href').replace('#', '');
        link.classList.toggle('active', targetId === currentId);
      });
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * 5. ONE-TAP VCARD (.VCF) GENERATOR & DOWNLOADER
 */
function initVCardDownloader() {
  const saveBtn = document.getElementById('save-vcard-btn');
  if (!saveBtn) return;

  const vCardContent = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Cuisine Factory;GM;;;',
    'FN:GM Cuisine Factory (GM Caterers Indore)',
    'ORG:GM Cuisine Factory · GM Service Caterers Indore',
    'TITLE:Luxury Pure Vegetarian Catering & Royal Feasts',
    'TEL;TYPE=CELL,VOICE,PREF:+919399231772',
    'TEL;TYPE=WORK,VOICE:+919425410558',
    'ADR;TYPE=WORK,PREF:;;Indore;Madhya Pradesh;;India',
    'X-SOCIALPROFILE;type=instagram:https://www.instagram.com/gm_service_caterers/',
    'URL:https://www.justdial.com/Indore/GM-service-catering/0731PX731-X731-241208154150-I9E8_BZDET',
    'NOTE:GM Cuisine Factory by GM Service Caterers Indore. Ordinary food has no place in extraordinary moments. Luxury Pure Veg Catering for Royal Weddings, Grand Banquets & Events. Call/WhatsApp: +91 9399231772 / 9425410558.',
    'CATEGORIES:Catering,Event Services,Pure Vegetarian,Wedding Caterer,Indore',
    'END:VCARD'
  ].join('\r\n');

  saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    try {
      const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8' });
      const downloadUrl = URL.createObjectURL(blob);
      const tempLink = document.createElement('a');
      tempLink.href = downloadUrl;
      tempLink.download = 'GM_Cuisine_Factory_Indore.vcf';
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      URL.revokeObjectURL(downloadUrl);

      showToast('GM Cuisine Factory contact card saved to phone!');
    } catch (err) {
      console.error('vCard download fallback:', err);
      window.location.href = 'tel:9399231772';
    }
  });
}

/**
 * 6. DIRECT WHATSAPP NUMBER SHARING
 */
function initDirectWhatsappInput() {
  const btn = document.getElementById('btnSendWaCard');
  const input = document.getElementById('whatsappShareNumber');
  if (!btn || !input) return;

  btn.addEventListener('click', () => {
    const rawVal = input.value.trim().replace(/\D/g, '');
    if (!rawVal || rawVal.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      input.focus();
      return;
    }

    const phone = rawVal.slice(-10);
    const cardUrl = window.location.href;
    const msg = encodeURIComponent(
      `Hello! Experience the Luxury Pure Vegetarian Catering & Royal Feasts of GM Cuisine Factory (GM Service Caterers Indore):\n\n${cardUrl}\n\nCall/WhatsApp: +91 9399231772 / 9425410558`
    );

    window.open(`https://wa.me/91${phone}?text=${msg}`, '_blank');
  });

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      btn.click();
    }
  });
}

/**
 * 7. ENQUIRY FORM DISPATCH VIA WHATSAPP
 */
function initEnquiryForm() {
  const form = document.getElementById('cateringEnquiryForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('enqName')?.value.trim() || '';
    const phone = document.getElementById('enqPhone')?.value.trim() || '';
    const eventType = document.getElementById('enqEventType')?.value || '';
    const guests = document.getElementById('enqGuestCount')?.value.trim() || 'Not specified';
    const date = document.getElementById('enqDate')?.value || 'Not specified';
    const message = document.getElementById('enqMessage')?.value.trim() || 'None';

    if (!name || !phone) {
      alert('Please enter your name and phone number.');
      return;
    }

    const waText = [
      `*NEW CATERING RESERVATION — GM CUISINE FACTORY*`,
      `---------------------------------`,
      `👤 *Name:* ${name}`,
      `📞 *Phone:* ${phone}`,
      `🎉 *Event:* ${eventType}`,
      `👥 *Guests:* ${guests}`,
      `📅 *Date:* ${date}`,
      `📝 *Requirements:* ${message}`,
      `---------------------------------`,
      `Sent via Official GM Cuisine Factory Portal`
    ].join('\n');

    const waUrl = `https://wa.me/919399231772?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank');
    showToast('Enquiry sent to WhatsApp!');
  });
}

/**
 * 8. INTERACTIVE 5-STAR RATING & FEEDBACK
 */
function initStarRating() {
  const stars = document.querySelectorAll('.star-item');
  const form = document.getElementById('feedbackForm');
  const msgEl = document.getElementById('ratingFeedbackMsg');
  let selectedScore = 5;

  const scoreLabels = {
    1: '⭐ Need improvement',
    2: '⭐⭐ Fair experience',
    3: '⭐⭐⭐ Good Food & Service',
    4: '⭐⭐⭐⭐ Great Experience!',
    5: '⭐⭐⭐⭐⭐ Outstanding Luxury Feast!'
  };

  const updateStarVisuals = (score) => {
    stars.forEach(s => {
      const sVal = parseInt(s.getAttribute('data-val') || '1', 10);
      s.classList.toggle('active', sVal <= score);
    });
    if (msgEl) {
      msgEl.textContent = scoreLabels[score] || '⭐⭐⭐⭐⭐ Tap stars to rate';
    }
  };

  stars.forEach(star => {
    star.addEventListener('mouseenter', () => {
      const val = parseInt(star.getAttribute('data-val') || '5', 10);
      updateStarVisuals(val);
    });

    star.addEventListener('mouseleave', () => {
      updateStarVisuals(selectedScore);
    });

    star.addEventListener('click', () => {
      const val = parseInt(star.getAttribute('data-val') || '5', 10);
      selectedScore = val;
      updateStarVisuals(selectedScore);

      star.classList.add('pop');
      setTimeout(() => star.classList.remove('pop'), 320);
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('feedbackName')?.value.trim() || '';
      const text = document.getElementById('feedbackText')?.value.trim() || '';

      if (!name || !text) return;

      showToast(`Thank you ${name}! Your ${selectedScore}-star review was recorded.`);
      form.reset();
      selectedScore = 5;
      updateStarVisuals(5);
    });
  }
}

/**
 * 9. IMAGE GALLERY & FEASTS LIGHTBOX MODAL
 */
function initGalleryLightbox() {
  const modal = document.getElementById('imageModal');
  const imgEl = document.getElementById('lightboxImg');
  const capEl = document.getElementById('lightboxCaption');
  const items = document.querySelectorAll('.gallery-item, .product-img-wrap');

  if (!modal || !imgEl) return;

  items.forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      const src = item.getAttribute('data-src') || item.querySelector('img')?.src;
      const caption = item.getAttribute('data-caption') || item.querySelector('img')?.alt || '';

      imgEl.src = src;
      imgEl.alt = caption;
      if (capEl) capEl.textContent = caption;

      openModal(modal);
    });
  });
}

/**
 * 10. SHARE PROFILE MODAL & NATIVE SHARE
 */
function initShareModal() {
  const shareModal = document.getElementById('shareModal');
  const openBtn1 = document.getElementById('openShareModalBtn');
  const openBtn2 = document.getElementById('shareVCardBtn');

  const cardTitle = 'GM Cuisine Factory Indore';
  const cardText = 'GM Cuisine Factory (GM Service Caterers Indore) — Luxury Pure Vegetarian Catering for Royal Weddings, Live Paan Lounges & Events. Call/WhatsApp: +91 9399231772 / 9425410558.';
  const cardUrl = window.location.href;

  const handleShareTrigger = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: cardTitle,
          text: cardText,
          url: cardUrl
        });
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          openModal(shareModal);
        }
      }
    } else {
      openModal(shareModal);
    }
  };

  if (openBtn1) openBtn1.addEventListener('click', handleShareTrigger);
  if (openBtn2) openBtn2.addEventListener('click', handleShareTrigger);

  const btnWa = document.getElementById('shareBtnWhatsapp');
  const btnSms = document.getElementById('shareBtnSms');
  const btnFb = document.getElementById('shareBtnFb');
  const btnCopy = document.getElementById('shareBtnCopy');

  if (btnWa) {
    btnWa.addEventListener('click', () => {
      const msg = encodeURIComponent(`${cardText}\n\n${cardUrl}`);
      window.open(`https://wa.me/?text=${msg}`, '_blank');
      closeModal(shareModal);
    });
  }

  if (btnSms) {
    btnSms.addEventListener('click', () => {
      window.open(`sms:?body=${encodeURIComponent(cardText + ' ' + cardUrl)}`, '_blank');
      closeModal(shareModal);
    });
  }

  if (btnFb) {
    btnFb.addEventListener('click', () => {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(cardUrl)}`, '_blank');
      closeModal(shareModal);
    });
  }

  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      copyToClipboard(cardUrl);
      const span = btnCopy.querySelector('span');
      if (span) {
        const orig = span.textContent;
        span.textContent = 'Copied! ✓';
        setTimeout(() => { span.textContent = orig; }, 1800);
      }
      setTimeout(() => closeModal(shareModal), 700);
    });
  }

  document.querySelectorAll('[data-close-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const m = e.target.closest('.app-modal');
      if (m) closeModal(m);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.app-modal.modal-open').forEach(closeModal);
    }
  });
}

function openModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.add('modal-open');
  modalEl.setAttribute('aria-hidden', 'false');
}

function closeModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.remove('modal-open');
  modalEl.setAttribute('aria-hidden', 'true');
}

function copyToClipboard(text, customSuccessMsg) {
  const successText = customSuccessMsg || 'Visiting card link copied to clipboard!';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => showToast(successText))
      .catch(() => execCopy(text, successText));
  } else {
    execCopy(text, successText);
  }
}

function execCopy(text, successText) {
  const input = document.createElement('input');
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
  showToast(successText || 'Visiting card link copied to clipboard!');
}

let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('canvas-toast');
  if (!toast) return;

  if (toastTimer) clearTimeout(toastTimer);

  toast.textContent = msg;
  toast.removeAttribute('hidden');

  toastTimer = setTimeout(() => {
    toast.setAttribute('hidden', '');
  }, 2800);
}

/**
 * 11. ONE-TAP COPYABLE ELEMENTS (UPI, Phone, etc.)
 */
function initCopyableElements() {
  const copyables = document.querySelectorAll('.copyable-val');
  copyables.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const val = el.getAttribute('data-copy') || el.innerText.replace(/copy/i, '').trim();
      const badge = el.querySelector('.copy-badge');

      copyToClipboard(val, `Copied ${val} to clipboard!`);

      if (badge) {
        const orig = badge.textContent;
        badge.textContent = 'Copied! ✓';
        badge.classList.add('copied');
        setTimeout(() => {
          badge.textContent = orig;
          badge.classList.remove('copied');
        }, 1800);
      }
    });
  });
}
