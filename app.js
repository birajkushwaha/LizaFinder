// Global State
let siteData = {};

// Liza's real recovery details as the default fallback
const defaultData = {
  status: 'lost',
  lastSeen: 'Crossing Republic',
  lostDate: '6 July 2026',
  lostTime: '6:30 PM',
  ownerName: 'Biraj Kushwaha',
  ownerPhone: '8076852716',
  ownerCity: 'Ghaziabad, Uttar Pradesh',
  petName: 'Liza',
  petBreed: 'Golden Retriever',
  petAge: '1.6 Years',
  petGender: 'Female',
  petVaccinated: 'Yes (Up to date)',
  rewardAvail: 'no',
  rewardAmt: '₹10,000',
  mapLat: '28.631111',
  mapLng: '77.402583',
  mapLabel: "28°37'52.0\"N 77°24'09.3\"E",
  urlHero: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=1000',
  urlGal1: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600',
  urlGal2: 'https://images.unsplash.com/photo-1537151608828-ea2b117b6297?auto=format&fit=crop&q=80&w=600',
  urlGal3: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&q=80&w=600'
};

// Global Layout Selectors
let header, menuToggleBtn, navbar, navLinks;

// Dynamic Profile Elements
let navStatusBadge, navStatusText, heroBadge, heroMsgEl, heroImgEl;
let btnCallOwner, btnWhatsappOwner, btnViewLocation;
let statusCard, statusBadgeLg, statusTextLg, lostDetailsBox, lostDetailsGrid;
let ownerNameEl, ownerPhoneLink, ownerPhoneText, ownerCityText;
let aboutName, aboutBreed, aboutAge, aboutGender, aboutVaccinated;
let rewardCard, rewardIcon, rewardTitleText, rewardDescText, rewardAmtEl, emergencyCard, btnEmergencyCall;
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImgEl = document.getElementById('lightbox-img-el');

// --- ROUTER: Detect Active Page ---
window.addEventListener('DOMContentLoaded', () => {
  // Bind global navigation elements
  header = document.getElementById('header');
  menuToggleBtn = document.getElementById('menu-toggle-btn');
  navbar = document.getElementById('navbar');
  navLinks = document.querySelectorAll('nav a');

  // Bind dynamic profile elements
  navStatusBadge = document.getElementById('nav-status-badge');
  navStatusText = document.getElementById('nav-status-text');
  heroBadge = document.getElementById('hero-badge');
  heroMsgEl = document.getElementById('hero-msg');
  heroImgEl = document.getElementById('hero-img-el');

  btnCallOwner = document.getElementById('btn-call-owner');
  btnWhatsappOwner = document.getElementById('btn-whatsapp-owner');
  btnViewLocation = document.getElementById('btn-view-location');

  statusCard = document.getElementById('status');
  statusBadgeLg = document.getElementById('status-badge-lg');
  statusTextLg = document.getElementById('status-text-lg');
  lostDetailsBox = document.getElementById('lost-details');
  lostDetailsGrid = document.querySelector('.lost-details-grid');

  ownerNameEl = document.querySelector('.owner-name');
  ownerPhoneLink = document.querySelector('.owner-details-list .owner-info-row:nth-child(1) a');
  ownerPhoneText = document.querySelector('.owner-details-list .owner-info-row:nth-child(1) a');
  ownerCityText = document.querySelector('.owner-details-list .owner-info-row:nth-child(2) .info-value');

  aboutName = document.querySelector('.about-grid .about-item:nth-child(1) .about-value');
  aboutBreed = document.querySelector('.about-grid .about-item:nth-child(2) .about-value');
  aboutAge = document.querySelector('.about-grid .about-item:nth-child(3) .about-value');
  aboutGender = document.querySelector('.about-grid .about-item:nth-child(4) .about-value');
  aboutVaccinated = document.querySelector('.about-grid .about-item:nth-child(5) .about-value');

  rewardCard = document.getElementById('reward');
  rewardIcon = document.getElementById('reward-icon');
  rewardTitleText = document.getElementById('reward-title-text');
  rewardDescText = document.getElementById('reward-desc-text');
  rewardAmtEl = document.getElementById('reward-amt-el');
  emergencyCard = document.getElementById('emergency');
  btnEmergencyCall = document.getElementById('btn-emergency-call');

  // Load and render
  loadProfileData();
  setupOwnerEditPortal();

  // Bind menu click events for mobile viewport hamburger toggles
  if (menuToggleBtn && navbar) {
    menuToggleBtn.addEventListener('click', () => {
      navbar.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('active');
      });
    });
  }
});

