// 更新时间的函数
function updateTime() {
    const now = new Date();
    
    // 格式化时间
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // 格式化日期
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    // 更新DOM
    document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;
    document.getElementById('date').textContent = `${year}年${month}月${day}日`;
}

// 每秒更新一次时间
setInterval(updateTime, 1000);
updateTime(); // 初始化时间显示

// 基本粒子特效
class Particle {
    constructor(container) {
        this.container = container;
        this.element = document.createElement('div');
        this.element.className = 'particle';
        
        // 随机大小 (1-3像素)
        this.size = Math.random() * 2 + 1;
        
        // 随机位置
        this.x = Math.random() * 100;
        this.y = Math.random() * 100;
        
        // 随机方向和速度
        this.vx = Math.random() * 0.2 - 0.1;
        this.vy = Math.random() * 0.2 - 0.1;
        
        // 设置样式
        this.element.style.width = `${this.size}px`;
        this.element.style.height = `${this.size}px`;
        this.element.style.opacity = Math.random() * 0.5 + 0.3;
        
        // 添加到容器
        container.appendChild(this.element);
        
        // 开始动画
        this.animate();
    }
    
    animate() {
        const update = () => {
            // 更新位置
            this.x += this.vx;
            this.y += this.vy;
            
            // 边界检查
            if (this.x < 0 || this.x > 100) this.vx = -this.vx;
            if (this.y < 0 || this.y > 100) this.vy = -this.vy;
            
            // 更新DOM
            this.element.style.left = `${this.x}%`;
            this.element.style.top = `${this.y}%`;
            
            // 循环动画
            requestAnimationFrame(update);
        };
        
        update();
    }
}

// 创建粒子
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50; // 粒子数量
    
    for (let i = 0; i < particleCount; i++) {
        new Particle(container);
    }
}

// 页面加载时创建粒子
window.addEventListener('load', createParticles);

// 点击特效设置
function setupClickParticleEffect() {
    document.addEventListener('click', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        // 创建点击粒子效果
        for (let i = 0; i < 8; i++) {
            createClickParticle(x, y);
        }
        
        // 创建波纹效果
        createRippleEffect(x, y);
        
        // 创建第五人格标志
        if (Math.random() > 0.5) {
            createIdentitySymbol(x, y);
        }
    });
}

// 创建点击粒子
function createClickParticle(x, y) {
    const particle = document.createElement('div');
    document.body.appendChild(particle);
    
    // 随机属性
    const size = Math.random() * 10 + 5;
    const vx = Math.random() * 10 - 5;
    const vy = Math.random() * 10 - 5;
    const rotationSpeed = Math.random() * 10 - 5;
    const opacity = 1;
    const color = `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 50)}, ${opacity})`;
    
    // 设置样式
    particle.style.position = 'absolute';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1000';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.transform = 'translate(-50%, -50%)';
    
    // 初始位置和旋转
    let posX = x;
    let posY = y;
    let currRotation = 0;
    
    // 动画函数
    function update() {
        // 更新位置和旋转
        posX += vx;
        posY += vy;
        currRotation += rotationSpeed;
        
        // 应用更新
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.transform = `translate(-50%, -50%) rotate(${currRotation}deg)`;
        
        // 淡出效果
        particle.style.opacity = parseFloat(particle.style.opacity) - 0.02;
        
        // 继续动画或移除
        if (parseFloat(particle.style.opacity) > 0) {
            requestAnimationFrame(update);
        } else {
            particle.remove();
        }
    }
    
    // 开始动画
    requestAnimationFrame(update);
}

// 创建波纹效果
function createRippleEffect(x, y) {
    const ripple = document.createElement('div');
    document.body.appendChild(ripple);
    
    // 应用样式
    ripple.style.position = 'absolute';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = '10px';
    ripple.style.height = '10px';
    ripple.style.borderRadius = '50%';
    ripple.style.border = '2px solid #8a0303';
    ripple.style.transform = 'translate(-50%, -50%) scale(0)';
    ripple.style.opacity = '1';
    ripple.style.transition = 'all 1s ease-out';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '999';
    
    // 触发动画
    setTimeout(() => {
        ripple.style.transform = 'translate(-50%, -50%) scale(10)';
        ripple.style.opacity = '0';
        
        // 移除元素
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }, 10);
}

// 创建第五人格符号
function createIdentitySymbol(x, y) {
    const symbol = document.createElement('div');
    document.body.appendChild(symbol);
    
    // 应用样式
    symbol.style.position = 'absolute';
    symbol.style.left = `${x}px`;
    symbol.style.top = `${y}px`;
    symbol.style.width = '40px';
    symbol.style.height = '40px';
    symbol.style.transform = 'translate(-50%, -50%) scale(0)';
    symbol.style.opacity = '0';
    symbol.style.transition = 'all 0.5s ease-out';
    symbol.style.pointerEvents = 'none';
    symbol.style.zIndex = '999';
    
    // 创建SVG符号
    symbol.innerHTML = `
        <svg viewBox="0 0 100 100" width="100%" height="100%">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#8a0303" stroke-width="5" />
            <path d="M30,50 L70,50 M50,30 L50,70" stroke="#8a0303" stroke-width="5" />
        </svg>
    `;
    
    // 触发动画
    setTimeout(() => {
        symbol.style.transform = 'translate(-50%, -50%) scale(1)';
        symbol.style.opacity = '0.8';
        
        setTimeout(() => {
            symbol.style.transform = 'translate(-50%, -50%) scale(1.2)';
            symbol.style.opacity = '0';
            
            // 移除元素
            setTimeout(() => {
                symbol.remove();
            }, 500);
        }, 1000);
    }, 10);
}

// 修复画面抖动问题 - 协调动画函数
function setupBreathingEffects() {
    const clockFrame = document.querySelector('.clock-frame');
    const time = document.querySelector('.time');
    const date = document.querySelector('.date');
    const quote = document.querySelector('.quote');
    const overlay = document.querySelector('.overlay');
    const background = document.querySelector('.background');
    
    // 移除时钟框架的CSS动画，改为完全由JS控制
    clockFrame.style.animation = 'none';
    
    // 设置背景为固定状态，不再呼吸
    background.style.transform = 'scale(1)';
    
    // 呼吸状态变量
    let frameScale = 1;
    let frameScaleDirection = 1;
    let framePulseSpeed = 0.0005; // 减小速度，避免抖动
    
    let textGlow = 0;
    let textGlowDirection = 1;
    let textGlowSpeed = 0.3;
    
    let overlayOpacity = 0.5;
    let overlayDirection = 1;
    let overlaySpeed = 0.0007;
    
    // 存储鼠标移动状态
    let mouseX = 0;
    let mouseY = 0;
    let isMouseIn = false;
    
    // 主动画循环函数 - 整合所有动画到一个循环中
    function animateAll() {
        // 1. 时钟框架呼吸效果
        frameScale += framePulseSpeed * frameScaleDirection;
        if (frameScale >= 1.03) {
            frameScale = 1.03;
            frameScaleDirection = -1;
        } else if (frameScale <= 0.97) {
            frameScale = 0.97;
            frameScaleDirection = 1;
        }
        
        // 结合鼠标点击状态和呼吸效果
        let finalFrameScale = frameScale;
        if (isMouseDown) {
            finalFrameScale *= 0.98; // 如果鼠标按下，额外缩小
        }
        
        // 2. 文字发光呼吸效果
        textGlow += textGlowSpeed * textGlowDirection;
        if (textGlow >= 12) {
            textGlow = 12;
            textGlowDirection = -1;
        } else if (textGlow <= 0) {
            textGlow = 0;
            textGlowDirection = 1;
        }
        
        // 3. 背景光晕呼吸效果
        overlayOpacity += overlaySpeed * overlayDirection;
        if (overlayOpacity >= 0.7) {
            overlayOpacity = 0.7;
            overlayDirection = -1;
        } else if (overlayOpacity <= 0.4) {
            overlayOpacity = 0.4;
            overlayDirection = 1;
        }
        
        // 应用所有变换
        
        // 对时钟框架应用变换 - 结合呼吸和鼠标效果
        if (isMouseIn) {
            // 当鼠标在屏幕内时，添加鼠标位置引起的旋转效果
            const xRelative = mouseX / window.innerWidth * 2 - 1;
            const yRelative = mouseY / window.innerHeight * 2 - 1;
            clockFrame.style.transform = `scale(${finalFrameScale}) rotateY(${xRelative * 1.5}deg) rotateX(${yRelative * -1.5}deg)`;
        } else {
            // 当鼠标不在屏幕内时，只有呼吸效果
            clockFrame.style.transform = `scale(${finalFrameScale})`;
        }
        
        // 应用文字发光效果
        time.style.textShadow = `0 0 ${textGlow}px rgba(211, 199, 166, 0.9)`;
        date.style.textShadow = `0 0 ${textGlow * 0.6}px rgba(211, 199, 166, 0.8)`;
        quote.style.textShadow = `0 0 ${textGlow * 0.8}px rgba(211, 199, 166, 0.9)`;
        
        // 应用背景光晕效果，但不再应用背景缩放
        overlay.style.opacity = overlayOpacity;
        
        // 继续动画循环
        requestAnimationFrame(animateAll);
    }
    
    // 跟踪鼠标状态
    let isMouseDown = false;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseIn = true;
    });
    
    document.addEventListener('mouseleave', () => {
        isMouseIn = false;
    });
    
    document.addEventListener('mousedown', () => {
        isMouseDown = true;
    });
    
    document.addEventListener('mouseup', () => {
        isMouseDown = false;
    });
    
    // 启动动画循环
    animateAll();
    
    // 创建浮动粒子
    const particlesContainer = document.querySelector('.particles-container');
    const particleCount = 15; // 减少粒子数量以提高性能
    
    for (let i = 0; i < particleCount; i++) {
        createFloatingParticle(particlesContainer);
    }
}

// 移除独立的视差效果，整合到统一动画中
function setupParallaxEffect() {
    const container = document.querySelector('.container');
    
    // 创建光照效果元素
    const lightEffect = document.createElement('div');
    lightEffect.className = 'light-effect';
    container.appendChild(lightEffect);
    
    // 鼠标移动事件 - 只控制光照效果
    document.addEventListener('mousemove', (e) => {
        // 光照效果，减少范围
        lightEffect.style.background = `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, 
            rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.4) 35%)`;
        lightEffect.style.opacity = '0.5';
    });
    
    // 当鼠标离开窗口
    document.addEventListener('mouseleave', () => {
        lightEffect.style.opacity = '0';
    });
}

