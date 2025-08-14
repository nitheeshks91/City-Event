
import { useCallback, useEffect, useState } from 'react';
import { get } from '../api/apiClient';

export default function useEventsApi() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(-1);


  const fetchData = useCallback(async () => {
    if (loading || (totalPage != -1 && page >= totalPage)) return;
    setLoading(true);

    try {
      const res = await fetchItems(page);
      setItems(prev => [...prev, ...res._embedded.events]);
      setTotalPage(res.page.totalPages);
      setPage(prev => prev + 1);
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  }, [page, loading, totalPage]);

  useEffect(() => {
    fetchData();
  }, []);

  return { items, loading, fetchData };
}

export async function fetchItems(page) {
  const params = {
    "city": "dubai",
    "size": 10,
    "page": page
  };
  return await get('/discovery/v2/events.json', params);
}

