const trackingForm = document.getElementById("trackingForm");
const infoDisplay = document.getElementById("infoDisplay");
const codeSection = document.getElementById("codeSection");

function showCodeInput() {
  codeSection.style.display = "block";
  trackingForm.style.display = "none";
  infoDisplay.style.display = "none";
}

// إنشاء رمز جديد عشوائي
function generateCode() {
  const newCode = Math.random().toString(36).substring(2, 10);
  alert(`تم إنشاء الرمز الخاص بك: ${newCode}`);
  localStorage.setItem(newCode, JSON.stringify([]));
  document.getElementById("code").value = newCode;
  codeSection.style.display = "none";
  trackingForm.style.display = "block";
}

// فحص الرمز وعرض البيانات المخزنة إذا كانت موجودة
function checkCode() {
  const code = document.getElementById("code").value;
  if (!code) {
    alert("يرجى إدخال الرمز");
    return;
  }

  const storedData = localStorage.getItem(code);
  if (storedData) {
    displayData(JSON.parse(storedData));
    trackingForm.style.display = "block";
  } else {
    alert("الرمز غير موجود. يرجى إنشاء رمز جديد.");
  }
}

// إظهار أو إخفاء الحقول بناءً على نوع العرض
function toggleFields() {
  const type = document.getElementById("type").value;
  document.querySelector(".seriesFields").style.display = type === "series" ? "block" : "none";
}

// حفظ البيانات في localStorage
function saveData() {
  const code = document.getElementById("code").value;
  const type = document.getElementById("type").value;
  const title = document.getElementById("title").value;
  const time = document.getElementById("time").value;
  
  if (!title || !time) {
    alert("يرجى ملء جميع الحقول المطلوبة");
    return;
  }

  const data = { type, title, time };
  if (type === "series") {
    data.season = document.getElementById("season").value;
    data.episode = document.getElementById("episode").value;
  }

  let allData = JSON.parse(localStorage.getItem(code)) || [];
  allData.push(data);
  localStorage.setItem(code, JSON.stringify(allData));
  displayData(allData);
  trackingForm.style.display = "none";
}

// عرض البيانات المخزنة
function displayData(allData) {
  infoDisplay.style.display = "block";
  
  // تأكد من أن allData هو مصفوفة
  if (!Array.isArray(allData)) {
    allData = [];
  }

  let output = `<h3>بيانات المتابعة</h3>`;
  allData.forEach((data, index) => {
    output += `<div class="info-entry">`;
    output += `<p><strong>الاسم:</strong> ${data.title}</p>`;
    if (data.type === "series") {
      output += `<p><strong>الموسم:</strong> ${data.season}</p>`;
      output += `<p><strong>الحلقة:</strong> ${data.episode}</p>`;
    }
    output += `<p><strong>الوقت:</strong> ${data.time}</p>`;
    output += "</div>";
  });
  infoDisplay.innerHTML = output;
}