// 修改大型浮动粒子函数，缩小尺寸效果
function createFloatingParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    
    // 缩小粒子尺寸 (5-15像素)
    const size = Math.random() * 10 + 5;
    
    // 随机位置
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // 随机颜色 (金色调)，降低亮度
    const hue = 35 + Math.random() * 10; // 金色范围
    const saturation = 70 + Math.random() * 20; // 降低饱和度
    const lightness = 60 + Math.random() * 20; // 降低亮度
    const color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.4)`; // 降低不透明度
    
    // 随机浮动周期 (10-18秒)，减慢速度
    const floatDuration = 10 + Math.random() * 8;
    
    // 设置样式
    particle.style.position = 'absolute';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.borderRadius = '50%';
    // 减弱发光效果
    particle.style.boxShadow = `0 0 ${size/2}px ${color}`;
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    particle.style.opacity = '0';
    
    // 添加到容器
    container.appendChild(particle);
    
    // 自定义呼吸动画，降低效果
    const breatheDuration = 3 + Math.random() * 4; // 3-7秒，减慢呼吸
    particle.style.animation = `
        floatParticle ${floatDuration}s infinite ease-in-out,
        breatheParticle ${breatheDuration}s infinite ease-in-out
    `;
    
    // 随机初始动画状态，使粒子不同步
    particle.style.animationDelay = `-${Math.random() * floatDuration}s, -${Math.random() * breatheDuration}s`;
    
    // 缩小浮动距离
    const floatX = (Math.random() * 40 - 20); // -20到20%
    const floatY = (Math.random() * 40 - 20); // -20到20%
    
    // 应用自定义浮动属性
    particle.style.setProperty('--float-x', `${floatX}px`);
    particle.style.setProperty('--float-y', `${floatY}px`);
}

// 修改彩蛋交互功能，更改猎人彩蛋触发方式
function setupEasterEggs() {
    // 修改为监管者彩蛋触发时间为3秒
    let hunterHoverTimer = null;
    let hunterHoverDuration = 0;
    const hunterTriggerTime = 3000; // 从5000改为3000
    
    // 添加时钟悬停事件
    const timeElement = document.querySelector('.time');
    
    // 确保悬停指示器存在
    const hoverIndicator = document.createElement('div');
    hoverIndicator.className = 'hover-indicator';
    hoverIndicator.style.position = 'absolute';
    hoverIndicator.style.bottom = '-10px';
    hoverIndicator.style.left = '0';
    hoverIndicator.style.width = '0%';
    hoverIndicator.style.height = '3px';
    hoverIndicator.style.backgroundColor = '#ff0000';
    hoverIndicator.style.transition = 'width 0.1s linear';
    hoverIndicator.style.opacity = '0';
    hoverIndicator.style.boxShadow = '0 0 5px #ff0000';
    
    if (timeElement) {
        if (timeElement.querySelector('.hover-indicator') === null) {
            timeElement.style.position = 'relative';
            timeElement.appendChild(hoverIndicator);
        }
        
        // 鼠标悬停开始计时
        timeElement.addEventListener('mouseenter', () => {
            hunterHoverDuration = 0;
            hoverIndicator.style.opacity = '1';
            
            // 开始计时
            if (hunterHoverTimer) clearInterval(hunterHoverTimer);
            
            hunterHoverTimer = setInterval(() => {
                hunterHoverDuration += 100;
                const progress = (hunterHoverDuration / hunterTriggerTime) * 100;
                hoverIndicator.style.width = `${progress}%`;
                
                // 进度接近时增加心跳效果
                if (progress > 70) {
                    // 添加预警效果
                    timeElement.classList.add('pre-hunter-trigger');
                    document.body.style.transform = `scale(${1 + (Math.sin(Date.now() / 200) * 0.005)})`;
                    
                    // 数字开始轻微扭曲
                    timeElement.style.transform = `translate(${(Math.random() - 0.5) * 3}px, ${(Math.random() - 0.5) * 2}px)`;
                    
                    // 增加轻微的屏幕震动
                    if (Math.random() > 0.7) {
                        document.body.style.transform = `scale(1) translate(${(Math.random() - 0.5) * 3}px, ${(Math.random() - 0.5) * 3}px)`;
                    }
                }
                
                // 达到触发时间
                if (hunterHoverDuration >= hunterTriggerTime) {
                    clearInterval(hunterHoverTimer);
                    hunterHoverTimer = null;
                    
                    // 高级数字变形特效
                    triggerAdvancedHunterEffect();
                    
                    // 重置指示器
                    hoverIndicator.style.opacity = '0';
                    hoverIndicator.style.width = '0%';
                    timeElement.classList.remove('pre-hunter-trigger');
                }
            }, 100);
        });
        
        // 鼠标移出取消
        timeElement.addEventListener('mouseleave', () => {
            if (hunterHoverTimer) {
                clearInterval(hunterHoverTimer);
                hunterHoverTimer = null;
            }
            
            // 重置
            hunterHoverDuration = 0;
            hoverIndicator.style.opacity = '0';
            hoverIndicator.style.width = '0%';
            document.body.style.transform = 'scale(1)';
            timeElement.style.transform = 'none';
            timeElement.classList.remove('pre-hunter-trigger');
        });
    }
}

// 添加高级猎人触发效果，特别强化数字失真
function triggerAdvancedHunterEffect() {
    console.log("Enhanced Hunter Mode activated!");
    
    // 获取需要操作的元素
    const time = document.querySelector('.time');
    const container = document.querySelector('.container');
    const quote = document.querySelector('.quote');
    
    // 保存原始状态
    const originalTimeText = time.textContent;
    const originalQuoteText = quote.textContent;
    
    // 1. 强力的数字扭曲效果
    time.classList.add('time-distortion');
    
    // 2. 启动数字疯狂变化 - 使用随机符号和数字
    const possibleChars = '01234567890!@#$%^&*[]{}|\\/?><~`';
    let glitchInterval = setInterval(() => {
        // 长度变化
        const length = Math.floor(Math.random() * 4) + 4;
        let newTime = '';
        
        // 创建随机字符序列
        for (let i = 0; i < length; i++) {
            newTime += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
            
            // 随机插入分隔符
            if (i < length - 1 && Math.random() > 0.6) {
                newTime += possibleChars.charAt(Math.floor(Math.random() * 3) + 10); // 使用特殊符号做分隔
            }
        }
        
        time.textContent = newTime;
    }, 100);
    
    // 3. 添加强烈的心跳和震动效果
    // 此处重用已有的情绪恐怖效果代码，但添加更强烈的震动
    
    // 修改引言
    quote.textContent = "他注视着你...";
    quote.style.color = '#eee';
    quote.style.textShadow = '0 0 10px rgba(255, 0, 0, 0.7)';
    
    // 强烈的背景震动
    let shakeIntensity = 0;
    const maxShake = 20;
    const shakeInterval = setInterval(() => {
        shakeIntensity = Math.min(shakeIntensity + 1, maxShake);
        const intensity = shakeIntensity;
        
        const offsetX = (Math.random() - 0.5) * intensity;
        const offsetY = (Math.random() - 0.5) * intensity;
        const rotation = (Math.random() - 0.5) * intensity / 10;
        
        container.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotation}deg)`;
    }, 50);
    
    // 添加杂音效果
    const staticNoise = document.createElement('div');
    staticNoise.className = 'static-noise';
    staticNoise.style.position = 'fixed';
    staticNoise.style.top = '0';
    staticNoise.style.left = '0';
    staticNoise.style.width = '100%';
    staticNoise.style.height = '100%';
    staticNoise.style.backgroundImage = 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC43IiBudW1PY3RhdmVzPSI1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIj48L2ZlVHVyYnVsZW5jZT48ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIj48L2ZlQ29sb3JNYXRyaXg+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMC40Ij48L3JlY3Q+PC9zdmc+")';
    staticNoise.style.pointerEvents = 'none';
    staticNoise.style.zIndex = '9996';
    staticNoise.style.opacity = '0';
    staticNoise.style.transition = 'opacity 1s ease';
    document.body.appendChild(staticNoise);
    
    setTimeout(() => {
        staticNoise.style.opacity = '0.3';
    }, 200);
    
    // 创建闪烁效果
    let hasFlashed = false;
    const flashInterval = setInterval(() => {
        if (!hasFlashed && Math.random() > 0.7) {
            container.style.filter = 'brightness(1.5) contrast(1.2)';
            
            // 随机反转颜色
            if (Math.random() > 0.8) {
                document.body.style.filter = 'invert(100%)';
            }
            
            hasFlashed = true;
            setTimeout(() => {
                container.style.filter = '';
                document.body.style.filter = '';
                hasFlashed = false;
            }, 100);
        }
    }, 300);
    
    // 一段时间后恢复正常
    setTimeout(() => {
        // 停止所有效果
        clearInterval(glitchInterval);
        clearInterval(shakeInterval);
        clearInterval(flashInterval);
        
        // 恢复原样
        time.classList.remove('time-distortion');
        time.textContent = originalTimeText;
        quote.textContent = originalQuoteText;
        quote.style.color = '';
        quote.style.textShadow = '';
        container.style.transform = '';
        container.style.filter = '';
        document.body.style.filter = '';
        
        // 删除噪点
        if (staticNoise) {
            staticNoise.style.opacity = '0';
            setTimeout(() => staticNoise.remove(), 1000);
        }
    }, 8000);
}

// 修复绘图识别函数，解决V形绘制问题
function setupDrawingRecognition() {
    // 轨迹点数组
    let points = [];
    let isDrawing = false;
    
    // 创建轨迹可视化容器
    const drawingContainer = document.createElement('div');
    drawingContainer.className = 'drawing-container';
    drawingContainer.style.position = 'fixed';
    drawingContainer.style.top = '0';
    drawingContainer.style.left = '0';
    drawingContainer.style.width = '100%';
    drawingContainer.style.height = '100%';
    drawingContainer.style.pointerEvents = 'none';
    drawingContainer.style.zIndex = '10000'; // 提高z-index确保在最上层
    document.body.appendChild(drawingContainer);
    
    // 创建轨迹路径
    const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    pathElement.setAttribute('width', '100%');
    pathElement.setAttribute('height', '100%');
    pathElement.style.position = 'absolute';
    pathElement.style.top = '0';
    pathElement.style.left = '0';
    pathElement.style.pointerEvents = 'none';
    drawingContainer.appendChild(pathElement);
    
    // 创建路径元素
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('stroke', 'rgba(211, 199, 166, 0.8)'); // 增加不透明度
    path.setAttribute('stroke-width', '4'); // 增加线宽
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    pathElement.appendChild(path);
    
    // 重要：防止绘图时触发其他点击事件
    document.addEventListener('mousedown', handleMouseDown, true);
    document.addEventListener('mousemove', handleMouseMove, true);
    document.addEventListener('mouseup', handleMouseUp, true);
    
    // 鼠标按下处理函数
    function handleMouseDown(e) {
        // 重置
        points = [];
        isDrawing = true;
        
        // 记录初始点
        points.push({x: e.clientX, y: e.clientY});
        
        // 开始绘制路径
        path.setAttribute('d', `M${e.clientX},${e.clientY}`);
        
        // 显示路径
        drawingContainer.style.opacity = '1';
        
        // 避免触发其他元素的点击事件，特别是当用户尝试画V时
        if (points.length > 0) {
            e.stopPropagation();
        }
    }
    
    // 鼠标移动处理函数
    function handleMouseMove(e) {
        if (!isDrawing) return;
        
        // 记录点
        points.push({x: e.clientX, y: e.clientY});
        
        // 更新路径
        let d = path.getAttribute('d');
        d += ` L${e.clientX},${e.clientY}`;
        path.setAttribute('d', d);
        
        // 防止事件冒泡
        e.stopPropagation();
        e.preventDefault();
    }
    
    // 鼠标松开处理函数
    function handleMouseUp(e) {
        if (!isDrawing) return;
        isDrawing = false;
        
        // 分析路径是否是V字形
        if (points.length >= 10 && isVShape(points)) {
            // 触发求生者彩蛋
            triggerSurvivorEasterEgg();
            console.log("V形状检测成功！");
        } else if (points.length >= 10) {
            console.log("绘制了形状，但不是V形");
        }
        
        // 淡出路径
        drawingContainer.style.opacity = '0';
        
        // 延迟重置路径
        setTimeout(() => {
            path.setAttribute('d', '');
        }, 500);
        
        // 防止事件冒泡
        e.stopPropagation();
    }
    
    // 检测是否是V字形 (简化判断条件)
    function isVShape(points) {
        if (points.length < 10) return false; // 太少的点不可能形成V
        
        // 简化的V形检测 - 更宽松的标准
        // 1. 计算起点、终点和中间点
        const startPoint = points[0];
        const endPoint = points[points.length - 1];
        const middleIndex = Math.floor(points.length / 2);
        const middlePoints = points.slice(middleIndex - 3, middleIndex + 4);
        
        // 2. 找到中间最低点 (Y坐标最大的点)
        let lowestPoint = middlePoints[0];
        for (let pt of middlePoints) {
            if (pt.y > lowestPoint.y) {
                lowestPoint = pt;
            }
        }
        
        // 3. 简单检测: 中间点应该比起点和终点低(Y坐标更大)
        const isMiddleLowest = lowestPoint.y > startPoint.y && lowestPoint.y > endPoint.y;
        
        // 4. 检测路径的大致方向变化
        let directionChanges = 0;
        let lastDirection = null;
        
        for (let i = 1; i < points.length; i++) {
            const dx = points[i].x - points[i-1].x;
            // 忽略小的水平移动
            if (Math.abs(dx) < 3) continue;
            
            const currentDirection = dx > 0 ? 'right' : 'left';
            
            if (lastDirection !== null && currentDirection !== lastDirection) {
                directionChanges++;
                lastDirection = currentDirection;
            } else if (lastDirection === null) {
                lastDirection = currentDirection;
            }
        }
        
        // V形至少应该有一次方向变化
        return isMiddleLowest && directionChanges >= 1;
    }
}

// 重新设计求生者彩蛋为沉浸式心理恐怖体验
function triggerSurvivorEasterEgg() {
    console.log("Enhanced Survivor Mode activated!");
    const container = document.querySelector('.container');
    const quote = document.querySelector('.quote');
    const time = document.querySelector('.time');
    const date = document.querySelector('.date');
    const clockFrame = document.querySelector('.clock-frame');
    
    // 存储原始状态
    const originalQuote = quote.textContent;
    const originalTime = time.textContent;
    const originalDate = date.textContent;
    
    // 1. 蓝灰色调滤镜效果
    document.body.classList.add('survivor-mode-psychological');
    
    // 2. 添加CRT屏幕效果
    const crtOverlay = document.createElement('div');
    crtOverlay.className = 'crt-overlay';
    crtOverlay.style.position = 'fixed';
    crtOverlay.style.top = '0';
    crtOverlay.style.left = '0';
    crtOverlay.style.width = '100%';
    crtOverlay.style.height = '100%';
    crtOverlay.style.background = 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.02))';
    crtOverlay.style.backgroundSize = '100% 2px, 3px 100%';
    crtOverlay.style.pointerEvents = 'none';
    crtOverlay.style.zIndex = '9993';
    crtOverlay.style.opacity = '0';
    crtOverlay.style.animation = 'crtFlicker 0.15s infinite';
    document.body.appendChild(crtOverlay);
    
    // 淡入CRT效果
    setTimeout(() => {
        crtOverlay.style.opacity = '1';
        crtOverlay.style.transition = 'opacity 1s ease';
    }, 200);
    
    // 3. 添加CCTV边框和录像指示器
    clockFrame.style.border = '3px solid rgba(11, 107, 173, 0.7)';
    clockFrame.style.boxShadow = '0 0 15px rgba(11, 107, 173, 0.5)';
    
    const cctvLabel = document.createElement('div');
    cctvLabel.className = 'cctv-label';
    cctvLabel.textContent = 'REC';
    cctvLabel.style.position = 'absolute';
    cctvLabel.style.top = '10px';
    cctvLabel.style.right = '10px';
    cctvLabel.style.color = '#ff3333';
    cctvLabel.style.fontFamily = 'monospace';
    cctvLabel.style.fontSize = '12px';
    cctvLabel.style.padding = '2px 5px';
    cctvLabel.style.borderRadius = '2px';
    cctvLabel.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    cctvLabel.style.animation = 'blink 1s infinite';
    clockFrame.appendChild(cctvLabel);
    
    // 4. 添加机械打字式文本变化效果
    quote.innerHTML = '';
    const typewriterTexts = [
        "监控记录-3.5小时前",
        "被发现...需要隐藏...",
        "不能被他看见...记住密码...",
        "解锁安全出口...78-14-93...",
        "有人在监视...它来了..."
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    const typewriterSound = new Audio('data:audio/wav;base64,UklGRl9bQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YTta');
    typewriterSound.volume = 0.1;
    
    function typeText() {
        if (textIndex < typewriterTexts.length) {
            if (charIndex === 0) {
                quote.innerHTML = '';
            }
            
            if (charIndex < typewriterTexts[textIndex].length) {
                if (Math.random() > 0.9) {
                    // 模拟打字错误及修正
                    const randomChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
                    quote.innerHTML += `<span class="error-char">${randomChar}</span>`;
                    
                    setTimeout(() => {
                        const errorChar = quote.querySelector('.error-char');
                        if (errorChar) errorChar.remove();
                        quote.innerHTML += typewriterTexts[textIndex].charAt(charIndex);
                        charIndex++;
                        // 打字声效
                        if (Math.random() > 0.7) {
                            typewriterSound.currentTime = 0;
                            typewriterSound.play().catch(e => console.log("Audio play failed:", e));
                        }
                        setTimeout(typeText, Math.random() * 150 + 50);
                    }, 200);
                } else {
                    quote.innerHTML += typewriterTexts[textIndex].charAt(charIndex);
                    charIndex++;
                    // 打字声效
                    if (Math.random() > 0.7) {
                        typewriterSound.currentTime = 0;
                        typewriterSound.play().catch(e => console.log("Audio play failed:", e));
                    }
                    setTimeout(typeText, Math.random() * 150 + 50);
                }
            } else {
                textIndex++;
                charIndex = 0;
                setTimeout(typeText, 1500);
            }
        }
    }
    
    setTimeout(typeText, 800);
    
    // 5. 添加心跳效果
    const heartbeatContainer = document.createElement('div');
    heartbeatContainer.className = 'heartbeat-container';
    heartbeatContainer.style.position = 'fixed';
    heartbeatContainer.style.top = '0';
    heartbeatContainer.style.left = '0';
    heartbeatContainer.style.width = '100%';
    heartbeatContainer.style.height = '100%';
    heartbeatContainer.style.backgroundColor = 'rgba(11, 107, 173, 0)';
    heartbeatContainer.style.zIndex = '9992';
    heartbeatContainer.style.pointerEvents = 'none';
    document.body.appendChild(heartbeatContainer);
    
    let heartbeatIntensity = 0;
    let heartbeatInterval = setInterval(() => {
        heartbeatIntensity = (heartbeatIntensity + 1) % 8;
        
        // 模拟心跳, 两次快速脉冲
        if (heartbeatIntensity === 0 || heartbeatIntensity === 1) {
            heartbeatContainer.style.backgroundColor = 'rgba(11, 107, 173, 0.2)';
            // 微小的屏幕缩放
            document.body.style.transform = 'scale(1.005)';
        } else if (heartbeatIntensity === 2) {
            heartbeatContainer.style.backgroundColor = 'rgba(11, 107, 173, 0)';
            document.body.style.transform = 'scale(1)';
        } else if (heartbeatIntensity === 3) {
            heartbeatContainer.style.backgroundColor = 'rgba(11, 107, 173, 0.25)';
            document.body.style.transform = 'scale(1.007)';
        } else {
            heartbeatContainer.style.backgroundColor = 'rgba(11, 107, 173, 0)';
            document.body.style.transform = 'scale(1)';
        }
    }, 300);
    
    // 6. 摄像头监视效果
    const surveillanceElements = [];
    for (let i = 0; i < 3; i++) {
        // 创建监视标记
        setTimeout(() => {
            const marker = document.createElement('div');
            marker.className = 'surveillance-marker';
            marker.style.position = 'absolute';
            marker.style.width = '30px';
            marker.style.height = '30px';
            marker.style.border = '2px solid rgba(11, 107, 173, 0.8)';
            marker.style.borderRadius = '50%';
            marker.style.boxShadow = '0 0 10px rgba(11, 107, 173, 0.6)';
            marker.style.opacity = '0';
            marker.style.transition = 'all 0.5s ease';
            marker.style.zIndex = '9991';
            
            // 随机位置
            const posX = 10 + Math.random() * 80;
            const posY = 10 + Math.random() * 80;
            marker.style.left = `${posX}%`;
            marker.style.top = `${posY}%`;
            
            // 添加扫描线动画
            const scanline = document.createElement('div');
            scanline.className = 'scanline';
            scanline.style.position = 'absolute';
            scanline.style.width = '100%';
            scanline.style.height = '2px';
            scanline.style.backgroundColor = 'rgba(11, 107, 173, 0.8)';
            scanline.style.top = '50%';
            scanline.style.animation = 'scanMove 2s infinite';
            marker.appendChild(scanline);
            
            const idTag = document.createElement('div');
            idTag.className = 'id-tag';
            idTag.textContent = `ID-${Math.floor(Math.random() * 9000) + 1000}`;
            idTag.style.position = 'absolute';
            idTag.style.top = '-20px';
            idTag.style.left = '50%';
            idTag.style.transform = 'translateX(-50%)';
            idTag.style.color = 'rgba(11, 107, 173, 0.8)';
            idTag.style.fontSize = '10px';
            idTag.style.fontFamily = 'monospace';
            marker.appendChild(idTag);
            
            container.appendChild(marker);
            surveillanceElements.push(marker);
            
            // 显示标记
            setTimeout(() => {
                marker.style.opacity = '1';
            }, 100);
            
            // 定期闪烁
            setInterval(() => {
                if (Math.random() > 0.7) {
                    marker.style.opacity = '0.2';
                    setTimeout(() => {
                        marker.style.opacity = '1';
                    }, 100);
                }
            }, 2000);
        }, i * 2000);
    }
    
    // 7. 时间编码效果
    const timeDisplay = document.createElement('div');
    timeDisplay.className = 'time-display';
    timeDisplay.style.position = 'absolute';
    timeDisplay.style.bottom = '10px';
    timeDisplay.style.right = '10px';
    timeDisplay.style.color = 'rgba(11, 107, 173, 0.8)';
    timeDisplay.style.fontFamily = 'monospace';
    timeDisplay.style.fontSize = '12px';
    timeDisplay.style.zIndex = '9991';
    
    const timecodeInterval = setInterval(() => {
        const now = new Date();
        const timecode = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(now.getMilliseconds()).substring(0, 2).padStart(2, '0')}`;
        timeDisplay.textContent = timecode;
    }, 50);
    
    clockFrame.appendChild(timeDisplay);
    
    // 8. 间歇性画面干扰
    function createInterference() {
        if (Math.random() > 0.7) {
            // 主要干扰效果
            document.body.classList.add('interference');
            crtOverlay.style.opacity = '0.8';
            
            // 随机位移
            container.style.transform = `translateX(${(Math.random() - 0.5) * 10}px)`;
            
            // 模糊效果
            document.body.style.filter = 'blur(2px)';
            
            // 随机时间后恢复
            setTimeout(() => {
                document.body.classList.remove('interference');
                crtOverlay.style.opacity = '1';
                container.style.transform = 'translateX(0)';
                document.body.style.filter = '';
            }, Math.random() * 200 + 100);
        }
    }
    
    const interferenceInterval = setInterval(createInterference, 3000);
    
    // 9. 恢复正常
    setTimeout(() => {
        // 清除所有效果
        document.body.classList.remove('survivor-mode-psychological');
        clearInterval(heartbeatInterval);
        clearInterval(timecodeInterval);
        clearInterval(interferenceInterval);
        
        // 恢复原始状态
        quote.textContent = originalQuote;
        time.textContent = originalTime;
        date.textContent = originalDate;
        clockFrame.style.border = '';
        clockFrame.style.boxShadow = '';
        document.body.style.transform = 'scale(1)';
        
        // 移除所有添加的元素
        if (crtOverlay) crtOverlay.remove();
        if (heartbeatContainer) heartbeatContainer.remove();
        if (cctvLabel) cctvLabel.remove();
        if (timeDisplay) timeDisplay.remove();
        
        surveillanceElements.forEach(el => el.remove());
    }, 15000);
}

