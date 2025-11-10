const CONFIG = {
    apiKey: 'e33eed904106c653683c232f78ba5160',
    baseURL: 'https://restapi.amap.com/v3'
};

let selectedCarType = '';
let selectedTime = '立即出发';
let map;
let driving;
let debugInfo = document.getElementById('debugInfo');
let carMarker;
let currentDistance = 0;

// 坐标数据
const COORDINATES = {
    start: {
        lng: 114.3615,
        lat: 30.5256,
        name: '武汉大学信息学部'
    },
    destinations: {
        '武汉站': { lng: 114.418, lat: 30.615 },
        '汉口火车站': { lng: 114.253, lat: 30.620 },
        '天河机场': { lng: 114.216, lat: 30.783 },
        '光谷广场': { lng: 114.399, lat: 30.505 }
    }
};

// 时间选择器功能
function toggleTimeOptions() {
    const options = document.getElementById('timeOptions');
    const display = document.getElementById('timeDisplay');
    options.classList.toggle('show');
    display.classList.toggle('active');
}

function selectTime(time) {
    selectedTime = time;
    document.getElementById('timeDisplay').innerHTML = `<span>${time}</span>`;
    
    document.querySelectorAll('.time-option').forEach(option => {
        option.classList.remove('selected');
    });
    event.target.classList.add('selected');
    
    toggleTimeOptions();
}

// 点击其他地方关闭时间选择器
document.addEventListener('click', function(event) {
    const timeSelector = document.querySelector('.time-selector');
    if (!timeSelector.contains(event.target)) {
        const options = document.getElementById('timeOptions');
        const display = document.getElementById('timeDisplay');
        options.classList.remove('show');
        display.classList.remove('active');
    }
});

// 显示调试信息
function showDebugInfo(message, type) {
    const colors = {
        'success': 'rgba(0, 255, 0, 0.2)',
        'error': 'rgba(255, 0, 0, 0.2)',
        'loading': 'rgba(255, 255, 0, 0.2)'
    };
    debugInfo.innerHTML = message;
    debugInfo.style.background = colors[type] || colors.loading;
    debugInfo.style.display = 'block';
}

// 初始化地图
function initMap() {
    try {
        map = new AMap.Map('map-container', {
            zoom: 16,
            center: [COORDINATES.start.lng, COORDINATES.start.lat],
            viewMode: '3D',
            mapStyle: 'amap://styles/dark'
        });

        driving = new AMap.Driving({
            map: map,
            policy: AMap.DrivingPolicy.LEAST_TIME,
            panel: null
        });

        const startMarker = new AMap.Marker({
            position: [COORDINATES.start.lng, COORDINATES.start.lat],
            content: `
                <div style="
                    background: #00ff00;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: 3px solid white;
                    box-shadow: 0 0 20px #00ff00;
                    position: relative;
                ">
                    <div style="
                        position: absolute;
                        top: -30px;
                        left: 50%;
                        transform: translateX(-50%);
                        background: rgba(0,0,0,0.9);
                        color: white;
                        padding: 5px 10px;
                        border-radius: 5px;
                        border: 1px solid #0ff0fc;
                        font-size: 12px;
                        white-space: nowrap;
                    ">起点-武大信部</div>
                </div>
            `,
            offset: new AMap.Pixel(-10, -10)
        });

        carMarker = new AMap.Marker({
            position: [114.3620, 30.5260],
            content: `
                <div style="
                    font-size: 30px;
                    filter: drop-shadow(0 0 10px #0ff0fc);
                    animation: carFloat 2s infinite alternate;
                ">🚗</div>
                <style>
                    @keyframes carFloat {
                        from { transform: translateY(0px); }
                        to { transform: translateY(-5px); }
                    }
                </style>
            `,
            offset: new AMap.Pixel(-15, -15)
        });

        map.add([startMarker, carMarker]);

    } catch (error) {
        showDebugInfo(`❌ 地图初始化失败: ${error.message}`, 'error');
        console.error('地图初始化错误:', error);
    }
}

// 路线规划
async function calculateRoute() {
    const endInput = document.getElementById('end-location').value.trim();
    if (!endInput) {
        alert('请输入终点位置');
        return;
    }

    let destination = COORDINATES.destinations[endInput];
    if (!destination) {
        destination = await geocodeAddress(endInput);
        if (!destination) {
            showDebugInfo('❌ 无法找到该地址的坐标', 'error');
            return;
        }
    }

    const routeBtn = document.getElementById('route-btn');
    routeBtn.disabled = true;
    routeBtn.textContent = '规划中...';
    
    showDebugInfo('🚀 正在规划路线...', 'loading');

    try {
        const response = await fetch(
            `${CONFIG.baseURL}/direction/driving?` +
            `origin=${COORDINATES.start.lng},${COORDINATES.start.lat}&` +
            `destination=${destination.lng},${destination.lat}&` +
            `key=${CONFIG.apiKey}&output=JSON&extensions=base`
        );
        
        const data = await response.json();
        console.log('路线规划响应:', data);
        
        routeBtn.disabled = false;
        routeBtn.textContent = '规划路线';
        
        if (data.status === '1') {
            displayRouteResult(data, endInput);
            showDebugInfo('✅ 路线规划成功！', 'success');
            updateCarPrices();
        } else {
            showDebugInfo(`❌ 路线规划失败: ${data.info}`, 'error');
        }
    } catch (error) {
        routeBtn.disabled = false;
        routeBtn.textContent = '规划路线';
        showDebugInfo(`❌ 网络请求失败: ${error.message}`, 'error');
    }
}

