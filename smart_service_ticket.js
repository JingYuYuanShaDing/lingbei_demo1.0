const CT_CONFIG = {
    appKey: 'YOUR_APP_KEY',
    appSecurity: 'YOUR_APP_SECURITY',
    employeeID: 'YOUR_EMPLOYEE_ID'
};

// 站点数据（只保留北上广天津武汉）
const CITY_STATIONS = { 
    '北京': {
        'airport': ['北京首都国际机场', '北京大兴国际机场'],
        'train-station': ['北京站', '北京西站', '北京南站', '北京北站']
    },
    '上海': {
        'airport': ['上海浦东国际机场', '上海虹桥国际机场'],
        'train-station': ['上海站', '上海虹桥站', '上海南站']
    },
    '广州': {
        'airport': ['广州白云国际机场'],
        'train-station': ['广州站', '广州南站', '广州东站']
    },
    '天津': {
        'airport': ['天津滨海国际机场'],
        'train-station': ['天津站', '天津西站', '天津南站']
    },
    '武汉': {
        'airport': ['武汉天河国际机场'],
        'train-station': ['武汉站', '汉口站', '武昌站']
    }
};

// 页面加载初始化
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s';
    
    setTimeout(function() {
        document.body.style.opacity = '1';
    }, 100);
    
    // 设置默认日期为明天
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0];
    document.getElementById('depart-date').value = formattedDate;
});

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

// 加载站点数据
function loadStations() {
    const city = document.getElementById('city').value;
    const stationType = document.getElementById('station-type').value;
    const stationSelect = document.getElementById('station');
    
    stationSelect.innerHTML = '<option value="">请选择站点</option>';
    
    if (city && CITY_STATIONS[city] && CITY_STATIONS[city][stationType]) {
        CITY_STATIONS[city][stationType].forEach(station => {
            const option = document.createElement('option');
            option.value = station;
            option.textContent = station;
            stationSelect.appendChild(option);
        });
    }
}

// 查询大屏信息
function queryScreen() {
    const city = document.getElementById('city').value;
    const station = document.getElementById('station').value;
    const stationType = document.getElementById('station-type').value;
    
    if (!city || !station) {
        document.getElementById('screenResults').innerHTML = 
            '<p style="text-align: center; color: #a0a0c0; line-height: 250px;">请选择城市和站点查看大屏信息</p>';
        return;
    }
    
    const results = document.getElementById('screenResults');
    results.innerHTML = '<div class="loading" style="margin: 20px auto;"></div><p style="text-align: center;">正在查询大屏信息...</p>';
    
    setTimeout(() => {
        if (stationType === 'airport') {
            displayFlightBoard(city, station);
        } else {
            displayTrainBoard(city, station);
        }
    }, 1000);
}

