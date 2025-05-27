// 로딩 화면 처리
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.classList.add('hidden');
    }, 1500);
});

// 네비게이션 스크롤 효과
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 모바일 메뉴 토글
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 네비게이션 링크 클릭시 메뉴 닫기
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 부드러운 스크롤
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 음악 재생 컨트롤
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    } else {
        bgMusic.play().catch(error => {
            console.log('자동 재생이 차단되었습니다:', error);
        });
        musicToggle.classList.add('playing');
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
});

// 탭 전환 기능
const tabButtons = document.querySelectorAll('.tab-btn');
const greetingPanels = document.querySelectorAll('.greeting-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // 모든 탭 버튼과 패널 비활성화
        tabButtons.forEach(btn => btn.classList.remove('active'));
        greetingPanels.forEach(panel => panel.classList.remove('active'));
        
        // 클릭한 탭 활성화
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// 캐릭터 다운로드 버튼
const downloadBtn = document.querySelector('.download-btn');
downloadBtn.addEventListener('click', () => {
    window.open('https://drive.proton.me/urls/G4FCT8DDW0#Zcgk1biMDGUX', '_blank');
});

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.8s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 애니메이션을 적용할 요소들
const animateElements = document.querySelectorAll('.profile-card, .example-card, .feature-card, .personality-item, .relationship-card, .location-card, .npc-card, .gallery-item');
animateElements.forEach(el => observer.observe(el));

// 성격 특성 바 애니메이션
const traitBars = document.querySelectorAll('.trait-fill');
const profileSection = document.querySelector('.profile-section');

const traitObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            traitBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
            });
            traitObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

traitObserver.observe(profileSection);

// 갤러리 이미지 모달 (선택사항)
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <img src="${img.src}" alt="${img.alt}">
                <span class="close-modal">&times;</span>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 모달 스타일
        const style = document.createElement('style');
        style.textContent = `
            .image-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                cursor: pointer;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            
            .modal-content img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
            
            .close-modal {
                position: absolute;
                top: -40px;
                right: 0;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                transition: color 0.3s ease;
            }
            
            .close-modal:hover {
                color: var(--accent-color);
            }
        `;
        document.head.appendChild(style);
        
        // 모달 닫기
        modal.addEventListener('click', () => {
            modal.remove();
            style.remove();
        });
    });
});

// 배경 피 입자 효과
function createBloodParticle() {
    const particle = document.createElement('div');
    particle.className = 'blood-particle';
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0;
        left: ${Math.random() * 100}%;
        animation: bloodFall 10s linear;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bloodFall {
            0% {
                transform: translateY(-100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.8;
            }
            90% {
                opacity: 0.8;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('style[data-blood-particle]')) {
        style.setAttribute('data-blood-particle', 'true');
        document.head.appendChild(style);
    }
    
    document.querySelector('.blood-particles').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 10000);
}

// 5초마다 피 입자 생성
setInterval(createBloodParticle, 5000);

// 글리치 효과 강화
const glitchElement = document.querySelector('.glitch');
setInterval(() => {
    glitchElement.style.animation = 'none';
    setTimeout(() => {
        glitchElement.style.animation = '';
    }, 100);
}, 5000);

// 페이지 로드 시 초기 애니메이션
document.addEventListener('DOMContentLoaded', () => {
    // 히어로 섹션 요소들 순차적 등장
    const heroImage = document.querySelector('.hero-image');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroButton = document.querySelector('.download-btn');
    
    const heroElements = [heroImage, heroTitle, heroSubtitle, heroDescription, heroButton];
    
    heroElements.forEach((element, index) => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
});

// 마우스 따라다니는 붉은 그림자 효과 (데스크톱만)
if (window.innerWidth > 768) {
    const shadow = document.createElement('div');
    shadow.className = 'mouse-shadow';
    shadow.style.cssText = `
        position: fixed;
        width: 200px;
        height: 200px;
        background: radial-gradient(circle, rgba(139, 0, 0, 0.3) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        opacity: 0;
    `;
    document.body.appendChild(shadow);
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        shadow.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        shadow.style.opacity = '0';
    });
    
    function animateShadow() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        
        shadow.style.left = currentX + 'px';
        shadow.style.top = currentY + 'px';
        
        requestAnimationFrame(animateShadow);
    }
    
    animateShadow();
} 