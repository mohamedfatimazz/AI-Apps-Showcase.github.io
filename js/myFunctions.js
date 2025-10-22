// بداية الكود - عمل طالب
document.addEventListener('DOMContentLoaded', function() {
    
    // دمج البيانات القديمة والجديدة
    function combineOldAndNewData() {
        var oldData = localStorage.getItem('ai_apps_list');
        var newData = localStorage.getItem('appsList');
        var allApps = [];
        
        // معالجة البيانات الجديدة
        if (newData) {
            try {
                var parsedNewData = JSON.parse(newData);
                if (Array.isArray(parsedNewData)) {
                    allApps = parsedNewData;
                }
            } catch (error) {
                console.log('خطأ في البيانات الجديدة: ' + error);
            }
        }
        
        // معالجة البيانات القديمة
        if (oldData && allApps.length === 0) {
            try {
                var oldApps = JSON.parse(oldData);
                if (Array.isArray(oldApps)) {
                    for (var i = 0; i < oldApps.length; i++) {
                        var oldApp = oldApps[i];
                        var convertedApp = {
                            appName: oldApp.appName || '',
                            companyName: oldApp.companyName || '',
                            website: oldApp.siteUrl || oldApp.website || '',
                            freeOption: oldApp.isFree === 'free' ? 'مجاني' : 'غير مجاني',
                            category: oldApp.category || '',
                            description: oldApp.description || ''
                        };
                        allApps.push(convertedApp);
                    }
                    localStorage.setItem('appsList', JSON.stringify(allApps));
                    localStorage.removeItem('ai_apps_list');
                    console.log('تم تحويل ' + allApps.length + ' تطبيق قديم');
                }
            } catch (error) {
                console.log('خطأ في البيانات القديمة: ' + error);
            }
        }
        
        return allApps;
    }
    
    // تشغيل دمج البيانات
    combineOldAndNewData();
    
    // إضافة تأثير الانتقال للروابط
    var allLinks = document.querySelectorAll('a');
    for (var i = 0; i < allLinks.length; i++) {
        allLinks[i].addEventListener('click', function(e) {
            var linkHref = this.getAttribute('href');
            if (!linkHref || linkHref.startsWith('#')) return;
            
            e.preventDefault();
            var mainPage = document.querySelector('main.page');
            if (mainPage) {
                mainPage.classList.add('page-exit-active');
            }
            setTimeout(function() {
                window.location.href = linkHref;
            }, 250);
        });
    }
    
    // منع فتح روابط النشر
    var publishLinks = ['publishLink', 'publishLink2', 'publishLink3', 'publishLink4'];
    for (var j = 0; j < publishLinks.length; j++) {
        var publishLink = document.getElementById(publishLinks[j]);
        if (publishLink) {
            publishLink.addEventListener('click', function(e) {
                e.preventDefault();
            });
        }
    }
    
    // قراءة التطبيقات من الذاكرة
    function getAppsFromStorage() {
        var appsData = localStorage.getItem('appsList');
        if (appsData) {
            return JSON.parse(appsData);
        }
        return [];
    }
    
    // حفظ التطبيقات في الذاكرة
    function saveAppsToStorage(appsArray) {
        localStorage.setItem('appsList', JSON.stringify(appsArray));
    }
    
    // عرض التطبيقات في الجدول
    function displayApps() {
        var userApps = getAppsFromStorage();
        var tableBody = document.getElementById('appsTableBody');
        
        if (!tableBody) {
            console.log('لم يتم العثور على الجدول');
            return;
        }
        
        // مسح المحتوى القديم
        tableBody.innerHTML = '';
        
        // التطبيقات الأساسية
        var defaultApps = [
            {
                appName: 'ChatGPT',
                companyName: 'OpenAI',
                website: 'https://chat.openai.com',
                freeOption: 'مجاني',
                category: 'General',
                description: 'أشهر مساعد ذكي للمحادثة يمكنه المساعدة في الكتابة والترجمة والبرمجة.',
                image: './logo/ChatGBT.logo.png',
                video: './video/ChatGBT.mp4'
            },
            {
                appName: 'Claude',
                companyName: 'Anthropic',
                website: 'https://claude.ai',
                freeOption: 'غير مجاني',
                category: 'Analytical',
                description: 'مساعد ذكي مخصص للكتابة والتحليل بمستوى عالٍ من الدقة.',
                image: './logo/Claude.logo.png',
                video: './video/Claude.mp4'
            },
            {
                appName: 'Gemini',
                companyName: 'Google',
                website: 'https://gemini.google.com',
                freeOption: 'مجاني',
                category: 'Integrated',
                description: 'مساعد جوجل الذكي الذي يساعد في البحث والإبداع وإنجاز المهام.',
                image: './logo/Gemini.logo.png',
                video: './video/Gemini.mp4'
            },
            {
                appName: 'Copilot',
                companyName: 'Microsoft',
                website: 'https://copilot.microsoft.com',
                freeOption: 'غير مجاني',
                category: 'Programming',
                description: 'مساعد ذكي مخصص للمبرمجين والمطورين لكتابة الكود.',
                image: './logo/Copilot.logo.png',
                video: './video/Copilot.mp4'
            },
            {
                appName: 'Grok',
                companyName: 'xAI',
                website: 'https://grok.x.ai',
                freeOption: 'مجاني',
                category: 'Entertainment',
                description: 'مساعد ذكي يتميز بشخصية فكاهية وجريئة في الردود.',
                image: './logo/Grok.logo.png',
                video: './video/Grok.mp4'
            }
        ];
        
        // دمج التطبيقات
        var allApps = defaultApps.concat(userApps);
        
        if (allApps.length === 0) {
            var emptyRow = document.createElement('tr');
            emptyRow.innerHTML = '<td colspan="5" style="padding:12px;text-align:center">لا توجد تطبيقات مضافة بعد.</td>';
            tableBody.appendChild(emptyRow);
            return;
        }
        
        // إضافة كل تطبيق إلى الجدول
        for (var k = 0; k < allApps.length; k++) {
            var app = allApps[k];
            var rowId = "appRow" + k;
            var isFree = (app.freeOption === 'مجاني' || app.freeOption === 'free' || app.freeOption === 'yes');
            
            // إنشاء محتوى التفاصيل
            var detailsContent = '';
            if (app.image && app.video) {
                detailsContent = 
                    '<p><strong>الموقع:</strong> <a href="' + app.website + '" target="_blank">' + app.website + '</a></p>' +
                    '<p><strong>شرح مختصر:</strong> ' + app.description + '</p>' +
                    '<img src="' + app.image + '" width="80" alt="شعار التطبيق">' +
                    '<video width="200" controls><source src="' + app.video + '" type="video/mp4">متصفحك لا يدعم تشغيل الفيديو.</video>';
            } else {
                detailsContent = 
                    '<p><strong>الموقع:</strong> <a href="' + app.website + '" target="_blank">' + app.website + '</a></p>' +
                    '<p><strong>شرح مختصر:</strong> ' + app.description + '</p>';
            }
            
            // إنشاء الصف الرئيسي
            var mainRow = document.createElement('tr');
            mainRow.innerHTML = 
                '<td>' + app.appName + '</td>' +
                '<td>' + app.companyName + '</td>' +
                '<td>' + app.category + '</td>' +
                '<td><input type="checkbox" ' + (isFree ? 'checked' : '') + ' disabled></td>' +
                '<td><input type="checkbox"  class="show-details" data-target="' + rowId + '"></td>';
            
            // إنشاء صف التفاصيل
            var detailsRow = document.createElement('tr');
            detailsRow.className = 'app-details1';
            detailsRow.id = rowId;
            detailsRow.style.display = 'none';
            detailsRow.innerHTML = '<td colspan="5">' + detailsContent + '</td>';
            
            // إضافة الصفوف إلى الجدول
            tableBody.appendChild(mainRow);
            tableBody.appendChild(detailsRow);
        }
        
        // استخدام jQuery لإظهار/إخفاء التفاصيل مع fadeToggle
        $('.show-details').click(function () {
            var targetId = $(this).data('target');
            $('#' + targetId).fadeToggle(500);
        });
    }
    
    // التحقق من النص الإنجليزي
    function checkEnglishText(text) {
        return /^[A-Za-z\s]+$/.test(text);
    }
    
    function checkEnglishNoSpaces(text) {
        return /^[A-Za-z]+$/.test(text);
    }
    
    // إضافة تطبيق جديد
    var addForm = document.getElementById('addAppForm');
    if (addForm) {
        addForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var appName = document.getElementById('appName').value.trim();
            var companyName = document.getElementById('companyName').value.trim();
            var website = document.getElementById('website').value.trim();
            var freeOption = document.getElementById('freeOption').value;
            var category = document.getElementById('category').value;
            var description = document.getElementById('description').value.trim();
            
            // التحقق من الحقول المطلوبة
            if (!appName || !companyName || !website || !freeOption || !category || !description) {
                alert("يجب ملء جميع الحقول.");
                return;
            }
            
            // التحقق من صحة البيانات
            if (!checkEnglishText(appName)) {
                alert('خطأ: اسم التطبيق يجب أن يكون أحرف إنجليزية فقط.');
                return;
            }
            
            if (!checkEnglishNoSpaces(companyName)) {
                alert('خطأ: اسم الشركة يجب أن يحتوي أحرف إنجليزية فقط وبدون فراغات.');
                return;
            }
            
            if (!category) {
                alert('خطأ: اختر مجال الاستخدام.');
                return;
            }
            
            if (description.length < 5) {
                alert('خطأ: الرجاء كتابة شرح مختصر أطول.');
                return;
            }
            
            // حفظ البيانات
            var apps = getAppsFromStorage();
            var newApp = { 
                appName: appName, 
                companyName: companyName, 
                website: website, 
                freeOption: freeOption, 
                category: category, 
                description: description 
            };
            
            apps.push(newApp);
            saveAppsToStorage(apps);
            
            // الانتقال إلى صفحة التطبيقات
            window.location.href = 'apps.html';
        });
    }
    
    // عرض التطبيقات عند فتح صفحة التطبيقات
    if (window.location.pathname.endsWith('apps.html')) {
        displayApps();
    }
    
});