// 显示航班大屏
function displayFlightBoard(city, airport) {
    // 为不同城市生成不同的航班数据
    const flightData = {
        '北京': [
            { number: 'CA1501', destination: '上海虹桥', time: '10:20', status: 'on-time', gate: 'A12' },
            { number: 'MU5101', destination: '广州白云', time: '11:45', status: 'delayed', gate: 'B05' },
            { number: 'CZ3101', destination: '深圳宝安', time: '13:20', status: 'on-time', gate: 'C08' },
            { number: 'HU7801', destination: '成都天府', time: '14:35', status: 'cancelled', gate: 'D15' }
        ],
        '上海': [
            { number: 'FM9101', destination: '北京首都', time: '08:30', status: 'on-time', gate: 'A01' },
            { number: 'MU5301', destination: '广州白云', time: '09:45', status: 'on-time', gate: 'B12' },
            { number: 'HO1071', destination: '深圳宝安', time: '11:20', status: 'delayed', gate: 'C05' }
        ],
        '广州': [
            { number: 'CZ3101', destination: '北京首都', time: '07:45', status: 'on-time', gate: 'A08' },
            { number: 'CA1301', destination: '上海浦东', time: '09:30', status: 'on-time', gate: 'B03' },
            { number: 'MU5302', destination: '成都天府', time: '12:15', status: 'delayed', gate: 'C12' }
        ],
        '天津': [
            { number: 'GS7890', destination: '上海虹桥', time: '08:15', status: 'on-time', gate: 'A05' },
            { number: 'CA2801', destination: '广州白云', time: '10:40', status: 'on-time', gate: 'B08' }
        ],
        '武汉': [
            { number: 'MU2451', destination: '北京大兴', time: '07:20', status: 'on-time', gate: 'A03' },
            { number: 'CZ3345', destination: '上海虹桥', time: '09:50', status: 'delayed', gate: 'B06' },
            { number: 'HU7251', destination: '广州白云', time: '11:30', status: 'on-time', gate: 'C02' }
        ]
    };
    
    const mockFlights = flightData[city] || flightData['北京'];
    const results = document.getElementById('screenResults');
    let html = `<h3 style="color: var(--neon-blue); margin-bottom: 20px; text-align: center;">${airport} - 航班动态</h3>`;
    html += '<div class="flight-board">';
    
    mockFlights.forEach(flight => {
        let statusText = '', statusClass = '';
        switch(flight.status) {
            case 'on-time': statusText = '准时'; statusClass = 'on-time'; break;
            case 'delayed': statusText = '延误'; statusClass = 'delayed'; break;
            case 'cancelled': statusText = '取消'; statusClass = 'cancelled'; break;
        }
        
        html += `
            <div class="board-item">
                <div class="board-header">
                    <span class="flight-number">${flight.number}</span>
                    <span class="status ${statusClass}">${statusText}</span>
                </div>
                <div>目的地: ${flight.destination}</div>
                <div>计划时间: ${flight.time}</div>
                <div>登机口: ${flight.gate}</div>
            </div>
        `;
    });
    
    html += '</div>';
    results.innerHTML = html;
}

// 显示火车大屏
function displayTrainBoard(city, station) {
    // 为不同城市生成不同的火车数据
    const trainData = {
        '北京': [
            { number: 'G1', destination: '上海虹桥', time: '09:00', status: 'on-time', platform: '1' },
            { number: 'G67', destination: '广州南', time: '10:30', status: 'on-time', platform: '2' },
            { number: 'D21', destination: '长春西', time: '12:15', status: 'delayed', platform: '3' }
        ],
        '上海': [
            { number: 'G2', destination: '北京南', time: '09:30', status: 'on-time', platform: '4' },
            { number: 'G85', destination: '广州南', time: '11:00', status: 'on-time', platform: '5' },
            { number: 'D953', destination: '南京南', time: '13:45', status: 'on-time', platform: '6' }
        ],
        '广州': [
            { number: 'G66', destination: '北京西', time: '08:00', status: 'on-time', platform: '7' },
            { number: 'G86', destination: '上海虹桥', time: '10:15', status: 'delayed', platform: '8' },
            { number: 'D362', destination: '武汉', time: '12:30', status: 'on-time', platform: '9' }
        ],
        '天津': [
            { number: 'G261', destination: '上海虹桥', time: '08:45', status: 'on-time', platform: '10' },
            { number: 'G292', destination: '广州南', time: '11:20', status: 'on-time', platform: '11' }
        ],
        '武汉': [
            { number: 'G516', destination: '北京西', time: '07:30', status: 'on-time', platform: '12' },
            { number: 'G1722', destination: '上海虹桥', time: '09:45', status: 'on-time', platform: '13' },
            { number: 'G1101', destination: '广州南', time: '11:15', status: 'delayed', platform: '14' }
        ]
    };
    
    const mockTrains = trainData[city] || trainData['北京'];
    const results = document.getElementById('screenResults');
    let html = `<h3 style="color: var(--neon-blue); margin-bottom: 20px; text-align: center;">${station} - 列车动态</h3>`;
    html += '<div class="train-board">';
    
    mockTrains.forEach(train => {
        let statusText = '', statusClass = '';
        switch(train.status) {
            case 'on-time': statusText = '正点'; statusClass = 'on-time'; break;
            case 'delayed': statusText = '晚点'; statusClass = 'delayed'; break;
            case 'cancelled': statusText = '停运'; statusClass = 'cancelled'; break;
        }
        
        html += `
            <div class="board-item">
                <div class="board-header">
                    <span class="train-number">${train.number}</span>
                    <span class="status ${statusClass}">${statusText}</span>
                </div>
                <div>目的地: ${train.destination}</div>
                <div>发车时间: ${train.time}</div>
                <div>站台: ${train.platform}</div>
            </div>
        `;
    });
    
    html += '</div>';
    results.innerHTML = html;
}

