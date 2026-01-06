document.addEventListener('DOMContentLoaded', () => {

// 1. شريط التنقل المطور (Sticky Navbar)
    const navbar = document.querySelector('.navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    // تشغيل الدالة عند التمرير
    window.addEventListener('scroll', handleScroll);
    
    // تشغيل الدالة فور تحميل الصفحة (تجنباً لمشكلة تحديث الصفحة وهي في المنتصف)
    handleScroll();

    // 2. أزرار الهيرو (تنقل سريع)
    const bookBtn = document.getElementById("btn-book");
    const servicesBtn = document.getElementById("btn-services");
    if (bookBtn) bookBtn.onclick = () => window.location.href = "call.html";
    if (servicesBtn) servicesBtn.onclick = () => window.location.href = "serv.html";

    // 3. تأثير ظهور العناصر عند التمرير (Scroll Reveal)
    const revealElements = document.querySelectorAll('.service-card, .about-section-container, .main-graphic, .service-mini-card'); // أضفنا .service-mini-card
    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.8s ease-out';
                revealOnScroll.unobserve(entry.target); // إزالة المراقبة بعد الظهور
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        revealOnScroll.observe(el);
    });

    // 4. عداد الأرقام في شريط الإحصائيات (Stats Animation)
    const stats = document.querySelectorAll('.stat-number');
    let animatedStats = false;
    const animateNumbers = () => {
        if (animatedStats) return;
        animatedStats = true;
        stats.forEach(stat => {
            const text = stat.innerText;
            const target = parseInt(text.replace(/[^0-9]/g, ''));
            const suffix = text.replace(/[0-9]/g, '');
            let count = 0;
            const duration = 2000;
            const increment = target / (duration / 16);
            const updateCount = () => {
                count += increment;
                stat.innerText = (count < target ? Math.floor(count) : target) + suffix;
                if (count < target) requestAnimationFrame(updateCount);
            };
            updateCount();
        });
    };
    const observerStats = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) animateNumbers();
    }, { threshold: 0.3 });
    if (document.querySelector('.custom-banner')) observerStats.observe(document.querySelector('.custom-banner'));

    // 5. تأثير "نبض" بسيط لزر الحجز (لفت انتباه)
    if (bookBtn) {
        setInterval(() => {
            bookBtn.style.transform = 'scale(1.03)';
            setTimeout(() => bookBtn.style.transform = 'scale(1)', 300);
        }, 3000);
    }

    // 6. سلايدر آراء العميلات (Testimonials Slider)
    const testimonials = [
        { text: '"تجربة استثنائية! الديكور مريح جداً والتعامل راقي."', author: "- سارة الأحمد" },
        { text: '"أفضل صالون بالرياض لصبغات الشعر، شغلهم جداً نظيف."', author: "- نورة محمد" },
        { text: '"مكياجهم خيالي، يبرز الملامح بطريقة ناعمة وفخمة."', author: "- مها العتيبي" }
    ];
    let currentTestimonial = 0;
    const textEl = document.getElementById('testimonial-text');
    const authorEl = document.getElementById('testimonial-author');

    if (textEl) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            textEl.style.transition = 'opacity 0.5s';
            textEl.style.opacity = 0;
            setTimeout(() => {
                textEl.innerText = testimonials[currentTestimonial].text;
                authorEl.innerText = testimonials[currentTestimonial].author;
                textEl.style.opacity = 1;
            }, 500);
        }, 5000);
    }

    // 7. زر العودة للأعلى (Back to Top)
    const backBtn = document.createElement('button');
    backBtn.innerHTML = '↑';
    backBtn.className = 'back-to-top';
    document.body.appendChild(backBtn);
    window.addEventListener('scroll', () => {
        backBtn.classList.toggle('show', window.scrollY > 400);
    });
    backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // 8. اهتزاز خفيف (Vibration) للجوال
    const allButtonsAndLinks = document.querySelectorAll('button, a');
    allButtonsAndLinks.forEach(item => {
        item.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(20);
        });
    });

    // 9. النافذة المنبثقة (Special Offer Popup)
    const createPopup = () => {
        const popupOverlay = document.createElement('div');
        popupOverlay.className = 'popup-overlay';
        popupOverlay.innerHTML = `
            <div class="popup-content">
                <button class="popup-close-btn">&times;</button>
                <h3>عرض خاص لكِ!</h3>
                <p>احصلي على خصم 20% على أول خدمة حجزتيها الآن!</p>
                <button class="popup-btn">احجزي عرضك</button>
            </div>
        `;
        document.body.appendChild(popupOverlay);

        const closeBtn = popupOverlay.querySelector('.popup-close-btn');
        const offerBtn = popupOverlay.querySelector('.popup-btn');

        closeBtn.addEventListener('click', () => popupOverlay.classList.remove('active'));
        offerBtn.addEventListener('click', () => {
            popupOverlay.classList.remove('active');
            window.location.href = "call.html"; // توجه لصفحة الحجز
        });

        // إظهار البوب أب بعد 5 ثوانٍ
        setTimeout(() => {
            popupOverlay.classList.add('active');
        }, 5000);
    };
    createPopup();

    // 10. قائمة الجوال (Hamburger Menu)
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('no-scroll'); // لمنع التمرير عندما تكون القائمة مفتوحة
    });

    // إغلاق القائمة عند الضغط على رابط أو خارج القائمة
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    });

    document.addEventListener('click', (event) => {
        if (!navLinks.contains(event.target) && !hamburgerBtn.contains(event.target) && navLinks.classList.contains('active')) {
            hamburgerBtn.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('no-scroll');
        }
    });

    // 11. تحميل الصور بكسل-بكسل عند الظهور (Lazy Loading with Intersection Observer)
    const lazyImages = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src'); // افترض أن الصور لها data-src
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        if (img.src && !img.hasAttribute('data-src')) { // إذا كانت الصورة لها src بالفعل، انقلها لـ data-src
             img.setAttribute('data-src', img.src);
             img.removeAttribute('src'); // إزالة src مؤقتاً
        }
        imageObserver.observe(img);
    });
});