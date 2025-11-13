// smart_service_food.js

// 商家数据 - 每个商家有独特的菜单
const restaurants = [
    {
        id: 1,
        name: "赛博面馆",
        rating: 4.8,
        deliveryTime: "30-40分钟",
        deliveryFee: 5,
        minOrder: 20,
        image: "🍜",
        description: "传统与科技融合的面食专家",
        menu: [
            {
                id: 101,
                name: "赛博牛肉面",
                description: "特制牛肉，浓郁汤底，手工面条，搭配智能调味系统",
                price: 28,
                image: "🍜",
                category: "招牌面食"
            },
            {
                id: 102,
                name: "未来麻辣烫",
                description: "26种食材任选，智能辣度调节，秘制汤底",
                price: 35,
                image: "🥘",
                category: "特色烫菜"
            },
            {
                id: 103,
                name: "数字炸酱面",
                description: "传统炸酱配方，智能搅拌，均匀入味",
                price: 22,
                image: "🍝",
                category: "经典面食"
            },
            {
                id: 104,
                name: "机械水饺",
                description: "纯手工制作，智能控温，皮薄馅大",
                price: 18,
                image: "🥟",
                category: "点心小吃"
            }
        ]
    },
    {
        id: 2,
        name: "未来汉堡",
        rating: 4.6,
        deliveryTime: "25-35分钟",
        deliveryFee: 4,
        minOrder: 25,
        image: "🍔",
        description: "科技感十足的汉堡体验",
        menu: [
            {
                id: 201,
                name: "量子双层牛肉堡",
                description: "双层安格斯牛肉，特制量子酱料，新鲜蔬菜",
                price: 38,
                image: "🍔",
                category: "招牌汉堡"
            },
            {
                id: 202,
                name: "机械炸鸡套餐",
                description: "香脆炸鸡，黄金薯条，冰镇可乐",
                price: 32,
                image: "🍗",
                category: "套餐系列"
            },
            {
                id: 203,
                name: "数字鸡肉卷",
                description: "嫩滑鸡胸肉，新鲜蔬菜，秘制酱料",
                price: 24,
                image: "🌯",
                category: "卷类"
            },
            {
                id: 204,
                name: "未来鸡块",
                description: "外酥里嫩，搭配智能蘸酱",
                price: 16,
                image: "🍟",
                category: "小食"
            }
        ]
    },
    {
        id: 3,
        name: "数字披萨",
        rating: 4.7,
        deliveryTime: "35-45分钟",
        deliveryFee: 6,
        minOrder: 30,
        image: "🍕",
        description: "算法优化的完美披萨",
        menu: [
            {
                id: 301,
                name: "智能芝士披萨",
                description: "三重芝士混合，算法优化配比，薄脆饼底",
                price: 48,
                image: "🍕",
                category: "经典披萨"
            },
            {
                id: 302,
                name: "机械肉食盛宴",
                description: "意大利香肠，培根，火腿，智能调味",
                price: 56,
                image: "🥩",
                category: "肉类披萨"
            },
            {
                id: 303,
                name: "未来海鲜披萨",
                description: "新鲜虾仁，鱿鱼，贝类，海洋风味",
                price: 52,
                image: "🦐",
                category: "海鲜披萨"
            },
            {
                id: 304,
                name: "数字蔬菜披萨",
                description: "8种时令蔬菜，健康低脂选择",
                price: 42,
                image: "🥦",
                category: "素食披萨"
            }
        ]
    },
    {
        id: 4,
        name: "智能寿司",
        rating: 4.9,
        deliveryTime: "40-50分钟",
        deliveryFee: 8,
        minOrder: 40,
        image: "🍣",
        description: "AI辅助的日料大师",
        menu: [
            {
                id: 401,
                name: "三文鱼智能拼盘",
                description: "新鲜三文鱼，多种切法，AI优化搭配",
                price: 68,
                image: "🍣",
                category: "刺身拼盘"
            },
            {
                id: 402,
                name: "未来寿司卷",
                description: "8种口味组合，智能卷制工艺",
                price: 45,
                image: "🥢",
                category: "寿司卷"
            },
            {
                id: 403,
                name: "机械天妇罗",
                description: "精准控温，外酥里嫩，智能蘸料",
                price: 38,
                image: "🍤",
                category: "炸物"
            },
            {
                id: 404,
                name: "数字拉面",
                description: "日式豚骨汤底，智能火候控制",
                price: 35,
                image: "🍜",
                category: "面食"
            }
        ]
    }
];

