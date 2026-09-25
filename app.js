/**
 * GM SERVICE CATERERS INDORE — OFFICIAL DIGITAL VISITING CARD ENGINE
 * Strict [100vh, 100vw] Non-Scrolling In-Canvas Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initVCardDownloader();
  initCanvasSheets();
  initShareController();
  initSpecialtyChips();
});

/**
 * 1. ONE-TAP VCARD (.VCF) DOWNLOADER
 * RFC-6350 vCard 3.0 specification tailored for instant import
 * on Apple iOS Contacts and Android Contacts with both phone numbers.
 */
function initVCardDownloader() {
  const saveBtn = document.getElementById('save-vcard-btn');
  if (!saveBtn) return;

  const vCardContent = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Caterers;GM;Service;;',
    'FN:GM Service Caterers Indore',
    'ORG:GM Service Caterers',
    'TITLE:Luxury Pure Vegetarian Catering & Event Feasts',
    'TEL;TYPE=CELL,VOICE,PREF:+919399231772',
    'TEL;TYPE=WORK,VOICE:+919425410558',
    'ADR;TYPE=WORK,PREF:;;Indore;Madhya Pradesh;;India',
    'X-SOCIALPROFILE;type=instagram:https://www.instagram.com/gm_service_caterers/',
    'URL:https://www.justdial.com/Indore/GM-service-catering/0731PX731-X731-241208154150-I9E8_BZDET',
    'NOTE:Serving Taste & Tradition Since Day One. Ordinary food has no place in extraordinary moments. Luxury Pure Veg Catering for Royal Weddings, Kitty Parties & Events in Indore. Call/WhatsApp: 9399231772 / 9425410558.',
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
      tempLink.download = 'GM_Service_Caterers_Indore.vcf';
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      URL.revokeObjectURL(downloadUrl);

      showCanvasToast('Official contact (.vcf) saved to phone!');
    } catch (err) {
      console.error('vCard download fallback:', err);
      window.location.href = 'tel:9399231772';
    }
  });
}

/**
 * 2. IN-CANVAS POPUP SHEETS (Keeps everything strictly inside 100vh)
 */
function initCanvasSheets() {
  const openQRBtn = document.getElementById('open-qr-sheet');
  const openMenuBtn = document.getElementById('open-menu-sheet');
  const openReviewsBtn = document.getElementById('open-reviews-sheet');
  const openTeamBtn = document.getElementById('open-team-btn');

  const qrSheet = document.getElementById('qr-sheet');
  const menuSheet = document.getElementById('menu-sheet');
  const reviewsSheet = document.getElementById('reviews-sheet');
  const teamSheet = document.getElementById('team-sheet');

  if (openQRBtn && qrSheet) {
    openQRBtn.addEventListener('click', () => openSheet(qrSheet));
  }
  if (openMenuBtn && menuSheet) {
    openMenuBtn.addEventListener('click', () => openSheet(menuSheet));
  }
  if (openReviewsBtn && reviewsSheet) {
    openReviewsBtn.addEventListener('click', () => openSheet(reviewsSheet));
  }
  if (openTeamBtn && teamSheet) {
    openTeamBtn.addEventListener('click', () => openSheet(teamSheet));
  }

  // Handle all close triggers (scrim click, close button)
  document.querySelectorAll('[data-close-sheet]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const sheet = e.target.closest('.canvas-sheet');
      if (sheet) closeSheet(sheet);
    });
  });

  // Close sheet on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.canvas-sheet.sheet-open').forEach(sheet => closeSheet(sheet));
    }
  });
}

function openSheet(sheetElement) {
  if (!sheetElement) return;
  document.querySelectorAll('.canvas-sheet.sheet-open').forEach(s => closeSheet(s));
  sheetElement.classList.add('sheet-open');
  sheetElement.setAttribute('aria-hidden', 'false');
}

function closeSheet(sheetElement) {
  if (!sheetElement) return;
  sheetElement.classList.remove('sheet-open');
  sheetElement.setAttribute('aria-hidden', 'true');
}

/**
 * 3. SHARE VISITING CARD CONTROLLER
 */
function initShareController() {
  const shareBtn = document.getElementById('top-share-btn');
  if (!shareBtn) return;

  const cardTitle = 'GM Service Caterers Indore';
  const cardText = 'GM Service Caterers Indore — Luxury Pure Vegetarian Catering for Weddings, Kitty Parties & Events. Call/WhatsApp: +91 9399231772 / 9425410558.';
  const cardUrl = window.location.href;

  shareBtn.addEventListener('click', async () => {
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
          copyLinkFallback(cardUrl);
        }
      }
    } else {
      copyLinkFallback(cardUrl);
    }
  });
}

function copyLinkFallback(url) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url)
      .then(() => showCanvasToast('Visiting card link copied!'))
      .catch(() => execCopy(url));
  } else {
    execCopy(url);
  }
}

function execCopy(text) {
  const input = document.createElement('input');
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
  showCanvasToast('Visiting card link copied!');
}

function showCanvasToast(msg) {
  const toast = document.getElementById('canvas-toast');
  if (!toast) return;

  toast.textContent = msg;
  toast.removeAttribute('hidden');

  setTimeout(() => {
    toast.setAttribute('hidden', '');
  }, 3000);
}

/**
 * 4. SPECIALTY CHIPS INTERACTION
 */
function initSpecialtyChips() {
  const chips = document.querySelectorAll('.spec-chip');
  const menuSheet = document.getElementById('menu-sheet');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      if (menuSheet) {
        openSheet(menuSheet);
      }
    });
  });
}
