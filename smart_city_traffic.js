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
            return '您好！我是 NeoCity 的交通 AI 顾问。有什么可以帮助您了解智能交通系统的吗？';
        }
        else if (message.includes('智能交通') || message.includes('交通')) {
            return 'NeoCity 的智能交通系统采用 AI 控制的信号灯和实时路况监控，可减少 30% 的交通拥堵。系统还支持自动驾驶车辆的协同调度，提高道路利用率。';
        }
        else if (message.includes('信号灯') || message.includes('红绿灯')) {
            return '我们的智能信号灯系统能实时分析各方向车流量，动态调整信号灯时长，高峰期可减少 40% 的等待时间，大大提高通行效率。';
        }
        else if (message.includes('自动驾驶') || message.includes('自动车')) {
            return 'NeoCity 的自动驾驶车队通过 V2X 技术实现车与车、车与基础设施的实时通信，可保持安全车距并协同行驶，能使道路通行能力提升 50% 以上。';
        }
        else if (message.includes('停车') || message.includes('车位')) {
            return '智能停车系统通过摄像头和传感器实时监测车位状态，引导车辆快速找到空位，同时支持自动泊车功能，平均可减少 70% 的停车时间。';
        }
        else if (message.includes('公交') || message.includes('公共交通')) {
            return '我们的智能公交系统会根据实时客流数据动态调整发车频率和路线，通过 APP 可查看精确到站时间，使公交准点率提升至 95% 以上。';
        }
        else if (message.includes('路线') || message.includes('导航')) {
            return '智能导航系统整合了实时路况、天气预报和特殊事件信息，可为用户提供最优出行路线，并根据交通状况实时调整，平均节省 20% 的出行时间。';
        }
        else {
            return '感谢您的提问！关于智能交通系统，我可以为您介绍信号灯控制、自动驾驶、智能停车等方面的信息。您想了解哪方面内容呢？';
        }
    }
}
function initSceneModal() {
    const sceneCards = document.querySelectorAll('.scene-card');
    const sceneModal = document.getElementById('scene-modal');
    const sceneModalClose = document.getElementById('scene-modal-close');
    const sceneModalBody = document.getElementById('scene-modal-body');
    const scenesData = {
        'traffic-signal': {
            title: '智能信号控制',
            image: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/bbfb49c812ad432093f5378c00ee5ae7~tplv-a9rns2rl98-image.image?rcl=20251105192004F7660168640FECCED491&rk3s=8e244e95&rrcfp=f06b921b&x-expires=1764933651&x-signature=q748%2FKoVTCTGr2knwEYlp4KBrBc%3D',
            description: '基于AI的自适应交通信号灯系统能够实时分析各方向交通流量，动态调整信号时序，实现交通流量的智能分配。系统可根据高峰期、平峰期和特殊事件自动切换控制策略，减少车辆等待时间，提高道路通行效率。',
            features: [
                { icon: 'fas fa-brain', text: 'AI自适应控制' },
                { icon: 'fas fa-clock', text: '动态时序调整' },
                { icon: 'fas fa-chart-line', text: '流量预测分析' },
                { icon: 'fas fa-calendar-alt', text: '特殊事件模式' },
                { icon: 'fas fa-mobile-alt', text: '远程监控管理' },
                { icon: 'fas fa-cloud', text: '云端协同优化' }
            ]
        },
        'autonomous-vehicles': {
            title: '自动驾驶车队',
            image: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/b629af64a3bd4e87b43bb0559f69eadd~tplv-a9rns2rl98-image.image?rcl=20251105192004F7660168640FECCED491&rk3s=8e244e95&rrcfp=f06b921b&x-expires=1764933650&x-signature=nWV7xmgEf1lxWqXdYvI9qf3gPXA%3D',
            description: '自动驾驶车队系统通过车联网(V2X)技术实现车辆间的实时通信和协同驾驶，可保持安全车距并优化行驶轨迹。系统整合了高精度地图、实时路况和环境感知数据，确保自动驾驶的安全性和高效性，大幅提升道路利用率。',
            features: [
                { icon: 'fas fa-wifi', text: 'V2X车联网通信' },
                { icon: 'fas fa-route', text: '协同路径规划' },
                { icon: 'fas fa-shield-alt', text: '多传感器融合' },
                { icon: 'fas fa-map-marked-alt', text: '高精度地图导航' },
                { icon: 'fas fa-users', text: '车队协同控制' },
                { icon: 'fas fa-exclamation-triangle', text: '紧急情况处理' }
            ]
        },
        'smart-parking': {
            title: '智能停车系统',
            image: 'https://p9-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/d7b136d5fd6d404ca8873982b587cfaf~tplv-a9rns2rl98-image.image?rcl=202511051910076C9BECB8E975BFCE0E0B&rk3s=8e244e95&rrcfp=f06b921b&x-expires=1764933036&x-signature=zVRFYb92q1QVcbPgt9i9qAKz1jY%3D',
            description: '智能停车系统整合了全自动立体停车库和智能停车引导功能，通过摄像头和传感器网络实时监测车位状态。系统支持车牌识别、自动缴费和自动泊车，减少停车时间和空间占用，解决城市"停车难"问题。',
            features: [
                { icon: 'fas fa-video', text: '车位状态监测' },
                { icon: 'fas fa-map-signs', text: '智能停车引导' },
                { icon: 'fas fa-car-side', text: '自动泊车功能' },
                { icon: 'fas fa-credit-card', text: '无感支付系统' },
                { icon: 'fas fa-mobile-alt', text: '手机预约车位' },
                { icon: 'fas fa-chart-pie', text: '停车数据分析' }
            ]
        },
        'traffic-monitoring': {
            title: '实时路况监控',
            image: 'https://images.unsplash.com/photo-1578307987248-1db4a7620a36?q=80&w=1000&auto=format&fit=crop',
            description: '实时路况监控系统通过遍布城市的智能摄像头和传感器网络，实时收集交通流量、车速和道路状态数据。AI分析系统可预测交通流量变化，识别异常事件，并通过APP向市民推送实时路况信息和最优出行建议。',
            features: [
                { icon: 'fas fa-video', text: '全区域视频监控' },
                { icon: 'fas fa-tachometer-alt', text: '实时车速监测' },
                { icon: 'fas fa-chart-line', text: '流量趋势预测' },
                { icon: 'fas fa-exclamation-circle', text: '异常事件检测' },
                { icon: 'fas fa-bell', text: '实时信息推送' },
                { icon: 'fas fa-route', text: '最优路径推荐' }
            ]
        },
        'public-transport': {
            title: '公共交通优化',
            image: 'https://p9-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/c2973e99afc643f0a5ba88c4dcd572e7~tplv-a9rns2rl98-image.image?rcl=202511051910076C9BECB8E975BFCE0E0B&rk3s=8e244e95&rrcfp=f06b921b&x-expires=1764933038&x-signature=63HLtnK1f2usO%2FN%2FPG0t8%2Bc%2BpSw%3D',
            description: '公共交通优化系统通过智能调度算法，根据实时客流数据动态调整公交、地铁的发车频率和路线。系统为乘客提供实时到站信息和换乘建议，同时整合共享单车等慢行交通，构建多层次、一体化的公共交通体系。',
            features: [
                { icon: 'fas fa-bus', text: '智能公交调度' },
                { icon: 'fas fa-subway', text: '地铁运力优化' },
                { icon: 'fas fa-clock', text: '实时到站查询' },
                { icon: 'fas fa-route', text: '最优换乘方案' },
                { icon: 'fas fa-bicycle', text: '慢行交通整合' },
                { icon: 'fas fa-ticket-alt', text: '一体化票务系统' }
            ]
        },
        'traffic-data-center': {
            title: '交通数据中心',
            image: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/238bf6f4549c4f5e8e544fa749322274~tplv-a9rns2rl98-image.image?rcl=202511051910076C9BECB8E975BFCE0E0B&rk3s=8e244e95&rrcfp=f06b921b&x-expires=1764933037&x-signature=aUdMMo1MOkHtxEIvGGfDGmrQCPc%3D',
            description: '交通数据中心整合了城市交通全量数据，包括道路监控、车辆轨迹、公共交通和环境数据等。通过大数据分析和AI建模，为交通规划、管理决策和市民出行提供数据支持，实现交通系统的持续优化和升级。',
            features: [
                { icon: 'fas fa-database', text: '全量交通数据整合' },
                { icon: 'fas fa-brain', text: 'AI智能分析' },
                { icon: 'fas fa-chart-pie', text: '多维度数据可视化' },
                { icon: 'fas fa-road', text: '交通规划支持' },
                { icon: 'fas fa-sitemap', text: '系统运行监控' },
                { icon: 'fas fa-file-export', text: '决策报告生成' }
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