
import { get } from '../api/apiClient';

export async function fetchItems(page) {
  const params = {
    "city": "dubai",
    "size": 10,
    "page": page
  };
  return await get('/discovery/v2/events.json', params);
}
