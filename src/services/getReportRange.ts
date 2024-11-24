import api from './api';

export interface Filter {
  filter?: string; 
  status?: string; 
}

export default async function getFilter({ filter, status }: Filter): Promise<Filter> {
  try {
    const response = await api.get(`/orders/report/range`, {
      params: { filter, status },
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error fetching filtered orders:', error);
    throw new Error('Failed to fetch orders.');
  }
}
