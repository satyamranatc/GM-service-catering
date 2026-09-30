/**
 * GM CUISINE FACTORY INDORE
 * Award-Winning Luxury Catering Landing Page & Interactive Concierge Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initVCardDownloader();
  initDualNavScrollSpy();
  initFeastFilters();
  initSignatureStationsBottomSheet();
  initScrollRevealObserver();
  initDirectWhatsappInput();
  initEnquiryForm();
  initStarRating();
  initGalleryLightbox();
  initShareModal();
  initCopyableElements();
});

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
 * 3. SIGNATURE STATIONS DATA & iOS BOTTOM SHEET CONTROLLER
 */
const STATIONS_DATA = {
  chaat: {
    title: 'Indori Chaat & Live Counters',
    badge: 'CROWD FAVORITE',
    subtitle: 'Authentic Sarafa & Chhappan Flavors',
    image: 'assets/images/instagram/insta_05.jpg',
    description: 'Experience Indore\'s legendary street food culture elevated to royal banquet standards. Crafted with mineral water, artisanal chutneys, and live interactive chef stations.',
    highlights: [
      'Crispy Indori Pani Puri with 5 signature herbal waters',
      'Live Khomcha & Golden Dahi Vada with roasted cumin & saunth',
      'Sizzling Aloo Tikki & Chole with pomegranate pearls',
      'Interactive Live Mysore & Cheese Dosa counter'
    ],
    waText: 'Hello GM Cuisine Factory, I want to include the Indori Chaat & Live Counters station in my upcoming event.'
  },
  tandoor: {
    title: 'Royal Tandoor & Banquet Counters',
    badge: 'ROYAL SIGNATURE',
    subtitle: 'Charcoal Roasted Delicacies',
    image: 'assets/images/instagram/insta_08.jpg',
    description: 'Direct from traditional clay tandoors to your guests\' plates. Fresh artisanal paneer, marinades infused with saffron and hand-ground spices.',
    highlights: [
      'Angari Paneer Tikka & Malai Soya Chaap',
      'Tandoori Stuffed Mushroom & Herb Paneer Kebabs',
      'Crispy Chur Chur Naan & Laccha Paratha counter',
      '100% Dedicated Jain & Pure Veg preparation'
    ],
    waText: 'Hello GM Cuisine Factory, I am interested in booking the Royal Tandoor Station for my event.'
  },
  mithai: {
    title: 'Royal Shahi Mithai & Live Desserts',
    badge: 'ARTISANAL DESSERTS',
    subtitle: 'Artisanal Heritage Confections',
    image: 'assets/images/instagram/insta_10.jpg',
    description: 'Centuries-old royal confectionery traditions made strictly with farm-fresh milk and finest traditional recipes. No compromises on taste and richness.',
    highlights: [
      'Live Crispy Kesariya Jalebi with Slow-Simmered Rabdi',
      'Rich Shahi Moong Dal Halwa & Gajar Halwa',
      'Signature Silver-Leaf Kaju Katli & Dry Fruit Ladoos',
      'Chilled Malai Kulfi & Matka Rabdi Falooda'
    ],
    waText: 'Hello GM Cuisine Factory, I want to inquire about the Royal Shahi Mithai & Live Desserts station.'
  },
  paan: {
    title: 'Molecular Liquid Nitrogen Smoke Paan',
    badge: 'EXPERIENTIAL LOUNGE',
    subtitle: 'The Ultimate Royal Event Finale',
    image: 'assets/images/instagram/insta_04_4x5.jpg',
    description: 'A theatrical digestive lounge that delights guests of all ages. Sub-zero molecular nitrogen mist combined with classic Banarasi and Calcutta betel leaves.',
    highlights: [
      'Dramatic Sub-Zero Smoke Mist clouds',
      'Zero-tobacco, 100% organic mukhwas & gulkand',
      'Chocolate, Strawberry, and Fire Paan variations',
      'Exclusive Instagram-worthy guest photo station'
    ],
    waText: 'Hello GM Cuisine Factory, I want to book the Liquid Nitrogen Smoke Paan lounge for my event.'
  },
  continental: {
    title: 'Artisanal Continental & Global Live',
    badge: 'GLOBAL FUSION',
    subtitle: 'Wood-Fired & Handcrafted Delights',
    image: 'assets/images/instagram/insta_09.jpg',
    description: 'Modern global gastronomy designed for cosmopolitan palates. Live pasta tossing, wood-fired thin crust pizzas, and Mexican fiesta counters.',
    highlights: [
      'Hand-tossed thin-crust Neapolitan Pizzas',
      'Live Pasta Station (Alfredo, Arbiatta, Pesto Genovese)',
      'Mexican Nacho Bar with Fresh Guacamole & Salsa',
      'Crispy Baked Garlic Herbed Breads'
    ],
    waText: 'Hello GM Cuisine Factory, I want to include the Continental Live station in our catering menu.'
  },
  thali: {
    title: 'Maharaja Royal Wedding Thali',
    badge: 'GRAND WEDDING FEAST',
    subtitle: '56-Bhog Regal Hospitality',
    image: 'assets/images/instagram/insta_19.jpg',
    description: 'The epitome of Malwa hospitality. Silver and brass royal service with complete curated courses from welcome sherbets to royal curries and breads.',
    highlights: [
      'Shahi Paneer, Dal Makhani & Special Subzis',
      'Assorted Indian Breads & Dum Biryani',
      'Welcome Coolers, Chaats, Salads & Papad Platters',
      'Strict Jain separation with zero onion/garlic counters'
    ],
    waText: 'Hello GM Cuisine Factory, I want a customized quotation for the Maharaja Royal Wedding Thali feast.'
  }
};

