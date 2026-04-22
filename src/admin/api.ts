async function req(path: string, init: RequestInit = {}) {
  const r = await fetch(path, {
    credentials: 'include',
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init.headers || {}) },
  });
  if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || r.statusText);
  return r.json();
}

export const adminApi = {
  me: () => req('/api/auth/me'),
  login: (username: string, password: string) =>
    req('/api/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  logout: () => req('/api/auth/logout', { method: 'POST' }),
  changePassword: (currentPassword: string, newPassword: string) =>
    req('/api/auth/change-password', {
      method: 'POST', body: JSON.stringify({ currentPassword, newPassword }),
    }),
  content: () => req('/api/content'),
  saveI18n: (value: any) =>
    req('/api/admin/i18n', { method: 'PUT', body: JSON.stringify(value) }),
  createCategory: (c: { slug: string; name_en: string; name_bn: string }) =>
    req('/api/admin/categories', { method: 'POST', body: JSON.stringify(c) }),
  updateCategory: (id: number, c: { slug: string; name_en: string; name_bn: string }) =>
    req(`/api/admin/categories/${id}`, { method: 'PUT', body: JSON.stringify(c) }),
  deleteCategory: (id: number) =>
    req(`/api/admin/categories/${id}`, { method: 'DELETE' }),
  createProduct: (p: any) =>
    req('/api/admin/products', { method: 'POST', body: JSON.stringify(p) }),
  updateProduct: (id: number, p: any) =>
    req(`/api/admin/products/${id}`, { method: 'PUT', body: JSON.stringify(p) }),
  deleteProduct: (id: number) =>
    req(`/api/admin/products/${id}`, { method: 'DELETE' }),
  upload: async (file: File): Promise<{ url: string }> => {
    const fd = new FormData();
    fd.append('file', file);
    const r = await fetch('/api/admin/upload', { method: 'POST', credentials: 'include', body: fd });
    if (!r.ok) throw new Error('upload failed');
    return r.json();
  },
};