// 购物车数据
let cart = [];

// 当前选中的商家
let selectedRestaurant = null;

// 订单数据
let orders = [
    {
        id: "ORD2025001",
        restaurant: "赛博面馆",
        status: "delivered",
        date: "2025-03-15 18:30",
        items: [
            { name: "赛博牛肉面", quantity: 1, price: 28 },
            { name: "机械水饺", quantity: 1, price: 18 }
        ],
        total: 46,
        deliveryFee: 5,
        finalTotal: 51
    },
    {
        id: "ORD2025002",
        restaurant: "未来汉堡",
        status: "preparing",
        date: "2025-03-16 12:15",
        items: [
            { name: "量子双层牛肉堡", quantity: 2, price: 38 },
            { name: "机械炸鸡套餐", quantity: 1, price: 32 }
        ],
        total: 108,
        deliveryFee: 4,
        finalTotal: 112
    }
];

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成，开始初始化...');
    initPage();
});

function initPage() {
    console.log('初始化页面...');
    renderRestaurants();
    renderCart();
    renderOrders();
    setupEventListeners();
    console.log('页面初始化完成');
}

// 渲染商家列表
function renderRestaurants() {
    console.log('渲染商家列表...');
    const restaurantGrid = document.getElementById('restaurant-grid');
    
    if (!restaurantGrid) {
        console.error('找不到商家网格容器');
        return;
    }
    
    restaurantGrid.innerHTML = '';
    
    restaurants.forEach(restaurant => {
        const restaurantCard = document.createElement('div');
        restaurantCard.className = `restaurant-card ${selectedRestaurant && selectedRestaurant.id === restaurant.id ? 'active' : ''}`;
        restaurantCard.setAttribute('data-id', restaurant.id);
        restaurantCard.innerHTML = `
            <div class="restaurant-image">${restaurant.image}</div>
            <h3 class="restaurant-name">${restaurant.name}</h3>
            <p class="restaurant-desc">${restaurant.description}</p>
            <div class="restaurant-info">
                <span class="restaurant-rating">⭐ ${restaurant.rating}</span>
                <span class="restaurant-delivery">${restaurant.deliveryTime}</span>
            </div>
            <div class="restaurant-info">
                <span>配送费: ¥${restaurant.deliveryFee}</span>
                <span>起送: ¥${restaurant.minOrder}</span>
            </div>
        `;
        restaurantGrid.appendChild(restaurantCard);
    });
    
    console.log('商家列表渲染完成');
}

// 渲染菜单
function renderMenu(restaurant) {
    console.log('渲染菜单:', restaurant?.name);
    const menuGrid = document.getElementById('menu-grid');
    const selectedRestaurantName = document.getElementById('selected-restaurant-name');
    
    if (!menuGrid || !selectedRestaurantName) {
        console.error('找不到菜单容器');
        return;
    }
    
    menuGrid.innerHTML = '';
    
    if (!restaurant) {
        selectedRestaurantName.textContent = '';
        menuGrid.innerHTML = `
            <div class="no-restaurant-selected">
                <i class="fas fa-utensils"></i>
                <p>请先选择一个商家查看菜单</p>
            </div>
        `;
        return;
    }
    
    selectedRestaurantName.textContent = `- ${restaurant.name}`;
    
    if (!restaurant.menu || restaurant.menu.length === 0) {
        menuGrid.innerHTML = '<div class="no-results">该商家暂无菜单</div>';
        return;
    }
    
    // 按分类分组
    const categories = {};
    restaurant.menu.forEach(item => {
        if (!categories[item.category]) {
            categories[item.category] = [];
        }
        categories[item.category].push(item);
    });
    
    // 渲染每个分类
    Object.keys(categories).forEach(category => {
        const categoryHeader = document.createElement('h3');
        categoryHeader.className = 'menu-category';
        categoryHeader.textContent = category;
        categoryHeader.style.cssText = `
            grid-column: 1 / -1;
            color: var(--neon-pink);
            margin: 20px 0 10px 0;
            font-size: 1.4rem;
            border-bottom: 1px solid rgba(255, 0, 255, 0.3);
            padding-bottom: 5px;
        `;
        menuGrid.appendChild(categoryHeader);
        
        categories[category].forEach(item => {
            const cartItem = cart.find(cartItem => cartItem.id === item.id);
            const quantity = cartItem ? cartItem.quantity : 0;
            
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.innerHTML = `
                <div class="menu-item-image">${item.image}</div>
                <div class="menu-item-content">
                    <div class="menu-item-header">
                        <h3 class="menu-item-name">${item.name}</h3>
                        <div class="menu-item-price">¥${item.price}</div>
                    </div>
                    <p class="menu-item-desc">${item.description}</p>
                    <div class="menu-item-actions">
                        <div class="quantity-controls">
                            <button class="quantity-btn minus" data-id="${item.id}" ${quantity === 0 ? 'disabled' : ''}>-</button>
                            <span class="quantity">${quantity}</span>
                            <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        </div>
                        <button class="add-to-cart" data-id="${item.id}" ${quantity > 0 ? 'disabled' : ''}>
                            ${quantity > 0 ? '已添加' : '加入购物车'}
                        </button>
                    </div>
                </div>
            `;
            menuGrid.appendChild(menuItem);
        });
    });
    
    console.log('菜单渲染完成');
}

