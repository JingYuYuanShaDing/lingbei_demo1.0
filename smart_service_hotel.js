// 酒店数据 - 每个酒店只属于一个类型
const hotelsData = [
    {
        id: 1,
        name: "赛博未来酒店",
        location: "武汉市中心",
        rating: 4.8,
        price: 389,
        type: "luxury",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        features: ["免费WiFi", "游泳池", "健身房", "餐厅"]
    },
    {
        id: 2,
        name: "霓虹精品酒店",
        location: "武汉光谷",
        rating: 4.5,
        price: 289,
        type: "comfort",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        features: ["免费WiFi", "停车场", "早餐", "商务中心"]
    },
    {
        id: 3,
        name: "极光豪华酒店",
        location: "武汉江滩",
        rating: 4.9,
        price: 689,
        type: "luxury",
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        features: ["免费WiFi", "游泳池", "水疗中心", "海景房"]
    },
    {
        id: 4,
        name: "矩阵商务酒店",
        location: "武汉火车站",
        rating: 4.3,
        price: 219,
        type: "economy",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        features: ["免费WiFi", "会议室", "24小时前台", "叫车服务"]
    },
    {
        id: 5,
        name: "数据流度假村",
        location: "武汉东湖",
        rating: 4.7,
        price: 459,
        type: "resort",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        features: ["免费WiFi", "游泳池", "高尔夫球场", "温泉"]
    },
    {
        id: 6,
        name: "云端精品酒店",
        location: "武汉天河机场",
        rating: 4.4,
        price: 329,
        type: "comfort",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        features: ["免费WiFi", "机场接送", "餐厅", "健身房"]
    },
    {
        id: 7,
        name: "光谷快捷酒店",
        location: "武汉光谷",
        rating: 4.1,
        price: 189,
        type: "economy",
        image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        features: ["免费WiFi", "24小时热水", "空调", "电视"]
    },
    {
        id: 8,
        name: "江景豪华酒店",
        location: "武汉江滩",
        rating: 4.8,
        price: 759,
        type: "luxury",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        features: ["江景房", "游泳池", "水疗中心", "米其林餐厅"]
    }
];

// 当前状态
let currentPage = 1;
const hotelsPerPage = 6;
let currentFilter = "all";
let currentSort = "recommended";

// 渲染酒店列表
function renderHotels(hotels, page = 1) {
    const hotelsList = document.getElementById('hotels-list');
    hotelsList.innerHTML = '';
    
    // 分页逻辑
    const startIndex = (page - 1) * hotelsPerPage;
    const endIndex = startIndex + hotelsPerPage;
    const hotelsToShow = hotels.slice(startIndex, endIndex);
    
    if (hotelsToShow.length === 0) {
        hotelsList.innerHTML = '<div class="no-results">没有找到符合条件的酒店</div>';
        return;
    }
    
    hotelsToShow.forEach(hotel => {
        const hotelCard = document.createElement('div');
        hotelCard.className = 'hotel-card';
        
        // 生成星级评分
        let stars = '';
        for (let i = 0; i < 5; i++) {
            if (i < Math.floor(hotel.rating)) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        // 生成特色标签
        let featuresHtml = '';
        hotel.features.forEach(feature => {
            featuresHtml += `<span class="feature-tag">${feature}</span>`;
        });
        
        hotelCard.innerHTML = `
            <img src="${hotel.image}" alt="${hotel.name}" class="hotel-image">
            <div class="hotel-info">
                <h3 class="hotel-name">${hotel.name}</h3>
                <div class="hotel-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${hotel.location}</span>
                </div>
                <div class="hotel-rating">
                    <div class="rating-stars">${stars}</div>
                    <div class="rating-value">${hotel.rating}</div>
                </div>
                <div class="hotel-features">
                    ${featuresHtml}
                </div>
                <div class="hotel-price">
                    <div>
                        <span class="price-amount">¥${hotel.price}</span>
                        <span class="price-unit">/晚</span>
                    </div>
                    <button class="book-btn" data-id="${hotel.id}">立即预订</button>
                </div>
            </div>
        `;
        
        hotelsList.appendChild(hotelCard);
    });
    
    // 添加预订按钮事件
    document.querySelectorAll('.book-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const hotelId = this.getAttribute('data-id');
            const hotel = hotelsData.find(h => h.id == hotelId);
            const checkinDate = document.getElementById('checkin-date').value;
            const checkoutDate = document.getElementById('checkout-date').value;
            
            if (!checkinDate || !checkoutDate) {
                alert('请选择入住和退房日期');
                return;
            }
            
            alert(`您已预订 ${hotel.name}，入住日期：${checkinDate}，退房日期：${checkoutDate}，价格：¥${hotel.price}/晚`);
        });
    });
}

