/**
 * GM CUISINE FACTORY & GM SERVICE CATERERS INDORE
 * Multi-Section Digital Card Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initVCardDownloader();
  initBottomNavScrollSpy();
  initDirectWhatsappInput();
  initEnquiryForm();
  initStarRating();
  initGalleryLightbox();
  initShareModal();
});

/**
 * 1. ONE-TAP VCARD (.VCF) GENERATOR & DOWNLOADER
 */
function initVCardDownloader() {
  const saveBtn = document.getElementById('save-vcard-btn');
  if (!saveBtn) return;

  const vCardContent = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Cuisine Factory;GM;;;',
    'FN:GM Cuisine Factory (GM Caterers)',
    'ORG:GM Cuisine Factory · GM Service Caterers Indore',
    'TITLE:Luxury Pure Vegetarian Catering & Royal Feasts',
    'TEL;TYPE=CELL,VOICE,PREF:+919399231772',
    'TEL;TYPE=WORK,VOICE:+919425410558',
    'ADR;TYPE=WORK,PREF:;;Indore;Madhya Pradesh;;India',
    'X-SOCIALPROFILE;type=instagram:https://www.instagram.com/gm_service_caterers/',
    'URL:https://www.justdial.com/Indore/GM-service-catering/0731PX731-X731-241208154150-I9E8_BZDET',
    'NOTE:GM Cuisine Factory by GM Service Caterers Indore. Ordinary food has no place in extraordinary moments. Luxury Pure Veg Catering for Royal Weddings, Kitty Parties & Events in Indore. Call/WhatsApp: 9399231772 / 9425410558.',
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

      showToast('GM Cuisine Factory (.vcf) saved to phone contacts!');
    } catch (err) {
      console.error('vCard download fallback:', err);
      window.location.href = 'tel:9399231772';
    }
  });
}

/**
 * 2. BOTTOM NAVIGATION SCROLL-SPY & SMOOTH SCROLL
 */
function initBottomNavScrollSpy() {
  const navLinks = document.querySelectorAll('.footer-menu-link');
  if (!navLinks.length) return;

  const sections = Array.from(navLinks)
    .map(link => {
      const id = link.getAttribute('data-nav') || link.getAttribute('href').replace('#', '');
      return document.getElementById(id);
    })
    .filter(Boolean);

  const onScroll = () => {
    const scrollPos = window.scrollY + window.innerHeight * 0.35;
    let currentId = '';

    for (let i = sections.length - 1; i >= 0; i--) {
      const sec = sections[i];
      if (sec.offsetTop <= scrollPos) {
        currentId = sec.id;
        break;
      }
    }

    if (currentId) {
      navLinks.forEach(link => {
        const targetId = link.getAttribute('data-nav') || link.getAttribute('href').replace('#', '');
        link.classList.toggle('active', targetId === currentId);
      });
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * 3. DIRECT WHATSAPP PHONE NUMBER SHARING (Reference Site Feature)
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
      `Hello! Here is the Official Digital Visiting Card for GM Cuisine Factory (GM Service Caterers Indore) — Luxury Pure Vegetarian Catering:\n\n${cardUrl}\n\nCall/WhatsApp: +91 9399231772 / 9425410558`
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
 * 4. QUICK ENQUIRY FORM DISPATCH VIA WHATSAPP
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
      `*NEW CATERING ENQUIRY — GM CUISINE FACTORY*`,
      `---------------------------------`,
      `👤 *Name:* ${name}`,
      `📞 *Phone:* ${phone}`,
      `🎉 *Event:* ${eventType}`,
      `👥 *Estimated Guests:* ${guests}`,
      `📅 *Date:* ${date}`,
      `📝 *Notes/Requirements:* ${message}`,
      `---------------------------------`,
      `Sent via Official Digital Visiting Card`
    ].join('\n');

    const waUrl = `https://wa.me/919399231772?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank');
    showToast('Enquiry sent to WhatsApp!');
  });
}

/**
 * 5. INTERACTIVE 5-STAR RATING & FEEDBACK
 */
function initStarRating() {
  const stars = document.querySelectorAll('.star-item');
  const form = document.getElementById('feedbackForm');
  let selectedScore = 5;

  stars.forEach(star => {
    star.addEventListener('click', () => {
      const val = parseInt(star.getAttribute('data-val') || '5', 10);
      selectedScore = val;
      stars.forEach(s => {
        const sVal = parseInt(s.getAttribute('data-val') || '1', 10);
        s.classList.toggle('active', sVal <= val);
      });
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('feedbackName')?.value.trim() || '';
      const text = document.getElementById('feedbackText')?.value.trim() || '';

      if (!name || !text) return;

      showToast(`Thank you ${name}! Your ${selectedScore}-star rating was recorded.`);
      form.reset();
      stars.forEach(s => s.classList.add('active'));
    });
  }
}

/**
 * 6. IMAGE GALLERY LIGHTBOX MODAL
 */
function initGalleryLightbox() {
  const modal = document.getElementById('imageModal');
  const imgEl = document.getElementById('lightboxImg');
  const capEl = document.getElementById('lightboxCaption');
  const items = document.querySelectorAll('.gallery-item');

  if (!modal || !imgEl) return;

  items.forEach(item => {
    item.addEventListener('click', () => {
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
 * 7. SHARE PROFILE MODAL & NATIVE SHARE
 */
function initShareModal() {
  const shareModal = document.getElementById('shareModal');
  const openBtn1 = document.getElementById('openShareModalBtn');
  const openBtn2 = document.getElementById('shareVCardBtn');

  const cardTitle = 'GM Cuisine Factory Indore';
  const cardText = 'GM Cuisine Factory (GM Service Caterers Indore) — Luxury Pure Vegetarian Catering for Weddings, Kitty Parties & Events. Call/WhatsApp: +91 9399231772 / 9425410558.';
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

  // Modal Share Button Handlers
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
      closeModal(shareModal);
    });
  }

  // Generic Modal Close Triggers
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

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => showToast('Visiting card link copied to clipboard!'))
      .catch(() => execCopy(text));
  } else {
    execCopy(text);
  }
}

function execCopy(text) {
  const input = document.createElement('input');
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
  showToast('Visiting card link copied to clipboard!');
}

function showToast(msg) {
  const toast = document.getElementById('canvas-toast');
  if (!toast) return;

  toast.textContent = msg;
  toast.removeAttribute('hidden');

  setTimeout(() => {
    toast.setAttribute('hidden', '');
  }, 3200);
}