function loadProfileData() {
  // Fallback to localStorage (owner local testing view)
  const storedData = localStorage.getItem('liza_page_data');
  if (storedData) {
    siteData = JSON.parse(storedData);
  } else {
    siteData = { ...defaultData };
    localStorage.setItem('liza_page_data', JSON.stringify(siteData));
  }

  // Populate HTML elements with loaded siteData
  const logoText = document.querySelector('.logo span');
  const heroNameText = document.querySelector('.hero-title');
  const heroBreedText = document.querySelector('.hero-breed span');
  const footerCopyrightText = document.querySelector('footer .footer-text');
  const mapCoordsTitle = document.querySelector('.map-placeholder-title');
  const btnMapGmaps = document.getElementById('btn-map-gmaps');

  const galleryCard1 = document.getElementById('gallery-card-1');
  const galleryCard2 = document.getElementById('gallery-card-2');
  const galleryCard3 = document.getElementById('gallery-card-3');
  const galleryImg1 = galleryCard1.querySelector('img');
  const galleryImg2 = galleryCard2.querySelector('img');
  const galleryImg3 = galleryCard3.querySelector('img');

  logoText.textContent = siteData.petName.toUpperCase();
  heroNameText.textContent = siteData.petName.toUpperCase();
  heroBreedText.textContent = `🐕 ${siteData.petBreed}`;
  footerCopyrightText.textContent = `Thank you for helping ${siteData.petName} get home safely.`;

  if (siteData.urlHero) heroImgEl.src = siteData.urlHero;

  btnCallOwner.href = `tel:${siteData.ownerPhone}`;
  btnWhatsappOwner.href = `https://wa.me/91${siteData.ownerPhone}?text=Hi,%20I%20have%20found%20your%20dog%20${siteData.petName}.`;
  btnViewLocation.href = `https://maps.google.com/?q=${siteData.mapLat},${siteData.mapLng}`;

  ownerNameEl.textContent = siteData.ownerName;
  ownerPhoneLink.href = `tel:${siteData.ownerPhone}`;
  ownerPhoneText.textContent = siteData.ownerPhone;
  ownerCityText.textContent = siteData.ownerCity;
  btnEmergencyCall.href = `tel:${siteData.ownerPhone}`;

  aboutName.textContent = siteData.petName;
  aboutBreed.textContent = siteData.petBreed;
  aboutAge.textContent = siteData.petAge;
  aboutGender.textContent = siteData.petGender;
  aboutVaccinated.textContent = siteData.petVaccinated;

  mapCoordsTitle.textContent = `Approximate Location: ${siteData.mapLabel}`;
  btnMapGmaps.href = `https://maps.google.com/?q=${siteData.mapLat},${siteData.mapLng}`;

  if (siteData.urlGal1) galleryImg1.src = siteData.urlGal1;
  if (siteData.urlGal2) galleryImg2.src = siteData.urlGal2;
  if (siteData.urlGal3) galleryImg3.src = siteData.urlGal3;

  galleryCard1.onclick = () => openLightbox(siteData.urlGal1 || galleryImg1.src);
  galleryCard2.onclick = () => openLightbox(siteData.urlGal2 || galleryImg2.src);
  galleryCard3.onclick = () => openLightbox(siteData.urlGal3 || galleryImg3.src);

  renderProfileStatus();
}

