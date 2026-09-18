(() => {
  const body = document.body;
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.progress-line');
  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const dialog = document.getElementById('booking');
  const form = document.getElementById('booking-form');
  let step = 1;

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
