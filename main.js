// ===== تهيئة عند تحميل الصفحة =====
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initAnimations();
    initHearts();
    initContactForm();
});

// ===== التنقل =====
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // فتح وإغلاق القائمة في الموبايل
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // إغلاق القائمة عند الضغط على رابط
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            
            // تحديث الرابط النشط
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // تأثير الشريط عند التمرير
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // تحديث الرابط النشط عند التمرير
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== تأثيرات التمرير =====
function initScrollEffects() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    // إظهار زر العودة للأعلى
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // التمرير للأعلى عند الضغط على الزر
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== الرسوم المتحركة عند الظهور =====
function initAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // مراقبة جميع العناصر المتحركة
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== خلفية القلوب المتحركة =====
function initHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartSymbols = ['♥', '❤', '💕', '💖', '💗', '💓', '💝'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        
        heartsContainer.appendChild(heart);

        // إزالة القلب بعد انتهاء الحركة
        setTimeout(() => {
            heart.remove();
        }, 20000);
    }

    // إنشاء قلوب بشكل دوري
    setInterval(createHeart, 2000);
    
    // إنشاء قلوب ابتدائية
    for (let i = 0; i < 10; i++) {
        setTimeout(createHeart, i * 500);
    }
}

// ===== نموذج التواصل =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // محاكاة إرسال النموذج
            showNotification('success', 'تم إرسال رسالتك بنجاح! شكراً لك على كلماتك الجميلة ❤️');
            
            // إعادة تعيين النموذج
            contactForm.reset();
        });
    }
}

// ===== إظهار الإشعارات =====
function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // إضافة أنماط الإشعار
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b9d 0%, #ffc93c 100%);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(255, 107, 157, 0.4);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 1rem;
        font-weight: 600;
        animation: slideInRight 0.5s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // إزالة الإشعار بعد 5 ثوانٍ
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// ===== تأثيرات إضافية =====

// تأثير التمرير السلس للروابط
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// تأثير الماوس على البطاقات
const cards = document.querySelectorAll('.poetry-card, .message-card, .quote-card, .gallery-item');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// تأثير جزيئات القلب عند الضغط
document.addEventListener('click', function(e) {
    createClickEffect(e.pageX, e.pageY);
});

function createClickEffect(x, y) {
    const colors = ['#ff6b9d', '#ffc93c', '#ff1744', '#f39c12'];
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.innerHTML = '♥';
        particle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            color: ${colors[Math.floor(Math.random() * colors.length)]};
            font-size: ${Math.random() * 20 + 10}px;
            pointer-events: none;
            z-index: 9999;
            animation: particleFade 1s ease forwards;
        `;
        
        const angle = (Math.PI * 2 * i) / 5;
        const velocity = 50;
        particle.style.setProperty('--x', Math.cos(angle) * velocity + 'px');
        particle.style.setProperty('--y', Math.sin(angle) * velocity + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

// إضافة أنماط الرسوم المتحركة للجزيئات
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes particleFade {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--x), var(--y)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// تأثير التوهج على القلوب
const heartIcons = document.querySelectorAll('.fa-heart, .heart-icon');
heartIcons.forEach(heart => {
    setInterval(() => {
        heart.style.filter = 'drop-shadow(0 0 10px rgba(255, 107, 157, 0.8))';
        setTimeout(() => {
            heart.style.filter = 'none';
        }, 500);
    }, 3000);
});

// عداد الحب (مثال تفاعلي)
let loveCounter = 0;
const loveCounterElement = document.createElement('div');
loveCounterElement.style.cssText = `
    position: fixed;
    bottom: 80px;
    left: 20px;
    background: linear-gradient(135deg, #ff6b9d 0%, #ffc93c 100%);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 50px;
    box-shadow: 0 5px 20px rgba(255, 107, 157, 0.4);
    font-weight: bold;
    z-index: 998;
    display: none;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
`;
loveCounterElement.innerHTML = `
    <i class="fas fa-heart"></i>
    <span id="loveCount">0</span>
`;

document.body.appendChild(loveCounterElement);

// إظهار عداد الحب بعد التمرير
window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        loveCounterElement.style.display = 'flex';
    } else {
        loveCounterElement.style.display = 'none';
    }
});

// زيادة عداد الحب عند الضغط
loveCounterElement.addEventListener('click', function() {
    loveCounter++;
    document.getElementById('loveCount').textContent = loveCounter;
    
    this.style.transform = 'scale(1.2)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 200);
    
    // إنشاء تأثير قلوب متطايرة
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createFloatingHeart(this.offsetLeft + this.offsetWidth / 2, this.offsetTop);
        }, i * 50);
    }
});

function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 20px;
        pointer-events: none;
        z-index: 9999;
        animation: floatUp 2s ease forwards;
    `;
    
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
}

const floatUpStyle = document.createElement('style');
floatUpStyle.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-200px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatUpStyle);

// تأثير الطباعة للعنوان الرئيسي
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// تطبيق تأثير الطباعة على العنوان الفرعي في Hero
window.addEventListener('load', function() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 80);
        }, 2000);
    }
});

// معاينة الصور في المعرض (إذا تمت إضافة صور)
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        // يمكن إضافة معاينة الصورة بالحجم الكامل هنا لاحقاً
        console.log('Gallery item clicked');
    });
});

// رسالة ترحيب عند أول زيارة
if (!localStorage.getItem('visited')) {
    setTimeout(() => {
        showNotification('success', 'مرحباً بك في عالم Jasim و Tala! 💕');
        localStorage.setItem('visited', 'true');
    }, 1000);
}

// تغيير لون الخلفية بناءً على الوقت
function updateThemeByTime() {
    const hour = new Date().getHours();
    const body = document.body;
    
    if (hour >= 18 || hour < 6) {
        // وضع ليلي (ألوان أغمق)
        body.style.filter = 'brightness(0.9)';
    } else {
        body.style.filter = 'brightness(1)';
    }
}

updateThemeByTime();

// إضافة موسيقى خلفية اختيارية (معطلة افتراضياً)
function initBackgroundMusic() {
    // يمكن إضافة موسيقى خلفية هنا إذا أراد المستخدم
    // const audio = new Audio('music/romantic.mp3');
    // audio.loop = true;
    // audio.volume = 0.3;
    
    // زر التحكم في الموسيقى
    // const musicBtn = document.createElement('button');
    // musicBtn.innerHTML = '<i class="fas fa-music"></i>';
    // musicBtn.style.cssText = '...';
    // document.body.appendChild(musicBtn);
}

console.log('💕 مرحباً بك في موقع Jasim و Tala - حكاية حب خالدة 💕');