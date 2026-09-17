<div align="center">

  # 📦 INVENZA — Warehouse Management System

### Frontend Application

**نظام ويب لإدارة المستودعات والمبيعات والمخزون**

<br />

<img src="./public/logo.png" alt="INVENZA Logo" width="120" />

<br />

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge\&logo=react\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge\&logo=tailwindcss\&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge\&logo=redux\&logoColor=white)

</div>

---

## 📋 عن المشروع

**ENOUGH** هو نظام ويب لإدارة المستودعات والمخزون والمبيعات، تم تطوير الواجهة الأمامية باستخدام **React + TypeScript + Vite + Tailwind CSS**.

تم بناء المشروع باستخدام **Feature-based Architecture** لتنظيم الكود وفصل كل Feature عن الأخرى، كما أنه متصل بواجهة خلفية مبنية باستخدام **ASP.NET 8 Web API**.

يدعم النظام عدة أدوار للمستخدمين، حيث تختلف الصفحات والصلاحيات المتاحة حسب دور المستخدم.

---

## ✨ المميزات

* 🔐 تسجيل الدخول باستخدام **JWT Authentication**
* 🔄 تجديد الـ **Refresh Token** تلقائياً عند انتهاء الـ Access Token
* 👥 نظام صلاحيات حسب دور المستخدم
* 📦 إدارة المنتجات والمخزون
* 🏷️ إدارة التصنيفات
* 👨‍💼 إدارة الموظفين
* 🛒 كتالوج المنتجات وسلة المبيعات
* 🧾 إنشاء طلبات المبيعات
* 🚚 معالجة طلبات المستودع وتحديث حالتها
* 📋 إدارة عمليات جرد المخزون
* 🧾 عرض الفواتير وتفاصيلها
* 📱 واجهة متجاوبة مع أحجام الشاشات المختلفة
* 🚫 صفحة 404 للمسارات غير الموجودة أو غير المسموح بها

---

## 👤 الأدوار والصلاحيات

يحتوي النظام على ثلاثة أدوار رئيسية:

| الدور           | الوظائف الرئيسية                                            |
| --------------- | ----------------------------------------------------------- |
| **Manager**     | إدارة الموظفين، المنتجات، التصنيفات، الفواتير، وجرد المخزون |
| **Sales**       | تصفح المنتجات، إنشاء الطلبات، وإدارة طلبات المبيعات         |
| **Storekeeper** | معالجة طلبات المستودع وإدارة جرد المخزون                    |

يتم حماية المسارات حسب الدور باستخدام:

* `ProtectedRoute`
* `GuestRoute`
* `RoleBasedRedirect`

---

## 🛠️ التقنيات المستخدمة

### Frontend

* **React 18**
* **TypeScript**
* **Vite**
* **Tailwind CSS**
* **React Router**
* **Axios**
* **Redux Toolkit**
* **Redux Persist**
* **Zod**
* **JWT / jwt-decode**
* **React Icons**

### Backend

* **ASP.NET 8 Web API**
* REST API
* JWT Authentication

---

## 🏗️ Architecture

تم بناء المشروع باستخدام **Feature-based Architecture**، بحيث تكون كل Feature مسؤولة عن الوظائف الخاصة بها، مما يساعد على تنظيم المشروع وتسهيل تطويره وصيانته.

```text
src/
├── features/
│   ├── auth/
│   ├── employee.ts/
│   ├── products/
│   ├── category/
│   ├── home/
│   ├── order/
│   ├── invoice/
│   ├── Audit/
│   ├── cart/
│   ├── dark-mode/
│   └── error/
│
├── Route/
│   ├── ProtectedRoute
│   ├── GuestRoute
│   └── RoleBasedRedirect
│
├── shared/
│   ├── api/
│   ├── forms/
│   └── helpers/
│
├── store/
│
└── Layout.tsx
```

---

## 🔗 Backend API

الواجهة الأمامية متصلة بـ **ASP.NET 8 Web API** باستخدام Axios.

عنوان الـAPI الافتراضي:

```text
https://localhost:7156
```

يتم إعداد الاتصال بالـAPI من خلال:

```text
src/shared/api/axiosInstance.ts
```

ويتم التعامل مع المصادقة وتجديد الـToken من خلال Axios وJWT.

---

## 🚀 تشغيل المشروع

### المتطلبات

قبل تشغيل المشروع تأكد من توفر:

* **Node.js**
* **npm**
* تشغيل الـBackend الخاص بالمشروع على:

```text
https://localhost:7156
```

### 1. تحميل المشروع

```bash
git clone https://github.com/skaepra/Warehouse-System-FrontEnd.git
```

ثم الدخول إلى مجلد المشروع:

```bash
cd <project-folder>
```

### 2. تثبيت الحزم

```bash
npm install
```

### 3. تشغيل المشروع

```bash
npm run dev
```

بعد التشغيل يمكنك فتح:

```text
http://localhost:5173
```

---

## 📦 أوامر المشروع

### تشغيل بيئة التطوير

```bash
npm run dev
```

### إنشاء Production Build

```bash
npm run build
```

### معاينة Production Build

```bash
npm run preview
```

### فحص الكود باستخدام ESLint

```bash
npm run lint
```

---

## 🔐 Authentication

بعد تسجيل الدخول يتم حفظ:

```text
token
refreshToken
```

في `localStorage`.

عند انتهاء صلاحية الـAccess Token، يحاول التطبيق تجديده باستخدام الـRefresh Token.

وفي حال فشل التجديد أو انتهاء الجلسة، يتم إعادة توجيه المستخدم إلى:

```text
/login
```

---

## 🗂️ الصفحات الرئيسية

| المسار               | الدور       | الوظيفة                      |
| -------------------- | ----------- | ---------------------------- |
| `/login`             | Guest       | تسجيل الدخول                 |
| `/employeeList`      | Manager     | قائمة الموظفين               |
| `/createEmployee`    | Manager     | إنشاء موظف                   |
| `/product`           | Manager     | إدارة المنتجات               |
| `/category`          | Manager     | إدارة التصنيفات              |
| `/invoice`           | Manager     | الفواتير                     |
| `/managerAudit`      | Manager     | جرد المخزون                  |
| `/productPay`        | Sales       | كتالوج المنتجات وإنشاء الطلب |
| `/salesOrders`       | Sales       | طلبات المبيعات               |
| `/storekeeperOrders` | Storekeeper | طلبات المستودع               |
| `/StorekeeperAudit`  | Storekeeper | جرد المخزون                  |

---

## 📱 Responsive Design

تم تصميم الواجهة لتعمل على أحجام شاشات مختلفة باستخدام **Tailwind CSS** مع مراعاة الـResponsive UI في مختلف صفحات النظام.

---

## 📁 Project Structure

يعتمد تنظيم المشروع على فصل المسؤوليات بين:

* **Features** — منطق وواجهات كل Feature
* **Routes** — حماية المسارات والتحكم بالصلاحيات
* **Shared** — الأكواد والمكونات المشتركة
* **Store** — إعداد وإدارة Redux Store
* **Layout** — الهيكل العام والمسارات الرئيسية

---

## 👨‍💻 Developer

**Ahmad Abo Al Shaar**

Frontend Developer
React • TypeScript • React Native • ASP.NET

---

<div align="center">

### 📦 INVENZA

Warehouse Management System

</div>
