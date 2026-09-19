(() => {
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

  const body = document.body;
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.progress-line');
  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const dialog = document.getElementById('booking');
  const form = document.getElementById('booking-form');
  let step = 1;

  const app = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore(app);

  const applyConfig = (data) => {
    const config = { ...defaultConfig, ...data };
    const brandName = document.getElementById('brandName');
    const heroKicker = document.getElementById('heroKicker');
    const heroTitle = document.getElementById('heroTitle');
    const heroMiddle = document.getElementById('heroMiddle');
    const heroTitleAccent = document.getElementById('heroTitleAccent');
    const heroLead = document.getElementById('heroLead');
    const philosophyText = document.getElementById('philosophyText');
    const philosophyQuote = document.getElementById('philosophyQuote');
    const contactHeading = document.getElementById('contacts-title');
    const addressLine = document.getElementById('addressLine');
    const phoneText = document.getElementById('phoneText');
    const phoneLink = document.getElementById('phoneLink');
    const waLink = document.getElementById('waLink');
    const socialLinks = document.getElementById('socialLinks');
    const footerBrand = document.getElementById('footerBrandName');
    const footerText = document.getElementById('footerText');
    const footerPhone = document.getElementById('footerPhone');
    const footerWa = document.getElementById('footerWa');
    const footerAddress = document.getElementById('footerAddress');
    const mediaTitle = document.getElementById('media-title');
    const coachName = document.getElementById('coachName');
    const coachQuote = document.getElementById('coachQuote');
    const coachPhoto = document.getElementById('coachPhoto');

    if (brandName) brandName.textContent = config.siteName || defaultConfig.siteName;
    if (heroKicker) heroKicker.textContent = config.heroKicker || defaultConfig.heroKicker;
    if (heroTitle) heroTitle.textContent = config.heroTitle || defaultConfig.heroTitle;
    if (heroMiddle) heroMiddle.textContent = config.heroMiddle || defaultConfig.heroMiddle;
    if (heroTitleAccent) heroTitleAccent.textContent = config.heroTitleAccent || defaultConfig.heroTitleAccent;
    if (heroLead) heroLead.textContent = config.heroLead || defaultConfig.heroLead;
    if (philosophyText) philosophyText.innerHTML = config.philosophyText || defaultConfig.philosophyText;
    if (philosophyQuote) philosophyQuote.textContent = config.philosophyQuote || defaultConfig.philosophyQuote;
    if (mediaTitle) mediaTitle.textContent = config.academyTitle || defaultConfig.academyTitle;
    renderAcademy(config.academyVideos);
    if (coachName) coachName.innerHTML = config.coachName || defaultConfig.coachName;
    if (coachQuote) coachQuote.textContent = config.coachQuote || defaultConfig.coachQuote;
    if (coachPhoto) {
      coachPhoto.src = config.coachPhoto || defaultConfig.coachPhoto;
      coachPhoto.alt = config.coachPhotoAlt || defaultConfig.coachPhotoAlt;
    }
    renderCoachVideos(config.coachVideos);
    if (contactHeading) contactHeading.textContent = config.contactHeading || defaultConfig.contactHeading;
    if (addressLine) addressLine.innerHTML = config.addressLine || defaultConfig.addressLine;
    if (phoneText) phoneText.textContent = config.phone || defaultConfig.phone;
    if (phoneLink) phoneLink.href = `tel:${config.phoneHref || defaultConfig.phoneHref}`;
    if (waLink) waLink.href = `https://wa.me/${(config.waPhone || defaultConfig.waPhone).replace(/\D/g, '')}`;
    if (socialLinks) {
      socialLinks.innerHTML = `
        <a href="${config.vkLink || defaultConfig.vkLink}" target="_blank" rel="noopener"><strong>VK</strong></a> ·
        <a href="${config.telegramLink || defaultConfig.telegramLink}" target="_blank" rel="noopener"><strong>Telegram</strong></a> ·
        <a href="${config.youtubeLink || defaultConfig.youtubeLink}" target="_blank" rel="noopener"><strong>YouTube</strong></a> ·
        <a href="${config.instagramLink || defaultConfig.instagramLink}" target="_blank" rel="noopener"><strong>Instagram</strong></a>
      `;
    }
    if (footerBrand) footerBrand.textContent = config.siteName || defaultConfig.siteName;
    if (footerText) footerText.textContent = config.footerText || defaultConfig.footerText;
    if (footerPhone) footerPhone.textContent = config.phone || defaultConfig.phone;
    if (footerPhone) footerPhone.href = `tel:${config.phoneHref || defaultConfig.phoneHref}`;
    if (footerWa) footerWa.href = `https://wa.me/${(config.waPhone || defaultConfig.waPhone).replace(/\D/g, '')}`;
    if (footerAddress) footerAddress.textContent = config.addressLine ? config.addressLine.replace(/<br>/g, ' / ') : 'ул. Еляна, 68 / Будённовский, 80';
    document.title = `${config.siteName || defaultConfig.siteName} — Ростов-на-Дону`;
  };

  const safeVideoUrl = (url) => {
    try {
      const parsed = new URL(url);
      return /^https?:$/.test(parsed.protocol) && /(^|\.)youtube\.com$|(^|\.)youtu\.be$/.test(parsed.hostname) ? parsed.href : '#';
    } catch (_) { return '#'; }
  };
  const safeExternalUrl = (url) => {
    try { const parsed = new URL(url); return /^https?:$/.test(parsed.protocol) ? parsed.href : '#'; }
    catch (_) { return '#'; }
  };

  function renderAcademy(videos) {
    const grid = document.getElementById('academy-grid');
    if (!grid) return;
    const items = Array.isArray(videos) && videos.length ? videos : defaultConfig.academyVideos;
    const normalized = items.slice(0, 3).map((item, index) => ({
      ...defaultConfig.academyVideos[index],
      ...(item || {})
    }));
    grid.replaceChildren();
    const featured = normalized[0];
    const feature = document.createElement('a');
    feature.className = 'media-feature';
    feature.href = safeVideoUrl(featured.url);
    feature.target = '_blank';
    feature.rel = 'noopener';
    if (feature.href === '#') feature.setAttribute('aria-disabled', 'true');
    if (featured.image) {
      const image = document.createElement('img');
      image.src = featured.image;
      image.alt = featured.title || 'Видео бесплатной академии';
      image.loading = 'lazy';
      feature.append(image);
    }
    const overlay = document.createElement('div');
    overlay.className = 'media-overlay';
    overlay.innerHTML = '<span class="play" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 6.5v11l9-5.5-9-5.5Z" fill="currentColor"/></svg></span>';
    const meta = document.createElement('small'); meta.textContent = featured.meta || '';
    const heading = document.createElement('h3'); heading.textContent = featured.title || '';
    overlay.append(meta, heading); feature.append(overlay); grid.append(feature);
    const stack = document.createElement('div'); stack.className = 'media-stack';
    normalized.slice(1).forEach((video) => {
      const card = document.createElement('a'); card.className = 'media-card'; card.href = safeVideoUrl(video.url); card.target = '_blank'; card.rel = 'noopener';
      const label = document.createElement('span'); label.textContent = video.label || 'Академия';
      const title = document.createElement('h3'); title.textContent = video.title || 'Видео клуба';
      const info = document.createElement('small'); info.textContent = video.meta || 'YouTube';
      card.append(label, title, info); stack.append(card);
    });
    grid.append(stack);
  }

  function renderCoachVideos(videos) {
    const grid = document.getElementById('coach-video-grid');
    if (!grid) return;
    const items = Array.isArray(videos) ? videos.filter((item) => item && item.url).slice(0, 3) : [];
    grid.replaceChildren();
    if (!items.length) {
      grid.hidden = true;
      return;
    }
    grid.hidden = false;
    items.forEach((video, index) => {
      const card = document.createElement('a');
      card.className = 'coach-video-card';
      card.href = safeExternalUrl(video.url);
      card.target = '_blank';
      card.rel = 'noopener';
      if (video.poster) {
        const poster = document.createElement('img');
        poster.src = video.poster;
        poster.alt = video.title || `Видео тренера ${index + 1}`;
        poster.loading = 'lazy';
        card.append(poster);
      }
      const body = document.createElement('span'); body.className = 'coach-video-body';
      const number = document.createElement('small'); number.textContent = `0${index + 1} / видео тренера`;
      const title = document.createElement('strong'); title.textContent = video.title || 'Видео тренера';
      const meta = document.createElement('span'); meta.textContent = video.meta || 'Смотреть видео ↗';
      const play = document.createElement('i'); play.className = 'coach-video-play'; play.setAttribute('aria-hidden', 'true'); play.textContent = '↗';
      body.append(number, title, meta, play); card.append(body); grid.append(card);
    });
  }

  async function loadConfig() {
    try {
      const snapshot = await db.collection('site').doc('settings').get();
      if (snapshot.exists) {
        applyConfig(snapshot.data());
      } else {
        applyConfig(defaultConfig);
      }
    } catch (error) {
      console.error('Firestore load failed:', error);
      applyConfig(defaultConfig);
    }
  }

  loadConfig();

  const onScroll = () => {
    const top = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle('scrolled', top > 24);
    progress.style.width = `${height > 0 ? (top / height) * 100 : 0}%`;
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  menuButton.addEventListener('click', () => {
    const open = body.classList.toggle('menu-open');
    menuButton.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
  });
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    body.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  }));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
  }

  const audienceData = {
    child: { index: '01', title: 'Характер без лишней жёсткости', text: 'Тренировки развивают координацию, дисциплину и уверенность. Нагрузка подбирается по возрасту и уровню подготовки.', points: ['Внимание тренера', 'Безопасная техника', 'Физическое развитие', 'Уважение и дисциплина'] },
    adult: { index: '02', title: 'Начать можно без опыта', text: 'Поставим стойку, научим двигаться, защищаться и правильно наносить удары. Спарринги не являются обязательными.', points: ['Техника с нуля', 'Работа на лапах', 'Физическая форма', 'Снятие стресса'] },
    sport: { index: '03', title: 'Подготовка с конкретной целью', text: 'Техническая и тактическая работа, функциональная подготовка и контролируемые спарринги под задачи спортсмена.', points: ['Разбор техники', 'Тактический план', 'Специальная ОФП', 'Подготовка к бою'] }
  };
  document.querySelectorAll('[data-audience]').forEach(tab => tab.addEventListener('click', () => {
    const data = audienceData[tab.dataset.audience];
    document.querySelectorAll('[data-audience]').forEach(item => item.setAttribute('aria-selected', String(item === tab)));
    const block = document.querySelector('.audience-content');
    block.querySelector('.audience-index').textContent = data.index;
    block.querySelector('h3').textContent = data.title;
    block.querySelector('p').textContent = data.text;
    block.querySelector('ul').innerHTML = data.points.map(item => `<li>${item}</li>`).join('');
  }));

  document.querySelectorAll('[data-filter]').forEach(filter => filter.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('active', item === filter));
    const value = filter.dataset.filter;
    document.querySelectorAll('.schedule-row').forEach(row => row.hidden = value !== 'all' && row.dataset.type !== value);
  }));

  document.querySelectorAll('.faq-list article>button').forEach(button => button.addEventListener('click', () => {
    const item = button.closest('article');
    const answer = item.querySelector(':scope>div');
    const open = item.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
    answer.style.maxHeight = open ? `${answer.scrollHeight}px` : '0px';
  }));

  const showStep = number => {
    step = number;
    form.querySelectorAll('.form-step').forEach(section => section.hidden = Number(section.dataset.step) !== step);
    dialog.querySelector('.dialog-progress span').style.width = `${Math.min(step, 3) / 3 * 100}%`;
  };
  const openDialog = event => {
    event?.preventDefault();
    showStep(1);
    form.reset();
    form.querySelectorAll('.choice').forEach(choice => choice.classList.remove('selected'));
    form.querySelectorAll('.next-step').forEach(button => button.disabled = true);
    dialog.showModal();
    body.classList.add('dialog-open');
  };
  const closeDialog = () => {
    dialog.close();
    body.classList.remove('dialog-open');
  };

  document.querySelectorAll('[data-book]').forEach(button => button.addEventListener('click', openDialog));
  dialog.querySelector('.dialog-close').addEventListener('click', closeDialog);
  dialog.querySelector('.dialog-done').addEventListener('click', closeDialog);
  dialog.addEventListener('click', event => { if (event.target === dialog) closeDialog(); });
  dialog.addEventListener('cancel', () => body.classList.remove('dialog-open'));

  form.querySelectorAll('.choice').forEach(choice => choice.addEventListener('click', () => {
    const current = choice.closest('.form-step');
    current.querySelectorAll('.choice').forEach(item => item.classList.toggle('selected', item === choice));
    current.querySelector('.next-step').disabled = false;
  }));
  form.querySelectorAll('.next-step').forEach(button => button.addEventListener('click', () => showStep(step + 1)));
  form.querySelectorAll('.prev-step').forEach(button => button.addEventListener('click', () => showStep(step - 1)));
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    showStep(4);
  });

  const mapTabs = document.querySelectorAll('.map-tab');
  const mapContainers = document.querySelectorAll('.map-container');
  mapTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      mapTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.target;
      mapContainers.forEach(container => {
        container.style.display = container.id === `map-${target}` ? 'block' : 'none';
      });
    });
  });
})();