// 显示消息
function showMessage(message, type = 'info') {
    const messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = `<div class="message ${type}">${message}</div>`;
    
    if (type === 'error' || type === 'success') {
        setTimeout(() => {
            messageArea.innerHTML = '';
        }, 5000);
    }
}

// 设置按钮状态
function setButtonState(loading) {
    const searchBtn = document.getElementById('searchBtn');
    
    if (loading) {
        searchBtn.disabled = true;
        searchBtn.classList.add('btn-disabled');
        searchBtn.innerHTML = '<span class="loading"></span>查询中...';
    } else {
        searchBtn.disabled = false;
        searchBtn.classList.remove('btn-disabled');
        searchBtn.innerHTML = '搜索车票';
    }
}

// 搜索车票
function searchTickets() {
    const departure = document.getElementById('departure').value.trim();
    const destination = document.getElementById('destination').value.trim();
    const date = document.getElementById('depart-date').value;
    const ticketType = document.getElementById('ticket-type').value;
    
    if (!departure || !destination || !date) {
        showMessage('请填写完整的搜索条件', 'error');
        return;
    }
    
    setButtonState(true);
    
    // 模拟搜索过程
    setTimeout(() => {
        displayMockTickets(departure, destination, date, ticketType);
        setButtonState(false);
    }, 1500);
}

// 显示模拟车票数据
function displayMockTickets(departure, destination, date, type) {
    const ticketList = document.getElementById('ticketList');
    ticketList.innerHTML = '';
    
    const mockTickets = generateMockTickets(departure, destination, date, type);
    
    mockTickets.forEach(ticket => {
        const ticketCard = createTicketCard(ticket, type);
        ticketList.appendChild(ticketCard);
    });
}

// 生成模拟车票数据
function generateMockTickets(departure, destination, date, type) {
    const tickets = [];
    
    if (type === 'train') {
        tickets.push({
            id: 'T001',
            from: departure,
            to: destination,
            number: 'G123',
            departureTime: '08:30',
            arrivalTime: '13:45',
            duration: '5小时15分',
            seatType: '二等座',
            price: '553',
            remaining: '充足'
        });
        
        tickets.push({
            id: 'T002',
            from: departure,
            to: destination,
            number: 'T109',
            departureTime: '20:05',
            arrivalTime: '09:25',
            duration: '13小时20分',
            seatType: '硬卧',
            price: '298',
            remaining: '充足'
        });
    } else if (type === 'flight') {
        tickets.push({
            id: 'F001',
            from: departure,
            to: destination,
            number: 'CA1501',
            departureTime: '10:20',
            arrivalTime: '12:35',
            duration: '2小时15分',
            seatType: '经济舱',
            price: '1240',
            remaining: '充足'
        });
    }
    
    return tickets;
}

// 创建车票卡片
function createTicketCard(ticket, type) {
    const card = document.createElement('div');
    card.className = 'ticket-card';
    card.innerHTML = `
        <div class="ticket-header">
            <div class="ticket-route">
                <div class="route-station">${ticket.from}</div>
                <div class="route-arrow">→</div>
                <div class="route-station">${ticket.to}</div>
            </div>
            <div class="ticket-price">¥${ticket.price}</div>
        </div>
        
        <div class="ticket-details">
            <div class="detail-item">
                <span class="detail-label">车次/航班</span>
                <span class="detail-value">${ticket.number}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">出发时间</span>
                <span class="detail-value">${ticket.departureTime}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">到达时间</span>
                <span class="detail-value">${ticket.arrivalTime}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">历时</span>
                <span class="detail-value">${ticket.duration}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">席别/舱位</span>
                <span class="detail-value">${ticket.seatType}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">余票</span>
                <span class="detail-value">${ticket.remaining}</span>
            </div>
        </div>
        
        <div class="ticket-actions">
            <button class="btn" onclick="bookTicket('${ticket.id}')">立即预订</button>
        </div>
    `;
    
    return card;
}

// 预订车票
function bookTicket(ticketId) {
    // 立即滚动到页面顶部
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // 显示预订消息
    setTimeout(() => {
        showMessage('开始预订车票，将跳转到携程商旅平台', 'info');
    }, 500);
}