// 地理编码
async function geocodeAddress(address) {
    try {
        const response = await fetch(
            `${CONFIG.baseURL}/geocode/geo?` +
            `address=${encodeURIComponent(address)}&` +
            `city=武汉&key=${CONFIG.apiKey}`
        );
        
        const data = await response.json();
        if (data.status === '1' && data.geocodes.length > 0) {
            const location = data.geocodes[0].location.split(',');
            return {
                lng: parseFloat(location[0]),
                lat: parseFloat(location[1]),
                name: address
            };
        }
    } catch (error) {
        console.error('地理编码失败:', error);
    }
    return null;
}

// 显示路线结果
function displayRouteResult(data, destinationName) {
    if (!data.route || !data.route.paths || data.route.paths.length === 0) {
        showDebugInfo('❌ 未找到合适的路线', 'error');
        return;
    }

    const route = data.route.paths[0];
    currentDistance = (route.distance / 1000);
    const distance = currentDistance.toFixed(1);
    const duration = Math.ceil(route.duration / 60);
    const tolls = route.tolls || 0;

    document.getElementById('route-result').innerHTML = `
        <h3>🚀 路线规划完成</h3>
        <p><strong>📍 路线：</strong>${COORDINATES.start.name} → ${destinationName}</p>
        <p><strong>📏 距离：</strong>${distance} 公里</p>
        <p><strong>⏱️ 预估时间：</strong>${duration} 分钟</p>
        <p><strong>💰 预估费用：</strong>${calculatePrice(currentDistance, 'economy')} 元起</p>
        <p><strong>🛣️ 路桥费：</strong>${tolls} 元</p>
        <p style="margin-top: 10px; color: var(--neon-blue);">✅ 请选择车型查看具体价格</p>
    `;
}

// 更新车型价格
function updateCarPrices() {
    if (currentDistance <= 0) return;
    
    document.getElementById('economy-price').textContent = calculatePrice(currentDistance, 'economy') + ' 元';
    document.getElementById('comfort-price').textContent = calculatePrice(currentDistance, 'comfort') + ' 元';
    document.getElementById('premium-price').textContent = calculatePrice(currentDistance, 'premium') + ' 元';
    document.getElementById('suv-price').textContent = calculatePrice(currentDistance, 'suv') + ' 元';
}

// 计算价格
function calculatePrice(distance, carType) {
    const basePrices = {
        'economy': 8,
        'comfort': 12,
        'suv': 15,
        'premium': 20
    };
    
    const perKmPrices = {
        'economy': 2.5,
        'comfort': 3.0,
        'suv': 3.5,
        'premium': 4.0
    };
    
    const basePrice = basePrices[carType];
    const distancePrice = Math.max(0, (distance - 3)) * perKmPrices[carType];
    return (basePrice + distancePrice).toFixed(1);
}

function selectCarType(type) {
    selectedCarType = type;
    document.querySelectorAll('.car-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
}

// 显示叫车模态框
function showCallTaxiModal() {
    if (!selectedCarType) {
        alert('请选择车型');
        return;
    }
    
    const end = document.getElementById('end-location').value;
    if (!end) {
        alert('请输入目的地');
        return;
    }
    
    const carTypeName = getCarTypeName(selectedCarType);
    const price = currentDistance > 0 ? calculatePrice(currentDistance, selectedCarType) : '--';
    
    document.getElementById('modalDetails').innerHTML = `
        <p><strong>🚗 车型：</strong>${carTypeName}</p>
        <p><strong>📍 起点：</strong>${COORDINATES.start.name}</p>
        <p><strong>🎯 目的地：</strong>${end}</p>
        <p><strong>⏰ 出发时间：</strong>${selectedTime}</p>
        <p><strong>💰 预估费用：</strong>${price} 元</p>
        <p style="margin-top: 10px; color: var(--neon-blue);">司机将很快到达信息学部南门</p>
    `;
    
    const modal = document.getElementById('callTaxiModal');
    modal.classList.add('show');
}

// 关闭叫车模态框
function closeCallTaxiModal() {
    const modal = document.getElementById('callTaxiModal');
    modal.classList.remove('show');
}

function getCarTypeName(type) {
    const names = {
        'economy': '经济型',
        'comfort': '舒适型',
        'premium': '豪华型',
        'suv': '商务SUV'
    };
    return names[type];
}

// 导航链接点击事件
document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// 页面加载完成
window.onload = function() {
    if (typeof AMap === 'undefined') {
        showDebugInfo('❌ 高德地图API加载失败', 'error');
        return;
    }
    
    initMap();
};