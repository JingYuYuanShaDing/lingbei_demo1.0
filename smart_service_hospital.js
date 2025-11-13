const departmentMap = {
    'internal': '内科',
    'surgery': '外科',
    'pediatrics': '儿科',
    'ent': '耳鼻喉科',
    'dermatology': '皮肤科',
    'ophthalmology': '眼科'
};


const doctorsData = {
    internal: [
        {
            name: "张明远",
            title: "主任医师 | 20年经验",
            desc: "毕业于北京医科大学，擅长心血管疾病、高血压、糖尿病等内科常见病、多发病的诊断与治疗。",
            schedule: {
                days: [0, 1, 3, 4, 6],
                times: ['morning', 'afternoon']
            }
        },
        {
            name: "李静",
            title: "副主任医师 | 15年经验",
            desc: "医学博士，擅长消化系统疾病、呼吸系统疾病的诊治，尤其对慢性胃炎、胃溃疡有深入研究。",
            schedule: {
                days: [1, 2, 4, 5],
                times: ['morning']
            }
        }
    ],
    surgery: [
        {
            name: "王建国",
            title: "主任医师 | 25年经验",
            desc: "普外科专家，擅长甲状腺、乳腺、胃肠等疾病的诊断与手术治疗，完成各类手术5000余例。",
            schedule: {
                days: [0, 2, 3, 5, 6],
                times: ['afternoon']
            }
        },
        {
            name: "赵海",
            title: "副主任医师 | 12年经验",
            desc: "骨科专家，擅长关节疾病、骨折、脊柱疾病的诊断与治疗，尤其对微创手术有丰富经验。",
            schedule: {
                days: [1, 2, 3, 4],
                times: ['morning', 'afternoon']
            }
        }
    ],
    pediatrics: [
        {
            name: "陈晓梅",
            title: "主任医师 | 18年经验",
            desc: "儿科专家，擅长儿童呼吸系统疾病、消化系统疾病及儿童生长发育问题的诊断与治疗。",
            schedule: {
                days: [0, 1, 2, 4, 5],
                times: ['morning']
            }
        },
        {
            name: "刘小芳",
            title: "副主任医师 | 10年经验",
            desc: "儿科专家，擅长新生儿疾病、儿童营养与保健，对儿童过敏性疾病有深入研究。",
            schedule: {
                days: [1, 3, 5, 6],
                times: ['afternoon']
            }
        }
    ],
    ent: [
        {
            name: "刘文华",
            title: "副主任医师 | 14年经验",
            desc: "耳鼻喉科专家，擅长鼻炎、咽炎、中耳炎等常见病的诊治，对微创手术有丰富经验。",
            schedule: {
                days: [0, 2, 4, 6],
                times: ['morning', 'afternoon']
            }
        },
        {
            name: "周明",
            title: "主任医师 | 16年经验",
            desc: "耳鼻喉科专家，擅长鼻窦炎、扁桃体炎、听力障碍等疾病的诊断与治疗。",
            schedule: {
                days: [1, 3, 5],
                times: ['morning']
            }
        }
    ],
    dermatology: [
        {
            name: "杨雪",
            title: "主任医师 | 16年经验",
            desc: "皮肤科专家，擅长痤疮、湿疹、银屑病等皮肤病的诊治，对激光美容治疗有深入研究。",
            schedule: {
                days: [0, 1, 3, 5],
                times: ['afternoon']
            }
        },
        {
            name: "黄文静",
            title: "副主任医师 | 12年经验",
            desc: "皮肤科专家，擅长皮肤过敏、真菌感染、色素性皮肤病的诊断与治疗。",
            schedule: {
                days: [2, 4, 6],
                times: ['morning', 'afternoon']
            }
        }
    ],
    ophthalmology: [
        {
            name: "周明",
            title: "副主任医师 | 13年经验",
            desc: "眼科专家，擅长白内障、青光眼、近视等眼部疾病的诊断与治疗，完成眼科手术3000余例。",
            schedule: {
                days: [0, 1, 2, 3, 4, 5, 6],
                times: ['morning']
            }
        },
        {
            name: "吴小华",
            title: "主任医师 | 20年经验",
            desc: "眼科专家，擅长眼底病、角膜病、眼外伤等复杂眼病的诊断与手术治疗。",
            schedule: {
                days: [1, 2, 4, 5],
                times: ['afternoon']
            }
        }
    ]
};


