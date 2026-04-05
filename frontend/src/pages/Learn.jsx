import { useState, useEffect } from 'react';
import API from '../api/axios';

export default function Learn() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await API.get('/content');
      setContent(res.data);
    } catch (err) {
      console.error('Failed to fetch content', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['ALL', ...new Set(content.map(c => c.category).filter(Boolean))];
  const filtered = categoryFilter === 'ALL' ? content : content.filter(c => c.category === categoryFilter);

  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Learn About Mutual Funds</h1>
        <p>Educational resources from expert financial advisors to help you invest wisely</p>
      </div>

      <div className="tabs">
        {categories.map(cat => (
          <button key={cat} className={`tab ${categoryFilter === cat ? 'active' : ''}`}
            onClick={() => setCategoryFilter(cat)}>
            {cat === 'ALL' ? 'All Topics' : cat}
          </button>
        ))}
      </div>

      {selected ? (
        <div>
          <button className="btn btn-secondary btn-sm" onClick={() => setSelected(null)}
            style={{ marginBottom: '1.5rem' }}>
            ← Back to Articles
          </button>
          <div className="card">
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
              <span className="content-category-badge">{selected.category}</span>
              {selected.author && (
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  by {selected.author.fullName}
                </span>
              )}
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>{selected.title}</h2>
            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem', whiteSpace: 'pre-line' }}>
              {selected.content}
            </div>
            {selected.tags && (
              <div className="content-tags" style={{ marginTop: '2rem' }}>
                {selected.tags.split(',').map(tag => (
                  <span key={tag} className="content-tag">{tag.trim()}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid-2">
          {filtered.map(item => (
            <div key={item.id} className="content-card" onClick={() => setSelected(item)} style={{ cursor: 'pointer' }}>
              <span className="content-category-badge">{item.category}</span>
              <h3 className="content-title">{item.title}</h3>
              <p className="content-preview">{item.content}</p>
              <div className="content-meta">
                <span>{item.author?.fullName || 'Expert'}</span>
                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
              {item.tags && (
                <div className="content-tags">
                  {item.tags.split(',').slice(0, 3).map(tag => (
                    <span key={tag} className="content-tag">{tag.trim()}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {filtered.length === 0 && !selected && (
        <div className="empty-state">
          <h3>No articles found</h3>
          <p>Check back later for new educational content</p>
        </div>
      )}
    </div>
  );
}
