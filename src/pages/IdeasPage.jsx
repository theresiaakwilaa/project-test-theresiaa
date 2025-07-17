import { useEffect, useState } from 'react';
import { fetchIdeas } from '../api/api';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import Banner from '../components/Banner';

const IdeasPage = () => {
  const [ideas, setIdeas] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem('page');
    return savedPage ? parseInt(savedPage) : 1;
  });
  const [perPage, setPerPage] = useState(() => {
    const savedPerPage = localStorage.getItem('perPage');
    return savedPerPage ? parseInt(savedPerPage) : 10;
  });
  const [sort, setSort] = useState(() => {
    const savedSort = localStorage.getItem('sort');
    return savedSort || '-published_at';
  });
  
  // Banner image - bisa dari CMS atau fallback
  const bannerImage = "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  useEffect(() => {
    // Simpan state ke localStorage
    localStorage.setItem('page', page.toString());
    localStorage.setItem('perPage', perPage.toString());
    localStorage.setItem('sort', sort);

    const getIdeas = async () => {
      setLoading(true);
      try {
        const data = await fetchIdeas({ page, size: perPage, sort });
        setIdeas(data.data || []);
        setTotal(data.meta?.total || 0);
        
        // Debug: Log untuk melihat data yang diterima
        console.log('Ideas received:', data.data?.length || 0);
        console.log('Total ideas:', data.meta?.total || 0);
        
      } catch (error) {
        console.error('Error fetching ideas:', error);
        setIdeas([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    getIdeas();
  }, [page, perPage, sort]);

  const handlePerPageChange = (e) => {
    setPage(1);
    setPerPage(Number(e.target.value));
  };

  const handleSortChange = (e) => {
    setPage(1);
    setSort(e.target.value);
  };

  const showingStart = total > 0 ? ((page - 1) * perPage) + 1 : 0;
  const showingEnd = Math.min(page * perPage, total);

  return (
    <div className="pt-16"> {/* Padding top untuk header fixed */}
      <Banner imageUrl={bannerImage} />

      <div className="container mx-auto px-4 py-8">
        {/* Header dengan info pagination dan controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="text-black">
            {loading ? (
              'Loading...'
            ) : (
              `Showing ${showingStart} - ${showingEnd} of ${total}`
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="perPage" className="text-sm text-black">
                Show per page:
              </label>
              <select 
                id="perPage"
                value={perPage} 
                onChange={handlePerPageChange}
                disabled={loading}
                className="px-6 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
              >
                {[10, 20, 50].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-black">
                Sort by:
              </label>
              <select 
                id="sort"
                value={sort} 
                onChange={handleSortChange}
                disabled={loading}
                className="px-7 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
              >
                <option value="-published_at">Newest</option>
                <option value="published_at">Oldest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mb-4"></div>
            <div className="text-gray-500">Loading ideas...</div>
          </div>
        ) : ideas.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500">No ideas found.</div>
          </div>
        ) : (
          <>
            {/* Grid cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {ideas.map((idea) => (
                <PostCard key={idea.id} post={idea} />
              ))}
            </div>

            {/* Pagination */}
            {total > perPage && (
              <Pagination total={total} currentPage={page} setPage={setPage} perPage={perPage} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default IdeasPage;