const prescriptionsData = {
    "风寒感冒": [
        { name: "感冒清热颗粒", type: "非处方药", price: "25元" },
        { name: "正柴胡饮颗粒", type: "非处方药", price: "32元" },
        { name: "荆防颗粒", type: "非处方药", price: "28元" }
    ],
    "风热感冒": [
        { name: "银翘解毒片", type: "非处方药", price: "18元" },
        { name: "板蓝根颗粒", type: "非处方药", price: "15元" },
        { name: "双黄连口服液", type: "非处方药", price: "35元" }
    ],
    "病毒性感冒": [
        { name: "奥司他韦胶囊", type: "处方药", price: "120元" },
        { name: "连花清瘟胶囊", type: "非处方药", price: "28元" },
        { name: "抗病毒口服液", type: "非处方药", price: "25元" }
    ],
    "普通感冒": [
        { name: "感冒灵颗粒", type: "非处方药", price: "20元" },
        { name: "维生素C泡腾片", type: "非处方药", price: "35元" },
        { name: "多喝温水", type: "非药物", price: "免费" }
    ]
};


let selectedDoctor = null;


window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s';
    
    setTimeout(function() {
        document.body.style.opacity = '1';
    }, 100);
});


document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});


document.querySelectorAll('.department').forEach(dept => {
    dept.addEventListener('click', function() {
        document.querySelectorAll('.department').forEach(d => d.classList.remove('active'));
        
        this.classList.add('active');
        
        const department = this.getAttribute('data-department');
        
        displayDoctors(department);
        
        resetTimeSelection();
    });
});


function displayDoctors(department) {
    const doctorsContainer = document.getElementById('doctors-container');
    doctorsContainer.innerHTML = '';
    
    if (doctorsData[department]) {
        doctorsData[department].forEach(doctor => {
            const doctorCard = document.createElement('div');
            doctorCard.className = 'doctor-card';
            doctorCard.setAttribute('data-department', department);
            
            doctorCard.innerHTML = `
                <h3 class="doctor-name">${doctor.name}</h3>
                <p class="doctor-title">${doctor.title}</p>
                <p class="doctor-desc">${doctor.desc}</p>
                <button class="btn btn-select-doctor">选择医生</button>
            `;
            
            doctorsContainer.appendChild(doctorCard);
        });
        
        document.querySelectorAll('.btn-select-doctor').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.doctor-card').forEach(card => {
                    card.style.borderColor = 'rgba(10, 200, 255, 0.3)';
                    card.style.boxShadow = 'none';
                });
                
                const card = this.closest('.doctor-card');
                card.style.borderColor = 'var(--neon-blue)';
                card.style.boxShadow = '0 0 15px rgba(10, 200, 255, 0.5)';
                
                const doctorName = card.querySelector('.doctor-name').textContent;
                const department = card.getAttribute('data-department');
                
                const doctorData = doctorsData[department].find(d => d.name === doctorName);
                
                selectedDoctor = {
                    name: doctorName,
                    title: card.querySelector('.doctor-title').textContent,
                    department: department,
                    schedule: doctorData.schedule
                };
                
                showTimeSelection();
            });
        });
    }
}


function showTimeSelection() {
    document.getElementById('time-selection-title').style.display = 'block';
    document.getElementById('calendar').style.display = 'grid';
    document.getElementById('time-slot-title').style.display = 'block';
    document.getElementById('time-slots').style.display = 'grid';
    document.getElementById('confirm-appointment').style.display = 'block';
    
    generateCalendar();
}


function resetTimeSelection() {
    document.getElementById('time-selection-title').style.display = 'none';
    document.getElementById('calendar').style.display = 'none';
    document.getElementById('time-slot-title').style.display = 'none';
    document.getElementById('time-slots').style.display = 'none';
    document.getElementById('confirm-appointment').style.display = 'none';
    
    document.querySelectorAll('.calendar-day').forEach(day => day.classList.remove('selected'));
    document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('selected'));
    
    selectedDoctor = null;
}


function generateCalendar() {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';
    
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(today.getDate() + i);
        
        const dayOfWeek = date.getDay();
        
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.setAttribute('data-date', date.toISOString().split('T')[0]);
        dayElement.setAttribute('data-day', dayOfWeek);
        
        const dayName = days[dayOfWeek];
        const dayNumber = date.getDate();
        const month = date.getMonth() + 1;
        
        dayElement.innerHTML = `
            <div>${month}月${dayNumber}日</div>
            <div>${dayName}</div>
        `;
        
        if (selectedDoctor && selectedDoctor.schedule && !selectedDoctor.schedule.days.includes(dayOfWeek)) {
            dayElement.classList.add('disabled');
            dayElement.innerHTML += `<div style="font-size: 0.7rem; color: var(--neon-pink); margin-top: 5px;">休息</div>`;
        }
        
        dayElement.addEventListener('click', function() {
            if (this.classList.contains('disabled')) return;
            
            document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
            
            this.classList.add('selected');
            
            updateTimeSlots(parseInt(this.getAttribute('data-day')));
        });
        
        calendar.appendChild(dayElement);
    }
    
    const todayElement = calendar.children[0];
    if (!todayElement.classList.contains('disabled')) {
        todayElement.classList.add('selected');
        updateTimeSlots(parseInt(todayElement.getAttribute('data-day')));
    }
}


