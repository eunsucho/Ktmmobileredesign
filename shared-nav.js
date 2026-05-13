(function () {
  /* ---- CSS ---- */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes kmnav-slideDown {
      from { opacity: 0; transform: translateY(-8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    #kmnav-header {
      backdrop-filter: blur(14px) saturate(180%);
      -webkit-backdrop-filter: blur(14px) saturate(180%);
      background: rgba(255,255,255,0.92);
      border-bottom: 1px solid rgba(0,0,0,0.07);
      box-shadow: 0 1px 0 rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.05);
      width: 100%; height: 90px;
      position: sticky; top: 0; z-index: 50;
    }
    .kmnav-item a {
      font-size: 17px; font-weight: 500;
      color: #1A1A1A; text-decoration: none;
      transition: color 0.18s ease;
    }
    .kmnav-item a:hover { color: #E60012; }
    .kmnav-mega-dd {
      position: absolute; left: 0; right: 0; top: 100%;
      background: rgba(255,255,255,0.98);
      border-bottom: 1px solid #E5E7EB;
      box-shadow: 0 4px 16px rgba(0,0,0,0.08), 0 12px 32px rgba(0,0,0,0.06);
      backdrop-filter: blur(12px);
      z-index: 40; display: none;
    }
    .kmnav-mega-dd.open { display: block; animation: kmnav-slideDown 200ms ease-out; }
    .kmnav-dd-banner-overflow { overflow: hidden; border-radius: 16px; height: 100%; }
    .kmnav-dd-banner-track { display: flex; transition: transform 0.4s ease; height: 100%; }
    .kmnav-dd-banner-slide {
      flex-shrink: 0; width: 100%; height: 100%;
      padding: 24px; display: flex; align-items: center; justify-content: space-between;
    }

    /* Mobile drawer */
    #kmnav-drawer-overlay {
      display: none; position: fixed; inset: 0; z-index: 200;
      background: rgba(0,0,0,0.5);
    }
    #kmnav-drawer-overlay.open { display: block; }
    #kmnav-drawer {
      position: absolute; top: 0; left: 0; bottom: 0; width: 280px;
      background: #fff; overflow-y: auto;
      box-shadow: 4px 0 20px rgba(0,0,0,0.15);
    }
    #kmnav-drawer-head {
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px 20px; border-bottom: 2px solid #E60012;
    }
    .kmnav-drawer-item {
      display: block; padding: 14px 20px; font-size: 16px; font-weight: 600;
      color: #1A1A1A; border-bottom: 1px solid #f0f0f0; text-decoration: none;
    }
    .kmnav-drawer-item:hover { background: #fafafa; }
    .kmnav-drawer-login {
      margin: 12px 20px;
    }
    .kmnav-drawer-login button {
      width: 100%; padding: 12px; background: #E60012; color: #fff;
      border: none; border-radius: 8px; font-size: 15px; font-weight: 700; cursor: pointer;
      font-family: inherit;
    }

    /* Mobile-specific responsive */
    @media (max-width: 768px) {
      #kmnav-header { height: auto !important; min-height: 56px; }
      #kmnav-header > div { height: 56px !important; padding: 0 16px !important; }
      #kmnav-desktop-nav { display: none !important; }
      #kmnav-desktop-right { display: none !important; }
      #kmnav-mobile-btn { display: flex !important; }
      #kmnav-promo { height: auto !important; min-height: 40px; padding: 8px 40px 8px 16px; }
      #kmnav-promo > div:first-child { font-size: 12px !important; }
      .kmnav-mega-dd { display: none !important; }
    }
    #kmnav-mobile-btn {
      display: none;
      width: 40px; height: 40px;
      border-radius: 8px; background: #E60012;
      align-items: center; justify-content: center;
      border: none; cursor: pointer; flex-shrink: 0;
    }
  `;
  document.head.appendChild(style);

  /* ---- Data ---- */
  const ddBanners = [
    { bgColor: '#FFE8F0', tag: 'KT 인터넷',    tagColor: '#E60012', title: '인터넷+TV+모바일을', highlight: '체감가 0원에!',      subtitle: '트리플 결합으로 알뜰하게',               illust: '💰' },
    { bgColor: '#E8E8FF', tag: '부가서비스',    tagColor: '#2E5BFF', title: 'kt M모바일',         highlight: '대표 부가서비스',    subtitle: '월 1천원 이하로 누리는 통화 편의',         illust: '🌸' },
    { bgColor: '#F5F5F0', tag: '데이터쉐어링', tagColor: '#2E5BFF', title: '무제한 요금제 고객에겐', highlight: '데이터쉐어링 무료', subtitle: '2nd휴대폰, 태블릿PC 등 무료 서비스',    illust: '📱' },
    { bgColor: '#E8F8F5', tag: '이벤트',        tagColor: '#00C896', title: '5월 한정 특가',       highlight: '최대 28만원 혜택',  subtitle: '신규/번호이동 고객 대상',                 illust: '🎁' }
  ];

  const menuContent = {
    '가입하기': {
      groups: [
        { title: '요금제 가입하기', links: [{ label: '가입하기', href: 'plan-intro.html' }] },
        { title: '유심구매하기',    links: ['다이렉트몰 구매하기', '오픈마켓 구매하기', '편의점/마트 구매하기'] }
      ]
    },
    '상품': {
      groups: [
        { title: '요금제',       links: [{ label: '요금제 소개', href: 'plan-intro.html' }] },
        { title: '부가서비스',   links: ['전체 부가서비스', '해외 로밍'] },
        { title: '추가서비스',   links: ['함께쓰기', '데이터쉐어링', '휴대폰안심보험'] },
        { title: '휴대폰',       links: ['새 휴대폰', 'KT휴대폰'] },
        { title: '워치',         links: [] }
      ]
    },
    '혜택': {
      groups: [
        { title: '할인 혜택', label: '통신비 할인', links: ['M쇼핑할인', '제휴카드'] },
        { title: '생활 혜택',  links: ['M 쿠폰', 'M 마켓'] },
        { title: '이벤트',     links: ['이번달 이벤트', '당첨자 확인'] },
        { title: '참여 혜택',  links: ['친구 초대', '가입 리뷰 작성'] }
      ]
    },
    '결합': {
      groups: [
        { title: null, flat: true, links: ['아무나 SOLO 결합', '아무나 가족 결합+', 'KT인터넷 트리플할인'] }
      ]
    },
    '고객센터': {
      groups: [
        { title: '이용/공지',    links: ['공지사항', '고객센터 안내', { label: 'SIM 활성화 가이드', href: 'sim-guide.html' }, '단말기A/S 안내'] },
        { title: 'FAQ/고객문의', links: ['상담 예약', '고객센터 챗봇', '1:1 상담문의', '자주 묻는 질문'] },
        { title: '셀프서비스',  links: ['서비스 조회/변경', '요금조회 및 납부', '서비스 퀵 가이드', '가입번호 조회'] },
        { title: '고객보호',    links: ['이용자 피해 예방가이드', '명의도용 방지', '신청서식'] }
      ]
    }
  };

  /* ---- State ---- */
  let activeMenuKey = null;
  let menuCloseTimer = null;
  let ddHovered = false;
  let ddBannerIdx = 0;
  let ddBannerPlaying = true;
  let ddBannerInterval = null;

  /* ---- Helpers ---- */
  function resolveLink(l) {
    return typeof l === 'string' ? { label: l, href: '#' } : l;
  }

  function kmNavClose() {
    if (activeMenuKey) {
      const ul = document.getElementById('kmnav-ul-' + activeMenuKey);
      if (ul) ul.style.display = 'none';
    }
    activeMenuKey = null;
    const dd = document.getElementById('kmnav-mega');
    if (dd) dd.classList.remove('open');
  }

  function kmNavRenderDropdown(key) {
    const content = menuContent[key];
    if (!content) return;
    const linksEl = document.getElementById('kmnav-dd-links');
    if (!linksEl) return;
    linksEl.innerHTML = content.groups.map(g => {
      if (g.flat) {
        return `<div style="flex-shrink:0;display:flex;gap:32px;">${g.links.map(l => {
          const r = resolveLink(l);
          return `<a href="${r.href}" style="color:#1A1A1A;font-size:16px;font-weight:700;" onmouseover="this.style.color='#E60012'" onmouseout="this.style.color='#1A1A1A'">${r.label}</a>`;
        }).join('')}</div>`;
      }
      return `<div style="flex-shrink:0;">
        ${g.title ? `<div style="margin-bottom:12px;">
          ${g.label ? `<div style="display:inline-block;padding:2px 8px;border-radius:999px;background:#E60012;color:white;font-size:11px;font-weight:700;margin-bottom:8px;">${g.label}</div>` : ''}
          <h3 style="color:#1A1A1A;font-size:17px;font-weight:700;margin:0;">${g.title}</h3>
        </div>` : ''}
        ${g.links.length > 0 ? `<ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:12px;">${g.links.map(l => {
          const r = resolveLink(l);
          return `<li><a href="${r.href}" style="color:#555;font-size:15px;" onmouseover="this.style.color='#E60012'" onmouseout="this.style.color='#555'">${r.label}</a></li>`;
        }).join('')}</ul>` : ''}
      </div>`;
    }).join('');
  }

  function buildDdBanners() {
    const track = document.getElementById('kmnav-dd-banner-track');
    if (!track) return;
    track.innerHTML = ddBanners.map(b => `
      <div class="kmnav-dd-banner-slide" style="background:${b.bgColor};">
        <div style="flex:1;">
          <div style="display:inline-block;padding:4px 12px;border-radius:999px;background:${b.tagColor};color:white;font-size:12px;font-weight:700;margin-bottom:12px;">${b.tag}</div>
          <h3 style="color:#1A1A1A;font-size:18px;font-weight:700;margin:0 0 4px;">${b.title}</h3>
          <h3 style="font-size:18px;font-weight:700;color:${b.tagColor};margin:0 0 8px;">${b.highlight}</h3>
          <p style="color:#767676;font-size:13px;margin:0;">${b.subtitle}</p>
        </div>
        <div style="font-size:56px;">${b.illust}</div>
      </div>
    `).join('');
  }

  function updateDdBanner() {
    const track = document.getElementById('kmnav-dd-banner-track');
    if (track) track.style.transform = `translateX(-${ddBannerIdx * 100}%)`;
    const count = document.getElementById('kmnav-dd-banner-count');
    if (count) count.innerHTML = `${ddBannerIdx + 1}<span style="font-size:11px;">/${ddBanners.length}</span>`;
  }

  /* ---- Global functions (called from inline HTML) ---- */
  window.kmNavOpenMenu = function (key) {
    if (menuCloseTimer) { clearTimeout(menuCloseTimer); menuCloseTimer = null; }
    if (activeMenuKey !== key) {
      if (activeMenuKey) { const old = document.getElementById('kmnav-ul-' + activeMenuKey); if (old) old.style.display = 'none'; }
      activeMenuKey = key;
      const ul = document.getElementById('kmnav-ul-' + key);
      if (ul) ul.style.display = 'block';
      kmNavRenderDropdown(key);
      const dd = document.getElementById('kmnav-mega');
      if (dd) dd.classList.add('open');
    }
  };
  window.kmNavStartClose = function () {
    if (!ddHovered) menuCloseTimer = setTimeout(kmNavClose, 150);
  };
  window.kmNavDdEnter = function () {
    if (menuCloseTimer) { clearTimeout(menuCloseTimer); menuCloseTimer = null; }
    ddHovered = true;
  };
  window.kmNavDdLeave = function () {
    ddHovered = false;
    menuCloseTimer = setTimeout(kmNavClose, 150);
  };
  window.kmNavDdBannerPrev = function () {
    ddBannerIdx = (ddBannerIdx - 1 + ddBanners.length) % ddBanners.length;
    updateDdBanner();
  };
  window.kmNavDdBannerNext = function () {
    ddBannerIdx = (ddBannerIdx + 1) % ddBanners.length;
    updateDdBanner();
  };
  window.kmNavToggleDdBanner = function () {
    ddBannerPlaying = !ddBannerPlaying;
    const icon = document.getElementById('kmnav-dd-banner-playicon');
    if (ddBannerPlaying) {
      if (icon) icon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
      ddBannerInterval = setInterval(() => { ddBannerIdx = (ddBannerIdx + 1) % ddBanners.length; updateDdBanner(); }, 5000);
    } else {
      if (icon) icon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
      clearInterval(ddBannerInterval);
    }
  };

  /* ---- Init ---- */
  function initNav() {
    const mount = document.getElementById('nav-mount');
    if (!mount) return;

    const activeKey = window.KMNAV_ACTIVE || null;
    const navKeys = ['가입하기', '상품', '혜택', '결합', '고객센터'];

    mount.innerHTML = `
      <!-- Mobile Drawer Overlay -->
      <div id="kmnav-drawer-overlay" onclick="if(event.target===this)this.classList.remove('open')">
        <div id="kmnav-drawer">
          <div id="kmnav-drawer-head">
            <img src="ktmmobile_logo.svg" alt="kt M mobile" style="height:22px;">
            <button onclick="document.getElementById('kmnav-drawer-overlay').classList.remove('open')" style="width:32px;height:32px;background:#f5f5f5;border:none;border-radius:50%;font-size:18px;color:#555;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
          </div>
          <a href="index.html" class="kmnav-drawer-item">홈</a>
          <a href="plan-intro.html" class="kmnav-drawer-item">요금제 보기</a>
          <a href="precheck.html" class="kmnav-drawer-item">가입조건 확인</a>
          <a href="sim-guide.html" class="kmnav-drawer-item">SIM 활성화 가이드</a>
          <a href="#" class="kmnav-drawer-item">혜택</a>
          <a href="#" class="kmnav-drawer-item">결합</a>
          <a href="#" class="kmnav-drawer-item">고객센터</a>
          <div class="kmnav-drawer-login"><button>로그인</button></div>
        </div>
      </div>
      <!-- Promo Banner -->
      <div id="kmnav-promo" style="width:100%;height:56px;background:linear-gradient(90deg,#1c3fd8 0%,#2E5BFF 55%,#5579ff 100%);display:flex;align-items:center;justify-content:center;position:relative;">
        <div style="display:flex;align-items:center;gap:8px;color:white;font-weight:600;font-size:14px;">
          <span>단 4일간만, 쿠팡/N페이 요금제 28만원 페이백+5천원</span>
          <span style="font-size:24px;">💰</span>
        </div>
        <button onclick="document.getElementById('kmnav-promo').style.display='none'" style="position:absolute;right:32px;color:white;background:none;border:none;cursor:pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <!-- Header -->
      <header id="kmnav-header">
        <div style="max-width:1280px;margin:0 auto;height:100%;display:flex;align-items:center;justify-content:space-between;padding:0 32px;">
          <!-- Logo + Desktop Nav -->
          <div style="display:flex;align-items:center;gap:48px;min-width:0;">
            <a href="index.html" style="display:flex;align-items:center;text-decoration:none;flex-shrink:0;">
              <img src="ktmmobile_logo.svg" alt="kt M mobile" style="height:30px;width:auto;">
            </a>
            <nav id="kmnav-desktop-nav" style="display:flex;align-items:center;gap:32px;">
              ${navKeys.map(key => `
                <div class="kmnav-item" style="position:relative;padding:8px 0;" onmouseenter="kmNavOpenMenu('${key}')" onmouseleave="kmNavStartClose()">
                  <a href="#" style="color:${key === activeKey ? '#E60012' : '#1A1A1A'};font-weight:${key === activeKey ? '700' : '500'};">${key}</a>
                  <div id="kmnav-ul-${key}" style="position:absolute;left:0;right:0;bottom:0;height:2px;background:#E60012;display:${key === activeKey ? 'block' : 'none'};border-radius:2px;"></div>
                </div>
              `).join('')}
              <div style="display:flex;align-items:center;gap:4px;padding:4px 12px;border-radius:999px;cursor:pointer;background:#F3F3F5;">
                <span style="color:#7C3AED;">▼</span>
                <span style="color:#1A1A1A;">트리플할인</span>
              </div>
            </nav>
          </div>
          <!-- Right: desktop -->
          <div id="kmnav-desktop-right" style="display:flex;align-items:center;gap:16px;">
            <div style="display:flex;align-items:center;gap:8px;font-size:14px;color:#767676;">
              <a href="#" onmouseover="this.style.color='#1A1A1A'" onmouseout="this.style.color='#767676'">교체 유심 신청</a>
              <span>|</span>
              <a href="#" onmouseover="this.style.color='#1A1A1A'" onmouseout="this.style.color='#767676'">신청조회</a>
              <span>|</span>
              <a href="#" onmouseover="this.style.color='#1A1A1A'" onmouseout="this.style.color='#767676'">마이페이지</a>
            </div>
            <button style="padding:8px 16px;border:1px solid #1A1A1A;border-radius:8px;background:white;font-family:inherit;cursor:pointer;">로그인</button>
            <button style="width:40px;height:40px;border-radius:50%;background:#E60012;display:flex;align-items:center;justify-content:center;border:none;cursor:pointer;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
          </div>
          <!-- Mobile hamburger button -->
          <button id="kmnav-mobile-btn" onclick="document.getElementById('kmnav-drawer-overlay').classList.add('open')">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
        <!-- Mega Dropdown -->
        <div id="kmnav-mega" class="kmnav-mega-dd" onmouseenter="kmNavDdEnter()" onmouseleave="kmNavDdLeave()">
          <div style="max-width:1280px;margin:0 auto;padding:32px;height:220px;">
            <div style="display:flex;gap:48px;height:100%;">
              <div id="kmnav-dd-links" style="flex:1;display:flex;gap:64px;"></div>
              <div style="width:35%;position:relative;">
                <div class="kmnav-dd-banner-overflow">
                  <div class="kmnav-dd-banner-track" id="kmnav-dd-banner-track"></div>
                </div>
                <div style="position:absolute;bottom:-32px;right:0;display:flex;align-items:center;gap:8px;">
                  <button onclick="kmNavDdBannerPrev()" style="width:28px;height:28px;border-radius:50%;background:#e5e7eb;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
                  </button>
                  <span id="kmnav-dd-banner-count" style="font-size:14px;color:#555;">1<span style="font-size:11px;">/4</span></span>
                  <button onclick="kmNavDdBannerNext()" style="width:28px;height:28px;border-radius:50%;background:#e5e7eb;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                  <button onclick="kmNavToggleDdBanner()" style="width:28px;height:28px;border-radius:50%;background:#e5e7eb;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;">
                    <svg id="kmnav-dd-banner-playicon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    `;

    buildDdBanners();
    ddBannerInterval = setInterval(() => {
      ddBannerIdx = (ddBannerIdx + 1) % ddBanners.length;
      updateDdBanner();
    }, 5000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
