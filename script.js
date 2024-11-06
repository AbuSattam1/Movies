const trackingForm = document.getElementById("trackingForm");
const infoDisplay = document.getElementById("infoDisplay");
const codeSection = document.getElementById("codeSection");

function checkCode() {
  const code = document.getElementById("code").value;
  if (!code) {
    alert("يرجى إدخال رمز رقمي");
    return;
  }
  
  // تأكد أن الرمز لم يتم استخدامه من قبل
  if (localStorage.getItem(code)) {
    alert("الرمز مستخدم من قبل. يرجى اختيار رمز آخر.");
  } else {
    localStorage.setItem(code, JSON.stringify([]));
    alert(`تم حفظ الرمز: ${code}`);
    trackingForm.style.display = "block";
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
  
  if (!Array.isArray(allData)) {
    allData = [];
  }

  let output = `<h3>بيانات المتابعة</h3>`;
  allData.forEach((data) => {
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

// حذف جميع البيانات
function deleteData() {
  const code = document.getElementById("code").value;
  if (confirm("هل أنت متأكد من حذف جميع البيانات؟")) {
    localStorage.removeItem(code);
    alert("تم حذف البيانات بنجاح.");
    trackingForm.style.display = "none";
    infoDisplay.style.display = "none";
  }
}
