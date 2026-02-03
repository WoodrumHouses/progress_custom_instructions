import api from './api';

export enum AssetType {
  RULESHEET = 'rulesheet',
  RULEFLOW = 'ruleflow',
  VOCABULARY = 'vocabulary',
  DECISIONSERVICE = 'decisionservice',
}

export interface Asset {
  id: string;
  name: string;
  description?: string;
  type: AssetType;
  content?: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAssetRequest {
  name: string;
  description?: string;
  type?: AssetType;
  content?: string;
  projectId: string;
}

export interface UpdateAssetRequest {
  name?: string;
  description?: string;
  type?: AssetType;
  content?: string;
}

export const assetService = {
  async getAll(projectId?: string): Promise<Asset[]> {
    const params = projectId ? { projectId } : {};
    const response = await api.get<Asset[]>('/assets', { params });
    return response.data;
  },

  async getById(id: string): Promise<Asset> {
    const response = await api.get<Asset>(`/assets/${id}`);
    return response.data;
  },

  async create(data: CreateAssetRequest): Promise<Asset> {
    const response = await api.post<Asset>('/assets', data);
    return response.data;
  },

  async update(id: string, data: UpdateAssetRequest): Promise<Asset> {
    const response = await api.patch<Asset>(`/assets/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/assets/${id}`);
  },
};