// 渲染购物车
function renderCart() {
    console.log('渲染购物车...');
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    const deliveryFee = document.getElementById('delivery-fee');
    const finalPrice = document.getElementById('final-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (!cartItems || !totalPrice || !deliveryFee || !finalPrice || !checkoutBtn) {
        console.error('找不到购物车容器');
        return;
    }
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">购物车为空</div>';
        totalPrice.textContent = '¥0.00';
        deliveryFee.textContent = '¥0.00';
        finalPrice.textContent = '¥0.00';
        checkoutBtn.disabled = true;
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">¥${item.price}</div>
                </div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
            </div>
            <div class="cart-item-total">¥${(item.price * item.quantity).toFixed(2)}</div>
            <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button>
        `;
        cartItems.appendChild(cartItem);
        
        total += item.price * item.quantity;
    });
    
    const delivery = selectedRestaurant ? selectedRestaurant.deliveryFee : 0;
    const finalTotal = total + delivery;
    
    totalPrice.textContent = `¥${total.toFixed(2)}`;
    deliveryFee.textContent = `¥${delivery.toFixed(2)}`;
    finalPrice.textContent = `¥${finalTotal.toFixed(2)}`;
    
    // 检查是否达到起送价
    const minOrder = selectedRestaurant ? selectedRestaurant.minOrder : 0;
    checkoutBtn.disabled = total < minOrder;
    checkoutBtn.title = total < minOrder ? `未达到起送价 ¥${minOrder}` : '立即下单';
    
    console.log('购物车渲染完成');
}

// 渲染订单
function renderOrders() {
    console.log('渲染订单...');
    const orderList = document.getElementById('order-list');
    
    if (!orderList) {
        console.error('找不到订单列表容器');
        return;
    }
    
    orderList.innerHTML = '';
    
    if (orders.length === 0) {
        orderList.innerHTML = '<div class="empty-orders">暂无订单</div>';
        return;
    }
    
    orders.forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';
        
        let statusText = '';
        let statusClass = '';
        
        switch(order.status) {
            case 'delivered':
                statusText = '已完成';
                statusClass = 'status-delivered';
                break;
            case 'preparing':
                statusText = '准备中';
                statusClass = 'status-preparing';
                break;
            case 'delivering':
                statusText = '配送中';
                statusClass = 'status-delivering';
                break;
        }
        
        orderCard.innerHTML = `
            <div class="order-header">
                <div>
                    <div class="order-id">${order.id}</div>
                    <div style="font-size: 0.9rem; color: #b0b0d0; margin-top: 5px;">${order.restaurant}</div>
                </div>
                <div class="order-status ${statusClass}">${statusText}</div>
            </div>
            <div class="order-details">
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item">
                            <span>${item.name} × ${item.quantity}</span>
                            <span>¥${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="order-total">
                <div>
                    <div style="font-size: 0.9rem; color: #b0b0d0;">商品总额: ¥${order.total.toFixed(2)}</div>
                    <div style="font-size: 0.9rem; color: #b0b0d0;">配送费: ¥${order.deliveryFee.toFixed(2)}</div>
                </div>
                <div>
                    <span>实付: ¥${order.finalTotal.toFixed(2)}</span>
                </div>
            </div>
        `;
        orderList.appendChild(orderCard);
    });
    
    console.log('订单渲染完成');
}

// 设置事件监听器
function setupEventListeners() {
    console.log('设置事件监听器...');
    
    // 商家选择
    document.addEventListener('click', function(e) {
        if (e.target.closest('.restaurant-card')) {
            const restaurantCard = e.target.closest('.restaurant-card');
            const restaurantId = parseInt(restaurantCard.getAttribute('data-id'));
            selectRestaurant(restaurantId);
        }
    });
    
    // 搜索功能
    const searchButton = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
    
    // 全局点击事件委托
    document.addEventListener('click', function(e) {
        const target = e.target;
        
        // 菜单数量增加
        if (target.classList.contains('plus') && target.closest('.menu-item')) {
            const itemId = parseInt(target.getAttribute('data-id'));
            updateMenuItemQuantity(itemId, 1);
        }
        
        // 菜单数量减少
        if (target.classList.contains('minus') && target.closest('.menu-item')) {
            const itemId = parseInt(target.getAttribute('data-id'));
            updateMenuItemQuantity(itemId, -1);
        }
        
        // 加入购物车
        if (target.classList.contains('add-to-cart')) {
            const itemId = parseInt(target.getAttribute('data-id'));
            addToCart(itemId, 1);
        }
        
        // 购物车数量增加
        if (target.classList.contains('plus') && target.closest('.cart-item')) {
            const itemId = parseInt(target.getAttribute('data-id'));
            updateCartItemQuantity(itemId, 1);
        }
        
        // 购物车数量减少
        if (target.classList.contains('minus') && target.closest('.cart-item')) {
            const itemId = parseInt(target.getAttribute('data-id'));
            updateCartItemQuantity(itemId, -1);
        }
        
        // 移除购物车项目
        if (target.classList.contains('remove-item') || target.closest('.remove-item')) {
            const removeBtn = target.classList.contains('remove-item') ? target : target.closest('.remove-item');
            const itemId = parseInt(removeBtn.getAttribute('data-id'));
            removeFromCart(itemId);
        }
    });
    
    // 下单按钮
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length > 0) {
                placeOrder();
            }
        });
    }
    
    // 导航链接平滑滚动
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
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
    
    console.log('事件监听器设置完成');
}

// 选择商家
function selectRestaurant(restaurantId) {
    console.log('选择商家:', restaurantId);
    const restaurant = restaurants.find(r => r.id === restaurantId);
    
    if (!restaurant) {
        console.error('找不到商家:', restaurantId);
        return;
    }
    
    // 如果切换商家，清空购物车
    if (selectedRestaurant && selectedRestaurant.id !== restaurantId) {
        if (cart.length > 0) {
            if (confirm(`切换商家将清空当前购物车，确定要选择"${restaurant.name}"吗？`)) {
                cart = [];
            } else {
                return;
            }
        }
    }
    
    selectedRestaurant = restaurant;
    
    // 重新渲染商家列表（更新选中状态）
    renderRestaurants();
    
    // 渲染该商家的菜单
    renderMenu(restaurant);
    
    // 更新购物车
    renderCart();
    
    showNotification(`已选择: ${restaurant.name}`);
    
    // 滚动到菜单区域
    const menuSection = document.getElementById('menu');
    if (menuSection) {
        const offsetTop = menuSection.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// 更新菜单项数量
function updateMenuItemQuantity(itemId, change) {
    if (!selectedRestaurant) return;
    
    const menuItem = selectedRestaurant.menu.find(item => item.id === itemId);
    if (!menuItem) return;
    
    const cartItem = cart.find(item => item.id === itemId);
    let quantity = cartItem ? cartItem.quantity : 0;
    
    quantity += change;
    
    if (quantity < 0) quantity = 0;
    
    if (quantity === 0) {
        // 从购物车移除
        removeFromCart(itemId);
    } else {
        // 更新购物车
        if (cartItem) {
            cartItem.quantity = quantity;
        } else {
            cart.push({
                id: menuItem.id,
                name: menuItem.name,
                price: menuItem.price,
                image: menuItem.image,
                quantity: quantity
            });
        }
        renderCart();
        renderMenu(selectedRestaurant);
    }
}

// 添加到购物车
function addToCart(itemId, quantity) {
    if (!selectedRestaurant) {
        showNotification('请先选择一个商家');
        return;
    }
    
    const menuItem = selectedRestaurant.menu.find(item => item.id === itemId);
    if (!menuItem) return;
    
    const existingItem = cart.find(item => item.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            image: menuItem.image,
            quantity: quantity
        });
    }
    
    renderCart();
    renderMenu(selectedRestaurant);
    showNotification(`已添加 ${menuItem.name} 到购物车`);
}

// 更新购物车项目数量
function updateCartItemQuantity(itemId, change) {
    const cartItem = cart.find(item => item.id === itemId);
    if (!cartItem) return;
    
    cartItem.quantity += change;
    
    if (cartItem.quantity <= 0) {
        removeFromCart(itemId);
    } else {
        renderCart();
        if (selectedRestaurant) {
            renderMenu(selectedRestaurant);
        }
    }
}

// 从购物车移除项目
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    renderCart();
    if (selectedRestaurant) {
        renderMenu(selectedRestaurant);
    }
}

// 搜索功能
function performSearch(query) {
    console.log('执行搜索:', query);
    
    if (!query.trim()) {
        if (selectedRestaurant) {
            renderMenu(selectedRestaurant);
        } else {
            renderMenu(null);
        }
        return;
    }
    
    if (!selectedRestaurant) {
        showNotification('请先选择一个商家进行搜索');
        return;
    }
    
    const filteredItems = selectedRestaurant.menu.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) || 
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    );
    
    const menuGrid = document.getElementById('menu-grid');
    menuGrid.innerHTML = '';
    
    if (filteredItems.length === 0) {
        menuGrid.innerHTML = '<div class="no-results">未找到相关菜品</div>';
        return;
    }
    
    filteredItems.forEach(item => {
        const cartItem = cart.find(cartItem => cartItem.id === item.id);
        const quantity = cartItem ? cartItem.quantity : 0;
        
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <div class="menu-item-image">${item.image}</div>
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3 class="menu-item-name">${item.name}</h3>
                    <div class="menu-item-price">¥${item.price}</div>
                </div>
                <p class="menu-item-desc">${item.description}</p>
                <div class="menu-item-actions">
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-id="${item.id}" ${quantity === 0 ? 'disabled' : ''}>-</button>
                        <span class="quantity">${quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                    <button class="add-to-cart" data-id="${item.id}" ${quantity > 0 ? 'disabled' : ''}>
                        ${quantity > 0 ? '已添加' : '加入购物车'}
                    </button>
                </div>
            </div>
        `;
        menuGrid.appendChild(menuItem);
    });
}

