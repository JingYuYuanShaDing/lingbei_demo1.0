document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.querySelector('.loader').classList.add('hidden');
    }, 1500);
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active-nav');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active-nav');
            }
        });
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    initCharts();
    initAIAssistant();
    initSceneModal();
    initParticlesBackground();
    initTrafficLightSimulation();
    initRouteUpdate();
});
function initCharts() {
    const energyCtx = document.getElementById('energyChart').getContext('2d');
    const energyChart = new Chart(energyCtx, {
        type: 'line',
        data: {
            labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
            datasets: [{
                label: '能源消耗 (kWh)',
                data: [850, 780, 720, 950, 1150, 1200, 1350, 1245],
                borderColor: '#00f0ff',
                backgroundColor: 'rgba(0, 240, 255, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: { color: 'rgba(100, 255, 218, 0.1)' },
                    ticks: { color: '#8892b0' }
                },
                x: {
                    grid: { color: 'rgba(100, 255, 218, 0.1)' },
                    ticks: { color: '#8892b0' }
                }
            }
        }
    });
    const trafficCtx = document.getElementById('trafficChart').getContext('2d');
    const trafficChart = new Chart(trafficCtx, {
        type: 'bar',
        data: {
            labels: ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
            datasets: [{
                label: '平均车速 (km/h)',
                data: [55, 32, 48, 45, 30, 52],
                backgroundColor: [
                    'rgba(0, 240, 255, 0.7)',
                    'rgba(179, 0, 255, 0.7)',
                    'rgba(0, 240, 255, 0.7)',
                    'rgba(0, 240, 255, 0.7)',
                    'rgba(179, 0, 255, 0.7)',
                    'rgba(0, 240, 255, 0.7)'
                ],
                borderColor: [
                    'rgba(0, 240, 255, 1)',
                    'rgba(179, 0, 255, 1)',
                    'rgba(0, 240, 255, 1)',
                    'rgba(0, 240, 255, 1)',
                    'rgba(179, 0, 255, 1)',
                    'rgba(0, 240, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(100, 255, 218, 0.1)' },
                    ticks: { color: '#8892b0' }
                },
                x: {
                    grid: { color: 'rgba(100, 255, 218, 0.1)' },
                    ticks: { color: '#8892b0' }
                }
            }
        }
    });
    if (document.getElementById('trafficFlowChart')) {
        const trafficFlowCtx = document.getElementById('trafficFlowChart').getContext('2d');
        const trafficFlowChart = new Chart(trafficFlowCtx, {
            type: 'line',
            data: {
                labels: ['6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
                datasets: [
                    {
                        label: '优化前',
                        data: [45, 85, 60, 55, 62, 70, 95, 65],
                        borderColor: 'rgba(255, 99, 132, 0.7)',
                        backgroundColor: 'rgba(255, 99, 132, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: '优化后',
                        data: [45, 60, 48, 42, 45, 50, 65, 52],
                        borderColor: 'rgba(0, 240, 255, 0.7)',
                        backgroundColor: 'rgba(0, 240, 255, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', labels: { color: '#8892b0' } },
                    tooltip: { mode: 'index', intersect: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: '拥堵指数', color: '#8892b0' },
                        grid: { color: 'rgba(100, 255, 218, 0.1)' },
                        ticks: { color: '#8892b0' }
                    },
                    x: {
                        grid: { color: 'rgba(100, 255, 218, 0.1)' },
                        ticks: { color: '#8892b0' }
                    }
                }
            }
        });
    }
    if (document.getElementById('carbonEmissionChart')) {
        const carbonEmissionCtx = document.getElementById('carbonEmissionChart').getContext('2d');
        const carbonEmissionChart = new Chart(carbonEmissionCtx, {
            type: 'bar',
            data: {
                labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
                datasets: [
                    {
                        label: '优化前',
                        data: [1200, 1150, 1050, 980, 920, 880],
                        backgroundColor: 'rgba(255, 99, 132, 0.7)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: '优化后',
                        data: [1200, 1050, 850, 720, 650, 580],
                        backgroundColor: 'rgba(75, 192, 192, 0.7)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', labels: { color: '#8892b0' } },
                    tooltip: { mode: 'index', intersect: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: '碳排放量 (吨)', color: '#8892b0' },
                        grid: { color: 'rgba(100, 255, 218, 0.1)' },
                        ticks: { color: '#8892b0' }
                    },
                    x: {
                        grid: { color: 'rgba(100, 255, 218, 0.1)' },
                        ticks: { color: '#8892b0' }
                    }
                }
            }
        });
    }
}
function initAIAssistant() {
    const aiButton = document.getElementById('ai-button');
    const aiChat = document.getElementById('ai-chat');
    const aiChatClose = document.getElementById('ai-chat-close');
    const aiChatBody = document.getElementById('ai-chat-body');
    const aiChatInput = document.getElementById('ai-chat-input');
    const aiChatSend = document.getElementById('ai-chat-send');
    aiButton.addEventListener('click', function() {
        aiChat.classList.toggle('active');
    });
    aiChatClose.addEventListener('click', function() {
        aiChat.classList.remove('active');
    });
    function sendMessage() {
        const message = aiChatInput.value.trim();
        if (message) {
            addMessage('user', message);
            aiChatInput.value = '';
            showLoading();
            setTimeout(function() {
                hideLoading();
                const response = getAIResponse(message);
                addMessage('ai', response);
            }, 1000);
        }
    }
    aiChatSend.addEventListener('click', sendMessage);
    aiChatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    function addMessage(type, content) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.textContent = content;
        messageDiv.appendChild(messageContent);
        aiChatBody.appendChild(messageDiv);
        aiChatBody.scrollTop = aiChatBody.scrollHeight;
    }
    function showLoading() {
        const loadingDiv = document.createElement('div');
        loadingDiv.classList.add('message', 'ai', 'loading');
        const loadingContent = document.createElement('div');
        loadingContent.classList.add('message-content');
        const loadingDots = document.createElement('div');
        loadingDots.classList.add('loading-dots', 'flex', 'space-x-1');
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            dot.classList.add('w-2', 'h-2', 'bg-accent-color', 'rounded-full');
            loadingDots.appendChild(dot);
        }
        loadingContent.appendChild(loadingDots);
        loadingDiv.appendChild(loadingContent);
        aiChatBody.appendChild(loadingDiv);
        aiChatBody.scrollTop = aiChatBody.scrollHeight;
    }
    function hideLoading() {
        const loadingDiv = document.querySelector('.message.loading');
        if (loadingDiv) {
            loadingDiv.remove();
        }
    }
    function getAIResponse(message) {
        message = message.toLowerCase();
        if (message.includes('你好') || message.includes('hi') || message.includes('hello')) {
            return '您好！我是 NeoCity 的 AI 城市顾问。有什么可以帮助您了解智能城市的吗？';
        }
        else if (message.includes('智能交通') || message.includes('交通')) {
            return 'NeoCity 的智能交通系统采用 AI 控制的信号灯和实时路况监控，可减少 30% 的交通拥堵。系统还支持自动驾驶车辆的协同调度，提高道路利用率。';
        }
        else if (message.includes('能源') || message.includes('电力')) {
            return '我们的智能能源管理系统整合了太阳能、风能等可再生能源，通过 AI 预测和优化能源分配，使城市能源消耗降低 25%，碳排放减少 40%。';
        }
        else if (message.includes('安防') || message.includes('安全')) {
            return 'NeoCity 的智能安防系统使用 AI 视频分析技术，可实时监测异常行为并预警，配合无人机巡逻和智能门禁系统，使城市犯罪率降低 60%。';
        }
        else if (message.includes('家居') || message.includes('家庭')) {
            return '智能家居系统可实现家电自动化控制、能源管理和安防监控的无缝整合。通过手机 APP 或语音助手，居民可以远程控制家中设备，提高生活便捷性和安全性。';
        }
        else if (message.includes('医疗') || message.includes('健康')) {
            return '智慧医疗系统提供远程诊断、健康监测和紧急救援服务。居民可通过智能手环等设备实时监测健康数据，AI 系统会分析数据并提供健康建议，必要时自动联系医疗机构。';
        }
        else if (message.includes('教育') || message.includes('学习')) {
            return '智能教育平台采用 AI 个性化学习算法，根据学生的学习进度和能力定制学习内容。虚拟教室和 AR/VR 技术提供沉浸式学习体验，使教育资源更加均衡。';
        }
        else if (message.includes('环境') || message.includes('污染')) {
            return '环境监测系统实时监测空气质量、水质和噪音水平，通过大数据分析预测环境变化趋势。系统还会自动启动污染控制措施，如调整交通流量或启动空气净化设备。';
        }
        else if (message.includes('数据') || message.includes('分析')) {
            return 'NeoCity 每天处理超过 1 PB 的城市数据，包括交通流量、能源消耗、环境指标等。通过 AI 分析这些数据，我们可以优化城市管理，提高资源利用效率，改善居民生活质量。';
        }
        else if (message.includes('隐私') || message.includes('安全')) {
            return '我们非常重视数据隐私和安全。所有数据都采用加密存储，访问权限严格控制。我们的系统符合国际数据保护标准，定期进行安全审计和漏洞测试，确保数据安全。';
        }
        else if (message.includes('成本') || message.includes('投资')) {
            return '智能城市建设初期投资较大，但长期收益显著。根据我们的测算，平均 5-7 年可收回投资。主要收益来自能源节约、效率提升和公共服务优化。我们还提供多种融资方案，降低城市财政压力。';
        }
        else if (message.includes('何时') || message.includes('建设') || message.includes('完成')) {
            return 'NeoCity 是一个持续发展的项目。目前已有 3 个区域完成建设并投入使用，约 50 万居民受益。整个城市计划在 2030 年前全面建成，届时将成为全球领先的智能城市典范。';
        }
        else {
            return '感谢您的提问！这是一个很好的问题。我们的专家团队正在研究这个领域，预计很快会有相关解决方案推出。您还有其他关于智能城市的问题吗？';
        }
    }
}
function initSceneModal() {
    const sceneCards = document.querySelectorAll('.scene-card');
    const sceneModal = document.getElementById('scene-modal');
    const sceneModalClose = document.getElementById('scene-modal-close');
    const sceneModalBody = document.getElementById('scene-modal-body');
    const scenesData = {
        transportation: {
            title: '智能交通系统',
            image: 'https://img.freepik.com/free-photo/smart-transport-technology-concept-for-future-car-traffic-on-road_34629-448.jpg',
            description: 'NeoCity 的智能交通系统采用 AI 控制的信号灯和实时路况监控，可减少 30% 的交通拥堵。系统还支持自动驾驶车辆的协同调度，提高道路利用率。通过大数据分析，系统能够预测交通流量变化，提前调整信号灯时序，优化交通流畅度。',
            features: [
                { icon: 'fas fa-traffic-light', text: 'AI 智能信号灯' },
                { icon: 'fas fa-car', text: '自动驾驶车辆协同' },
                { icon: 'fas fa-route', text: '实时路况监控' },
                { icon: 'fas fa-map-marked-alt', text: '智能导航系统' },
                { icon: 'fas fa-bus', text: '公共交通优化' },
                { icon: 'fas fa-parking', text: '智能停车管理' }
            ]
        },
        energy: {
            title: '智能能源管理',
            image: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/238bf6f4549c4f5e8e544fa749322274~tplv-a9rns2rl98-image.image?rcl=202511051910076C9BECB8E975BFCE0E0B&rk3s=8e244e95&rrcfp=f06b921b&x-expires=1764933037&x-signature=aUdMMo1MOkHtxEIvGGfDGmrQCPc%3D',
            description: '我们的智能能源管理系统整合了太阳能、风能等可再生能源，通过 AI 预测和优化能源分配，使城市能源消耗降低 25%，碳排放减少 40%。智能电网能够实时监测能源生产和消耗，自动调整分配策略，确保能源供应稳定高效。',
            features: [
                { icon: 'fas fa-solar-panel', text: '可再生能源整合' },
                { icon: 'fas fa-bolt', text: '智能电网管理' },
                { icon: 'fas fa-chart-line', text: '能源消耗监控' },
                { icon: 'fas fa-lightbulb', text: '智能照明系统' },
                { icon: 'fas fa-water', text: '水资源优化管理' },
                { icon: 'fas fa-leaf', text: '低碳环保措施' }
            ]
        },
        security: {
            title: '智能安防系统',
            image: 'https://img.freepik.com/free-vector/artificial-intelligence-robot-ai-big-data-smart-city-illustration_53876-129731.jpg',
            description: 'NeoCity 的智能安防系统使用 AI 视频分析技术，可实时监测异常行为并预警，配合无人机巡逻和智能门禁系统，使城市犯罪率降低 60%。系统还整合了火灾、地震等灾害预警功能，提高城市安全水平。',
            features: [
                { icon: 'fas fa-video', text: 'AI 视频监控' },
                { icon: 'fas fa-drone', text: '无人机巡逻' },
                { icon: 'fas fa-shield-alt', text: '智能门禁系统' },
                { icon: 'fas fa-bell', text: '异常行为预警' },
                { icon: 'fas fa-fire-extinguisher', text: '火灾预警系统' },
                { icon: 'fas fa-ambulance', text: '紧急救援响应' }
            ]
        },
        home: {
            title: '智能家居系统',
            image: 'https://p9-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/c2973e99afc643f0a5ba88c4dcd572e7~tplv-a9rns2rl98-image.image?rcl=202511051910076C9BECB8E975BFCE0E0B&rk3s=8e244e95&rrcfp=f06b921b&x-expires=1764933038&x-signature=63HLtnK1f2usO%2FN%2FPG0t8%2Bc%2BpSw%3D',
            description: '智能家居系统可实现家电自动化控制、能源管理和安防监控的无缝整合。通过手机 APP 或语音助手，居民可以远程控制家中设备，提高生活便捷性和安全性。系统还能学习居民生活习惯，自动调整家居环境，提供个性化体验。',
            features: [
                { icon: 'fas fa-house-user', text: '智能环境控制' },
                { icon: 'fas fa-robot', text: '语音助手集成' },
                { icon: 'fas fa-lock', text: '智能安防监控' },
                { icon: 'fas fa-thermometer-half', text: '温度自动调节' },
                { icon: 'fas fa-tv', text: '智能家电控制' },
                { icon: 'fas fa-mobile-alt', text: '手机远程控制' }
            ]
        },
        healthcare: {
            title: '智慧医疗系统',
            image: 'https://img.freepik.com/free-vector/doctor-nurses-with-medical-robot_23-2148982330.jpg',
            description: '智慧医疗系统提供远程诊断、健康监测和紧急救援服务。居民可通过智能手环等设备实时监测健康数据，AI 系统会分析数据并提供健康建议，必要时自动联系医疗机构。系统还整合了电子病历和医疗资源调度，提高医疗服务效率。',
            features: [
                { icon: 'fas fa-heartbeat', text: '健康数据监测' },
                { icon: 'fas fa-video', text: '远程医疗诊断' },
                { icon: 'fas fa-user-md', text: 'AI 健康顾问' },
                { icon: 'fas fa-ambulance', text: '紧急救援服务' },
                { icon: 'fas fa-notes-medical', text: '电子病历管理' },
                { icon: 'fas fa-pills', text: '智能用药提醒' }
            ]
        },
        education: {
            title: '智能教育系统',
            image: 'https://img.freepik.com/free-vector/online-education-internet-school-digital-learning_53876-120006.jpg',
            description: '智能教育平台采用 AI 个性化学习算法，根据学生的学习进度和能力定制学习内容。虚拟教室和 AR/VR 技术提供沉浸式学习体验，使教育资源更加均衡。系统还整合了教师资源管理和学习效果评估，提高教育质量。',
            features: [
                { icon: 'fas fa-robot', text: 'AI 个性化学习' },
                { icon: 'fas fa-vr-cardboard', text: 'AR/VR 教学体验' },
                { icon: 'fas fa-chalkboard-teacher', text: '虚拟教师助手' },
                { icon: 'fas fa-book', text: '数字教育资源' },
                { icon: 'fas fa-graduation-cap', text: '学习进度追踪' },
                { icon: 'fas fa-users', text: '协作学习平台' }
            ]
        },
        environment: {
            title: '智能环境监测',
            image: 'https://img.freepik.com/free-photo/futuristic-cityscape_1127-307.jpg',
            description: '环境监测系统实时监测空气质量、水质和噪音水平，通过大数据分析预测环境变化趋势。系统还会自动启动污染控制措施，如调整交通流量或启动空气净化设备。居民可通过手机 APP 查看实时环境数据，了解健康建议。',
            features: [
                { icon: 'fas fa-wind', text: '空气质量监测' },
                { icon: 'fas fa-water', text: '水质监测系统' },
                { icon: 'fas fa-volume-up', text: '噪音水平监测' },
                { icon: 'fas fa-chart-line', text: '环境趋势预测' },
                { icon: 'fas fa-leaf', text: '绿化覆盖管理' },
                { icon: 'fas fa-recycle', text: '智能垃圾分类' }
            ]
        }
    };
    sceneCards.forEach(card => {
        card.addEventListener('click', function() {
            const sceneId = this.getAttribute('data-scene');
            const sceneData = scenesData[sceneId];
            if (sceneData) {
                sceneModalBody.innerHTML = `
                    <div class="scene-modal-image">
                        <img src="${sceneData.image}" alt="${sceneData.title}">
                    </div>
                    <div class="scene-modal-info">
                        <h3 class="text-2xl font-bold">${sceneData.title}</h3>
                        <p>${sceneData.description}</p>
                        <div class="scene-features">
                            ${sceneData.features.map(feature => `
                                <div class="scene-feature">
                                    <i class="${feature.icon}"></i>
                                    <span>${feature.text}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
                sceneModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    sceneModalClose.addEventListener('click', function() {
        sceneModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    sceneModal.addEventListener('click', function(e) {
        if (e.target === sceneModal) {
            sceneModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}
function initTrafficLightSimulation() {
    const simulateButton = document.getElementById('simulate-traffic');
    if (simulateButton) {
        simulateButton.addEventListener('click', function() {
            const northSouthCount = document.getElementById('north-south-count');
            const eastWestCount = document.getElementById('east-west-count');
            const southNorthCount = document.getElementById('south-north-count');
            const westEastCount = document.getElementById('west-east-count');
            const northLight = document.getElementById('north-light');
            const northYellow = document.getElementById('north-yellow');
            const northGreen = document.getElementById('north-green');
            const eastLight = document.getElementById('east-light');
            const eastYellow = document.getElementById('east-yellow');
            const eastGreen = document.getElementById('east-green');
            const southLight = document.getElementById('south-light');
            const southYellow = document.getElementById('south-yellow');
            const southGreen = document.getElementById('south-green');
            const westLight = document.getElementById('west-light');
            const westYellow = document.getElementById('west-yellow');
            const westGreen = document.getElementById('west-green');
            function updateTrafficFlow() {
                const nsCount = Math.floor(Math.random() * 30) + 5;
                const ewCount = Math.floor(Math.random() * 30) + 5;
                const snCount = Math.floor(Math.random() * 30) + 5;
                const weCount = Math.floor(Math.random() * 30) + 5;
                northSouthCount.textContent = nsCount;
                eastWestCount.textContent = ewCount;
                southNorthCount.textContent = snCount;
                westEastCount.textContent = weCount;
                const northSouthTotal = nsCount + snCount;
                const eastWestTotal = ewCount + weCount;
                northLight.className = 'w-6 h-6 rounded-full bg-gray-700';
                northYellow.className = 'w-6 h-6 rounded-full bg-gray-700';
                northGreen.className = 'w-6 h-6 rounded-full bg-gray-700';
                eastLight.className = 'w-6 h-6 rounded-full bg-gray-700';
                eastYellow.className = 'w-6 h-6 rounded-full bg-gray-700';
                eastGreen.className = 'w-6 h-6 rounded-full bg-gray-700';
                southLight.className = 'w-6 h-6 rounded-full bg-gray-700';
                southYellow.className = 'w-6 h-6 rounded-full bg-gray-700';
                southGreen.className = 'w-6 h-6 rounded-full bg-gray-700';
                westLight.className = 'w-6 h-6 rounded-full bg-gray-700';
                westYellow.className = 'w-6 h-6 rounded-full bg-gray-700';
                westGreen.className = 'w-6 h-6 rounded-full bg-gray-700';
                if (northSouthTotal > eastWestTotal) {
                    northGreen.className = 'w-6 h-6 rounded-full bg-green-500';
                    southGreen.className = 'w-6 h-6 rounded-full bg-green-500';
                    eastLight.className = 'w-6 h-6 rounded-full bg-red-500';
                    westLight.className = 'w-6 h-6 rounded-full bg-red-500';
                } else if (eastWestTotal > northSouthTotal) {
                    eastGreen.className = 'w-6 h-6 rounded-full bg-green-500';
                    westGreen.className = 'w-6 h-6 rounded-full bg-green-500';
                    northLight.className = 'w-6 h-6 rounded-full bg-red-500';
                    southLight.className = 'w-6 h-6 rounded-full bg-red-500';
                } else {
                    if (Math.random() > 0.5) {
                        northGreen.className = 'w-6 h-6 rounded-full bg-green-500';
                        southGreen.className = 'w-6 h-6 rounded-full bg-green-500';
                        eastLight.className = 'w-6 h-6 rounded-full bg-red-500';
                        westLight.className = 'w-6 h-6 rounded-full bg-red-500';
                    } else {
                        eastGreen.className = 'w-6 h-6 rounded-full bg-green-500';
                        westGreen.className = 'w-6 h-6 rounded-full bg-green-500';
                        northLight.className = 'w-6 h-6 rounded-full bg-red-500';
                        southLight.className = 'w-6 h-6 rounded-full bg-red-500';
                    }
                }
            }
            updateTrafficFlow();
            const interval = setInterval(updateTrafficFlow, 3000);
            setTimeout(function() {
                clearInterval(interval);
                simulateButton.innerHTML = '<i class="fas fa-play mr-2"></i>模拟交通流量变化';
                northLight.className = 'w-6 h-6 rounded-full bg-gray-700';
                northYellow.className = 'w-6 h-6 rounded-full bg-gray-700';
                northGreen.className = 'w-6 h-6 rounded-full bg-green-500';
                eastLight.className = 'w-6 h-6 rounded-full bg-red-500';
                eastYellow.className = 'w-6 h-6 rounded-full bg-gray-700';
                eastGreen.className = 'w-6 h-6 rounded-full bg-gray-700';
                southLight.className = 'w-6 h-6 rounded-full bg-gray-700';
                southYellow.className = 'w-6 h-6 rounded-full bg-gray-700';
                southGreen.className = 'w-6 h-6 rounded-full bg-green-500';
                westLight.className = 'w-6 h-6 rounded-full bg-red-500';
                westYellow.className = 'w-6 h-6 rounded-full bg-gray-700';
                westGreen.className = 'w-6 h-6 rounded-full bg-gray-700';
                northSouthCount.textContent = '24';
                eastWestCount.textContent = '8';
                southNorthCount.textContent = '15';
                westEastCount.textContent = '11';
            }, 15000);
            simulateButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>模拟中...';
        });
    }
}
function initRouteUpdate() {
    const updateButton = document.getElementById('update-route');
    if (updateButton) {
        updateButton.addEventListener('click', function() {
            updateButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>更新中...';
            setTimeout(function() {
                const routeATime = Math.floor(Math.random() * 10) + 15;
                const routeBTime = routeATime + Math.floor(Math.random() * 10) + 10;
                const routeATimeElement = document.querySelector('.grid-cols-2 .text-neon-green');
                const routeBTimeElement = document.querySelector('.grid-cols-2 .text-neon-red');
                if (routeATimeElement && routeBTimeElement) {
                    routeATimeElement.textContent = routeATime + ' 分钟';
                    routeBTimeElement.textContent = routeBTime + ' 分钟';
                }
                const timeElement = document.querySelector('.text-neon-blue');
                if (timeElement) {
                    timeElement.textContent = '刚刚';
                }
                updateButton.innerHTML = '<i class="fas fa-sync-alt mr-2"></i>更新路线';
            }, 1500);
        });
    }
}
function initParticlesBackground() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-bg';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    const particlesConfig = {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#64ffda' },
            shape: { type: 'circle' },
            opacity: { value: 0.2, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
            size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.1, sync: false } },
            line_linked: { enable: true, distance: 150, color: '#64ffda', opacity: 0.1, width: 1 },
            move: { enable: true, speed: 1, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { grab: { distance: 140, line_linked: { opacity: 0.3 } }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    };
    const particles = [];
    for (let i = 0; i < particlesConfig.particles.number.value; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * particlesConfig.particles.size.value + particlesConfig.particles.size.value / 2,
            color: particlesConfig.particles.color.value,
            opacity: Math.random() * particlesConfig.particles.opacity.value,
            speedX: (Math.random() - 0.5) * particlesConfig.particles.move.speed * 2,
            speedY: (Math.random() - 0.5) * particlesConfig.particles.move.speed * 2,
            lineLinked: {
                distance: particlesConfig.particles.line_linked.distance,
                color: particlesConfig.particles.line_linked.color,
                opacity: particlesConfig.particles.line_linked.opacity,
                width: particlesConfig.particles.line_linked.width
            }
        });
    }
    let mouseX = 0;
    let mouseY = 0;
    let mouseIsDown = false;
    canvas.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    canvas.addEventListener('mousedown', function() {
        mouseIsDown = true;
    });
    canvas.addEventListener('mouseup', function() {
        mouseIsDown = false;
    });
    canvas.addEventListener('mouseleave', function() {
        mouseX = 0;
        mouseY = 0;
    });
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            if (particle.x < 0 || particle.x > canvas.width) {
                particle.speedX *= -1;
            }
            if (particle.y < 0 || particle.y > canvas.height) {
                particle.speedY *= -1;
            }
            if (mouseX && mouseY && particlesConfig.interactivity.events.onhover.enable) {
                const dx = mouseX - particle.x;
                const dy = mouseY - particle.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < particlesConfig.interactivity.modes.grab.distance) {
                    const forceDirectionX = dx / dist;
                    const forceDirectionY = dy / dist;
                    const force = (particlesConfig.interactivity.modes.grab.distance - dist) / particlesConfig.interactivity.modes.grab.distance;
                    particle.speedX += forceDirectionX * force * 0.1;
                    particle.speedY += forceDirectionY * force * 0.1;
                }
            }
            if (mouseIsDown && particlesConfig.interactivity.events.onclick.enable) {
                const dx = mouseX - particle.x;
                const dy = mouseY - particle.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    particle.speedX = (Math.random() - 0.5) * 5;
                    particle.speedY = (Math.random() - 0.5) * 5;
                }
            }
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
            particles.forEach(otherParticle => {
                if (particle !== otherParticle) {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < particle.lineLinked.distance) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = particle.lineLinked.color;
                        ctx.globalAlpha = particle.lineLinked.opacity * (1 - dist / particle.lineLinked.distance);
                        ctx.lineWidth = particle.lineLinked.width;
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            });
        });
    }
    animate();
}