/* ============================================================
   SIFIRNOKTASI — Landing Animations (GSAP + Lenis)
   ============================================================ */

(function () {
  'use strict';

  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- PRELOADER ---------- */
  const preloader = $('#preloader');
  const counterEl = $('#preloaderCounter');
  const fillEl = $('#preloaderFill');
  const counterObj = { val: 0 };

  if (prefersReduced) {
    preloader.classList.add('done');
    document.body.classList.remove('no-scroll');
  } else {
    document.body.classList.add('no-scroll');
    gsap.to(counterObj, {
      val: 100,
      duration: 1.9,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(counterObj.val);
        counterEl.textContent = v;
        fillEl.style.width = v + '%';
      },
      onComplete: () => {
        preloader.classList.add('done');
        document.body.classList.remove('no-scroll');
        setTimeout(() => preloader.style.display = 'none', 1000);
        initHeroAnimations();
      },
    });
  }

  /* ---------- HERO ---------- */
  function initHeroAnimations() {
    if (prefersReduced) {
      $$('.reveal-mask, .hero-title .line-inner, .section-title .line-inner').forEach(el => (el.style.opacity = 1));
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.from('.hero-eyebrow', { y: 24, opacity: 0, duration: 0.9 })
      .from('.hero-title .line-inner', {
        yPercent: 118,
        duration: 1.15,
        stagger: 0.12,
      }, '-=0.5')
      .from('.hero-tagline', { y: 30, opacity: 0, duration: 0.8 }, '-=0.55')
      .from('.hero-cta .btn', { y: 26, opacity: 0, duration: 0.7, stagger: 0.12 }, '-=0.45')
      .from('.hero-meta span', { y: 18, opacity: 0, duration: 0.6, stagger: 0.08 }, '-=0.35')
      .from('.hero-phone', { y: 90, opacity: 0, rotateY: -18, duration: 1.3, ease: 'power3.out' }, '-=0.9');
  }

  if (prefersReduced) {
    $$('.reveal-mask, .hero-title .line-inner, .section-title .line-inner').forEach(el => (el.style.opacity = 1));
  }

  /* ---------- LENIS SMOOTH SCROLL ---------- */
  if (window.Lenis && !prefersReduced) {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id === '#') return;
        const target = $(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -70, duration: 1.4 });
      });
    });
  }

  /* ---------- CUSTOM CURSOR ---------- */
  if (!prefersReduced && window.matchMedia('(hover: hover)').matches) {
    const dot = $('#cursorDot');
    const ring = $('#cursorRing');

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3.out' });

    document.addEventListener('mousemove', (e) => {
      dotX(e.clientX); dotY(e.clientY);
      ringX(e.clientX); ringY(e.clientY);
    });

    $$('a, button, .btn, .faq-q').forEach((el) => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });
  }

  /* ---------- NAV ---------- */
  const nav = $('#nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  const burger = $('#navBurger');
  const mobile = $('#navMobile');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobile.classList.toggle('open');
  });

  /* ---------- SCROLL REVEALS ---------- */
  if (!prefersReduced) {
    $$('.section-reveal').forEach((el) => {
      gsap.from(el, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      });
    });

    $$('.section-title .line-inner').forEach((el) => {
      gsap.from(el, {
        yPercent: 118,
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el.closest('.section-head'),
          start: 'top 82%',
          once: true,
        },
      });
    });

    /* ---------- STAT COUNTERS ---------- */
    $$('[data-count]').forEach((el) => {
      const target = parseInt(el.dataset.target, 10);
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el.closest('.stats'),
          start: 'top 80%',
          once: true,
        },
        onUpdate: () => { el.textContent = Math.round(obj.val); },
      });
    });

    /* ---------- RISK GAUGE ---------- */
    const rg = $('#rgFill');
    const rgNum = $('#riskScoreNum');
    const rgLabel = $('#riskScoreLabel');
    const score = 62;
    const CIRC = 596.9;
    const obj = { val: 0 };

    gsap.to(obj, {
      val: score,
      duration: 2.2,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '#risk',
        start: 'top 60%',
        once: true,
      },
      onUpdate: () => {
        rgNum.textContent = Math.round(obj.val);
        rg.style.strokeDashoffset = CIRC * (1 - obj.val / 100);
      },
      onComplete: () => {
        rgLabel.textContent = '⚠ Yüksek Risk';
      },
    });

    $$('.factor-bar i').forEach((bar) => {
      const w = bar.style.getPropertyValue('--w');
      gsap.to(bar, {
        width: w,
        duration: 1.4,
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: bar,
          start: 'top 90%',
          once: true,
        },
      });
    });
  } else {
    $$('.factor-bar i').forEach((bar) => {
      bar.style.width = bar.style.getPropertyValue('--w');
    });
    rgNum && (rgNum.textContent = '62');
    rgLabel && (rgLabel.textContent = '⚠ Yüksek Risk');
    if (rg) rg.style.strokeDashoffset = 596.9 * 0.38;
  }

  /* ---------- TILT ---------- */
  if (!prefersReduced && window.matchMedia('(hover: hover)').matches) {
    $$('[data-tilt]').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(el, {
          rotateY: px * 6,
          rotateX: -py * 6,
          transformPerspective: 900,
          duration: 0.5,
          ease: 'power2.out',
        });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' });
      });
    });
  }

  /* ---------- FAQ ---------- */
  $$('.faq-item').forEach((item) => {
    const q = $('.faq-q', item);
    const a = $('.faq-a', item);
    q.addEventListener('click', () => {
      const open = item.classList.contains('open');
      $$('.faq-item.open').forEach((o) => {
        o.classList.remove('open');
        $('.faq-a', o).style.maxHeight = '0px';
      });
      if (!open) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- QR CODE ---------- */
  if (window.QRCode) {
    try {
      new QRCode($('#qrcode'), {
        text: 'https://byteandcharm.github.io/sifirnoktasi/app/',
        width: 132,
        height: 132,
        colorDark: '#1a3352',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H,
      });
    } catch (e) {
      console.warn('QR olusturulamadi:', e);
    }
  }

  /* ---------- APK YOKSA BILGI ---------- */
  const apkBtn = $('#apkBtn');
  if (apkBtn) {
    apkBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const dialog = document.createElement('div');
      dialog.style.cssText = `
        position: fixed; inset: 0; z-index: 10001; background: rgba(22,32,46,0.6);
        display: flex; align-items: center; justify-content: center; padding: 20px; cursor: pointer;
      `;
      dialog.innerHTML = `
        <div style="background:#fff; border-radius:20px; max-width:420px; padding:36px; cursor:default; box-shadow:0 40px 90px rgba(0,0,0,0.35);">
          <p style="font-family:'Syne',sans-serif; font-size:22px; font-weight:800; color:#16202e; margin-bottom:12px;">📦 APK Yapım Aşamasında</p>
          <p style="font-size:14.5px; line-height:1.7; color:#41536b;">APK dosyası EAS Build ile bulut üzerinde derleniyor ve birkaç dakika içinde bu sayfaya eklenecek. Şimdilik <b>PC &amp; Tüm Cihazlar</b> seçeneğiyle web uygulamasını hemen kurabilirsin — aynı özellikler, sıfır dosya.</p>
          <button style="margin-top:20px; background:#4a90d9; color:#fff; border:0; padding:13px 26px; border-radius:99px; font-size:15px; font-weight:700; cursor:pointer; width:100%;">Web Uygulamasını Aç →</button>
        </div>
      `;
      document.body.appendChild(dialog);
      const close = () => dialog.remove();
      dialog.addEventListener('click', (ev) => {
        if (ev.target === dialog) close();
      });
      $('button', dialog).addEventListener('click', () => {
        window.location.href = 'app/';
      });
    });
  }
})();
