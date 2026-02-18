# 🛒 רשימת קניות משפחתית

אפליקציית רשימת קניות בזמן אמת לשיתוף בין בני משפחה, בנויה כקובץ HTML יחיד עם Firebase כ-backend.

## ✨ יכולות עיקריות

### בנק מצרכים
- בנק פריטים אישי שנשמר ועולה בין קניות
- סיווג אוטומטי לקטגוריות (ירקות, חלב, בשר, ועוד)
- חיפוש ואוטוקומפליט חכם
- ניהול קטגוריות מותאם אישית

### רשימת קניות
- העברת פריטים מהבנק לרשימה בלחיצה אחת
- כמות לכל פריט — עם + / − או הקלדה ישירה
- הערות לפריטים
- עריכת שם פריט ישירות מהרשימה (לחיצה כפולה)
- סימון ✓ נכנס לעגלה / ✕ לא רוצים
- "סיימתי" — מחזיר את כל הפריטים לבנק

### שיתוף בזמן אמת
- קוד שיתוף בן 6 תווים — כל בני המשפחה על אותה רשימה
- סנכרון Firestore בזמן אמת
- כפתור "עדכנתי את הרשימה" — שולח התראה לכל המחוברים
- עיגולי read receipt: אפור = לא קיבל · ירוק חלול = קיבל · ירוק מלא = פתח
- ביטול התראה בלחיצה נוספת

### 🧺 סלים
- סלים מוכנים מראש (למשל: "סל שבתי", "סל פירות")
- הוספת כל הפריטים בסל לרשימה בלחיצה אחת
- יצירת סל ידנית או מתוך בחירה מהבנק
- טעינת סל מטקסט חופשי

### 📋 טעינת רשימה
- הדבקת כל טקסט עם מצרכים — ווטסאפ, Notes, אימייל
- זיהוי אוטומטי של כמויות, פסיקים, תבניות שונות
- תצוגה מקדימה עם checkbox לכל פריט לפני הייבוא
- ייבוא לבנק בלבד, או ישירות לרשימה

### כלים נוספים
- ביטול פעולה (עד 30 אחורה)
- החלפת סדר תצוגה — בנק למעלה / רשימה למעלה
- היסטוריית רשימות בלובי
- ממשק RTL מלא בעברית

---

## 🚀 התקנה

### דרישות
- חשבון Firebase (חינמי)
- GitHub Pages (לאירוח)

### שלבים

**1. הגדרת Firebase**

```
1. היכנס ל-console.firebase.google.com
2. צור פרויקט חדש
3. הפעל Firestore Database (Production mode)
4. הפעל Anonymous Authentication
5. העתק את הגדרות ה-firebaseConfig
```

**2. הגדרת Firestore Rules**

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /lists/{listId} {
      allow read, write: if true;
      match /presence/{userId} {
        allow read, write: if true;
      }
    }
  }
}
```

**3. עדכון הקובץ**

פתח את `index.html` וחפש את `firebaseConfig` — החלף בנתונים שלך:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  ...
};
```

**4. העלאה ל-GitHub Pages**

```bash
# שנה שם הקובץ ל-index.html
# דחף ל-GitHub
# הפעל GitHub Pages מ-Settings > Pages > main branch
```

**5. אבטחת ה-API Key (מומלץ)**

ב-Google Cloud Console → APIs & Services → Credentials:
- ערוך את ה-API Key
- הגבל ל-HTTP referrers: `https://YOUR_USERNAME.github.io/*`

---

## 🏗️ ארכיטקטורה

```
index.html          ← כל האפליקציה קובץ אחד
├── CSS             ← עיצוב RTL, משתני צבע, רספונסיב
├── HTML            ← לובי, הדר, מודלים
└── JavaScript
    ├── Firebase    ← Firestore + Auth אנונימי
    ├── State       ← אובייקט state מרכזי
    ├── Render      ← renderBank(), renderCart()
    ├── Sync        ← save(), applyRemoteData()
    ├── Import      ← פרסור טקסט חופשי
    └── Baskets     ← ניהול סלים
```

**מבנה הנתונים ב-Firestore:**
```
lists/{code}
  ├── bank[]          פריטי הבנק
  ├── cart[]          פריטי הרשימה
  ├── categories[]    קטגוריות
  ├── baskets[]       סלים שמורים
  ├── listName        שם הרשימה
  ├── notification{}  התראת עדכון
  └── presence/       משתמשים מחוברים
```

---

## 📱 תמיכה

נבנה ואופטימיזציה למובייל. נבדק על Chrome for Android.