function renderProfileStatus() {
  const isLost = siteData.status === 'lost';

  if (isLost) {
    navStatusBadge.className = 'status-indicator-nav lost';
    navStatusText.textContent = 'Currently Lost';

    heroBadge.className = 'hero-image-badge';
    heroBadge.style.background = 'var(--status-lost)';
    heroBadge.innerHTML = '<span>🔴 CURRENTLY LOST</span>';

    heroMsgEl.textContent = `❤️ If you've found me, Contact my parent`;

    statusCard.classList.add('currently-lost');
    statusBadgeLg.className = 'status-badge-large lost';
    statusTextLg.textContent = 'Currently Lost';
    lostDetailsBox.style.display = 'block';

    lostDetailsGrid.innerHTML = `
      <div class="lost-detail-item">
        <span class="lost-detail-label">📍 Last Seen</span>
        <span class="lost-detail-value">${siteData.lastSeen}</span>
      </div>
      <div class="lost-detail-item">
        <span class="lost-detail-label">📅 Date</span>
        <span class="lost-detail-value">${siteData.lostDate}</span>
      </div>
      <div class="lost-detail-item">
        <span class="lost-detail-label">⏰ Time</span>
        <span class="lost-detail-value">${siteData.lostTime}</span>
      </div>
    `;

    if (siteData.rewardAvail === 'yes') {
      rewardCard.style.display = 'flex';
      emergencyCard.style.gridColumn = 'auto';
      rewardIcon.textContent = '💝';
      rewardTitleText.textContent = 'Reward Offered';
      rewardDescText.textContent = `We are offering a generous cash reward for any verified details leading directly to ${siteData.petName}'s safe return.`;
      rewardAmtEl.style.display = 'block';
      rewardAmtEl.textContent = siteData.rewardAmt;
    } else {
      rewardCard.style.display = 'none';
      emergencyCard.style.gridColumn = 'span 2';
    }
  } else {
    // Safe
    navStatusBadge.className = 'status-indicator-nav safe';
    navStatusText.textContent = 'Safe at Home';

    heroBadge.className = 'hero-image-badge';
    heroBadge.style.background = 'var(--gold-gradient)';
    heroBadge.innerHTML = '<span>🟢 SAFE AT HOME</span>';

    heroMsgEl.textContent = `❤️ I am safe at home with my family. Thank you for your kindness!`;

    statusCard.classList.remove('currently-lost');
    statusBadgeLg.className = 'status-badge-large safe';
    statusTextLg.textContent = 'Safe at Home';
    lostDetailsBox.style.display = 'none';

    rewardCard.style.display = 'none';
    emergencyCard.style.gridColumn = 'span 2';
  }
}

// --- Lightbox Modal ---
function openLightbox(imgUrl) {
  lightboxImgEl.src = imgUrl;
  lightboxModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightboxModal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

if (lightboxModal) {
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });
}