// 重新实现鼠标拖尾特效
function setupMouseTrailEffect() {
    let lastX = 0;
    let lastY = 0;
    let trailPointsCount = 0;
    
    // 创建拖尾容器
    const trailContainer = document.createElement('div');
    trailContainer.className = 'mouse-trail-container';
    trailContainer.style.position = 'fixed';
    trailContainer.style.top = '0';
    trailContainer.style.left = '0';
    trailContainer.style.width = '100%';
    trailContainer.style.height = '100%';
    trailContainer.style.pointerEvents = 'none';
    trailContainer.style.zIndex = '9999';
    document.body.appendChild(trailContainer);
    
    // 配置
    const emitDelay = 20; // 粒子生成延迟(毫秒)
    const maxTrailPoints = 15; // 最大拖尾点数量
    
    // 跟踪鼠标移动
    let lastEmitTime = 0;
    
    // 使用专门的事件处理函数，避免与其他功能冲突
    document.addEventListener('mousemove', handleMouseMove);
    
    function handleMouseMove(e) {
        const currentTime = Date.now();
        
        // 控制粒子生成频率
        if (currentTime - lastEmitTime > emitDelay) {
            lastEmitTime = currentTime;
            
            // 计算移动速度 - 用于调整粒子大小
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
            const speed = Math.sqrt(dx * dx + dy * dy);
            
            // 只有鼠标移动时才创建拖尾
            if (speed > 0) {
                // 创建拖尾粒子
                createTrailPoint(e.clientX, e.clientY, speed);
                
                // 更新位置
                lastX = e.clientX;
                lastY = e.clientY;
                
                // 控制粒子数量
                trailPointsCount++;
                if (trailPointsCount > maxTrailPoints) {
                    // 移除最早的粒子
                    if (trailContainer.firstChild) {
                        trailContainer.removeChild(trailContainer.firstChild);
                        trailPointsCount--;
                    }
                }
            }
        }
    }
    
    // 创建拖尾点
    function createTrailPoint(x, y, speed) {
        const point = document.createElement('div');
        point.className = 'trail-point';
        
        // 根据速度调整尺寸 (3-10px)
        const size = Math.min(10, Math.max(3, speed / 5));
        
        // 随机颜色 (金色系列)
        const hue = 35 + Math.random() * 10; // 金色范围
        const saturation = 80 + Math.random() * 10;
        const lightness = 60 + Math.random() * 20;
        const color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`;
        
        // 设置样式
        point.style.width = `${size}px`;
        point.style.height = `${size}px`;
        point.style.backgroundColor = color;
        point.style.left = `${x}px`;
        point.style.top = `${y}px`;
        point.style.boxShadow = `0 0 ${size * 1.5}px ${color}`;
        point.style.position = 'absolute';
        point.style.borderRadius = '50%';
        point.style.transform = 'translate(-50%, -50%) scale(1)';
        point.style.opacity = '0.8';
        point.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        
        // 添加到容器
        trailContainer.appendChild(point);
        
        // 淡出动画
        setTimeout(() => {
            point.style.opacity = '0';
            point.style.transform = 'translate(-50%, -50%) scale(0.5)';
            
            // 移除DOM
            setTimeout(() => {
                if (point.parentNode === trailContainer) {
                    trailContainer.removeChild(point);
                    trailPointsCount--;
                }
            }, 500);
        }, 10);
    }
}

// 添加电影风格视觉效果
function setupCinematicEffects() {
    // 1. 创建胶片颗粒效果
    const filmGrain = document.createElement('div');
    filmGrain.className = 'film-grain';
    document.body.appendChild(filmGrain);
    
    // 2. 创建扫描线效果
    const scanLines = document.createElement('div');
    scanLines.className = 'scan-lines';
    document.body.appendChild(scanLines);
    
    // 3. 添加信号干扰效果
    const signalInterference = document.createElement('div');
    signalInterference.className = 'signal-interference';
    document.body.appendChild(signalInterference);
    
    // 定期随机触发信号干扰
    setInterval(() => {
        // 大约每15-30秒随机触发一次干扰
        if (Math.random() < 0.05) {
            triggerSignalInterference();
        }
    }, 3000);
    
    // 信号干扰效果
    function triggerSignalInterference() {
        // 确定干扰持续时间 (0.5-2秒)
        const duration = Math.random() * 1500 + 500;
        
        // 激活干扰
        signalInterference.style.opacity = '1';
        
        // 随机扭曲效果
        document.body.classList.add('light-distortion');
        
        // 短暂的屏幕抖动
        const container = document.querySelector('.container');
        const originalTransform = container.style.transform;
        
        // 创建抖动效果
        let shakeCount = 0;
        const maxShakes = Math.floor(duration / 100);
        
        const shakeInterval = setInterval(() => {
            if (shakeCount > maxShakes) {
                clearInterval(shakeInterval);
                container.style.transform = originalTransform;
                return;
            }
            
            // 随机位移
            const offsetX = (Math.random() - 0.5) * 10;
            const offsetY = (Math.random() - 0.5) * 5;
            container.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            
            shakeCount++;
        }, 50);
        
        // 结束干扰
        setTimeout(() => {
            signalInterference.style.opacity = '0';
            document.body.classList.remove('light-distortion');
            container.style.transform = originalTransform;
        }, duration);
    }
    
    // 优化背景暗角
    const overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.style.background = 'radial-gradient(circle at center, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 40%, rgba(0, 0, 0, 0.8) 80%)';
    }
    
    // 调整背景亮度
    const background = document.querySelector('.background');
    if (background) {
        background.style.filter = 'brightness(0.7) contrast(1.4) saturate(0.8)';
    }
}

// 添加密码解谜功能
function setupSecretCode() {
    // 密码收集系统
    let collectedDigits = [];
    const secretCode = ['7', '8', '1', '4', '9', '3']; // 对应求生者彩蛋提示的密码
    
    // 监听数字键输入
    document.addEventListener('keydown', (e) => {
        // 检查是否是数字键
        if (/^[0-9]$/.test(e.key)) {
            collectedDigits.push(e.key);
            
            // 显示输入反馈
            showDigitFeedback(e.key);
            
            // 保持最多6位数字
            if (collectedDigits.length > 6) {
                collectedDigits.shift();
            }
            
            // 检查是否匹配密码
            checkSecretCode();
        }
    });
    
    // 显示输入反馈
    function showDigitFeedback(digit) {
        const feedback = document.createElement('div');
        feedback.className = 'digit-feedback';
        feedback.textContent = digit;
        feedback.style.position = 'fixed';
        feedback.style.top = '10%';
        feedback.style.left = '50%';
        feedback.style.transform = 'translateX(-50%)';
        feedback.style.color = '#4d9be6';
        feedback.style.fontSize = '24px';
        feedback.style.fontFamily = 'monospace';
        feedback.style.opacity = '0';
        feedback.style.transition = 'all 0.5s ease';
        feedback.style.zIndex = '9999';
        feedback.style.textShadow = '0 0 10px rgba(77, 155, 230, 0.8)';
        document.body.appendChild(feedback);
        
        // 淡入淡出动画
        setTimeout(() => {
            feedback.style.opacity = '1';
            setTimeout(() => {
                feedback.style.opacity = '0';
                setTimeout(() => feedback.remove(), 500);
            }, 1000);
        }, 10);
    }
    
    // 检查密码是否匹配
    function checkSecretCode() {
        // 检查末尾是否匹配
        if (collectedDigits.length >= 6) {
            const lastSix = collectedDigits.slice(-6);
            let isMatch = true;
            
            for (let i = 0; i < 6; i++) {
                if (lastSix[i] !== secretCode[i]) {
                    isMatch = false;
                    break;
                }
            }
            
            if (isMatch) {
                triggerEscapeSuccess();
                collectedDigits = []; // 重置
            }
        }
    }
    
    // 触发逃脱成功彩蛋
    function triggerEscapeSuccess() {
        console.log("Escape Success Mode activated!");
        // 这里可以实现一个新的彩蛋效果
        const container = document.querySelector('.container');
        const quote = document.querySelector('.quote');
        
        // 显示成功消息
        quote.textContent = "密码正确，安全出口已开启...";
        
        // 闪烁绿光效果
        const escapeEffect = document.createElement('div');
        escapeEffect.className = 'escape-success';
        escapeEffect.style.position = 'fixed';
        escapeEffect.style.top = '0';
        escapeEffect.style.left = '0';
        escapeEffect.style.width = '100%';
        escapeEffect.style.height = '100%';
        escapeEffect.style.backgroundColor = 'rgba(0, 255, 0, 0)';
        escapeEffect.style.transition = 'background-color 0.5s ease';
        escapeEffect.style.zIndex = '9990';
        escapeEffect.style.pointerEvents = 'none';
        document.body.appendChild(escapeEffect);
        
        // 闪烁效果
        setTimeout(() => {
            escapeEffect.style.backgroundColor = 'rgba(0, 255, 0, 0.3)';
            setTimeout(() => {
                escapeEffect.style.backgroundColor = 'rgba(0, 255, 0, 0)';
                setTimeout(() => {
                    escapeEffect.style.backgroundColor = 'rgba(0, 255, 0, 0.3)';
                    setTimeout(() => {
                        escapeEffect.style.backgroundColor = 'rgba(0, 255, 0, 0)';
                        setTimeout(() => escapeEffect.remove(), 500);
                    }, 500);
                }, 500);
            }, 500);
        }, 200);
        
        // 恢复原状
        setTimeout(() => {
            quote.textContent = "逃出庄园的唯一希望，是找出隐藏的真相";
        }, 5000);
    }
}

// 添加时间驱动事件系统
function setupTimeEvents() {
    // 每分钟检查一次特殊时间
    setInterval(checkSpecialTimes, 60000);
    
    // 初始检查
    checkSpecialTimes();
    
    function checkSpecialTimes() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        
        // 午夜时分特效
        if (hours === 0 && minutes === 0) {
            triggerMidnightEvent();
        }
        
        // 黄金时间特效 (19:11 - 第五人格游戏相关)
        if (hours === 19 && minutes === 11) {
            triggerGoldenTimeEvent();
        }
        
        // 每小时整点钟声
        if (minutes === 0) {
            playHourlyChime(hours);
        }
    }
    
    // 午夜事件
    function triggerMidnightEvent() {
        console.log("午夜事件触发");
        // 实现午夜特效
        const quote = document.querySelector('.quote');
        quote.textContent = "午夜零点，庄园的大门已关闭...";
        
        // 添加特效...
        
        // 5分钟后恢复
        setTimeout(() => {
            quote.textContent = "逃出庄园的唯一希望，是找出隐藏的真相";
        }, 300000); // 5分钟
    }
    
    // 黄金时间事件 (19:11)
    function triggerGoldenTimeEvent() {
        console.log("黄金时间事件触发");
        
        // 增加金色效果...
        
        // 显示特殊消息
        const quote = document.querySelector('.quote');
        quote.textContent = "欢迎来到第五人格的黄金时间";
        
        // 10分钟后恢复
        setTimeout(() => {
            quote.textContent = "逃出庄园的唯一希望，是找出隐藏的真相";
        }, 600000); // 10分钟
    }
    
    // 整点钟声
    function playHourlyChime(hour) {
        console.log(`${hour}点整`);
        // 可以添加音效或视觉效果
    }
}

// 添加日期特效系统
function setupDateEvents() {
    // 每天检查一次特殊日期
    const checkSpecialDates = () => {
        const now = new Date();
        const month = now.getMonth() + 1; // 月份从0开始
        const day = now.getDate();
        
        // 万圣节主题
        if (month === 10 && day === 31) {
            applyHalloweenTheme();
        }
        
        // 第五人格发布纪念日
        if (month === 7 && day === 5) {
            applyAnniversaryTheme();
        }
        
        // 元旦主题
        if (month === 1 && day === 1) {
            applyNewYearTheme();
        }
    };
    
    // 初始检查
    checkSpecialDates();
    
    // 万圣节主题
    function applyHalloweenTheme() {
        console.log("应用万圣节主题");
        
        // 更改主题颜色为橙色+紫色
        document.documentElement.style.setProperty('--theme-color', '#ff6600');
        document.documentElement.style.setProperty('--theme-secondary', '#800080');
        
        // 增加南瓜图标...
        
        // 更改引言
        const quote = document.querySelector('.quote');
        quote.textContent = "在万圣之夜，监管者也来索要糖果...";
    }
    
    // 发布纪念日主题
    function applyAnniversaryTheme() {
        console.log("应用周年庆主题");
        
        // 添加周年庆特效...
        
        // 更改引言
        const quote = document.querySelector('.quote');
        quote.textContent = "感谢各位玩家多年的陪伴与支持";
    }
    
    // 新年主题
    function applyNewYearTheme() {
        console.log("应用新年主题");
        
        // 应用新年特效...
        
        // 更改引言
        const quote = document.querySelector('.quote');
        quote.textContent = "新的一年，新的探索，新的胜利";
    }
}

// 添加简单的小游戏模式
function setupMiniGame() {
    // 游戏状态
    let isGameActive = false;
    let gameScore = 0;
    let gameTargets = [];
    
    // 监听特定按键组合启动游戏
    document.addEventListener('keydown', (e) => {
        // G + A + M + E 组合键
        if (e.key.toLowerCase() === 'g' && e.ctrlKey && e.altKey) {
            toggleGame();
        }
    });
    
    // 开启/关闭游戏
    function toggleGame() {
        if (!isGameActive) {
            startGame();
        } else {
            endGame();
        }
    }
    
    // 开始游戏
    function startGame() {
        isGameActive = true;
        gameScore = 0;
        
        // 创建游戏UI
        const gameContainer = document.createElement('div');
        gameContainer.className = 'mini-game-container';
        gameContainer.style.position = 'fixed';
        gameContainer.style.top = '0';
        gameContainer.style.left = '0';
        gameContainer.style.width = '100%';
        gameContainer.style.height = '100%';
        gameContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        gameContainer.style.zIndex = '10000';
        gameContainer.style.display = 'flex';
        gameContainer.style.flexDirection = 'column';
        gameContainer.style.alignItems = 'center';
        gameContainer.style.justifyContent = 'center';
        document.body.appendChild(gameContainer);
        
        // 游戏标题
        const gameTitle = document.createElement('div');
        gameTitle.textContent = '密码猎人 - 点击出现的符号';
        gameTitle.style.color = '#d3c7a6';
        gameTitle.style.fontSize = '24px';
        gameTitle.style.margin = '20px';
        gameContainer.appendChild(gameTitle);
        
        // 计分板
        const scoreBoard = document.createElement('div');
        scoreBoard.className = 'score-board';
        scoreBoard.textContent = `得分: ${gameScore}`;
        scoreBoard.style.color = '#d3c7a6';
        scoreBoard.style.fontSize = '20px';
        scoreBoard.style.margin = '10px';
        gameContainer.appendChild(scoreBoard);
        
        // 游戏区域
        const gameArea = document.createElement('div');
        gameArea.className = 'game-area';
        gameArea.style.width = '600px';
        gameArea.style.height = '400px';
        gameArea.style.border = '2px solid #d3c7a6';
        gameArea.style.position = 'relative';
        gameContainer.appendChild(gameArea);
        
        // 结束按钮
        const endButton = document.createElement('button');
        endButton.textContent = '结束游戏';
        endButton.style.margin = '20px';
        endButton.style.padding = '10px 20px';
        endButton.style.backgroundColor = '#8a0303';
        endButton.style.color = '#fff';
        endButton.style.border = 'none';
        endButton.style.borderRadius = '5px';
        endButton.style.cursor = 'pointer';
        endButton.onclick = endGame;
        gameContainer.appendChild(endButton);
        
        // 开始生成目标
        gameTargets = [];
        generateTarget(gameArea, scoreBoard);
    }
    
    // 结束游戏
    function endGame() {
        isGameActive = false;
        
        // 移除游戏UI
        const gameContainer = document.querySelector('.mini-game-container');
        if (gameContainer) {
            gameContainer.remove();
        }
        
        // 根据分数给予奖励
        if (gameScore >= 10) {
            // 解锁特殊奖励
            triggerGameReward(gameScore);
        }
    }
    
    // 生成目标
    function generateTarget(gameArea, scoreBoard) {
        if (!isGameActive) return;
        
        // 创建目标
        const target = document.createElement('div');
        target.className = 'game-target';
        
        // 随机选择符号
        const symbols = ['▲', '■', '●', '★', '◆', '✦', '✧'];
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        target.textContent = symbol;
        
        // 随机位置
        const posX = 20 + Math.random() * 540;
        const posY = 20 + Math.random() * 340;
        target.style.position = 'absolute';
        target.style.left = `${posX}px`;
        target.style.top = `${posY}px`;
        
        // 样式
        target.style.color = '#d3c7a6';
        target.style.fontSize = '30px';
        target.style.cursor = 'pointer';
        target.style.userSelect = 'none';
        target.style.textShadow = '0 0 10px #d3c7a6';
        target.style.animation = 'fadeInOut 2s forwards';
        
        // 点击处理
        target.onclick = () => {
            gameScore++;
            scoreBoard.textContent = `得分: ${gameScore}`;
            target.remove();
            
            // 从目标数组中移除
            const index = gameTargets.indexOf(target);
            if (index > -1) {
                gameTargets.splice(index, 1);
            }
        };
        
        // 添加到游戏区域
        gameArea.appendChild(target);
        gameTargets.push(target);
        
        // 设置消失定时器
        setTimeout(() => {
            if (gameArea.contains(target)) {
                target.remove();
                
                // 从目标数组中移除
                const index = gameTargets.indexOf(target);
                if (index > -1) {
                    gameTargets.splice(index, 1);
                }
            }
        }, 2000);
        
        // 继续生成目标
        setTimeout(() => generateTarget(gameArea, scoreBoard), 1000);
    }
    
    // 游戏奖励
    function triggerGameReward(score) {
        console.log(`获得游戏奖励，得分: ${score}`);
        
        // 根据分数触发不同奖励
        if (score >= 20) {
            // 高级奖励
            triggerSurvivorEasterEgg(); // 触发已有的求生者彩蛋
        } else {
            // 基础奖励
            const quote = document.querySelector('.quote');
            const originalQuote = quote.textContent;
            
            quote.textContent = `游戏达人！获得 ${score} 分的密码猎人`;
            
            setTimeout(() => {
                quote.textContent = originalQuote;
            }, 5000);
        }
    }
}

// 在初始化函数中添加所有功能
function initEffects() {
    // 保留已有效果
    setupClickParticleEffect();
    setupParallaxEffect();
    setupBreathingEffects();
    setupEasterEggs(); // 彩蛋功能
    setupMouseTrailEffect(); // 鼠标拖尾
    setupDrawingRecognition(); // 绘图识别
    setupCinematicEffects(); // 电影特效
    
    // 添加新功能
    setupSecretCode(); // 密码解谜系统
    setupTimeEvents(); // 时间驱动事件
    setupDateEvents(); // 日期特效系统
    setupMiniGame(); // 小游戏模式
    setupAdvancedGestureRecognition(); // 高级手势系统
}

// 页面加载完成后初始化
window.addEventListener('load', initEffects);

// 升级鼠标手势识别系统
function setupAdvancedGestureRecognition() {
    // 存储已绘制的形状
    let gestureHistory = [];
    const maxGestureHistory = 5;
    
    // 添加手势设置面板
    const settingsButton = document.createElement('div');
    settingsButton.className = 'gesture-settings-button';
    settingsButton.textContent = '⚙️';
    settingsButton.style.position = 'fixed';
    settingsButton.style.bottom = '10px';
    settingsButton.style.left = '10px';
    settingsButton.style.fontSize = '20px';
    settingsButton.style.color = '#d3c7a6';
    settingsButton.style.opacity = '0.5';
    settingsButton.style.cursor = 'pointer';
    settingsButton.style.zIndex = '9999';
    
    // 鼠标悬停效果
    settingsButton.onmouseenter = () => {
        settingsButton.style.opacity = '1';
    };
    
    settingsButton.onmouseleave = () => {
        settingsButton.style.opacity = '0.5';
    };
    
    // 点击打开设置
    settingsButton.onclick = () => {
        toggleGestureSettings();
    };
    
    document.body.appendChild(settingsButton);
    
    // 开关手势设置面板
    function toggleGestureSettings() {
        let panel = document.querySelector('.gesture-settings-panel');
        
        if (panel) {
            panel.remove();
        } else {
            createGestureSettingsPanel();
        }
    }
    
    // 创建手势设置面板
    function createGestureSettingsPanel() {
        const panel = document.createElement('div');
        panel.className = 'gesture-settings-panel';
        panel.style.position = 'fixed';
        panel.style.bottom = '40px';
        panel.style.left = '10px';
        panel.style.width = '300px';
        panel.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        panel.style.border = '1px solid #d3c7a6';
        panel.style.padding = '15px';
        panel.style.borderRadius = '5px';
        panel.style.color = '#d3c7a6';
        panel.style.zIndex = '9998';
        
        // 面板标题
        const title = document.createElement('div');
        title.textContent = '手势历史';
        title.style.fontSize = '18px';
        title.style.marginBottom = '10px';
        title.style.borderBottom = '1px solid #d3c7a6';
        title.style.paddingBottom = '5px';
        panel.appendChild(title);
        
        // 历史记录
        const historyContainer = document.createElement('div');
        historyContainer.className = 'gesture-history-container';
        
        // 显示历史手势
        if (gestureHistory.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.textContent = '尚无手势记录';
            emptyMessage.style.fontStyle = 'italic';
            emptyMessage.style.opacity = '0.7';
            emptyMessage.style.textAlign = 'center';
            emptyMessage.style.padding = '10px';
            historyContainer.appendChild(emptyMessage);
        } else {
            gestureHistory.forEach((gesture, index) => {
                const gestureItem = document.createElement('div');
                gestureItem.className = 'gesture-item';
                gestureItem.textContent = `${index + 1}. ${gesture.name} - ${new Date(gesture.timestamp).toLocaleTimeString()}`;
                gestureItem.style.padding = '5px 0';
                gestureItem.style.borderBottom = '1px dotted rgba(211, 199, 166, 0.3)';
                historyContainer.appendChild(gestureItem);
            });
        }
        
        panel.appendChild(historyContainer);
        
        // 提示信息
        const hintText = document.createElement('div');
        hintText.textContent = '提示: 可用手势 - V形(触发求生者), O形(触发解密器), Z形(触发狂欢节)';
        hintText.style.fontSize = '12px';
        hintText.style.marginTop = '15px';
        hintText.style.opacity = '0.7';
        hintText.style.lineHeight = '1.4';
        panel.appendChild(hintText);
        
        document.body.appendChild(panel);
    }
    
    // 修改绘图识别函数，增加更多形状识别
    const originalDrawingRecognition = setupDrawingRecognition;
    setupDrawingRecognition = function() {
        // 调用原始函数
        const originalResult = originalDrawingRecognition();
        
        // 扩展isVShape函数
        const originalIsVShape = isVShape;
        isVShape = function(points) {
            const result = originalIsVShape(points);
            
            if (result) {
                // 记录V形手势
                addGestureToHistory('V形');
                return true;
            }
            
            // 检查其他形状
            if (isCircleShape(points)) {
                // 记录圆形手势
                addGestureToHistory('O形');
                triggerDecipherEasterEgg();
                return false; // 不触发V形效果
            }
            
            if (isZigzagShape(points)) {
                // 记录Z形手势
                addGestureToHistory('Z形');
                triggerCarnivalEasterEgg();
                return false; // 不触发V形效果
            }
            
            return false;
        };
        
        return originalResult;
    };
    
    // 添加手势到历史记录
    function addGestureToHistory(gestureName) {
        gestureHistory.unshift({
            name: gestureName,
            timestamp: Date.now()
        });
        
        // 限制历史记录数量
        if (gestureHistory.length > maxGestureHistory) {
            gestureHistory.pop();
        }
        
        // 如果设置面板打开，更新显示
        const panel = document.querySelector('.gesture-settings-panel');
        if (panel) {
            toggleGestureSettings();
            toggleGestureSettings();
        }
    }
    
    // 检测圆形
    function isCircleShape(points) {
        if (points.length < 20) return false; // 太少点无法形成圆
        
        // 找出边界框
        let minX = Infinity, minY = Infinity;
        let maxX = -Infinity, maxY = -Infinity;
        
        for (const pt of points) {
            minX = Math.min(minX, pt.x);
            minY = Math.min(minY, pt.y);
            maxX = Math.max(maxX, pt.x);
            maxY = Math.max(maxY, pt.y);
        }
        
        // 计算中心点和半径
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;
        const width = maxX - minX;
        const height = maxY - minY;
        
        // 检查是否近似为正方形（圆形的边界框）
        if (Math.abs(width - height) / Math.max(width, height) > 0.3) {
            return false; // 不是正方形边界框
        }
        
        // 近似半径
        const radius = (width + height) / 4;
        
        // 检查点到中心的距离是否近似相等
        let pointsOnCircle = 0;
        for (const pt of points) {
            const distance = Math.sqrt((pt.x - centerX) ** 2 + (pt.y - centerY) ** 2);
            if (Math.abs(distance - radius) / radius < 0.3) {
                pointsOnCircle++;
            }
        }
        
        // 至少50%的点应该在圆上
        return pointsOnCircle > points.length * 0.5;
    }
    
    // 检测Z形
    function isZigzagShape(points) {
        if (points.length < 15) return false; // 太少点无法形成Z
        
        // 简化点集
        const simplifiedPoints = simplifyPath(points, 10);
        
        // 需要至少有3个方向变化
        let directionChanges = 0;
        let lastDirection = null;
        
        for (let i = 1; i < simplifiedPoints.length; i++) {
            const dx = simplifiedPoints[i].x - simplifiedPoints[i-1].x;
            // 忽略小的水平移动
            if (Math.abs(dx) < 5) continue;
            
            const currentDirection = dx > 0 ? 'right' : 'left';
            
            if (lastDirection !== null && currentDirection !== lastDirection) {
                directionChanges++;
                lastDirection = currentDirection;
            } else if (lastDirection === null) {
                lastDirection = currentDirection;
            }
        }
        
        return directionChanges >= 2; // Z至少有两次方向变化
    }
    
    // 简化路径
    function simplifyPath(points, tolerance) {
        if (points.length <= 2) return points;
        
        const result = [points[0]];
        let lastPoint = points[0];
        
        for (let i = 1; i < points.length; i++) {
            const dx = points[i].x - lastPoint.x;
            const dy = points[i].y - lastPoint.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > tolerance) {
                result.push(points[i]);
                lastPoint = points[i];
            }
        }
        
        if (result[result.length - 1] !== points[points.length - 1]) {
            result.push(points[points.length - 1]);
        }
        
        return result;
    }
    
    // 解密器彩蛋
    function triggerDecipherEasterEgg() {
        console.log("解密器彩蛋激活");
        
        // 实现解密器彩蛋...
        const quote = document.querySelector('.quote');
        const originalQuote = quote.textContent;
        
        quote.textContent = "解密机启动中...请保持警惕";
        
        // 恢复
        setTimeout(() => {
            quote.textContent = originalQuote;
        }, 5000);
    }
    
    // 狂欢节彩蛋
    function triggerCarnivalEasterEgg() {
        console.log("狂欢节彩蛋激活");
        
        // 实现狂欢节彩蛋...
        const quote = document.querySelector('.quote');
        const originalQuote = quote.textContent;
        
        quote.textContent = "欢迎来到第五人格狂欢之夜";
        
        // 恢复
        setTimeout(() => {
            quote.textContent = originalQuote;
        }, 5000);
    }
}

// 第五人格主题解码小游戏
function setupDecoderMiniGame() {
    // 游戏状态
    let isGameActive = false;
    let gameScore = 0;
    let gameLevel = 1;
    let calibrationInterval = null;
    let gameTimer = null;
    let timeRemaining = 60; // 游戏总时长（秒）
    
    // 解码机状态
    let decoderProgress = 0;
    let currentCalibration = null;
    let requiredDecoders = 5; // 需要完成的解码机数量
    let completedDecoders = 0;
    
    // 监听特定按键组合启动游戏
    document.addEventListener('keydown', (e) => {
        // D + E + C 组合键 (DECoder)
        if (e.key.toLowerCase() === 'd' && e.ctrlKey && e.altKey) {
            toggleGame();
        }
    });
    
    // 开启/关闭游戏
    function toggleGame() {
        if (!isGameActive) {
            startGame();
        } else {
            endGame(false);
        }
    }
    
    // 开始游戏
    function startGame() {
        isGameActive = true;
        gameScore = 0;
        gameLevel = 1;
        decoderProgress = 0;
        completedDecoders = 0;
        timeRemaining = 60;
        
        // 创建游戏UI
        const gameContainer = document.createElement('div');
        gameContainer.className = 'decoder-game-container';
        gameContainer.style.position = 'fixed';
        gameContainer.style.top = '0';
        gameContainer.style.left = '0';
        gameContainer.style.width = '100%';
        gameContainer.style.height = '100%';
        gameContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        gameContainer.style.zIndex = '10000';
        gameContainer.style.display = 'flex';
        gameContainer.style.flexDirection = 'column';
        gameContainer.style.alignItems = 'center';
        gameContainer.style.justifyContent = 'center';
        gameContainer.style.fontFamily = 'monospace';
        gameContainer.style.color = '#d3c7a6';
        document.body.appendChild(gameContainer);
        
        // 游戏标题
        const gameTitle = document.createElement('div');
        gameTitle.textContent = '解码挑战 - 求生者的试炼';
        gameTitle.style.fontSize = '24px';
        gameTitle.style.margin = '10px';
        gameTitle.style.textShadow = '0 0 10px rgba(211, 199, 166, 0.7)';
        gameContainer.appendChild(gameTitle);
        
        // 游戏说明
        const gameInstructions = document.createElement('div');
        gameInstructions.textContent = '正确时机按下显示的按键完成校准，逃出庄园需要修复5台解码机';
        gameInstructions.style.fontSize = '14px';
        gameInstructions.style.margin = '10px';
        gameInstructions.style.opacity = '0.8';
        gameInstructions.style.maxWidth = '600px';
        gameInstructions.style.textAlign = 'center';
        gameContainer.appendChild(gameInstructions);
        
        // 状态面板
        const statusPanel = document.createElement('div');
        statusPanel.className = 'status-panel';
        statusPanel.style.display = 'flex';
        statusPanel.style.justifyContent = 'space-between';
        statusPanel.style.width = '600px';
        statusPanel.style.margin = '10px';
        statusPanel.style.padding = '10px';
        statusPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        statusPanel.style.border = '1px solid #d3c7a6';
        statusPanel.style.borderRadius = '5px';
        gameContainer.appendChild(statusPanel);
        
        // 解码机进度
        const decoderStatus = document.createElement('div');
        decoderStatus.className = 'decoder-status';
        decoderStatus.innerHTML = `解码机: <span style="color:#4d9be6">0/${requiredDecoders}</span>`;
        statusPanel.appendChild(decoderStatus);
        
        // 得分
        const scoreDisplay = document.createElement('div');
        scoreDisplay.className = 'score-display';
        scoreDisplay.textContent = `得分: ${gameScore}`;
        statusPanel.appendChild(scoreDisplay);
        
        // 时间
        const timeDisplay = document.createElement('div');
        timeDisplay.className = 'time-display';
        timeDisplay.textContent = `时间: ${timeRemaining}秒`;
        statusPanel.appendChild(timeDisplay);
        
        // 解码机区域
        const decoderArea = document.createElement('div');
        decoderArea.className = 'decoder-area';
        decoderArea.style.width = '600px';
        decoderArea.style.height = '300px';
        decoderArea.style.margin = '20px';
        decoderArea.style.border = '2px solid #d3c7a6';
        decoderArea.style.borderRadius = '10px';
        decoderArea.style.position = 'relative';
        decoderArea.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        decoderArea.style.overflow = 'hidden';
        gameContainer.appendChild(decoderArea);
        
        // 解码机图形
        const decoderGraphic = document.createElement('div');
        decoderGraphic.className = 'decoder-graphic';
        decoderGraphic.style.position = 'absolute';
        decoderGraphic.style.width = '200px';
        decoderGraphic.style.height = '200px';
        decoderGraphic.style.top = '50%';
        decoderGraphic.style.left = '50%';
        decoderGraphic.style.transform = 'translate(-50%, -50%)';
        decoderGraphic.style.border = '3px solid #4d9be6';
        decoderGraphic.style.borderRadius = '50%';
        decoderGraphic.style.boxShadow = '0 0 20px rgba(77, 155, 230, 0.5)';
        decoderArea.appendChild(decoderGraphic);
        
        // 进度条
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.position = 'absolute';
        progressBar.style.bottom = '20px';
        progressBar.style.left = '50%';
        progressBar.style.transform = 'translateX(-50%)';
        progressBar.style.width = '80%';
        progressBar.style.height = '15px';
        progressBar.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        progressBar.style.border = '1px solid #d3c7a6';
        progressBar.style.borderRadius = '10px';
        progressBar.style.overflow = 'hidden';
        decoderArea.appendChild(progressBar);
        
        // 进度条填充
        const progressFill = document.createElement('div');
        progressFill.className = 'progress-fill';
        progressFill.style.width = '0%';
        progressFill.style.height = '100%';
        progressFill.style.backgroundColor = '#4d9be6';
        progressFill.style.transition = 'width 0.5s linear';
        progressBar.appendChild(progressFill);
        
        // 校准指示器
        const calibrationIndicator = document.createElement('div');
        calibrationIndicator.className = 'calibration-indicator';
        calibrationIndicator.style.position = 'absolute';
        calibrationIndicator.style.display = 'none';
        calibrationIndicator.style.width = '250px';
        calibrationIndicator.style.height = '250px';
        calibrationIndicator.style.top = '50%';
        calibrationIndicator.style.left = '50%';
        calibrationIndicator.style.transform = 'translate(-50%, -50%)';
        calibrationIndicator.style.borderRadius = '50%';
        calibrationIndicator.style.border = '2px dashed rgba(77, 155, 230, 0.7)';
        decoderArea.appendChild(calibrationIndicator);
        
        // 校准目标标记
        const targetMarker = document.createElement('div');
        targetMarker.className = 'target-marker';
        targetMarker.style.position = 'absolute';
        targetMarker.style.width = '10px';
        targetMarker.style.height = '40px';
        targetMarker.style.top = '0';
        targetMarker.style.left = '50%';
        targetMarker.style.transform = 'translateX(-50%)';
        targetMarker.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
        calibrationIndicator.appendChild(targetMarker);
        
        // 移动光标
        const cursor = document.createElement('div');
        cursor.className = 'moving-cursor';
        cursor.style.position = 'absolute';
        cursor.style.width = '10px';
        cursor.style.height = '40px';
        cursor.style.backgroundColor = '#4d9be6';
        cursor.style.top = '0';
        cursor.style.left = '50%';
        cursor.style.transform = 'rotate(0deg) translateX(-50%)';
        cursor.style.transformOrigin = 'bottom center';
        calibrationIndicator.appendChild(cursor);
        
        // 当前按键显示
        const keyDisplay = document.createElement('div');
        keyDisplay.className = 'key-display';
        keyDisplay.style.position = 'absolute';
        keyDisplay.style.top = '50%';
        keyDisplay.style.left = '50%';
        keyDisplay.style.transform = 'translate(-50%, -50%)';
        keyDisplay.style.fontSize = '36px';
        keyDisplay.style.fontWeight = 'bold';
        keyDisplay.style.color = '#4d9be6';
        keyDisplay.style.textShadow = '0 0 10px rgba(77, 155, 230, 0.8)';
        keyDisplay.style.display = 'none';
        calibrationIndicator.appendChild(keyDisplay);
        
        // 操作说明
        const controlsInfo = document.createElement('div');
        controlsInfo.textContent = '等待指针接近红色区域时按下显示的按键完成校准';
        controlsInfo.style.fontSize = '14px';
        controlsInfo.style.marginTop = '10px';
        controlsInfo.style.opacity = '0.8';
        gameContainer.appendChild(controlsInfo);
        
        // 结束按钮
        const endButton = document.createElement('button');
        endButton.textContent = '退出游戏';
        endButton.style.margin = '15px';
        endButton.style.padding = '10px 20px';
        endButton.style.backgroundColor = '#8a0303';
        endButton.style.color = '#fff';
        endButton.style.border = 'none';
        endButton.style.borderRadius = '5px';
        endButton.style.cursor = 'pointer';
        endButton.onclick = () => endGame(false);
        gameContainer.appendChild(endButton);
        
        // 监听键盘事件
        document.addEventListener('keydown', handleKeyPress);
        
        // 开始游戏循环
        startGameLoop(decoderGraphic, progressFill, calibrationIndicator, cursor, keyDisplay, decoderStatus, scoreDisplay, timeDisplay);
    }
    
    // 开始游戏循环
    function startGameLoop(decoderGraphic, progressFill, calibrationIndicator, cursor, keyDisplay, decoderStatus, scoreDisplay, timeDisplay) {
        // 更新解码进度
        const updateProgress = () => {
            // 增加进度
            decoderProgress += 0.5 * gameLevel;
            
            // 检查是否需要校准
            if (decoderProgress >= 20 && !currentCalibration) {
                startCalibration(calibrationIndicator, cursor, keyDisplay);
            }
            
            // 检查是否完成当前解码机
            if (decoderProgress >= 100) {
                completeDecoder(decoderGraphic, progressFill, calibrationIndicator, decoderStatus);
            }
            
            // 更新进度条
            progressFill.style.width = `${decoderProgress}%`;
        };
        
        // 设置定时器每500ms更新一次进度
        const progressInterval = setInterval(updateProgress, 500);
        
        // 设置游戏计时器
        gameTimer = setInterval(() => {
            timeRemaining--;
            timeDisplay.textContent = `时间: ${timeRemaining}秒`;
            
            if (timeRemaining <= 0) {
                clearInterval(gameTimer);
                endGame(completedDecoders >= requiredDecoders);
            }
        }, 1000);
    }
    
    // 开始校准
    function startCalibration(calibrationIndicator, cursor, keyDisplay) {
        // 停止增加进度
        decoderProgress = 20;
        
        // 定义校准数据
        currentCalibration = {
            active: true,
            angle: 0,
            speed: 3 + (gameLevel * 0.5), // 随等级增加速度
            targetAngle: Math.floor(Math.random() * 360),
            targetWidth: 30 - (gameLevel * 2), // 随等级减小目标范围
            key: getRandomKey(),
            successZone: 20
        };
        
        // 显示校准界面
        calibrationIndicator.style.display = 'block';
        keyDisplay.textContent = currentCalibration.key.toUpperCase();
        keyDisplay.style.display = 'block';
        
        // 设置目标区域
        const targetMarker = calibrationIndicator.querySelector('.target-marker');
        targetMarker.style.transform = `rotate(${currentCalibration.targetAngle}deg) translateX(-50%)`;
        targetMarker.style.width = `${currentCalibration.targetWidth}px`;
        
        // 启动校准动画
        calibrationInterval = setInterval(() => {
            // 移动指针
            currentCalibration.angle = (currentCalibration.angle + currentCalibration.speed) % 360;
            cursor.style.transform = `rotate(${currentCalibration.angle}deg) translateX(-50%)`;
        }, 30);
    }
    
    // 处理按键
    function handleKeyPress(e) {
        if (!isGameActive || !currentCalibration || !currentCalibration.active) return;
        
        if (e.key.toLowerCase() === currentCalibration.key.toLowerCase()) {
            checkCalibration();
        }
    }
    
    // 检查校准是否成功
    function checkCalibration() {
        // 计算角度差
        let angleDiff = Math.abs(currentCalibration.angle - currentCalibration.targetAngle);
        if (angleDiff > 180) angleDiff = 360 - angleDiff;
        
        // 清除校准动画
        clearInterval(calibrationInterval);
        
        // 检查是否在目标范围内
        if (angleDiff <= currentCalibration.successZone) {
            // 校准成功
            calibrationSuccess();
        } else {
            // 校准失败
            calibrationFailed();
        }
    }
    
    // 校准成功
    function calibrationSuccess() {
        // 增加进度
        decoderProgress = Math.min(decoderProgress + 20, 100);
        
        // 增加分数
        gameScore += 10 * gameLevel;
        
        // 更新得分显示
        document.querySelector('.score-display').textContent = `得分: ${gameScore}`;
        
        // 显示成功指示
        showCalibrationResult(true);
        
        // 结束当前校准
        endCalibration();
    }
    
    // 校准失败
    function calibrationFailed() {
        // 减少进度
        decoderProgress = Math.max(decoderProgress - 15, 0);
        
        // 显示失败指示
        showCalibrationResult(false);
        
        // 更新进度条
        document.querySelector('.progress-fill').style.width = `${decoderProgress}%`;
        
        // 结束当前校准
        endCalibration();
    }
    
    // 显示校准结果
    function showCalibrationResult(success) {
        const resultIndicator = document.createElement('div');
        resultIndicator.className = 'calibration-result';
        resultIndicator.textContent = success ? '完美！' : '失败！';
        resultIndicator.style.position = 'absolute';
        resultIndicator.style.top = '50%';
        resultIndicator.style.left = '50%';
        resultIndicator.style.transform = 'translate(-50%, -50%)';
        resultIndicator.style.fontSize = '28px';
        resultIndicator.style.fontWeight = 'bold';
        resultIndicator.style.color = success ? '#4dbe4d' : '#be4d4d';
        resultIndicator.style.textShadow = `0 0 15px ${success ? 'rgba(77, 190, 77, 0.8)' : 'rgba(190, 77, 77, 0.8)'}`;
        resultIndicator.style.zIndex = '11000';
        resultIndicator.style.animation = 'fadeOutUp 1.5s forwards';
        document.querySelector('.decoder-area').appendChild(resultIndicator);
        
        // 移除结果指示
        setTimeout(() => {
            if (resultIndicator.parentNode) {
                resultIndicator.parentNode.removeChild(resultIndicator);
            }
        }, 1500);
    }
    
    // 结束校准
    function endCalibration() {
        currentCalibration = null;
        
        // 隐藏校准界面
        const calibrationIndicator = document.querySelector('.calibration-indicator');
        if (calibrationIndicator) {
            calibrationIndicator.style.display = 'none';
        }
    }
    
    // 完成解码机
    function completeDecoder(decoderGraphic, progressFill, calibrationIndicator, decoderStatus) {
        // 重置进度
        decoderProgress = 0;
        progressFill.style.width = '0%';
        
        // 增加完成数量
        completedDecoders++;
        
        // 增加游戏等级
        gameLevel = Math.min(gameLevel + 0.5, 3);
        
        // 更新显示
        decoderStatus.innerHTML = `解码机: <span style="color:#4d9be6">${completedDecoders}/${requiredDecoders}</span>`;
        
        // 显示解码机完成动画
        const completeAnimation = document.createElement('div');
        completeAnimation.className = 'decoder-complete';
        completeAnimation.style.position = 'absolute';
        completeAnimation.style.top = '0';
        completeAnimation.style.left = '0';
        completeAnimation.style.width = '100%';
        completeAnimation.style.height = '100%';
        completeAnimation.style.backgroundColor = 'rgba(77, 155, 230, 0.2)';
        completeAnimation.style.animation = 'pulseOut 1s forwards';
        document.querySelector('.decoder-area').appendChild(completeAnimation);
        
        // 移除动画元素
        setTimeout(() => {
            if (completeAnimation.parentNode) {
                completeAnimation.parentNode.removeChild(completeAnimation);
            }
        }, 1000);
        
        // 检查是否完成所有解码机
        if (completedDecoders >= requiredDecoders) {
            setTimeout(() => {
                endGame(true);
            }, 1000);
        }
    }
    
    // 获取随机按键
    function getRandomKey() {
        const keys = ['q', 'w', 'e', 'r', 'a', 's', 'd', 'f', 'z', 'x', 'c', 'v'];
        return keys[Math.floor(Math.random() * keys.length)];
    }
    
    // 结束游戏
    function endGame(isVictory) {
        isGameActive = false;
        
        // 清除所有计时器
        if (calibrationInterval) clearInterval(calibrationInterval);
        if (gameTimer) clearInterval(gameTimer);
        
        // 删除键盘监听
        document.removeEventListener('keydown', handleKeyPress);
        
        // 获取游戏容器
        const gameContainer = document.querySelector('.decoder-game-container');
        if (!gameContainer) return;
        
        // 创建结果面板
        const resultPanel = document.createElement('div');
        resultPanel.className = 'game-result-panel';
        resultPanel.style.position = 'absolute';
        resultPanel.style.top = '50%';
        resultPanel.style.left = '50%';
        resultPanel.style.transform = 'translate(-50%, -50%)';
        resultPanel.style.width = '400px';
        resultPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        resultPanel.style.border = `2px solid ${isVictory ? '#4dbe4d' : '#be4d4d'}`;
        resultPanel.style.borderRadius = '10px';
        resultPanel.style.padding = '20px';
        resultPanel.style.textAlign = 'center';
        resultPanel.style.zIndex = '11000';
        
        // 添加结果标题
        const resultTitle = document.createElement('div');
        resultTitle.textContent = isVictory ? '逃出成功！' : '挑战失败！';
        resultTitle.style.fontSize = '28px';
        resultTitle.style.color = isVictory ? '#4dbe4d' : '#be4d4d';
        resultTitle.style.marginBottom = '15px';
        resultTitle.style.textShadow = `0 0 10px ${isVictory ? 'rgba(77, 190, 77, 0.8)' : 'rgba(190, 77, 77, 0.8)'}`;
        resultPanel.appendChild(resultTitle);
        
        // 添加游戏统计
        const statsContainer = document.createElement('div');
        statsContainer.className = 'game-stats';
        statsContainer.style.margin = '10px 0';
        statsContainer.style.padding = '10px';
        statsContainer.style.backgroundColor = 'rgba(211, 199, 166, 0.1)';
        statsContainer.style.borderRadius = '5px';
        
        const decoderStat = document.createElement('div');
        decoderStat.textContent = `解码机: ${completedDecoders}/${requiredDecoders}`;
        decoderStat.style.margin = '5px 0';
        statsContainer.appendChild(decoderStat);
        
        const scoreStat = document.createElement('div');
        scoreStat.textContent = `总得分: ${gameScore}`;
        scoreStat.style.margin = '5px 0';
        statsContainer.appendChild(scoreStat);
        
        const timeStat = document.createElement('div');
        timeStat.textContent = `剩余时间: ${timeRemaining}秒`;
        timeStat.style.margin = '5px 0';
        statsContainer.appendChild(timeStat);
        
        resultPanel.appendChild(statsContainer);
        
        // 根据游戏结果显示不同信息
        const message = document.createElement('div');
        message.style.margin = '15px 0';
        message.style.fontSize = '16px';
        
        if (isVictory) {
            message.textContent = '恭喜！你成功修复了所有解码机并逃离了庄园！';
            message.style.color = '#d3c7a6';
        } else {
            message.textContent = '很遗憾，你没能在时间内修复足够的解码机...';
            message.style.color = '#d3c7a6';
        }
        
        resultPanel.appendChild(message);
        
        // 确认按钮
        const confirmButton = document.createElement('button');
        confirmButton.textContent = '确认';
        confirmButton.style.margin = '15px 0 5px';
        confirmButton.style.padding = '10px 30px';
        confirmButton.style.backgroundColor = isVictory ? '#4dbe4d' : '#d3c7a6';
        confirmButton.style.color = '#000';
        confirmButton.style.border = 'none';
        confirmButton.style.borderRadius = '5px';
        confirmButton.style.cursor = 'pointer';
        confirmButton.style.fontWeight = 'bold';
        
        confirmButton.onclick = () => {
            // 关闭结果面板
            resultPanel.remove();
            
            // 移除游戏容器
            gameContainer.remove();
            
            // 根据结果和分数触发彩蛋
            if (isVictory) {
                triggerGameVictoryReward();
            } else if (gameScore >= 50) {
                // 即使失败但得分高也给予奖励
                triggerGamePartialReward();
            }
        };
        
        resultPanel.appendChild(confirmButton);
        gameContainer.appendChild(resultPanel);
    }
    
    // 游戏胜利奖励
    function triggerGameVictoryReward() {
        // 触发求生者彩蛋
        if (typeof triggerSurvivorEasterEgg === 'function') {
            triggerSurvivorEasterEgg();
        } else {
            // 如果彩蛋函数不存在，创建简单的胜利效果
            const quote = document.querySelector('.quote');
            if (quote) {
                const originalQuote = quote.textContent;
                quote.textContent = "修复成功！大门已开启，你可以安全离开庄园了...";
                
                setTimeout(() => {
                    quote.textContent = originalQuote;
                }, 5000);
            }
        }
    }
    
    // 部分奖励
    function triggerGamePartialReward() {
        const quote = document.querySelector('.quote');
        if (quote) {
            const originalQuote = quote.textContent;
            quote.textContent = "虽然未能逃脱，但你的技术值得肯定...";
            
            setTimeout(() => {
                quote.textContent = originalQuote;
            }, 5000);
        }
    }
    
    // 添加必要的CSS动画
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @keyframes pulseOut {
            0% { opacity: 0.8; transform: scale(0.8); }
            100% { opacity: 0; transform: scale(1.5); }
        }
        
        @keyframes fadeOutUp {
            0% { opacity: 1; transform: translate(-50%, -50%); }
            100% { opacity: 0; transform: translate(-50%, -100%); }
        }
        
        .decoder-game-container button:hover {
            filter: brightness(1.2);
        }
    `;
    document.head.appendChild(styleElement);
}

// 将新游戏添加到初始化函数中
function initEffects() {
    // 保留其他效果
    setupClickParticleEffect();
    setupParallaxEffect();
    setupBreathingEffects();
    setupEasterEggs();
    setupMouseTrailEffect();
    setupDrawingRecognition();
    setupCinematicEffects();
    setupSecretCode();
    setupTimeEvents();
    setupAdvancedGestureRecognition();
    setupDecoderMiniGame(); // 添加第五人格主题解码游戏
}

// 庄园日记与历史系统
function setupManorJournal() {
    // 创建日记图标
    const journalIcon = document.createElement('div');
    journalIcon.className = 'journal-icon';
    journalIcon.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
    </svg>`;
    journalIcon.style.position = 'absolute';
    journalIcon.style.right = '-40px';
    journalIcon.style.top = '50%';
    journalIcon.style.transform = 'translateY(-50%)';
    journalIcon.style.color = '#d3c7a6';
    journalIcon.style.width = '30px';
    journalIcon.style.height = '30px';
    journalIcon.style.cursor = 'pointer';
    journalIcon.style.transition = 'all 0.3s ease';
    journalIcon.style.opacity = '0.7';
    journalIcon.style.zIndex = '10';
    
    // 悬停效果
    journalIcon.onmouseenter = () => {
        journalIcon.style.opacity = '1';
        journalIcon.style.transform = 'translateY(-50%) scale(1.1)';
        journalIcon.style.textShadow = '0 0 10px rgba(211, 199, 166, 0.7)';
    };
    
    journalIcon.onmouseleave = () => {
        journalIcon.style.opacity = '0.7';
        journalIcon.style.transform = 'translateY(-50%) scale(1)';
        journalIcon.style.textShadow = 'none';
    };
    
    // 添加到时钟框架
    const clockFrame = document.querySelector('.clock-frame');
    if (clockFrame) {
        clockFrame.style.position = 'relative';
        clockFrame.appendChild(journalIcon);
    }
    
    // 日记内容数据库
    const journalEntries = [
        {
            title: "庄园管理员的笔记",
            date: "1888年7月3日",
            content: "奥尔菲斯先生委托我照料这座庄园，要求严格遵守他的指示。所有访客必须登记，任何人不得靠近地下室。有时夜里会听到奇怪的声音，但我被告知不要过问。薪酬丰厚，但这地方令人不安。"
        },
        {
            title: "医生的研究日记",
            date: "1889年3月15日",
            content: "实验进展顺利。受试者表现出对痛觉的异常反应，这将推进我的研究。奥尔菲斯对我的成果非常满意，提供了更多'材料'。有些人质疑我的方法，但他们不理解为医学进步所必需的牺牲。"
        },
        {
            title: "园丁的观察",
            date: "1889年9月8日",
            content: "玫瑰花园西侧出现了奇怪的土壤变化，像是被什么东西污染了。奥尔菲斯先生坚持要我继续种植，尽管植物在那里无法存活。今天我发现了一块沾血的布料，被告知是打猎的痕迹，但庄园里从未举行过狩猎活动..."
        },
        {
            title: "女演员的私人日记",
            date: "1890年1月21日",
            content: "今晚的表演获得了满堂喝彩，奥尔菲斯先生特别邀请我留在庄园做客。其他客人看我的眼神很奇怪，好像我是某种展品。那位医生的目光尤其令人不适。我应该尽快离开，但合约把我绑在这里至少一个月。"
        },
        {
            title: "调查员的记录",
            date: "1890年11月2日",
            content: "三个月内第四名失踪者。当局对庄园的调查草率至极，显然有人买通了警方。我需要更多证据。已确认地下室存在秘密通道，但尚未找到入口。必须小心行事，我怀疑已被监视。"
        },
        {
            title: "机械师的工作笔记",
            date: "1891年5月17日",
            content: "完成了奥尔菲斯先生要求的机关装置安装。不知道这些机关的用途，但设计精密复杂。有些房间会在特定条件下封锁，还有一套完整的监控系统。这种技术远超时代，令人费解其来源。"
        },
        {
            title: "佣人的秘密记录",
            date: "1892年8月30日",
            content: "今晚听到地下室传来尖叫声。当我询问时，管家坚称是我的幻觉。早上打扫西翼走廊时，发现了一连串的血滴，直通向被锁的房间。我假装没看见，但他们知道我知道。我必须逃离这里。"
        },
        {
            title: "律师的遗言",
            date: "1893年2月14日",
            content: "若有人找到这份文件，请将它交给当局。我发现奥尔菲斯的真实身份和他的实验。他不是人类，或者说不再是了。地下室有一台机器，它能——[此处墨迹模糊，无法辨认]。我听到脚步声，恐怕时间不多了。"
        },
        {
            title: "最后一份庄园记录",
            date: "1893年12月5日",
            content: "庄园将在明日关闭整修。所有人员必须离开，不得带走任何文件或物品。任何违反规定者将被严惩。奥尔菲斯先生感谢大家的服务，并提醒各位保持沉默是雇佣合约的一部分。永远不要回来。"
        },
        {
            title: "考古队报告摘录",
            date: "1954年6月9日",
            content: "excavation-137号报告：发现了大量档案和实验记录，揭示了奥尔菲斯庄园曾是一个秘密研究设施。有证据表明进行了某种危险的人体实验。我们还找到了一个奇怪的装置，似乎能够捕捉和转移某种能量。当局已下令封锁该区域。"
        },
        {
            title: "猎人的自白",
            date: "现代",
            content: "欧勒留斯记忆碎片#37：我曾是他们的一员，一名受害者。现在我是猎人。我感受不到痛苦，只有追捕的渴望。那个装置改变了我们所有人，将灵魂与躯体分离。这个游戏永远不会结束，因为我们已不再是人类，只是被困在时间循环中的幽灵。"
        },
        {
            title: "求生者的希望",
            date: "现代",
            content: "我们被选中参与这场游戏，不知为何也不知如何。但我们并非完全无助。我发现了线索，关于那台原始装置的线索。如果能找到它并逆转其效果，也许我们能终结这场噩梦。每次逃脱都让我更接近真相。不要放弃希望。"
        }
    ];
    
    // 点击日记图标展开日记
    journalIcon.addEventListener('click', () => {
        openManorJournal();
    });
    
    // 打开日记函数
    function openManorJournal() {
        // 检查是否已存在日记面板
        if (document.querySelector('.journal-panel')) {
            return;
        }
        
        // 创建日记面板
        const journalPanel = document.createElement('div');
        journalPanel.className = 'journal-panel';
        journalPanel.style.position = 'absolute';
        journalPanel.style.right = '60px';
        journalPanel.style.top = '50%';
        journalPanel.style.transform = 'translateY(-50%) scale(0.95)';
        journalPanel.style.width = '400px';
        journalPanel.style.height = '500px';
        journalPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
        journalPanel.style.border = '2px solid #d3c7a6';
        journalPanel.style.borderRadius = '5px';
        journalPanel.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.8), 0 0 30px rgba(211, 199, 166, 0.3)';
        journalPanel.style.color = '#d3c7a6';
        journalPanel.style.fontFamily = 'serif';
        journalPanel.style.padding = '20px';
        journalPanel.style.zIndex = '9999';
        journalPanel.style.opacity = '0';
        journalPanel.style.transition = 'all 0.5s ease';
        journalPanel.style.overflowY = 'hidden';
        journalPanel.style.backdropFilter = 'blur(5px)';
        
        // 日记标题
        const journalTitle = document.createElement('div');
        journalTitle.className = 'journal-title';
        journalTitle.textContent = '庄园秘密档案';
        journalTitle.style.fontSize = '24px';
        journalTitle.style.textAlign = 'center';
        journalTitle.style.marginBottom = '15px';
        journalTitle.style.padding = '0 0 10px 0';
        journalTitle.style.borderBottom = '1px solid rgba(211, 199, 166, 0.5)';
        journalTitle.style.letterSpacing = '2px';
        journalTitle.style.textShadow = '0 0 8px rgba(211, 199, 166, 0.5)';
        journalPanel.appendChild(journalTitle);
        
        // 创建日记列表容器
        const entriesList = document.createElement('div');
        entriesList.className = 'journal-entries-list';
        entriesList.style.height = '100px';
        entriesList.style.marginBottom = '15px';
        entriesList.style.overflowY = 'scroll';
        entriesList.style.scrollbarWidth = 'thin';
        entriesList.style.scrollbarColor = '#d3c7a6 rgba(0,0,0,0.3)';
        entriesList.style.padding = '5px';
        entriesList.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        entriesList.style.borderRadius = '3px';
        journalPanel.appendChild(entriesList);
        
        // 添加日记列表
        journalEntries.forEach((entry, index) => {
            const entryItem = document.createElement('div');
            entryItem.className = 'journal-entry-item';
            entryItem.innerHTML = `<span class="entry-date">${entry.date}</span> - <span class="entry-title">${entry.title}</span>`;
            entryItem.style.padding = '8px 5px';
            entryItem.style.cursor = 'pointer';
            entryItem.style.borderBottom = '1px dotted rgba(211, 199, 166, 0.3)';
            entryItem.style.transition = 'all 0.2s ease';
            
            // 悬停效果
            entryItem.onmouseenter = () => {
                entryItem.style.backgroundColor = 'rgba(211, 199, 166, 0.1)';
            };
            
            entryItem.onmouseleave = () => {
                entryItem.style.backgroundColor = 'transparent';
            };
            
            // 点击显示日记内容
            entryItem.onclick = () => {
                displayJournalEntry(entry);
            };
            
            entriesList.appendChild(entryItem);
        });
        
        // 日记内容容器
        const entryContent = document.createElement('div');
        entryContent.className = 'journal-content';
        entryContent.style.height = '300px';
        entryContent.style.overflow = 'hidden';
        entryContent.style.padding = '15px';
        entryContent.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        entryContent.style.borderRadius = '3px';
        entryContent.style.lineHeight = '1.6';
        entryContent.style.fontSize = '16px';
        entryContent.style.position = 'relative';
        entryContent.style.border = '1px solid rgba(211, 199, 166, 0.3)';
        journalPanel.appendChild(entryContent);
        
        // 默认显示随机日记
        const randomEntry = journalEntries[Math.floor(Math.random() * journalEntries.length)];
        displayJournalEntry(randomEntry);
        
        // 关闭按钮
        const closeButton = document.createElement('div');
        closeButton.className = 'journal-close';
        closeButton.innerHTML = '×';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '15px';
        closeButton.style.fontSize = '24px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.opacity = '0.7';
        closeButton.style.transition = 'all 0.2s ease';
        
        closeButton.onmouseenter = () => {
            closeButton.style.opacity = '1';
            closeButton.style.transform = 'scale(1.1)';
        };
        
        closeButton.onmouseleave = () => {
            closeButton.style.opacity = '0.7';
            closeButton.style.transform = 'scale(1)';
        };
        
        closeButton.onclick = () => {
            // 关闭动画
            journalPanel.style.opacity = '0';
            journalPanel.style.transform = 'translateY(-50%) scale(0.9)';
            
            setTimeout(() => {
                journalPanel.remove();
            }, 500);
        };
        
        journalPanel.appendChild(closeButton);
        
        // 添加破损和年代感效果
        addVintageEffect(journalPanel);
        
        // 添加到文档
        document.querySelector('.container').appendChild(journalPanel);
        
        // 显示动画
        setTimeout(() => {
            journalPanel.style.opacity = '1';
            journalPanel.style.transform = 'translateY(-50%) scale(1)';
        }, 10);
        
        // 显示日记条目函数
        function displayJournalEntry(entry) {
            // 清空之前的内容
            entryContent.innerHTML = '';
            
            // 日记标题
            const entryTitle = document.createElement('div');
            entryTitle.className = 'entry-display-title';
            entryTitle.textContent = entry.title;
            entryTitle.style.fontSize = '20px';
            entryTitle.style.marginBottom = '10px';
            entryTitle.style.textShadow = '0 0 5px rgba(211, 199, 166, 0.5)';
            entryTitle.style.fontWeight = 'bold';
            entryContent.appendChild(entryTitle);
            
            // 日记日期
            const entryDate = document.createElement('div');
            entryDate.className = 'entry-display-date';
            entryDate.textContent = entry.date;
            entryDate.style.fontSize = '14px';
            entryDate.style.marginBottom = '15px';
            entryDate.style.opacity = '0.8';
            entryDate.style.fontStyle = 'italic';
            entryContent.appendChild(entryDate);
            
            // 日记内容（添加打字机效果）
            const contentText = document.createElement('div');
            contentText.className = 'entry-display-content';
            contentText.style.lineHeight = '1.8';
            entryContent.appendChild(contentText);
            
            // 打字机效果
            let i = 0;
            const typeWriter = () => {
                if (i < entry.content.length) {
                    contentText.textContent += entry.content.charAt(i);
                    i++;
                    setTimeout(typeWriter, 30);
                }
            };
            typeWriter();
            
            // 墨水污渍和折痕效果
            setTimeout(() => {
                // 随机添加1-3个墨水污渍
                const inkSpotsCount = Math.floor(Math.random() * 3) + 1;
                for (let i = 0; i < inkSpotsCount; i++) {
                    const inkSpot = document.createElement('div');
                    inkSpot.className = 'ink-spot';
                    inkSpot.style.position = 'absolute';
                    inkSpot.style.width = `${Math.random() * 50 + 30}px`;
                    inkSpot.style.height = `${Math.random() * 50 + 20}px`;
                    inkSpot.style.top = `${Math.random() * 80}%`;
                    inkSpot.style.left = `${Math.random() * 80}%`;
                    inkSpot.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
                    inkSpot.style.borderRadius = '50%';
                    inkSpot.style.filter = 'blur(5px)';
                    inkSpot.style.zIndex = '-1';
                    inkSpot.style.transform = `rotate(${Math.random() * 360}deg)`;
                    entryContent.appendChild(inkSpot);
                }
            }, 1000);
        }
        
        // 添加年代感效果
        function addVintageEffect(element) {
            // 添加纸张纹理
            element.style.backgroundImage = 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZmlsdGVyIGlkPSJuIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC43IiBudW1PY3RhdmVzPSI0IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIj48L2ZlVHVyYnVsZW5jZT48ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIj48L2ZlQ29sb3JNYXRyaXg+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMC4wNCIgZmlsbD0iI2ZmZiI+PC9yZWN0Pjwvc3ZnPg==")';
            
            // 添加折痕
            const crease = document.createElement('div');
            crease.className = 'paper-crease';
            crease.style.position = 'absolute';
            crease.style.top = '0';
            crease.style.left = '33%';
            crease.style.width = '1px';
            crease.style.height = '100%';
            crease.style.backgroundColor = 'rgba(211, 199, 166, 0.1)';
            crease.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.2)';
            crease.style.zIndex = '-1';
            element.appendChild(crease);
            
            // 第二条折痕
            const crease2 = document.createElement('div');
            crease2.className = 'paper-crease-2';
            crease2.style.position = 'absolute';
            crease2.style.top = '0';
            crease2.style.left = '67%';
            crease2.style.width = '1px';
            crease2.style.height = '100%';
            crease2.style.backgroundColor = 'rgba(211, 199, 166, 0.1)';
            crease2.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.2)';
            crease2.style.zIndex = '-1';
            element.appendChild(crease2);
            
            // 水平折痕
            const hCrease = document.createElement('div');
            hCrease.className = 'paper-h-crease';
            hCrease.style.position = 'absolute';
            hCrease.style.top = '50%';
            hCrease.style.left = '0';
            hCrease.style.width = '100%';
            hCrease.style.height = '1px';
            hCrease.style.backgroundColor = 'rgba(211, 199, 166, 0.1)';
            hCrease.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.2)';
            hCrease.style.zIndex = '-1';
            element.appendChild(hCrease);
        }
    }
    
    // 添加日期历史提示功能
    function setupDateHistoryHints() {
        // 历史日期事件
        const historicDates = {
            "07-05": {
                title: "第五人格诞生日",
                description: "游戏正式发布，庄园迎来第一批访客。"
            },
            "10-31": {
                title: "万圣节惨案",
                description: "1889年万圣节，庄园举行了一场面具舞会，次日发现五名访客神秘失踪。"
            },
            "12-25": {
                title: "礼物日",
                description: "1892年圣诞节，庄园主人给每位访客送了一份'特别'礼物，据说能实现愿望。"
            },
            "02-14": {
                title: "红玫瑰事件",
                description: "1890年情人节，一位年轻女子收到满屋红玫瑰，但第二天便下落不明，只留下一地枯萎的花。"
            }
        };
        
        // 检查今天是否有特殊日期事件
        const today = new Date();
        const todayFormatted = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        
        if (historicDates[todayFormatted]) {
            // 日期元素点击显示历史事件
            const dateElement = document.querySelector('.date');
            if (dateElement) {
                dateElement.style.cursor = 'pointer';
                dateElement.style.position = 'relative';
                
                // 添加提示标记
                const hintMark = document.createElement('div');
                hintMark.className = 'date-hint-mark';
                hintMark.style.position = 'absolute';
                hintMark.style.top = '-10px';
                hintMark.style.right = '-10px';
                hintMark.style.width = '8px';
                hintMark.style.height = '8px';
                hintMark.style.backgroundColor = '#d3c7a6';
                hintMark.style.borderRadius = '50%';
                hintMark.style.boxShadow = '0 0 5px rgba(211, 199, 166, 0.7)';
                hintMark.style.animation = 'pulseDot 2s infinite';
                dateElement.appendChild(hintMark);
                
                // 添加点击事件
                dateElement.addEventListener('click', () => {
                    showHistoricEvent(historicDates[todayFormatted]);
                });
            }
        }
        
        // 显示历史事件
        function showHistoricEvent(eventData) {
            // 创建弹出提示
            const eventPopup = document.createElement('div');
            eventPopup.className = 'historic-event-popup';
            eventPopup.style.position = 'absolute';
            eventPopup.style.bottom = '100%';
            eventPopup.style.left = '50%';
            eventPopup.style.transform = 'translateX(-50%)';
            eventPopup.style.width = '250px';
            eventPopup.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            eventPopup.style.border = '1px solid #d3c7a6';
            eventPopup.style.borderRadius = '5px';
            eventPopup.style.padding = '15px';
            eventPopup.style.color = '#d3c7a6';
            eventPopup.style.zIndex = '9999';
            eventPopup.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.7)';
            eventPopup.style.fontSize = '14px';
            eventPopup.style.opacity = '0';
            eventPopup.style.transition = 'all 0.3s ease';
            eventPopup.style.marginBottom = '10px';
            
            // 添加标题
            const eventTitle = document.createElement('div');
            eventTitle.className = 'event-title';
            eventTitle.textContent = eventData.title;
            eventTitle.style.fontWeight = 'bold';
            eventTitle.style.marginBottom = '8px';
            eventTitle.style.textAlign = 'center';
            eventPopup.appendChild(eventTitle);
            
            // 添加描述
            const eventDesc = document.createElement('div');
            eventDesc.className = 'event-description';
            eventDesc.textContent = eventData.description;
            eventDesc.style.lineHeight = '1.4';
            eventPopup.appendChild(eventDesc);
            
            // 添加到日期元素
            const dateElement = document.querySelector('.date');
            dateElement.style.position = 'relative';
            dateElement.appendChild(eventPopup);
            
            // 显示动画
            setTimeout(() => {
                eventPopup.style.opacity = '1';
            }, 10);
            
            // 自动关闭
            setTimeout(() => {
                eventPopup.style.opacity = '0';
                setTimeout(() => {
                    eventPopup.remove();
                }, 300);
            }, 6000);
        }
    }
    
    // 初始化日期历史提示
    setupDateHistoryHints();
}

// 添加动画关键帧
function addJournalStylesAndAnimations() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @keyframes pulseDot {
            0%, 100% { opacity: 0.7; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.3); }
        }
        
        .journal-entries-list::-webkit-scrollbar {
            width: 5px;
        }
        
        .journal-entries-list::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.3);
        }
        
        .journal-entries-list::-webkit-scrollbar-thumb {
            background-color: rgba(211, 199, 166, 0.5);
            border-radius: 5px;
        }
        
        .entry-date {
            color: rgba(211, 199, 166, 0.8);
            font-style: italic;
        }
        
        .journal-panel {
            background: linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(20, 20, 20, 0.95), rgba(0, 0, 0, 0.9));
        }
    `;
    document.head.appendChild(styleElement);
}

// 在初始化函数中添加庄园日记功能
function initEffects() {
    // 保留其他效果...
    setupClickParticleEffect();
    setupParallaxEffect();
    setupBreathingEffects();
    setupEasterEggs();
    setupMouseTrailEffect();
    setupDrawingRecognition();
    setupCinematicEffects();
    setupSecretCode();
    setupTimeEvents();
    setupDateEvents();
    
    // 添加庄园日记系统
    addJournalStylesAndAnimations();
    setupManorJournal();
}

// 庄园地图探索系统
function setupManorMap() {
    // 创建地图图标
    const mapIcon = document.createElement('div');
    mapIcon.className = 'map-icon';
    mapIcon.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
        <path d="M3 6l6-3l6 3l6-3v15l-6 3l-6-3l-6 3V6z"></path>
        <path d="M9 3v15"></path>
        <path d="M15 6v15"></path>
    </svg>`;
    mapIcon.style.position = 'absolute';
    mapIcon.style.left = '-40px';
    mapIcon.style.top = '50%';
    mapIcon.style.transform = 'translateY(-50%)';
    mapIcon.style.color = '#d3c7a6';
    mapIcon.style.width = '30px';
    mapIcon.style.height = '30px';
    mapIcon.style.cursor = 'pointer';
    mapIcon.style.transition = 'all 0.3s ease';
    mapIcon.style.opacity = '0.7';
    mapIcon.style.zIndex = '10';
    
    // 悬停效果
    mapIcon.onmouseenter = () => {
        mapIcon.style.opacity = '1';
        mapIcon.style.transform = 'translateY(-50%) scale(1.1)';
        mapIcon.style.textShadow = '0 0 10px rgba(211, 199, 166, 0.7)';
    };
    
    mapIcon.onmouseleave = () => {
        mapIcon.style.opacity = '0.7';
        mapIcon.style.transform = 'translateY(-50%) scale(1)';
        mapIcon.style.textShadow = 'none';
    };
    
    // 添加到时钟框架
    const clockFrame = document.querySelector('.clock-frame');
    if (clockFrame) {
        clockFrame.appendChild(mapIcon);
    }
    
    // 庄园地图数据
    const manorLocations = [
        {
            id: "mansion",
            name: "庄园主宅",
            description: "奥尔菲斯的私人住所，华丽的外表下隐藏着无数秘密。一楼的会客厅经常举办宴会，但地下室却从不对访客开放。",
            dangerLevel: 5,
            noteFound: "主宅书房的地板下发现了一本记录，详细描述了一种名为'灵魂提取'的实验程序。"
        },
        {
            id: "hospital",
            name: "废弃医院",
            description: "曾经是医生进行实验的场所，现在充满了破碎的医疗设备和干涸的血迹。手术室的门总是紧锁着，据说里面还能听到病人的哀嚎。",
            dangerLevel: 4,
            noteFound: "一张沾血的病历表格表明，这里的'病人'全部来自失踪人口，没有一人登记入院。"
        },
        {
            id: "chapel",
            name: "红教堂",
            description: "原本是供奉神明的地方，现在却成为黑暗仪式的举办场所。祭坛下方有通往地下墓穴的通道，里面埋葬着无数实验失败的'材料'。",
            dangerLevel: 3,
            noteFound: "一本仪式手册上描述了如何利用多人的痛苦来'喂养'某种存在，使其具现化。"
        },
        {
            id: "park",
            name: "游乐园",
            description: "表面看来是为孩子们建造的欢乐场所，实际上是用来吸引和捕获年轻猎物的陷阱。旋转木马即使没有人操作也会在午夜自动旋转。",
            dangerLevel: 3,
            noteFound: "在一个小丑雕像后发现了记录纸条：'今日收获：4名。其中2名符合标准，已送往地下室。'"
        },
        {
            id: "lakeside",
            name: "湖畔村庄",
            description: "庄园边缘的渔村，村民们都是奥尔菲斯的仆从，负责掩盖庄园的秘密和处理'残余物'。湖底埋藏着无数无名尸骨。",
            dangerLevel: 2,
            noteFound: "村长的日记提到每月都需要向湖中投入'祭品'，以换取丰收和村民的安全。"
        },
        {
            id: "factory",
            name: "军工厂",
            description: "表面上生产军火，实际上制造着奇怪的机械装置，据说能够提取和储存人类的'精神能量'。工厂深处有一台巨大的中央机器，连接着整个庄园。",
            dangerLevel: 4,
            noteFound: "设计图纸展示了一种能将人类痛苦转化为能量的装置，标注为'永恒回环计划'的核心设备。"
        },
        {
            id: "forest",
            name: "雾森林",
            description: "环绕庄园的古老森林，树木异常高大，终年被浓雾笼罩。迷失在此的人很少能找到出路，森林仿佛有自己的意识，会不断变换道路。",
            dangerLevel: 5,
            noteFound: "一位探险家的最后记录：'我已经走了三天，但总是回到同一棵有扭曲人脸的树前。我不再相信这是普通的森林...'"
        },
        {
            id: "school",
            name: "白沙街学校",
            description: "一所曾经热闹的私立学校，如今只有破败的教学楼和长满杂草的操场。据说夜晚能听到教室里传来朗读声，但走进去只能看到空无一人的课桌。",
            dangerLevel: 2,
            noteFound: "教师办公室的档案柜中发现学生名册，所有名字都被划掉，旁边标注着'合格'或'不合格'。"
        }
    ];
    
    // 点击地图图标展开地图
    mapIcon.addEventListener('click', () => {
        openManorMap();
    });
    
    // 打开地图函数
    function openManorMap() {
        // 检查是否已存在地图面板
        if (document.querySelector('.map-panel')) {
            return;
        }
        
        // 创建地图面板
        const mapPanel = document.createElement('div');
        mapPanel.className = 'map-panel';
        mapPanel.style.position = 'absolute';
        mapPanel.style.left = '60px';
        mapPanel.style.top = '50%';
        mapPanel.style.transform = 'translateY(-50%) scale(0.95)';
        mapPanel.style.width = '450px';
        mapPanel.style.height = '500px';
        mapPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
        mapPanel.style.border = '2px solid #d3c7a6';
        mapPanel.style.borderRadius = '5px';
        mapPanel.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.8), 0 0 30px rgba(211, 199, 166, 0.3)';
        mapPanel.style.color = '#d3c7a6';
        mapPanel.style.fontFamily = 'serif';
        mapPanel.style.padding = '20px';
        mapPanel.style.zIndex = '9999';
        mapPanel.style.opacity = '0';
        mapPanel.style.transition = 'all 0.5s ease';
        mapPanel.style.overflowY = 'hidden';
        mapPanel.style.backdropFilter = 'blur(5px)';
        
        // 地图标题
        const mapTitle = document.createElement('div');
        mapTitle.className = 'map-title';
        mapTitle.textContent = '奥尔菲斯庄园地图';
        mapTitle.style.fontSize = '24px';
        mapTitle.style.textAlign = 'center';
        mapTitle.style.marginBottom = '15px';
        mapTitle.style.padding = '0 0 10px 0';
        mapTitle.style.borderBottom = '1px solid rgba(211, 199, 166, 0.5)';
        mapTitle.style.letterSpacing = '2px';
        mapTitle.style.textShadow = '0 0 8px rgba(211, 199, 166, 0.5)';
        mapPanel.appendChild(mapTitle);
        
        // 创建地图图形区域
        const mapGraphic = document.createElement('div');
        mapGraphic.className = 'map-graphic';
        mapGraphic.style.width = '100%';
        mapGraphic.style.height = '300px';
        mapGraphic.style.backgroundImage = 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgNDAwIDMwMCI+PHBhdGggZD0iTTE1MCAxNTBMMTAwIDUwTDIwMCA3MEwzMDAgNTBMMzUwIDE1MEwyNzAgMjUwTDE1MCAyMzBMNTAgMTUwWiIgc3Ryb2tlPSIjZDNjN2E2IiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIHN0cm9rZS1kYXNoYXJyYXk9IjUsMiIvPjwvc3ZnPg==")';
        mapGraphic.style.backgroundSize = 'contain';
        mapGraphic.style.backgroundPosition = 'center';
        mapGraphic.style.backgroundRepeat = 'no-repeat';
        mapGraphic.style.position = 'relative';
        mapGraphic.style.marginBottom = '15px';
        mapPanel.appendChild(mapGraphic);
        
        // 添加位置标记
        manorLocations.forEach(location => {
            const locationMarker = document.createElement('div');
            locationMarker.className = 'location-marker';
            locationMarker.dataset.location = location.id;
            
            // 根据位置ID确定位置
            const positions = {
                "mansion": { left: '50%', top: '45%' },
                "hospital": { left: '70%', top: '35%' },
                "chapel": { left: '30%', top: '30%' },
                "park": { left: '65%', top: '60%' },
                "lakeside": { left: '20%', top: '65%' },
                "factory": { left: '75%', top: '75%' },
                "forest": { left: '40%', top: '75%' },
                "school": { left: '35%', top: '55%' }
            };
            
            // 设置位置标记样式
            locationMarker.style.position = 'absolute';
            locationMarker.style.left = positions[location.id].left;
            locationMarker.style.top = positions[location.id].top;
            locationMarker.style.width = '15px';
            locationMarker.style.height = '15px';
            locationMarker.style.borderRadius = '50%';
            locationMarker.style.backgroundColor = `rgba(${location.dangerLevel * 51}, ${255 - location.dangerLevel * 51}, 50, 0.8)`;
            locationMarker.style.border = '2px solid #d3c7a6';
            locationMarker.style.transform = 'translate(-50%, -50%)';
            locationMarker.style.boxShadow = `0 0 10px rgba(${location.dangerLevel * 51}, ${255 - location.dangerLevel * 51}, 50, 0.8)`;
            locationMarker.style.cursor = 'pointer';
            locationMarker.style.zIndex = '2';
            locationMarker.style.transition = 'all 0.3s ease';
            
            // 悬停效果
            locationMarker.onmouseenter = () => {
                locationMarker.style.transform = 'translate(-50%, -50%) scale(1.3)';
                showLocationName(location, locationMarker);
            };
            
            locationMarker.onmouseleave = () => {
                locationMarker.style.transform = 'translate(-50%, -50%) scale(1)';
                hideLocationName();
            };
            
            // 点击效果
            locationMarker.onclick = () => {
                showLocationDetail(location);
            };
            
            mapGraphic.appendChild(locationMarker);
        });
        
        // 显示位置名称
        function showLocationName(location, marker) {
            // 移除之前可能存在的名称标签
            hideLocationName();
            
            const nameTag = document.createElement('div');
            nameTag.className = 'location-name-tag';
            nameTag.textContent = location.name;
            nameTag.style.position = 'absolute';
            nameTag.style.left = '50%';
            nameTag.style.bottom = '100%';
            nameTag.style.transform = 'translateX(-50%)';
            nameTag.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            nameTag.style.color = '#d3c7a6';
            nameTag.style.padding = '5px 10px';
            nameTag.style.borderRadius = '3px';
            nameTag.style.fontSize = '12px';
            nameTag.style.whiteSpace = 'nowrap';
            nameTag.style.marginBottom = '5px';
            nameTag.style.zIndex = '3';
            nameTag.style.pointerEvents = 'none';
            
            marker.appendChild(nameTag);
        }
        
        // 隐藏位置名称
        function hideLocationName() {
            const existingTags = document.querySelectorAll('.location-name-tag');
            existingTags.forEach(tag => tag.remove());
        }
        
        // 显示位置详细信息
        function showLocationDetail(location) {
            // 移除之前可能存在的详情面板
            const existingDetail = mapPanel.querySelector('.location-detail-panel');
            if (existingDetail) {
                existingDetail.remove();
            }
            
            // 创建详情面板
            const detailPanel = document.createElement('div');
            detailPanel.className = 'location-detail-panel';
            detailPanel.style.width = '100%';
            detailPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            detailPanel.style.border = '1px solid #d3c7a6';
            detailPanel.style.borderRadius = '5px';
            detailPanel.style.padding = '15px';
            detailPanel.style.animation = 'fadeIn 0.3s ease';
            
            // 位置标题
            const detailTitle = document.createElement('div');
            detailTitle.className = 'detail-title';
            detailTitle.textContent = location.name;
            detailTitle.style.fontSize = '18px';
            detailTitle.style.marginBottom = '5px';
            detailTitle.style.fontWeight = 'bold';
            detailTitle.style.color = '#d3c7a6';
            detailPanel.appendChild(detailTitle);
            
            // 危险等级
            const dangerLevel = document.createElement('div');
            dangerLevel.className = 'danger-level';
            dangerLevel.innerHTML = `危险等级: <span style="color: rgb(${location.dangerLevel * 51}, ${255 - location.dangerLevel * 51}, 50);">${'★'.repeat(location.dangerLevel)}</span>`;
            dangerLevel.style.fontSize = '14px';
            dangerLevel.style.marginBottom = '10px';
            detailPanel.appendChild(dangerLevel);
            
            // 位置描述
            const detailDesc = document.createElement('div');
            detailDesc.className = 'detail-description';
            detailDesc.textContent = location.description;
            detailDesc.style.fontSize = '14px';
            detailDesc.style.lineHeight = '1.4';
            detailDesc.style.marginBottom = '10px';
            detailPanel.appendChild(detailDesc);
            
            // 发现的笔记
            const noteFound = document.createElement('div');
            noteFound.className = 'note-found';
            noteFound.innerHTML = `<span style="color: #be8c4d; font-style: italic;">发现笔记:</span> ${location.noteFound}`;
            noteFound.style.fontSize = '13px';
            noteFound.style.padding = '10px';
            noteFound.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            noteFound.style.borderLeft = '3px solid #be8c4d';
            noteFound.style.marginTop = '10px';
            detailPanel.appendChild(noteFound);
            
            mapPanel.appendChild(detailPanel);
        }
        
        // 添加关闭按钮
        const closeButton = document.createElement('div');
        closeButton.textContent = '×';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '15px';
        closeButton.style.fontSize = '24px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.color = '#d3c7a6';
        closeButton.style.opacity = '0.7';
        closeButton.style.transition = 'all 0.3s ease';
        closeButton.style.zIndex = '3';
        
        closeButton.onmouseenter = () => {
            closeButton.style.opacity = '1';
            closeButton.style.transform = 'scale(1.2)';
        };
        
        closeButton.onmouseleave = () => {
            closeButton.style.opacity = '0.7';
            closeButton.style.transform = 'scale(1)';
        };
        
        closeButton.onclick = () => {
            mapPanel.style.opacity = '0';
            setTimeout(() => {
                mapPanel.remove();
            }, 500);
        };
        
        mapPanel.appendChild(closeButton);
        clockFrame.appendChild(mapPanel);
        
        // 显示动画
        setTimeout(() => {
            mapPanel.style.opacity = '1';
            mapPanel.style.transform = 'translateY(-50%) scale(1)';
        }, 10);
    }
} 

// 监管者演算系统与庄园通告
function setupHunterAlgorithm() {
    // 保存原始状态，以便恢复
    let originalQuote = document.querySelector('.quote').textContent;
    let hasNotificationShown = false;
    
    // 通告数据库
    const announcements = [
        "注意：执行者现已启用。禁止在走廊奔跑。违者将被处罚。",
        "警告：湖畔村庄区域已封锁，进行消毒处理。请勿接近。",
        "所有访客请注意，地下室仍然禁止进入。违反者后果自负。",
        "今日特殊实验进行中，所有人员保持安静。不要去听任何声音。",
        "晚间门禁时间调整为晚上9点。午夜后发现的任何人将被视为自愿测试者。",
        "医生需要更多志愿者。有兴趣者请到医院登记。提供丰厚报酬。",
        "庄园管理处提醒：监控系统已升级，没有任何行为能逃过监视。",
        "记住规则：不要尖叫，不要反抗，不要试图逃跑。这对大家都好。",
        "今晚在红教堂举行特别的庆祝活动。所有人必须参加。准备好你的面具。",
        "提醒：如发现任何异常现象，请立即向管理员报告，不要私自调查。"
    ];
    
    // 计算器系统状态
    let algorithmActive = false;
    let countdownInterval = null;
    let currentCountdown = 0;
    
    // 随机触发监管者演算系统
    function setupRandomTrigger() {
        // 随机间隔触发，平均每20-40分钟一次
        const randomInterval = Math.floor(Math.random() * 1200000) + 1200000;
        
        setTimeout(() => {
            // 70%概率触发
            if (Math.random() < 0.7) {
                triggerHunterAlgorithm();
            }
            
            // 再次设置随机触发
            setupRandomTrigger();
        }, randomInterval);
    }
    
    // 设置初始随机触发
    setupRandomTrigger();
    
    // 定期显示庄园通告
    function setupAnnouncementSystem() {
        // 每5-10分钟随机显示一次通告
        setInterval(() => {
            // 50%概率显示通告
            if (Math.random() < 0.5 && !algorithmActive && !hasNotificationShown) {
                showAnnouncement();
            }
        }, 300000 + Math.random() * 300000);
    }
    
    // 设置通告系统
    setupAnnouncementSystem();
    
    // 显示庄园通告
    function showAnnouncement() {
        hasNotificationShown = true;
        const quote = document.querySelector('.quote');
        
        // 保存原始引言
        if (!originalQuote) {
            originalQuote = quote.textContent;
        }
        
        // 随机选择一条通告
        const announcement = announcements[Math.floor(Math.random() * announcements.length)];
        
        // 通告面板
        const announcementPanel = document.createElement('div');
        announcementPanel.className = 'announcement-panel';
        announcementPanel.style.position = 'absolute';
        announcementPanel.style.bottom = '60px';
        announcementPanel.style.left = '50%';
        announcementPanel.style.transform = 'translateX(-50%)';
        announcementPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        announcementPanel.style.border = '1px solid #d3c7a6';
        announcementPanel.style.borderLeft = '5px solid #8a0303';
        announcementPanel.style.padding = '10px 15px';
        announcementPanel.style.width = '80%';
        announcementPanel.style.maxWidth = '700px';
        announcementPanel.style.borderRadius = '3px';
        announcementPanel.style.fontSize = '16px';
        announcementPanel.style.color = '#d3c7a6';
        announcementPanel.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
        announcementPanel.style.zIndex = '9999';
        announcementPanel.style.opacity = '0';
        announcementPanel.style.transition = 'all 0.5s ease';
        
        // 标题
        const announcementTitle = document.createElement('div');
        announcementTitle.className = 'announcement-title';
        announcementTitle.innerHTML = '<span style="color: #8a0303;">■</span> 庄园通告';
        announcementTitle.style.fontSize = '18px';
        announcementTitle.style.fontWeight = 'bold';
        announcementTitle.style.marginBottom = '10px';
        announcementPanel.appendChild(announcementTitle);
        
        // 内容
        const announcementContent = document.createElement('div');
        announcementContent.className = 'announcement-content';
        announcementContent.textContent = announcement;
        announcementContent.style.lineHeight = '1.5';
        announcementPanel.appendChild(announcementContent);
        
        document.body.appendChild(announcementPanel);
        
        // 显示动画
        setTimeout(() => {
            announcementPanel.style.opacity = '1';
        }, 100);
        
        // 15秒后消失
        setTimeout(() => {
            announcementPanel.style.opacity = '0';
            setTimeout(() => {
                announcementPanel.remove();
                hasNotificationShown = false;
            }, 500);
        }, 15000);
    }
    
    // 触发监管者演算倒计时
    function triggerHunterAlgorithm() {
        if (algorithmActive) return;
        algorithmActive = true;
        
        // 播放警告声音（如果允许）
        tryPlaySound('warning');
        
        // 创建演算系统UI
        const algorithmPanel = document.createElement('div');
        algorithmPanel.className = 'hunter-algorithm-panel';
        algorithmPanel.style.position = 'fixed';
        algorithmPanel.style.top = '20px';
        algorithmPanel.style.right = '20px';
        algorithmPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
        algorithmPanel.style.border = '2px solid #8a0303';
        algorithmPanel.style.borderRadius = '5px';
        algorithmPanel.style.padding = '15px';
        algorithmPanel.style.color = '#d3c7a6';
        algorithmPanel.style.zIndex = '9999';
        algorithmPanel.style.width = '300px';
        algorithmPanel.style.boxShadow = '0 0 20px rgba(138, 3, 3, 0.5)';
        algorithmPanel.style.fontFamily = 'monospace';
        
        // 标题
        const title = document.createElement('div');
        title.className = 'algorithm-title';
        title.innerHTML = '监管者演算系统 <span style="color: #8a0303;">ACTIVE</span>';
        title.style.fontSize = '16px';
        title.style.marginBottom = '10px';
        title.style.borderBottom = '1px solid #8a0303';
        title.style.paddingBottom = '5px';
        algorithmPanel.appendChild(title);
        
        // 状态指示灯
        const statusIndicator = document.createElement('div');
        statusIndicator.className = 'status-indicator';
        statusIndicator.style.width = '10px';
        statusIndicator.style.height = '10px';
        statusIndicator.style.borderRadius = '50%';
        statusIndicator.style.backgroundColor = '#8a0303';
        statusIndicator.style.position = 'absolute';
        statusIndicator.style.top = '20px';
        statusIndicator.style.right = '15px';
        statusIndicator.style.boxShadow = '0 0 10px #8a0303';
        statusIndicator.style.animation = 'pulse 1s infinite';
        algorithmPanel.appendChild(statusIndicator);
        
        // 倒计时
        const countdown = document.createElement('div');
        countdown.className = 'algorithm-countdown';
        countdown.style.textAlign = 'center';
        countdown.style.fontSize = '36px';
        countdown.style.margin = '10px 0';
        countdown.style.color = '#8a0303';
        countdown.style.fontWeight = 'bold';
        countdown.style.textShadow = '0 0 10px rgba(138, 3, 3, 0.7)';
        algorithmPanel.appendChild(countdown);
        
        // 状态文本
        const statusText = document.createElement('div');
        statusText.className = 'algorithm-status';
        statusText.textContent = '监管者接近中...';
        statusText.style.textAlign = 'center';
        statusText.style.fontSize = '14px';
        statusText.style.marginBottom = '10px';
        statusText.style.color = '#d3c7a6';
        algorithmPanel.appendChild(statusText);
        
        // 进度条容器
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        progressContainer.style.width = '100%';
        progressContainer.style.height = '10px';
        progressContainer.style.backgroundColor = 'rgba(138, 3, 3, 0.3)';
        progressContainer.style.borderRadius = '5px';
        progressContainer.style.overflow = 'hidden';
        algorithmPanel.appendChild(progressContainer);
        
        // 进度条
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.height = '100%';
        progressBar.style.width = '100%';
        progressBar.style.backgroundColor = '#8a0303';
        progressBar.style.transition = 'width 1s linear';
        progressContainer.appendChild(progressBar);
        
        document.body.appendChild(algorithmPanel);
        
        // 设置倒计时时间（随机60-90秒）
        currentCountdown = Math.floor(Math.random() * 31) + 60;
        countdown.textContent = currentCountdown;
        
        // 启动倒计时
        countdownInterval = setInterval(() => {
            currentCountdown--;
            countdown.textContent = currentCountdown;
            
            // 更新进度条
            const progressPercent = (currentCountdown / (Math.floor(Math.random() * 31) + 60)) * 100;
            progressBar.style.width = `${progressPercent}%`;
            
            // 更新状态文本
            if (currentCountdown <= 10) {
                statusText.textContent = '警告：监管者已锁定目标';
                statusText.style.color = '#ff0000';
                statusIndicator.style.animation = 'pulse 0.5s infinite';
                
                // 屏幕震动效果
                document.body.style.animation = 'shake 0.5s infinite';
            } else if (currentCountdown <= 30) {
                statusText.textContent = '危险：监管者正在搜寻';
                statusText.style.color = '#ff6600';
                statusIndicator.style.animation = 'pulse 0.8s infinite';
            }
            
            // 倒计时结束
            if (currentCountdown <= 0) {
                clearInterval(countdownInterval);
                hunterArrived();
            }
        }, 1000);
        
        // 创建闪烁动画样式
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(styleElement);
        
        // 监管者到达
        function hunterArrived() {
            // 停止震动
            document.body.style.animation = '';
            
            // 移除演算面板
            algorithmPanel.style.animation = 'fadeOut 0.5s forwards';
            setTimeout(() => {
                algorithmPanel.remove();
            }, 500);
            
            // 触发监管者彩蛋
            if (typeof triggerHunterEasterEgg === 'function') {
                triggerHunterEasterEgg();
            } else {
                // 如果没有监管者彩蛋函数，创建简易版本
                simpleHunterEffect();
            }
            
            // 重置状态
            setTimeout(() => {
                algorithmActive = false;
            }, 10000);
        }
        
        // 简易监管者效果
        function simpleHunterEffect() {
            console.log("Simple Hunter Effect triggered");
            // 屏幕变红效果
            const redOverlay = document.createElement('div');
            redOverlay.className = 'red-overlay';
            redOverlay.style.position = 'fixed';
            redOverlay.style.top = '0';
            redOverlay.style.left = '0';
            redOverlay.style.width = '100%';
            redOverlay.style.height = '100%';
            redOverlay.style.backgroundColor = 'rgba(138, 3, 3, 0.3)';
            redOverlay.style.zIndex = '9990';
            redOverlay.style.opacity = '0';
            redOverlay.style.transition = 'opacity 0.3s ease';
            document.body.appendChild(redOverlay);
            
            // 显示红色滤镜
            setTimeout(() => {
                redOverlay.style.opacity = '1';
                
                // 3秒后淡出
                setTimeout(() => {
                    redOverlay.style.opacity = '0';
                    setTimeout(() => {
                        redOverlay.remove();
                    }, 300);
                }, 3000);
            }, 100);
            
            // 播放音效（如果允许）
            tryPlaySound('hunter');
        }
        
        // 尝试播放音效（只有用户交互后才能播放）
        function tryPlaySound(type) {
            // 这个函数什么都不做，因为Wallpaper Engine会自己处理音效
            // 实际使用时可以添加适当的音效资源
            console.log(`Would play ${type} sound if audio was enabled`);
        }
    }
} 

// 添加CSS动画
function addMapStyles() {
    const mapStyles = document.createElement('style');
    mapStyles.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes mapMarkerPulse {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.2); box-shadow: 0 0 15px currentColor; }
        }
        
        .map-icon {
            animation: gentle-float-horizontal 3s ease-in-out infinite;
        }
        
        @keyframes gentle-float-horizontal {
            0%, 100% { transform: translateY(-50%) translateX(0); }
            50% { transform: translateY(-50%) translateX(-5px); }
        }
        
        .location-marker {
            animation: mapMarkerPulse 3s infinite;
            animation-delay: calc(var(--index) * 0.5s);
        }
        
        .location-detail-panel {
            animation: fadeIn 0.3s ease;
        }
    `;
    document.head.appendChild(mapStyles);
}

// 在初始化函数中添加地图系统
function initEffects() {
    // 保留其他效果...
    setupClickParticleEffect();
    setupParallaxEffect();
    setupBreathingEffects();
    setupEasterEggs();
    setupMouseTrailEffect();
    setupDrawingRecognition();
    setupCinematicEffects();
    setupSecretCode();
    setupTimeEvents();
    setupAdvancedGestureRecognition();
    setupDecoderMiniGame();
    
    // 添加庄园日记系统
    setupManorJournal();
    
    // 添加庄园地图系统
    addMapStyles();
    setupManorMap();
    
    // 添加监管者演算系统
    setupHunterAlgorithm();
}

// 添加视频背景处理代码
function setupVideoBackground() {
    const video = document.querySelector('.background-video');
    const fallbackBg = document.querySelector('.background');
    
    // 视频错误处理，如果视频无法播放则显示静态背景
    video.addEventListener('error', () => {
        console.log('视频加载失败，显示静态背景');
        video.style.display = 'none';
        if (fallbackBg) {
            fallbackBg.style.display = 'block';
        }
    });
    
    // 确保视频始终播放
    video.addEventListener('canplay', () => {
        // 在某些浏览器中可能需要手动启动播放
        video.play().catch(err => {
            console.log('自动播放受阻：', err);
            // 显示一个播放按钮可能会是个好主意
            createPlayButton();
        });
    });
    
    // 添加视频到视差效果
    if (typeof setupParallaxEffect === 'function') {
        const originalSetupParallax = setupParallaxEffect;
        
        // 重写视差效果函数以包含视频
        setupParallaxEffect = function() {
            originalSetupParallax();
            
            // 添加视频到视差效果
            document.addEventListener('mousemove', (event) => {
                const xAxis = (window.innerWidth / 2 - event.pageX) / 25;
                const yAxis = (window.innerHeight / 2 - event.pageY) / 25;
                
                if (video) {
                    video.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
                }
            });
        };
    }
    
    // 创建播放按钮（在自动播放失败时）
    function createPlayButton() {
        const playButton = document.createElement('div');
        playButton.className = 'play-button';
        playButton.innerHTML = `
            <svg viewBox="0 0 24 24" width="48" height="48" stroke="#d3c7a6" stroke-width="2" fill="none">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="10 8 16 12 10 16" fill="#d3c7a6"></polygon>
            </svg>
        `;
        playButton.style.position = 'absolute';
        playButton.style.top = '50%';
        playButton.style.left = '50%';
        playButton.style.transform = 'translate(-50%, -50%)';
        playButton.style.zIndex = '1000';
        playButton.style.cursor = 'pointer';
        playButton.style.opacity = '0.8';
        playButton.style.transition = 'opacity 0.3s ease';
        
        playButton.addEventListener('mouseenter', () => {
            playButton.style.opacity = '1';
        });
        
        playButton.addEventListener('mouseleave', () => {
            playButton.style.opacity = '0.8';
        });
        
        playButton.addEventListener('click', () => {
            video.play();
            playButton.remove();
        });
        
        document.querySelector('.container').appendChild(playButton);
    }
    
    // 添加bloom效果
    setupBloomEffect();
}

// 在初始化函数中添加视频背景设置
function initEffects() {
    // 首先设置视频背景
    setupVideoBackground();
    
    // 保留其他效果...
    setupClickParticleEffect();
    setupParallaxEffect();
    // ...其他已有设置
}

// 添加Bloom光晕效果函数
function setupBloomEffect() {
    // 创建bloom效果层
    const bloomLayer = document.createElement('div');
    bloomLayer.className = 'bloom-effect';
    
    // 将bloom层添加到容器
    const container = document.querySelector('.container');
    container.insertBefore(bloomLayer, container.firstChild.nextSibling); // 放在背景视频之后
    
    // 添加动态光效
    let bloomIntensity = 0.15; // 初始强度
    
    // 周期性轻微变化Bloom效果强度，使画面更生动
    setInterval(() => {
        // 在0.12和0.18之间微妙变化
        bloomIntensity = 0.15 + (Math.random() * 0.06 - 0.03);
        bloomLayer.style.boxShadow = `inset 0 0 100px rgba(255, 255, 255, ${bloomIntensity}), 
                                     inset 0 0 50px rgba(211, 199, 166, ${bloomIntensity * 0.7})`;
    }, 3000);
}

// 在视频背景设置中调用Bloom效果
function setupVideoBackground() {
    // 原有代码保持不变...
    
    // 添加bloom效果
    setupBloomEffect();
    
    // 其余代码...
}

// 修复函数冲突和重复定义问题
function initializeWallpaper() {
    // 1. 设置视频背景
    setupVideoBackground();
    
    // 2. 设置各种效果
    setupClickParticleEffect();
    setupParallaxEffect();
    setupBreathingEffects();
    setupEasterEggs();
    setupMouseTrailEffect();
    setupDrawingRecognition();
    setupCinematicEffects();
    setupSecretCode();
    setupTimeEvents();
    setupAdvancedGestureRecognition();
    
    // 3. 设置第五人格特有功能
    setupDecoderMiniGame();  // 解码小游戏
    setupManorJournal();     // 庄园日记系统
    setupManorMap();         // 庄园地图系统
    setupHunterAlgorithm();  // 监管者演算系统
}

// 视频背景与Bloom效果处理
function setupVideoBackground() {
    const video = document.querySelector('.background-video');
    const fallbackBg = document.querySelector('.background');
    
    // Bloom效果设置
    setupBloomEffect();
    
    // 视频错误处理
    video.addEventListener('error', () => {
        console.log('视频加载失败，显示静态背景');
        video.style.display = 'none';
        if (fallbackBg) {
            fallbackBg.style.display = 'block';
        }
    });
    
    // 确保视频始终播放
    video.addEventListener('canplay', () => {
        video.play().catch(err => {
            console.log('自动播放受阻：', err);
            createPlayButton();
        });
    });
    
    // 添加视频到视差效果
    document.addEventListener('mousemove', (event) => {
        const xAxis = (window.innerWidth / 2 - event.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - event.pageY) / 25;
        
        if (video) {
            video.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
        }
    });
    
    // 创建播放按钮（在自动播放失败时）
    function createPlayButton() {
        const playButton = document.createElement('div');
        playButton.className = 'play-button';
        playButton.innerHTML = `
            <svg viewBox="0 0 24 24" width="48" height="48" stroke="#d3c7a6" stroke-width="2" fill="none">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="10 8 16 12 10 16" fill="#d3c7a6"></polygon>
            </svg>
        `;
        playButton.style.position = 'absolute';
        playButton.style.top = '50%';
        playButton.style.left = '50%';
        playButton.style.transform = 'translate(-50%, -50%)';
        playButton.style.zIndex = '1000';
        playButton.style.cursor = 'pointer';
        playButton.style.opacity = '0.8';
        playButton.style.transition = 'opacity 0.3s ease';
        
        playButton.addEventListener('mouseenter', () => {
            playButton.style.opacity = '1';
        });
        
        playButton.addEventListener('mouseleave', () => {
            playButton.style.opacity = '0.8';
        });
        
        playButton.addEventListener('click', () => {
            video.play();
            playButton.remove();
        });
        
        document.querySelector('.container').appendChild(playButton);
    }
}

// 启动壁纸初始化
document.addEventListener('DOMContentLoaded', initializeWallpaper);

// 添加电影颗粒效果和红光效果
function setupCinematicEnhancements() {
    const container = document.querySelector('.container');
    
    // 添加中心红光效果
    const radialGlow = document.createElement('div');
    radialGlow.className = 'radial-glow';
    radialGlow.style.position = 'absolute';
    radialGlow.style.top = '0';
    radialGlow.style.left = '0';
    radialGlow.style.width = '100%';
    radialGlow.style.height = '100%';
    radialGlow.style.zIndex = '-1';
    radialGlow.style.pointerEvents = 'none';
    radialGlow.style.mixBlendMode = 'screen';
    container.insertBefore(radialGlow, container.querySelector('.overlay').nextSibling);
    
    // 添加胶片颗粒效果
    const filmGrain = document.createElement('div');
    filmGrain.className = 'film-grain';
    container.appendChild(filmGrain);
    
    // 增强胶片颗粒的动态性
    let grainIntensity = 0.25;
    
    // 随机变化颗粒强度
    setInterval(() => {
        grainIntensity = 0.2 + Math.random() * 0.15;
        filmGrain.style.opacity = grainIntensity.toString();
        
        // 随机应用轻微RGB分离效果，增强电影感
        if (Math.random() > 0.85) {
            // 偶尔出现RGB分离
            const rgbSeparation = `
                rgb(${Math.floor(Math.random() * 10) - 5}px, 
                    ${Math.floor(Math.random() * 10) - 5}px, 
                    ${Math.floor(Math.random() * 10) - 5}px)
            `;
            filmGrain.style.textShadow = rgbSeparation;
        } else {
            filmGrain.style.textShadow = 'none';
        }
    }, 1000);
    
    // 调整红光呼吸效果 - 降低强度范围
    let glowIntensity = 0.15;
    let increasing = true;
    
    setInterval(() => {
        if (increasing) {
            glowIntensity += 0.01;
            if (glowIntensity >= 0.25) increasing = false; // 降低最大强度从0.35到0.25
        } else {
            glowIntensity -= 0.01;
            if (glowIntensity <= 0.10) increasing = true; // 提高最小强度从0.08到0.10
        }
        
        // 更新红光效果 - 恢复原来范围
        radialGlow.style.background = `radial-gradient(
            circle at center,
            rgba(255, 30, 30, ${glowIntensity}) 0%,
            rgba(255, 30, 30, ${glowIntensity/2}) 15%,
            rgba(255, 0, 0, ${glowIntensity/5}) 30%,
            transparent 60%
        )`;
    }, 100);
}

// 修复视频背景与Bloom效果
function setupVideoBackground() {
    const video = document.querySelector('.background-video');
    const fallbackBg = document.querySelector('.background');
    
    // 增强Bloom效果
    setupBloomEffect();
    
    // 视频错误处理
    video.addEventListener('error', () => {
        console.log('视频加载失败，显示静态背景');
        video.style.display = 'none';
        if (fallbackBg) {
            fallbackBg.style.display = 'block';
        }
    });
    
    // 确保视频始终播放
    video.addEventListener('canplay', () => {
        video.play().catch(err => {
            console.log('自动播放受阻：', err);
            createPlayButton();
        });
    });
    
    // 添加视频到视差效果
    document.addEventListener('mousemove', (event) => {
        const xAxis = (window.innerWidth / 2 - event.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - event.pageY) / 25;
        
        if (video) {
            video.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
        }
    });
    
    // 创建播放按钮（在自动播放失败时）
    function createPlayButton() {
        const playButton = document.createElement('div');
        playButton.className = 'play-button';
        playButton.innerHTML = `
            <svg viewBox="0 0 24 24" width="48" height="48" stroke="#d3c7a6" stroke-width="2" fill="none">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="10 8 16 12 10 16" fill="#d3c7a6"></polygon>
            </svg>
        `;
        playButton.style.position = 'absolute';
        playButton.style.top = '50%';
        playButton.style.left = '50%';
        playButton.style.transform = 'translate(-50%, -50%)';
        playButton.style.zIndex = '1000';
        playButton.style.cursor = 'pointer';
        playButton.style.opacity = '0.8';
        playButton.style.transition = 'opacity 0.3s ease';
        
        playButton.addEventListener('mouseenter', () => {
            playButton.style.opacity = '1';
        });
        
        playButton.addEventListener('mouseleave', () => {
            playButton.style.opacity = '0.8';
        });
        
        playButton.addEventListener('click', () => {
            video.play();
            playButton.remove();
        });
        
        document.querySelector('.container').appendChild(playButton);
    }
}

// 增强Bloom效果
function setupBloomEffect() {
    // 创建bloom效果层
    const bloomLayer = document.createElement('div');
    bloomLayer.className = 'bloom-effect';
    
    // 将bloom层添加到容器
    const container = document.querySelector('.container');
    container.insertBefore(bloomLayer, container.firstChild.nextSibling); // 放在背景视频之后
    
    // 添加动态光效 - 增强强度
    let bloomIntensity = 0.25; // 增强初始强度从0.15到0.25
    
    // 周期性轻微变化Bloom效果强度，使画面更生动
    setInterval(() => {
        // 在0.2和0.3之间微妙变化 (增强整体强度)
        bloomIntensity = 0.25 + (Math.random() * 0.1 - 0.05);
        bloomLayer.style.boxShadow = `inset 0 0 100px rgba(255, 255, 255, ${bloomIntensity}), 
                                     inset 0 0 50px rgba(211, 199, 166, ${bloomIntensity * 0.7})`;
    }, 3000);
}

// 单一的初始化函数 - 包含所有功能
function initializeWallpaper() {
    // 1. 设置视频背景和光效
    setupVideoBackground();
    setupCinematicEnhancements();
    
    // 2. 设置基础效果
    setupClickParticleEffect();
    setupParallaxEffect();
    setupBreathingEffects();
    setupEasterEggs();
    setupMouseTrailEffect();
    setupDrawingRecognition();
    setupCinematicEffects();
    setupSecretCode();
    setupTimeEvents();
    setupAdvancedGestureRecognition();
    
    // 3. 设置第五人格特有功能
    setupDecoderMiniGame();  // 解码小游戏
    setupManorJournal();     // 庄园日记系统
    setupManorMap();         // 庄园地图系统
    setupHunterAlgorithm();  // 监管者演算系统
}

// 启动壁纸
document.addEventListener('DOMContentLoaded', initializeWallpaper);