// 生活缴费页面交互功能

document.addEventListener('DOMContentLoaded', function() {
    // 页面加载动画
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 1s';
        setTimeout(function() {
            document.body.style.opacity = '1';
        }, 100);
        
        const cards = document.querySelectorAll('.payment-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s, transform 0.6s';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200 + index * 100);
        });
    });

    // 缴费卡片点击事件
    const paymentCards = document.querySelectorAll('.payment-card');
    const paymentFormContainer = document.querySelector('.payment-form-container');
    const paymentForm = document.getElementById('paymentForm');
    const closeFormBtn = document.querySelector('.close-form');
    const paymentTypeInput = document.getElementById('paymentType');
    const paymentAmountInput = document.getElementById('paymentAmount');
    const amountPresetButtons = document.querySelectorAll('.amount-btn');
    
    // 显示缴费表单
    paymentCards.forEach(card => {
        card.addEventListener('click', function() {
            const paymentType = this.getAttribute('data-type');
            const paymentTitle = this.querySelector('.payment-title').textContent;
            const amountValue = this.querySelector('.amount-value').textContent;
            
            // 设置表单中的缴费类型
            paymentTypeInput.value = paymentTitle;
            
            // 如果是欠费项目，设置默认缴费金额
            if (amountValue.includes('¥')) {
                const amount = amountValue.replace('¥', '').trim();
                paymentAmountInput.value = amount;
            }
            
            // 显示表单
            paymentFormContainer.style.display = 'block';
            
            // 滚动到表单位置
            paymentFormContainer.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // 关闭表单
    closeFormBtn.addEventListener('click', function() {
        paymentFormContainer.style.display = 'none';
    });
    
    // 快捷金额按钮
    amountPresetButtons.forEach(button => {
        button.addEventListener('click', function() {
            const amount = this.getAttribute('data-amount');
            paymentAmountInput.value = amount;
        });
    });
    
    // 表单提交
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const paymentType = paymentTypeInput.value;
        const accountNumber = document.getElementById('accountNumber').value;
        const accountName = document.getElementById('accountName').value;
        const paymentAmount = paymentAmountInput.value;
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
        
        // 简单验证
        if (!accountNumber || !accountName || !paymentAmount) {
            alert('请填写完整的缴费信息');
            return;
        }
        
        // 模拟支付过程
        simulatePayment(paymentType, accountNumber, accountName, paymentAmount, paymentMethod);
    });
    
    // 模拟支付函数
    function simulatePayment(type, account, name, amount, method) {
        // 显示加载状态
        const submitBtn = document.querySelector('.submit-payment');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 支付中...';
        submitBtn.disabled = true;
        
        // 模拟API调用延迟
        setTimeout(() => {
            // 支付成功
            submitBtn.innerHTML = '<i class="fas fa-check"></i> 支付成功';
            submitBtn.style.background = 'linear-gradient(135deg, #00ff9d, #00cc7a)';
            
            // 显示成功消息
            setTimeout(() => {
                alert(`支付成功！\n\n缴费项目：${type}\n缴费账户：${account}\n缴费金额：¥ ${amount}\n支付方式：${getPaymentMethodName(method)}`);
                
                // 重置表单
                paymentForm.reset();
                paymentFormContainer.style.display = 'none';
                
                // 恢复按钮状态
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = 'linear-gradient(135deg, var(--neon-blue), var(--neon-purple))';
                submitBtn.disabled = false;
                
                // 在实际应用中，这里应该更新缴费记录
                updatePaymentHistory(type, amount, method);
                
            }, 1000);
            
        }, 2000);
    }
    
    // 获取支付方式名称
    function getPaymentMethodName(method) {
        switch(method) {
            case 'alipay': return '支付宝';
            case 'wechat': return '微信支付';
            case 'bank': return '银行卡';
            default: return '未知';
        }
    }
    
    // 更新缴费记录（模拟）
    function updatePaymentHistory(type, amount, method) {
        // 在实际应用中，这里应该通过API更新后端数据
        // 这里只是前端模拟
        console.log(`更新缴费记录: ${type}, 金额: ${amount}, 方式: ${method}`);
        
        // 可以在这里添加代码来更新页面上的缴费记录表格
        // 例如添加新行到表格中
    }
    
    // FAQ展开/收起功能
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // 关闭其他展开的FAQ
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // 切换当前FAQ
            item.classList.toggle('active');
        });
    });
    
    // 导航链接平滑滚动
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
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
});