// 下单
function placeOrder() {
    if (!selectedRestaurant) {
        showNotification('请先选择一个商家');
        return;
    }
    
    if (cart.length === 0) {
        showNotification('购物车为空');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const minOrder = selectedRestaurant.minOrder;
    
    if (total < minOrder) {
        showNotification(`未达到起送价 ¥${minOrder}，还需消费 ¥${(minOrder - total).toFixed(2)}`);
        return;
    }
    
    // 生成新订单
    const newOrder = {
        id: `ORD${new Date().getFullYear()}${String(orders.length + 1).padStart(4, '0')}`,
        restaurant: selectedRestaurant.name,
        status: "preparing",
        date: new Date().toLocaleString('zh-CN'),
        items: [...cart],
        total: total,
        deliveryFee: selectedRestaurant.deliveryFee,
        finalTotal: total + selectedRestaurant.deliveryFee
    };
    
    orders.unshift(newOrder);
    cart = [];
    selectedRestaurant = null;
    
    renderRestaurants();
    renderCart();
    renderMenu(null);
    renderOrders();
    
    showNotification(`下单成功！订单号: ${newOrder.id}`);
    
    // 滚动到订单区域
    const orderSection = document.getElementById('orders');
    if (orderSection) {
        const offsetTop = orderSection.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// 显示通知
function showNotification(message) {
    console.log('显示通知:', message);
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 3秒后移除通知
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}