function initSignatureStationsBottomSheet() {
  const cards = document.querySelectorAll('.station-swipe-card');
  const sheet = document.getElementById('stationBottomSheet');
  if (!cards.length || !sheet) return;

  const titleEl = document.getElementById('sheetStationTitle');
  const subEl = document.getElementById('sheetSubtitle');
  const descEl = document.getElementById('sheetDescription');
  const badgeEl = document.getElementById('sheetBadge');
  const imgEl = document.getElementById('sheetImage');
  const listEl = document.getElementById('sheetHighlightsList');
  const waCta = document.getElementById('sheetWaCta');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const stationKey = card.getAttribute('data-station');
      const data = STATIONS_DATA[stationKey];
      if (!data) return;

      if (titleEl) titleEl.textContent = data.title;
      if (subEl) subEl.textContent = data.subtitle;
      if (descEl) descEl.textContent = data.description;
      if (badgeEl) badgeEl.textContent = data.badge;
      if (imgEl) {
        imgEl.src = data.image;
        imgEl.alt = data.title;
      }

      if (listEl) {
        listEl.innerHTML = data.highlights.map(item => `
          <li class="sheet-highlight-item">
            <span class="sheet-check">✓</span>
            <span>${item}</span>
          </li>
        `).join('');
      }

      if (waCta) {
        const encoded = encodeURIComponent(data.waText);
        waCta.href = `https://wa.me/919399231772?text=${encoded}`;
      }

      openModal(sheet);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  sheet.querySelectorAll('[data-close-sheet], [data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => closeModal(sheet));
  });
}

/**
 * 4. GENTLE SCROLL REVEALS (Intersection Observer - Mobile Motion Budget: 400–600ms)
 */
function initScrollRevealObserver() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -35px 0px',
      threshold: 0.06
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }
}

/**
 * 4. DUAL NAVIGATION SCROLL-SPY (DESKTOP TOP NAV & MOBILE BOTTOM DOCK)
 */
function initDualNavScrollSpy() {
  const desktopLinks = document.querySelectorAll('.nav-desktop-links .nav-link');
  const mobileLinks = document.querySelectorAll('.footer-menu-link');

  const sectionIds = ['homesection', 'ProductsServicesSection', 'AboutUsSection', 'feedbacksection', 'PaymentOptionsSection', 'enquirysection'];
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
  const saveBtns = document.querySelectorAll('#save-vcard-btn, .save-vcard-trigger');
  if (!saveBtns.length) return;

  const vCardContent = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Cuisine Factory;GM;;;',
    'FN:GM Cuisine Factory',
    'ORG:GM Cuisine Factory',
    'TITLE:Luxury Pure Vegetarian Catering & Royal Feasts',
    'TEL;TYPE=CELL,VOICE,PREF:+919399231772',
    'ADR;TYPE=WORK,PREF:;;8, Akhand Nagar, Airport Road;Indore;Madhya Pradesh;452006;India',
    'X-SOCIALPROFILE;type=instagram:https://www.instagram.com/gmcuisinefactory?stkn=bDNrbWNlYnNnanQx&utm_source=qr',
    'URL:https://www.justdial.com/Indore/GM-service-catering/0731PX731-X731-241208154150-I9E8_BZDET',
    'NOTE:GM Cuisine Factory. Extraordinary moments deserve extraordinary food. Luxury Pure Veg Catering for Royal Weddings, Grand Banquets & Events. Call/WhatsApp: +91 9399231772.',
    'CATEGORIES:Catering,Event Services,Pure Vegetarian,Wedding Caterer,Indore',
    'END:VCARD'
  ].join('\r\n');

  saveBtns.forEach(saveBtn => {
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
      `Hello! Experience the Luxury Pure Vegetarian Catering & Royal Feasts of GM Cuisine Factory:\n\n${cardUrl}\n\nCall/WhatsApp: +91 9399231772`
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

  const zoomQrBtn = document.getElementById('zoomQrBtn');
  if (zoomQrBtn) {
    zoomQrBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const qrEl = document.querySelector('.qr-frame-gold');
      const src = qrEl?.getAttribute('data-src') || 'assets/images/phonepe_payment_qr.jpg';
      const caption = qrEl?.getAttribute('data-caption') || 'PhonePe Official UPI QR — SHIVAM KUMAWAT';
      imgEl.src = src;
      imgEl.alt = caption;
      if (capEl) capEl.textContent = caption;
      openModal(modal);
    });
  }
}

/**
 * 10. SHARE PROFILE MODAL & NATIVE SHARE
 */
function initShareModal() {
  const shareModal = document.getElementById('shareModal');
  const openBtn1 = document.getElementById('openShareModalBtn');
  const openBtn2 = document.getElementById('shareVCardBtn');

  const cardTitle = 'GM Cuisine Factory Indore';
  const cardText = 'GM Cuisine Factory — Luxury Pure Vegetarian Catering for Royal Weddings, Live Paan Lounges & Events. Call/WhatsApp: +91 9399231772.';
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
  document.querySelectorAll('.open-share-modal-trigger').forEach(btn => {
    btn.addEventListener('click', handleShareTrigger);
  });

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