// --- Sticky Nav and scroll highlights ---
window.addEventListener('scroll', () => {
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  // Highlight profile navigation active states
  const scrollPosition = window.scrollY + 120;
  const sections = ['hero', 'about', 'gallery', 'contact'];
  
  sections.forEach(sectionId => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    
    const top = el.offsetTop;
    const height = el.offsetHeight;
    
    if (scrollPosition >= top && scrollPosition < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}` || (sectionId === 'hero' && link.getAttribute('href') === '#')) {
          link.classList.add('active');
        }
      });
    }
  });
});



// ==========================================
// 3. OWNER panel editing
// ==========================================
let ownerPanelTriggerBtn, passcodeModalOverlay, passcodeError, passcodeInput;
let editModalOverlay, editStatusSelect, lostDetailsFormSection;
let btnPasscodeCancel, btnPasscodeVerify, btnEditClose, btnEditReset, btnEditSave;
let formImageState = {};

function setupOwnerEditPortal() {
  ownerPanelTriggerBtn = document.getElementById('owner-panel-trigger-btn');
  if (!ownerPanelTriggerBtn) return;

  passcodeModalOverlay = document.getElementById('passcode-modal-overlay');
  passcodeError = document.getElementById('passcode-error');
  passcodeInput = document.getElementById('owner-passcode');
  editModalOverlay = document.getElementById('edit-modal-overlay');
  editStatusSelect = document.getElementById('edit-status');
  lostDetailsFormSection = document.getElementById('form-section-lost-details');
  btnPasscodeCancel = document.getElementById('btn-passcode-cancel');
  btnPasscodeVerify = document.getElementById('btn-passcode-verify');
  btnEditClose = document.getElementById('btn-edit-close');
  btnEditReset = document.getElementById('btn-edit-reset');
  btnEditSave = document.getElementById('btn-edit-save');

  // Trigger click
  ownerPanelTriggerBtn.addEventListener('click', () => {
    passcodeInput.value = '';
    passcodeError.style.display = 'none';
    passcodeModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  btnPasscodeCancel.addEventListener('click', () => {
    passcodeModalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  btnPasscodeVerify.addEventListener('click', () => {
    if (passcodeInput.value.trim() === '11122003') {
      passcodeModalOverlay.classList.remove('active');
      openProfileEditPanel();
    } else {
      passcodeError.style.display = 'block';
    }
  });

  // Easter egg: status badge click triggers Owner Panel too
  if (navStatusBadge) {
    navStatusBadge.addEventListener('click', () => {
      ownerPanelTriggerBtn.click();
    });
  }

  // Setup uploader drops
  setupUploadField('dropzone-hero', 'file-hero', 'preview-hero', 'urlHero');
  setupUploadField('dropzone-gal1', 'file-gal1', 'preview-gal1', 'urlGal1');
  setupUploadField('dropzone-gal2', 'file-gal2', 'preview-gal2', 'urlGal2');
  setupUploadField('dropzone-gal3', 'file-gal3', 'preview-gal3', 'urlGal3');
}

function openProfileEditPanel() {
  formImageState = {
    urlHero: siteData.urlHero,
    urlGal1: siteData.urlGal1,
    urlGal2: siteData.urlGal2,
    urlGal3: siteData.urlGal3
  };

  editStatusSelect.value = siteData.status;
  document.getElementById('edit-last-seen').value = siteData.lastSeen;
  document.getElementById('edit-lost-date').value = siteData.lostDate;
  document.getElementById('edit-lost-time').value = siteData.lostTime;
  document.getElementById('edit-owner-name').value = siteData.ownerName;
  document.getElementById('edit-owner-phone').value = siteData.ownerPhone;
  document.getElementById('edit-owner-city').value = siteData.ownerCity;
  document.getElementById('edit-pet-name').value = siteData.petName;
  document.getElementById('edit-pet-breed').value = siteData.petBreed;
  document.getElementById('edit-pet-age').value = siteData.petAge;
  document.getElementById('edit-pet-gender').value = siteData.petGender;
  document.getElementById('edit-pet-vaccinated').value = siteData.petVaccinated;
  document.getElementById('edit-reward-avail').value = siteData.rewardAvail;
  document.getElementById('edit-reward-amt').value = siteData.rewardAmt;
  document.getElementById('edit-map-lat').value = siteData.mapLat;
  document.getElementById('edit-map-lng').value = siteData.mapLng;
  document.getElementById('edit-map-coords-label').value = siteData.mapLabel;

  document.getElementById('edit-url-hero').value = siteData.urlHero.startsWith('data:') ? '' : siteData.urlHero;
  document.getElementById('edit-url-gal1').value = siteData.urlGal1.startsWith('data:') ? '' : siteData.urlGal1;
  document.getElementById('edit-url-gal2').value = siteData.urlGal2.startsWith('data:') ? '' : siteData.urlGal2;
  document.getElementById('edit-url-gal3').value = siteData.urlGal3.startsWith('data:') ? '' : siteData.urlGal3;

  document.getElementById('preview-hero').innerHTML = siteData.urlHero ? `<img src="${siteData.urlHero}">` : '';
  document.getElementById('preview-gal1').innerHTML = siteData.urlGal1 ? `<img src="${siteData.urlGal1}">` : '';
  document.getElementById('preview-gal2').innerHTML = siteData.urlGal2 ? `<img src="${siteData.urlGal2}">` : '';
  document.getElementById('preview-gal3').innerHTML = siteData.urlGal3 ? `<img src="${siteData.urlGal3}">` : '';

  // Form Section lost state details show
  if (editStatusSelect.value === 'lost') {
    lostDetailsFormSection.style.display = 'block';
  } else {
    lostDetailsFormSection.style.display = 'none';
  }
  editStatusSelect.onchange = () => {
    lostDetailsFormSection.style.display = editStatusSelect.value === 'lost' ? 'block' : 'none';
  };

  btnEditClose.onclick = () => {
    editModalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  editModalOverlay.onclick = (e) => {
    if (e.target === editModalOverlay) {
      editModalOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  };

  // Reset Button
  btnEditReset.onclick = () => {
    if (confirm('Restore default details?')) {
      localStorage.removeItem('liza_page_data');
      loadProfileData();
      editModalOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  };

  // Save Button
  btnEditSave.onclick = () => {
    siteData.status = editStatusSelect.value;
    siteData.lastSeen = document.getElementById('edit-last-seen').value.trim() || defaultData.lastSeen;
    siteData.lostDate = document.getElementById('edit-lost-date').value.trim() || defaultData.lostDate;
    siteData.lostTime = document.getElementById('edit-lost-time').value.trim() || defaultData.lostTime;
    siteData.ownerName = document.getElementById('edit-owner-name').value.trim() || defaultData.ownerName;
    siteData.ownerPhone = document.getElementById('edit-owner-phone').value.trim() || defaultData.ownerPhone;
    siteData.ownerCity = document.getElementById('edit-owner-city').value.trim() || defaultData.ownerCity;
    siteData.petName = document.getElementById('edit-pet-name').value.trim() || defaultData.petName;
    siteData.petBreed = document.getElementById('edit-pet-breed').value.trim() || defaultData.petBreed;
    siteData.petAge = document.getElementById('edit-pet-age').value.trim() || defaultData.petAge;
    siteData.petGender = document.getElementById('edit-pet-gender').value.trim() || defaultData.petGender;
    siteData.petVaccinated = document.getElementById('edit-pet-vaccinated').value || defaultData.petVaccinated;
    siteData.rewardAvail = document.getElementById('edit-reward-avail').value;
    siteData.rewardAmt = document.getElementById('edit-reward-amt').value.trim() || defaultData.rewardAmt;
    siteData.mapLat = document.getElementById('edit-map-lat').value.trim() || defaultData.mapLat;
    siteData.mapLng = document.getElementById('edit-map-lng').value.trim() || defaultData.mapLng;
    siteData.mapLabel = document.getElementById('edit-map-coords-label').value.trim() || defaultData.mapLabel;

    const heroP = document.getElementById('edit-url-hero').value.trim();
    const gal1P = document.getElementById('edit-url-gal1').value.trim();
    const gal2P = document.getElementById('edit-url-gal2').value.trim();
    const gal3P = document.getElementById('edit-url-gal3').value.trim();

    siteData.urlHero = heroP || formImageState.urlHero || defaultData.urlHero;
    siteData.urlGal1 = gal1P || formImageState.urlGal1 || defaultData.urlGal1;
    siteData.urlGal2 = gal2P || formImageState.urlGal2 || defaultData.urlGal2;
    siteData.urlGal3 = gal3P || formImageState.urlGal3 || defaultData.urlGal3;

    // Save to LocalStorage
    localStorage.setItem('liza_page_data', JSON.stringify(siteData));
    
    // Rerender page details
    loadProfileData();

    editModalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  editModalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Drag & Drop Image Handlers
function compressAndSaveImage(file, callback) {
  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      const MAX = 800;
      if (width > height) {
        if (width > MAX) { height *= MAX / width; width = MAX; }
      } else {
        if (height > MAX) { width *= MAX / height; height = MAX; }
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      callback(canvas.toDataURL('image/jpeg', 0.7));
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

function setupUploadField(dropzoneId, fileInputId, previewId, dataKey) {
  const dropzone = document.getElementById(dropzoneId);
  const fileInput = document.getElementById(fileInputId);
  const preview = document.getElementById(previewId);
  if (!dropzone || !fileInput || !preview) return;

  dropzone.onclick = () => fileInput.click();
  dropzone.ondragover = (e) => { e.preventDefault(); dropzone.classList.add('dragover'); };
  dropzone.ondragleave = () => dropzone.classList.remove('dragover');
  dropzone.ondrop = (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) handleUploadedFile(e.dataTransfer.files[0], preview, dataKey);
  };
  fileInput.onchange = () => {
    if (fileInput.files.length > 0) handleUploadedFile(fileInput.files[0], preview, dataKey);
  };
}

function handleUploadedFile(file, previewEl, dataKey) {
  if (!file.type.startsWith('image/')) return alert('Please upload an image.');
  previewEl.innerHTML = '<span style="font-size:0.8rem; color:var(--primary-gold);">Processing...</span>';
  compressAndSaveImage(file, (dataUrl) => {
    previewEl.innerHTML = `<img src="${dataUrl}">`;
    formImageState[dataKey] = dataUrl;
    const urlInputId = dataKey === 'urlHero' ? 'edit-url-hero' : 
                       dataKey === 'urlGal1' ? 'edit-url-gal1' :
                       dataKey === 'urlGal2' ? 'edit-url-gal2' : 'edit-url-gal3';
    document.getElementById(urlInputId).value = '';
  });
}

// Global modal esc close listener
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    if (passcodeModalOverlay) passcodeModalOverlay.classList.remove('active');
    if (editModalOverlay) editModalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});