// 渲染分页
function renderPagination(hotels, currentPage) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    
    const totalPages = Math.ceil(hotels.length / hotelsPerPage);
    
    if (totalPages <= 1) return;
    
    // 上一页按钮
    if (currentPage > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'page-btn';
        prevBtn.textContent = '上一页';
        prevBtn.addEventListener('click', () => {
            currentPage--;
            updateHotelsDisplay();
        });
        pagination.appendChild(prevBtn);
    }
    
    // 页码按钮
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            updateHotelsDisplay();
        });
        pagination.appendChild(pageBtn);
    }
    
    // 下一页按钮
    if (currentPage < totalPages) {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'page-btn';
        nextBtn.textContent = '下一页';
        nextBtn.addEventListener('click', () => {
            currentPage++;
            updateHotelsDisplay();
        });
        pagination.appendChild(nextBtn);
    }
}

// 筛选酒店
function filterHotels(type) {
    if (type === 'all') {
        return [...hotelsData];
    }
    return hotelsData.filter(hotel => hotel.type === type);
}

// 排序酒店
function sortHotels(hotels, sortType) {
    const sortedHotels = [...hotels];
    
    switch(sortType) {
        case 'price-low':
            return sortedHotels.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sortedHotels.sort((a, b) => b.price - a.price);
        case 'rating':
            return sortedHotels.sort((a, b) => b.rating - a.rating);
        case 'recommended':
        default:
            return sortedHotels;
    }
}

// 更新酒店显示
function updateHotelsDisplay() {
    let filteredHotels = filterHotels(currentFilter);
    filteredHotels = sortHotels(filteredHotels, currentSort);
    
    renderHotels(filteredHotels, currentPage);
    renderPagination(filteredHotels, currentPage);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 设置默认日期
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    document.getElementById('checkin-date').valueAsDate = today;
    document.getElementById('checkout-date').valueAsDate = tomorrow;
    
    // 初始渲染
    updateHotelsDisplay();
    
    // 搜索按钮事件
    document.getElementById('search-btn').addEventListener('click', function() {
        const checkinDate = document.getElementById('checkin-date').value;
        const checkoutDate = document.getElementById('checkout-date').value;
        
        if (!checkinDate || !checkoutDate) {
            alert('请选择入住和退房日期');
            return;
        }
        
        if (new Date(checkinDate) >= new Date(checkoutDate)) {
            alert('退房日期必须晚于入住日期');
            return;
        }
        
        currentPage = 1;
        updateHotelsDisplay();
        alert('正在搜索符合条件的酒店...');
    });
    
    // 筛选按钮事件
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentFilter = this.getAttribute('data-type');
            currentPage = 1;
            updateHotelsDisplay();
        });
    });
    
    // 排序选择事件
    document.getElementById('sort-select').addEventListener('change', function() {
        currentSort = this.value;
        updateHotelsDisplay();
    });
    
    // 页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s';
    setTimeout(function() {
        document.body.style.opacity = '1';
    }, 100);
});