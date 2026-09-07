import axios from 'axios';

// إنشاء نسخة مخصصة لـ JSON Server
const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // العنوان الأساسي
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;