gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');

    // 確保元素存在才執行，避免報錯
    if (menuToggle && navList) {

        // 定義切換選單的函式
        function toggleMenu(e) {
            // 阻止事件冒泡，避免觸發 document 的點擊關閉事件
            if(e) e.stopPropagation();
            menuToggle.classList.toggle('is-active');
            navList.classList.toggle('active');
        }

        // 定義關閉選單的函式
        function closeMenu() {
            menuToggle.classList.remove('is-active');
            navList.classList.remove('active');
        }

        // 1. 漢堡按鈕點擊事件
        menuToggle.addEventListener('click', toggleMenu);

        // 2. 點擊導覽連結後自動關閉選單 (提升體驗)
        const navLinks = navList.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // 3. 點擊畫面任何其他地方，自動關閉選單 (防呆)
        document.addEventListener('click', (e) => {
            // 如果選單是開的，且點擊的目標不是選單本體，也不是漢堡按鈕
            if (navList.classList.contains('active') && !navList.contains(e.target) && e.target !== menuToggle) {
                closeMenu();
            }
        });
    }
});

const loginBtn = document.querySelector('.login-btn');
const modal = document.getElementById('loginModal');
const closeBtn = document.querySelector('.close-btn');
const loginForm = document.getElementById('loginForm');

// 開關邏輯
loginBtn.onclick = () => modal.style.display = 'flex';
closeBtn.onclick = () => modal.style.display = 'none';

// 提交資料到 Node.js 伺服器
loginForm.onsubmit = async (e) => {
    e.preventDefault();
    
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('資料已成功存入資料庫！');
            loginForm.reset();
            modal.style.display = 'none';
        }
    } catch (err) {
        alert('連線伺服器失敗');
    }
};
/* -----------------------------------------------------------index.html------------------------------------------------------------------ */
// 卡片滾動浮現
gsap.utils.toArray(".info-card").forEach((card, i) => {
  gsap.fromTo(card,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 80%", // 卡片進入視口 80% 時觸發
      },
      delay: i * 0.2 // 三張卡片依序延遲
    }
  );
});
/* -------------------------------------------------------------------------------------------------------------------------------------- */

/* -----------------------------------------------------------about.html------------------------------------------------------------------ */
const aboutCards = gsap.utils.toArray(".card, .career-item");
if (aboutCards.length > 0) {
    gsap.from(aboutCards, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        scrollTrigger: {
            trigger: ".section-light",
            start: "top 80%"
        },
        clearProps: "all"
    });
}
/* -------------------------------------------------------------------------------------------------------------------------------------- */

/* -----------------------------------------------------------work.html------------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll('.slide');
  const thumbs = document.querySelectorAll('.thumb');
  let currentIndex = 0;

  // 只有在作品頁面（有 slides 元素）時才執行
  if (slides.length > 0 && thumbs.length > 0) {
    console.log("作品切換功能已就緒");

    function changeSlide(nextIndex) {
      if (nextIndex === currentIndex) return;

      // 切換 Active 類別
      slides[currentIndex].classList.remove('active');
      thumbs[currentIndex].classList.remove('active');

      // 讓舊的淡出
      gsap.to(slides[currentIndex], { opacity: 0, duration: 0.5 });

      currentIndex = nextIndex;

      slides[currentIndex].classList.add('active');
      thumbs[currentIndex].classList.add('active');

      // 讓新的淡入
      gsap.to(slides[currentIndex], { opacity: 1, duration: 0.8 });

      // 觸發內容動畫
      const content = slides[currentIndex].querySelector('.slide-content');
      if (content) {
        gsap.fromTo(content, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 });
      }
    }

    thumbs.forEach((thumb, index) => {
      thumb.addEventListener('click', () => changeSlide(index));
    });
  }
});
/* -------------------------------------------------------------------------------------------------------------------------------------- */