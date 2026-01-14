gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. 漢堡選單邏輯 ---
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');

    if (menuToggle && navList) {
        menuToggle.onclick = (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('is-active');
            navList.classList.toggle('active');
        };

        document.querySelectorAll('.nav-list a').forEach(link => {
            link.onclick = () => {
                menuToggle.classList.remove('is-active');
                navList.classList.remove('active');
            };
        });
    }

    // --- 2. 登錄彈窗邏輯 ---
    const modal = document.getElementById('loginModal');
    const openBtn = document.getElementById('openLogin');
    const closeBtn = document.querySelector('.close-btn');
    const loginForm = document.getElementById('loginForm');

    if (openBtn && modal) {
        openBtn.onclick = (e) => {
            e.preventDefault();
            modal.style.display = "flex";
        };
    }

    if (closeBtn) {
        closeBtn.onclick = () => modal.style.display = "none";
    }

    window.onclick = (e) => {
        if (e.target === modal) modal.style.display = "none";
    };

    // --- 3. 表單傳送 (AJAX) ---
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);

            try {
                const response = await fetch('/contact', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    alert(result.message);
                    modal.style.display = "none"; // 成功後關閉彈窗
                    loginForm.reset();           // 重置表單
                } else {
                    alert('失敗：' + result.message);
                }
            } catch (error) {
                console.error('Fetch Error:', error);
                alert('伺服器連線失敗，請檢查 Node.js 是否運行');
            }
        });
    }
});

/* -----------------------------------------------------------index.html------------------------------------------------------------------ */
// 卡片滾動浮現
// gsap.utils.toArray(".info-card").forEach((card, i) => {
//   gsap.fromTo(card,
//     { opacity: 0, y: 40 },
//     {
//       opacity: 1,
//       y: 0,
//       duration: 1,
//       ease: "power2.out",
//       scrollTrigger: {
//         trigger: card,
//         start: "top 80%", // 卡片進入視口 80% 時觸發
//       },
//       delay: i * 0.2 // 三張卡片依序延遲
//     }
//   );
// });
// /* -------------------------------------------------------------------------------------------------------------------------------------- */

// /* -----------------------------------------------------------about.html------------------------------------------------------------------ */
// const aboutCards = gsap.utils.toArray(".card, .career-item");
// if (aboutCards.length > 0) {
//     gsap.from(aboutCards, {
//         opacity: 0,
//         y: 30,
//         stagger: 0.1,
//         scrollTrigger: {
//             trigger: ".section-light",
//             start: "top 80%"
//         },
//         clearProps: "all"
//     });
// }
/* -------------------------------------------------------------------------------------------------------------------------------------- */

/* -----------------------------------------------------------work.html------------------------------------------------------------------ */
// document.addEventListener("DOMContentLoaded", () => {
//   const slides = document.querySelectorAll('.slide');
//   const thumbs = document.querySelectorAll('.thumb');
//   let currentIndex = 0;

//   // 只有在作品頁面（有 slides 元素）時才執行
//   if (slides.length > 0 && thumbs.length > 0) {
//     console.log("作品切換功能已就緒");

//     function changeSlide(nextIndex) {
//       if (nextIndex === currentIndex) return;

//       // 切換 Active 類別
//       slides[currentIndex].classList.remove('active');
//       thumbs[currentIndex].classList.remove('active');

//       // 讓舊的淡出
//       gsap.to(slides[currentIndex], { opacity: 0, duration: 0.5 });

//       currentIndex = nextIndex;

//       slides[currentIndex].classList.add('active');
//       thumbs[currentIndex].classList.add('active');

//       // 讓新的淡入
//       gsap.to(slides[currentIndex], { opacity: 1, duration: 0.8 });

//       // 觸發內容動畫
//       const content = slides[currentIndex].querySelector('.slide-content');
//       if (content) {
//         gsap.fromTo(content, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 });
//       }
//     }

//     thumbs.forEach((thumb, index) => {
//       thumb.addEventListener('click', () => changeSlide(index));
//     });
//   }
// });
/* -------------------------------------------------------------------------------------------------------------------------------------- */