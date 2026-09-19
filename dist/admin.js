const firebaseConfig = {
  apiKey: 'AIzaSyBfMpWsJfSXLMTaU05DPSNQjJrp7wSkUlk',
  authDomain: 'boxing-club13.firebaseapp.com',
  projectId: 'boxing-club13',
  storageBucket: 'boxing-club13.firebasestorage.app',
  messagingSenderId: '605266888830',
  appId: '1:605266888830:web:ec5b5222e33483de97b02f'
};

const defaultConfig = {
  siteName: 'Боксерский клуб',
  brandName: 'Боксерский клуб',
  metaTitle: 'Боксерский клуб 13 — Ростов-на-Дону',
  heroKicker: 'Ростов-на-Дону · ул. Еляна, 68 · пр. Будённовский, 80',
  heroTitle: 'Сила',
  heroMiddle: 'начинается',
  heroTitleAccent: 'с техники',
  heroLead: 'Бокс для детей и взрослых. Групповые и персональные тренировки — с вниманием к движению, характеру и реальному прогрессу.',
  philosophyText: '<strong>Бокс — это больше, чем удары.</strong> Каждая тренировка делает тебя сильнее, дисциплинированнее и увереннее. Мы учим не просто технике — мы закаляем характер и готовим к тому, чтобы не сдаваться ни в ринге, ни в жизни.',
  philosophyQuote: 'Бокс — это больше, чем удары.',
  academyTitle: 'Не просто отрабатываем движения — учимся понимать бокс и применять его на практике.',
  academyVideos: [
    { label: 'Избранное / техника', title: 'Как поставить нокаутирующий удар?', meta: '18 000 просмотров · 04:39', url: 'https://www.youtube.com/watch?v=OnK1vq9VSEw', image: 'https://images.pexels.com/photos/6720433/pexels-photo-6720433.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    { label: '01 / техника', title: 'Как поставить жёсткий удар?', meta: '11:46 · YouTube', url: 'https://www.youtube.com/watch?v=Ld2trkWJ9gE' },
    { label: '02 / защита', title: 'Защитные действия в боксе', meta: '13:53 · YouTube', url: 'https://www.youtube.com/watch?v=qLHEVxqoW4U' }
  ],
  coachName: 'Роман <span class="coach-name">Роландович</span>',
  coachQuote: '«Моя задача — не просто дать нагрузку, а объяснить, зачем выполняется каждое движение и как оно работает».',
  coachPhoto: 'https://images.pexels.com/photos/4574138/pexels-photo-4574138.jpeg?auto=compress&cs=tinysrgb&w=1600',
  coachPhotoAlt: 'Спортсмен работает на лапах с тренером в боксерском зале',
  coachGallery: [],
  coachVideos: [],
  phone: '+7(986)023-13-13',
  phoneHref: '+79860231313',
  waPhone: '+79860231313',
  addressLine: 'ул. Еляна, 68<br>пр. Будённовский, 80',
  contactHeading: 'ВАШ ПУТЬ НАЧИНАЕТСЯ В «БОКСЕРСКОМ КЛУБЕ 13»',
  vkLink: 'https://vk.ru/club241344464',
  telegramLink: 'https://t.me/Boxing_Club13',
  youtubeLink: 'https://youtube.com/channel/UCLjxhNYik5Tg19xmQkG5iww?si=qwMjuH5Svb6TXXBG',
  instagramLink: 'https://www.instagram.com/coach_roman_rostov013?utm_source=qr',
  footerText: 'Бокс для детей и взрослых. Техника, дисциплина и индивидуальное внимание.'
};

const adminEmails = ['brucenet2112@gmail.com'];
const firebaseApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(firebaseApp);
const db = firebase.firestore(firebaseApp);
let coachGalleryUrls = [];
let selectedCoachPhotos = [];
let selectedCoachMainPhoto = null;

const authScreen = document.getElementById('auth-screen');
const adminScreen = document.getElementById('admin-screen');
const loginForm = document.getElementById('login-form');
const saveStatus = document.getElementById('save-status');
const saveError = document.getElementById('save-error');
const authError = document.getElementById('auth-error');
const rawConfig = document.getElementById('rawConfig');
const settingsForm = document.getElementById('settings-form');

const inputMap = {
  siteName: document.getElementById('siteName'),
  brandName: document.getElementById('brandName'),
  metaTitle: document.getElementById('metaTitle'),
  heroKicker: document.getElementById('heroKicker'),
  heroTitle: document.getElementById('heroTitle'),
  heroMiddle: document.getElementById('heroMiddle'),
  heroTitleAccent: document.getElementById('heroTitleAccent'),
  heroLead: document.getElementById('heroLead'),
  phone: document.getElementById('phone'),
  waPhone: document.getElementById('waPhone'),
  addressLine: document.getElementById('addressLine'),
  contactHeading: document.getElementById('contactHeading'),
  footerText: document.getElementById('footerText'),
  vkLink: document.getElementById('vkLink'),
  telegramLink: document.getElementById('telegramLink'),
  youtubeLink: document.getElementById('youtubeLink'),
  instagramLink: document.getElementById('instagramLink'),
  philosophyText: document.getElementById('philosophyText'),
  philosophyQuote: document.getElementById('philosophyQuote'),
  academyTitle: document.getElementById('academyTitle'),
  coachName: document.getElementById('coachName'),
  coachQuote: document.getElementById('coachQuote'),
  coachPhoto: document.getElementById('coachPhoto'),
  coachPhotoAlt: document.getElementById('coachPhotoAlt')
};

const videoFields = [1, 2, 3].map((index) => ({
  url: document.getElementById(`video${index}Url`),
  label: document.getElementById(`video${index}Label`),
  title: document.getElementById(`video${index}Title`),
  meta: document.getElementById(`video${index}Meta`),
  image: document.getElementById(`video${index}Image`)
}));
const coachVideoFields = [1, 2, 3].map((index) => ({
  url: document.getElementById(`coachVideo${index}Url`),
  title: document.getElementById(`coachVideo${index}Title`),
  meta: document.getElementById(`coachVideo${index}Meta`),
  poster: document.getElementById(`coachVideo${index}Poster`)
}));
let rawConfigDirty = false;

const previewMap = {
  siteName: document.getElementById('previewBrandName'),
  brandName: document.getElementById('previewBrandName'),
  heroKicker: document.getElementById('previewKicker'),
  heroTitle: document.getElementById('previewHeroTitle'),
  heroMiddle: null,
  heroTitleAccent: document.getElementById('previewHeroAccent'),
  heroLead: document.getElementById('previewHeroLead'),
  phone: document.getElementById('previewPhone'),
  addressLine: document.getElementById('previewAddress')
};

function setStatus(message = '', isError = false) {
  saveStatus.textContent = message;
  saveStatus.style.color = isError ? '#ffb9b9' : '#c8f3d4';
}

function setError(message = '') {
  saveError.textContent = message;
}

function sanitizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizePhone(inputValue) {
  const digits = sanitizeText(inputValue).replace(/\D/g, '');
  if (!digits) return '';
  const normalized = digits.startsWith('8') ? `7${digits.slice(1)}` : digits.startsWith('7') ? digits : `7${digits}`;
  return normalized;
}

function readConfigFromForm() {
  const values = {};

  Object.entries(inputMap).forEach(([key, input]) => {
    if (input) values[key] = sanitizeText(input.value);
  });

  const videos = videoFields.map((fields, index) => ({
    ...(defaultConfig.academyVideos[index] || {}),
    url: sanitizeText(fields.url?.value),
    label: sanitizeText(fields.label?.value),
    title: sanitizeText(fields.title?.value),
    meta: sanitizeText(fields.meta?.value),
    ...(fields.image ? { image: sanitizeText(fields.image.value) } : {})
  }));
  values.academyVideos = videos.filter((video) => video.url || video.title);
  values.coachVideos = coachVideoFields.map((fields) => ({
    url: sanitizeText(fields.url?.value),
    title: sanitizeText(fields.title?.value),
    meta: sanitizeText(fields.meta?.value),
    poster: sanitizeText(fields.poster?.value)
  })).filter((video) => video.url || video.title);
  values.coachGallery = coachGalleryUrls.slice(0, 4);

  if (rawConfigDirty && rawConfig && rawConfig.value.trim()) {
    try {
      Object.assign(values, JSON.parse(rawConfig.value));
    } catch (error) {
      throw new Error('JSON-конфиг содержит невалидный JSON');
    }
  }

  const phoneValue = sanitizeText(values.phone);
  if (phoneValue) {
    values.phone = phoneValue;
    values.phoneHref = normalizePhone(phoneValue);
  }

  if (values.waPhone) {
    values.waPhone = normalizePhone(values.waPhone);
  }

  if (!values.brandName) values.brandName = values.siteName || defaultConfig.brandName;
  if (!values.siteName) values.siteName = values.brandName || defaultConfig.siteName;
  if (!values.metaTitle) values.metaTitle = `${values.siteName || defaultConfig.siteName} — Ростов-на-Дону`;

  return { ...defaultConfig, ...values };
}

function fillForm(data) {
  const config = { ...defaultConfig, ...data };
  Object.entries(inputMap).forEach(([key, input]) => {
    if (input) input.value = sanitizeText(config[key]);
  });

  const videos = Array.isArray(config.academyVideos) ? config.academyVideos : defaultConfig.academyVideos;
  videoFields.forEach((fields, index) => {
    const video = { ...(defaultConfig.academyVideos[index] || {}), ...(videos[index] || {}) };
    Object.entries(fields).forEach(([key, input]) => { if (input) input.value = sanitizeText(video[key]); });
  });
  const coachVideos = Array.isArray(config.coachVideos) ? config.coachVideos : defaultConfig.coachVideos;
  coachVideoFields.forEach((fields, index) => {
    const video = { ...(coachVideos[index] || {}) };
    Object.entries(fields).forEach(([key, input]) => { if (input) input.value = sanitizeText(video[key]); });
  });
  coachGalleryUrls = Array.isArray(config.coachGallery) ? config.coachGallery.filter((url) => typeof url === 'string').slice(0, 4) : [];
  renderCoachGalleryList();
  const mainPhotoPreview = document.getElementById('coach-main-photo-preview');
  if (mainPhotoPreview && config.coachPhoto) { mainPhotoPreview.src = config.coachPhoto; mainPhotoPreview.hidden = false; }

  if (rawConfig) rawConfig.value = JSON.stringify(config, null, 2);
  rawConfigDirty = false;
  applyPreview(config);
}

function renderCoachGalleryList() {
  const list = document.getElementById('coach-gallery-list');
  if (!list) return;
  list.replaceChildren();
  coachGalleryUrls.forEach((url, index) => {
    const item = document.createElement('div'); item.className = 'gallery-item';
    const image = document.createElement('img'); image.src = url; image.alt = `Фото ${index + 1}`;
    const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'ghost'; remove.textContent = 'Убрать';
    remove.addEventListener('click', () => { coachGalleryUrls.splice(index, 1); renderCoachGalleryList(); syncEditorsFromInput(); });
    item.append(image, remove); list.append(item);
  });
}

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Не удалось прочитать изображение'));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error('Файл не является изображением'));
      image.onload = () => {
        const maxSide = 1500;
        const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
        let quality = .78;
        let dataUrl = canvas.toDataURL('image/jpeg', quality);
        while (dataUrl.length > 150000 && quality > .42) {
          quality -= .08;
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }
        if (dataUrl.length > 165000) reject(new Error('Изображение слишком большое даже после сжатия'));
        else resolve(dataUrl);
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

async function uploadCoachPhotos() {
  if (!selectedCoachPhotos.length) return;
  if (selectedCoachPhotos.some((file) => !file.type.startsWith('image/') || file.size > 15 * 1024 * 1024)) {
    throw new Error('Каждый файл должен быть изображением до 15 МБ');
  }
  const files = selectedCoachPhotos.slice(0, 4 - coachGalleryUrls.length);
  if (!files.length) throw new Error('Можно хранить не больше 4 фотографий в Firestore');
  setStatus(`Загрузка фото: 0/${files.length}`);
  for (let index = 0; index < files.length; index += 1) {
    coachGalleryUrls.push(await compressImage(files[index]));
    setStatus(`Подготовка фото: ${index + 1}/${files.length}`);
  }
  selectedCoachPhotos = [];
  const input = document.getElementById('coachPhotoFiles'); if (input) input.value = '';
  renderCoachGalleryList();
  syncEditorsFromInput();
  setStatus('Фото подготовлены. Нажмите «Сохранить изменения»');
}

async function uploadCoachMainPhoto() {
  if (!selectedCoachMainPhoto) throw new Error('Сначала выберите файл главного фото');
  if (!selectedCoachMainPhoto.type.startsWith('image/') || selectedCoachMainPhoto.size > 15 * 1024 * 1024) {
    throw new Error('Главное фото должно быть изображением до 15 МБ');
  }
  setStatus('Подготовка главного фото…');
  const dataUrl = await compressImage(selectedCoachMainPhoto);
  inputMap.coachPhoto.value = dataUrl;
  const preview = document.getElementById('coach-main-photo-preview');
  if (preview) { preview.src = dataUrl; preview.hidden = false; }
  selectedCoachMainPhoto = null;
  const input = document.getElementById('coachPhotoFile'); if (input) input.value = '';
  syncEditorsFromInput();
  const status = document.getElementById('coach-main-photo-status');
  if (status) status.textContent = 'Фото подготовлено. Нажмите «Сохранить изменения»';
  setStatus('Главное фото подготовлено');
}

function applyPreview(config) {
  const preview = { ...defaultConfig, ...config };
  if (previewMap.siteName) previewMap.siteName.textContent = preview.siteName || preview.brandName || defaultConfig.siteName;
  if (previewMap.brandName) previewMap.brandName.textContent = preview.brandName || preview.siteName || defaultConfig.brandName;
  if (previewMap.heroKicker) previewMap.heroKicker.textContent = preview.heroKicker || defaultConfig.heroKicker;
  if (previewMap.heroTitle) previewMap.heroTitle.textContent = preview.heroTitle || defaultConfig.heroTitle;
  const previewMiddle = document.getElementById('previewHeroMiddle');
  if (previewMiddle) previewMiddle.textContent = preview.heroMiddle || defaultConfig.heroMiddle;
  const previewAccent = document.getElementById('previewHeroAccent');
  if (previewAccent) previewAccent.textContent = preview.heroTitleAccent || defaultConfig.heroTitleAccent;
  if (previewMap.heroLead) previewMap.heroLead.textContent = preview.heroLead || defaultConfig.heroLead;
  if (previewMap.phone) previewMap.phone.textContent = preview.phone || defaultConfig.phone;
  if (previewMap.addressLine) previewMap.addressLine.textContent = (preview.addressLine || defaultConfig.addressLine).replace(/<br>/g, ' / ');
}

function syncEditorsFromInput() {
  rawConfigDirty = false;
  const config = readConfigFromForm();
  rawConfig.value = JSON.stringify(config, null, 2);
  applyPreview(config);
}

async function loadConfig() {
  const docRef = db.collection('site').doc('settings');
  const snapshot = await docRef.get();
  const data = snapshot.exists ? snapshot.data() : {};
  fillForm(data);
}

async function saveConfig(event) {
  if (event) event.preventDefault();
  setStatus('');
  setError('');

  try {
    const payload = readConfigFromForm();
    const docRef = db.collection('site').doc('settings');
    await docRef.set(payload, { merge: true });
    fillForm(payload);
    setStatus('Сохранено успешно');
  } catch (error) {
    console.error(error);
    setError(error.message || 'Не удалось сохранить изменения.');
    setStatus('Ошибка сохранения', true);
  }
}

async function resetConfig() {
  fillForm(defaultConfig);
  setStatus('Сброшено до стандартного значения');
  setError('');
}

function toggleSection(sectionName) {
  document.querySelectorAll('.section-block').forEach((section) => {
    section.classList.toggle('active', section.id === `section-${sectionName}`);
  });
  document.querySelectorAll('.nav-btn').forEach((button) => {
    button.classList.toggle('active', button.dataset.section === sectionName);
  });
}

function bindUi() {
  [...Object.values(inputMap), ...videoFields.flatMap((fields) => Object.values(fields)), ...coachVideoFields.flatMap((fields) => Object.values(fields))].forEach((input) => {
    if (input) input.addEventListener('input', syncEditorsFromInput);
  });

  if (rawConfig) {
    rawConfig.addEventListener('input', () => {
      rawConfigDirty = true;
      try { JSON.parse(rawConfig.value); setError(''); }
      catch (error) { setError('JSON невалиден, но поле всё ещё можно редактировать.'); }
    });
  }

  const photoInput = document.getElementById('coachPhotoFiles');
  photoInput?.addEventListener('change', () => {
    selectedCoachPhotos = Array.from(photoInput.files || []).slice(0, 8);
    const status = document.getElementById('coach-upload-status');
    if (status) status.textContent = selectedCoachPhotos.length ? `Выбрано файлов: ${selectedCoachPhotos.length}` : '';
  });
  document.getElementById('upload-coach-photos')?.addEventListener('click', async () => {
    try { await uploadCoachPhotos(); }
    catch (error) { setError(error.message || 'Не удалось загрузить фото'); setStatus('Ошибка загрузки', true); }
  });
  const mainPhotoInput = document.getElementById('coachPhotoFile');
  mainPhotoInput?.addEventListener('change', () => { selectedCoachMainPhoto = mainPhotoInput.files?.[0] || null; });
  document.getElementById('upload-coach-main-photo')?.addEventListener('click', async () => {
    try { await uploadCoachMainPhoto(); }
    catch (error) { setError(error.message || 'Не удалось подготовить главное фото'); setStatus('Ошибка загрузки', true); }
  });

  document.getElementById('apply-json-btn')?.addEventListener('click', () => {
    try {
      const parsed = JSON.parse(rawConfig.value);
      fillForm(parsed);
      setError('');
      setStatus('JSON применён к форме');
    } catch (error) { setError('JSON-конфиг содержит невалидный JSON'); }
  });

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    authError.textContent = '';

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const isAllowed = adminEmails.includes(userCredential.user.email.toLowerCase());
      if (!isAllowed) {
        await auth.signOut();
        throw new Error('У вас нет доступа к этой панели');
      }
    } catch (error) {
      authError.textContent = error.message || 'Не удалось войти';
    }
  });

  document.getElementById('logout-btn').addEventListener('click', async () => {
    await auth.signOut();
  });

  document.getElementById('load-btn').addEventListener('click', async () => {
    setStatus('');
    setError('');
    try {
      await loadConfig();
      setStatus('Данные обновлены');
    } catch (error) {
      setError('Не удалось загрузить данные');
    }
  });

  document.getElementById('reset-btn').addEventListener('click', () => {
    resetConfig();
  });

  settingsForm.addEventListener('submit', saveConfig);

  document.querySelectorAll('.nav-btn').forEach((button) => {
    button.addEventListener('click', () => toggleSection(button.dataset.section));
  });
}

bindUi();

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    authScreen.classList.remove('hidden');
    adminScreen.classList.add('hidden');
    return;
  }

  const isAllowed = adminEmails.includes(user.email.toLowerCase());
  if (!isAllowed) {
    authError.textContent = 'У вас нет доступа к этой панели';
    await auth.signOut();
    return;
  }

  authScreen.classList.add('hidden');
  adminScreen.classList.remove('hidden');
  try {
    setStatus('Загрузка настроек…');
    await loadConfig();
    setStatus('Настройки загружены');
  } catch (error) {
    console.error(error);
    setError('Не удалось загрузить настройки. Проверьте доступ к Firestore.');
    setStatus('Ошибка загрузки', true);
  }
});
