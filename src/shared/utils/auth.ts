// utils/auth.ts
export const getUserRole = (): string | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    // فك شفرة الجزء الثاني من JWT (Payload)
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(window.atob(base64));

    // استخراج الـ Role حسب تعريف ASP.NET Core Identity
    return (
      payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
      payload["role"] ||
      null
    );
  } catch {
    return null;
  }
};

