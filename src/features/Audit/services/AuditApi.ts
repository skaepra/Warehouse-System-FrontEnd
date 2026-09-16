import api from "../../../shared/api/axiosInstance";

export interface AuditDto {
  id: string;
  productId: string;
  productName?: string;
  systemQuantity: number;
  physicalQuantity: number;
  difference: number;
  status: string; // "0" | "1" | "2" (0 = Pending)
  submittedAt: string;
  storekeeperId?: string;
  managerId?: string;
}

export interface CreateAuditPayload {
  productId: string;
  physicalQuantity: number;
}

export const auditService = {
  getAllAudits: async (status?: string): Promise<AuditDto[]> => {
    const params = status && status !== "ALL" ? { status } : {};
    const response = await api.get<AuditDto[]>("/api/audits", { params });
    return response.data;
  },

  createAudit: async (dto: CreateAuditPayload): Promise<AuditDto> => {
    const response = await api.post<AuditDto>("/api/createAudit", dto);
    return response.data;
  },

  // GET /api/audit/{id} - جلب تفاصيل جرد محدد
  getAuditById: async (id: string): Promise<AuditDto> => {
    const response = await api.get<AuditDto>(`/api/audit/${id}`);
    return response.data;
  },

  // PATCH /api/audit/{id}/approve - قبول الجرد
  approveAudit: async (id: string): Promise<void> => {
    await api.patch(`/api/audit/${id}/approve`);
  },

  // PATCH /api/audit/{id}/reject - رفض الجرد
  rejectAudit: async (id: string): Promise<void> => {
    await api.patch(`/api/audit/${id}/reject`);
  },

  // دالة حذف الجرد (تقتصر العملية على الحالة المعلقة من الجهة الخلفية Backend والأمامية Frontend)
  deleteAudit: async (auditId: string): Promise<void> => {
    await api.delete(`/api/deleteAudit/${auditId}`);
  },
};