function updateTimeSlots(dayOfWeek) {
    const timeSlots = document.querySelectorAll('.time-slot');
    
    timeSlots.forEach(slot => {
        const time = slot.getAttribute('data-time');
        
        slot.classList.remove('selected', 'disabled');
        
        if (selectedDoctor && selectedDoctor.schedule && 
            !selectedDoctor.schedule.times.includes(time)) {
            slot.classList.add('disabled');
            slot.innerHTML = `${slot.textContent.split(' ')[0]} <span style="color: var(--neon-pink); font-size: 0.8rem;">(休息)</span>`;
        } else {
            slot.innerHTML = slot.textContent.split(' (')[0];
        }
    });
}


document.querySelectorAll('.time-slot').forEach(slot => {
    slot.addEventListener('click', function() {
        if (this.classList.contains('disabled')) return;
        
        document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
        
        this.classList.add('selected');
    });
});


document.querySelectorAll('.symptom').forEach(symptom => {
    symptom.addEventListener('click', function() {
        this.classList.toggle('selected');
    });
});


document.getElementById('analyze-symptoms').addEventListener('click', function() {
    const selectedSymptoms = Array.from(document.querySelectorAll('.symptom.selected'))
        .map(s => s.getAttribute('data-symptom'));
    
    if (selectedSymptoms.length === 0) {
        alert('请至少选择一个症状');
        return;
    }
    
    let diagnosisType = '';
    let diagnosisDesc = '';
    
    if (selectedSymptoms.includes('runny-nose-clear') && selectedSymptoms.includes('chills')) {
        diagnosisType = '风寒感冒';
        diagnosisDesc = '风寒感冒通常由受凉引起，症状包括流清鼻涕、发冷、头痛等。';
    } else if (selectedSymptoms.includes('runny-nose-yellow') && selectedSymptoms.includes('sore-throat')) {
        diagnosisType = '风热感冒';
        diagnosisDesc = '风热感冒通常由热邪入侵引起，症状包括流黄鼻涕、喉咙痛、发烧等。';
    } else if (selectedSymptoms.includes('fatigue') && selectedSymptoms.includes('body-ache')) {
        diagnosisType = '病毒性感冒';
        diagnosisDesc = '病毒性感冒通常症状较重，包括全身酸痛、疲劳乏力、高烧等。';
    } else {
        diagnosisType = '普通感冒';
        diagnosisDesc = '您的症状较为常见，属于普通感冒，注意休息和多喝水。';
    }
    
    document.getElementById('diagnosis-type').textContent = diagnosisType;
    document.getElementById('diagnosis-desc').textContent = diagnosisDesc;
    
    const prescriptionList = document.getElementById('prescription-list');
    prescriptionList.innerHTML = '';
    
    if (prescriptionsData[diagnosisType]) {
        prescriptionsData[diagnosisType].forEach(med => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${med.name}
                <div class="medicine-info">
                    <span class="prescription-type">${med.type}</span>
                    <span class="prescription-price">${med.price}</span>
                </div>
            `;
            prescriptionList.appendChild(li);
        });
    }
    
    document.getElementById('diagnosis-result').classList.add('active');
});


document.getElementById('confirm-appointment').addEventListener('click', function() {
    const selectedDate = document.querySelector('.calendar-day.selected');
    const selectedTime = document.querySelector('.time-slot.selected');
    
    if (!selectedDoctor || !selectedDate || !selectedTime) {
        alert('请选择医生、日期和时段');
        return;
    }
    
    const dateText = selectedDate.querySelector('div').textContent;
    const dayName = selectedDate.querySelector('div:nth-child(2)').textContent;
    const timeText = selectedTime.textContent.split(' (')[0];
    
    const modal = document.getElementById('appointment-modal');
    const appointmentInfo = document.getElementById('appointment-info');
    
    appointmentInfo.innerHTML = `
        <p><strong>医生：</strong>${selectedDoctor.name}</p>
        <p><strong>职称：</strong>${selectedDoctor.title}</p>
        <p><strong>科室：</strong>${departmentMap[selectedDoctor.department]}</p>
        <p><strong>日期：</strong>${dateText} ${dayName}</p>
        <p><strong>时段：</strong>${timeText}</p>
        <p><strong>挂号费：</strong>25元</p>
        <p><strong>就诊地点：</strong>赛博智能医院3楼</p>
    `;
    
    modal.style.display = 'flex';
});


document.getElementById('cancel-appointment').addEventListener('click', function() {
    document.getElementById('appointment-modal').style.display = 'none';
});

document.getElementById('confirm-modal').addEventListener('click', function() {
    document.getElementById('appointment-modal').style.display = 'none';
    alert('挂号成功！我们已发送确认短信到您的手机。');
});


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


displayDoctors('internal');