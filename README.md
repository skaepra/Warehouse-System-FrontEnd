# ENOUGH — Warehouse Management System (Frontend)

واجهة ويب لنظام إدارة المستودع **ENOUGH**. التطبيق مبني بـ **React** و **TypeScript** و **Vite** و **Tailwind CSS**، ويتبع **Feature-based Architecture**، ويتصل بـ REST API مع مصادقة **JWT** وتجديد تلقائي للـ refresh token.

---

## المميزات

- تسجيل دخول بـ JWT مع تجديد التوكن تلقائياً عند `401`
- صلاحيات حسب الدور: **Manager** و **Sales** و **Storekeeper**
- شريط تنقل يظهر الروابط المناسبة لكل دور، مع تسجيل خروج
- إدارة الموظفين (قائمة + إنشاء موظف)
- إدارة المنتجات: إنشاء منتج، تعديل سعر البيع، إضافة مخزون
- إدارة التصنيفات (إنشاء / تعديل / حذف)
- كتالوج مبيعات مع سلة محلية وإنشاء طلب
- معالجة طلبات أمين المخزن وتحديث الحالة
- جرد المخزون للمدير ولأمين المخزن (إنشاء / اعتماد / رفض)
- عرض الفواتير
- وضع داكن / فاتح
- صفحة 404 للمسارات غير المصرح بها أو غير الموجودة

---

## الأدوار والمسارات

| الدور | الصفحة بعد الدخول | الشاشات |
| --- | --- | --- |
| Manager | `/employeeList` | الموظفين، المنتجات، التصنيفات، الفواتير، جرد المدير |
| Sales | `/productPay` | كتالوج المنتجات، طلبات المبيعات |
| Storekeeper | `/storekeeperOrders` | الطلبات الواردة، جرد أمين المخزن |

الضيف يُوجَّه إلى `/login`. المسارات المحمية معرفة في `src/Layout.tsx` عبر `ProtectedRoute` و `GuestRoute` و `RoleBasedRedirect`.

### جدول المسارات

| المسار | الدور | الشاشة |
| --- | --- | --- |
| `/login` | ضيف فقط | تسجيل الدخول |
| `/employeeList` | Manager | قائمة الموظفين |
| `/createEmployee` | Manager | إنشاء موظف |
| `/product` | Manager | إدارة المنتجات |
| `/category` | Manager | إدارة التصنيفات |
| `/invoice` | Manager | الفواتير |
| `/managerAudit` | Manager | عمليات الجرد |
| `/productPay` | Sales | كتالوج البيع وإنشاء طلب |
| `/salesOrders` | Sales | طلبات المبيعات |
| `/storekeeperOrders` | Storekeeper | طلبات المخزن |
| `/StorekeeperAudit` | Storekeeper | جرد المنتجات |

---

## التقنيات

- React 18, TypeScript, Vite, Tailwind CSS
- React Router
- Axios (`src/shared/api/axiosInstance.ts`)
- Zod للنماذج (تسجيل الدخول وإنشاء موظف)
- JWT (`jwt-decode`) لاستخراج الأدوار من التوكن
- Redux Toolkit + redux-persist (سلة المبيعات)
- React Icons

عنوان الباك إند الافتراضي (مثبت في Axios):

```text
https://localhost:7156
```

---

## التشغيل

المتطلبات: Node.js، وباك إند النظام شغّال على المنفذ أعلاه (شهادة HTTPS محلية مقبولة في المتصفح).

```bash
npm install
npm run dev
```

يفتح التطبيق عادة على `http://localhost:5173`. سكربت `dev` يستخدم `--base=/` حتى تعمل المسارات محلياً.

أوامر أخرى:

```bash
npm run build      # بناء للإنتاج
npm run preview    # معاينة البناء
npm run lint       # ESLint
```

بعد تسجيل الدخول تُحفظ `token` و `refreshToken` في `localStorage`. عند انتهاء الجلسة أو فشل التجديد يُعاد التوجيه إلى `/login`.

---

## هيكل المشروع

```text
src/
  features/
    auth/          تسجيل الدخول، إنشاء موظف، JWT logout
    employee.ts/   قائمة الموظفين
    products/      منتجات المدير (إنشاء، سعر، مخزون)
    category/      التصنيفات
    home/          النافبار + كتالوج المبيعات
    order/         طلبات المبيعات وأمين المخزن
    invoice/       الفواتير
    Audit/         جرد المدير وأمين المخزن
    cart/          شريحة السلة (Redux)
    dark-mode/     الثيم
    error/         404
  Route/           ProtectedRoute, GuestRoute, RoleBasedRedirect
  shared/          Axios، حقول النماذج، helpers للأدوار
  store/           Redux store
  Layout.tsx       تعريف المسارات والنافبار
```

---

## واجهات الـ API المستخدمة

| المجال | أمثلة المسارات |
| --- | --- |
| Auth | `POST /api/login`, `POST /api/refresh-token`, `POST /api/logout`, `POST /api/createEmployee` |
| Users | `GET /api/users` |
| Products | `GET /api/products`, `POST /api/createProduct`, `PATCH /api/updateProduct/:id/price`, `POST /api/product/:id/add-stock` |
| Categories | `GET /api/Categories`, `POST /api/createCategory`, `PUT /api/updateCategory/:id`, `DELETE /api/deleteCategory/:id` |
| Orders | `GET /api/orders`, `GET /api/myOrders`, `POST /api/createOrder`, `PUT /api/cancelOrder/:id`, `PATCH /api/order/:id/status` |
| Invoices | `GET /api/Invoices`, `GET /api/Invoices/:id/details` |
| Audits | `GET /api/audits`, `POST /api/createAudit`, `GET /api/audit/:id`, `PATCH .../approve`, `PATCH .../reject`, `DELETE /api/deleteAudit/:id` |
