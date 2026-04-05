import { useState, useEffect } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function AdvisorPanel() {
  const { user } = useAuth();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', category: 'Basics', tags: '' });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/content/${editingId}`, form);
      } else {
        await API.post('/content', form);
      }
      setShowForm(false);
      setEditingId(null);
      setForm({ title: '', content: '', category: 'Basics', tags: '' });
      fetchContent();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save content');
    }
  };

  const handleEdit = (item) => {
    setForm({ title: item.title, content: item.content, category: item.category || 'Basics', tags: item.tags || '' });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this content?')) return;
    try {
      await API.delete(`/content/${id}`);
      fetchContent();
    } catch (err) {
      alert('Delete failed');
    }
  };

  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Financial Advisor Panel</h1>
        <p>Create educational content and manage investment guidance for users</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Published Articles</div>
          <div className="stat-value">{content.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Categories Covered</div>
          <div className="stat-value">{new Set(content.map(c => c.category)).size}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">My Articles</div>
          <div className="stat-value">{content.filter(c => c.author?.username === user?.username).length}</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 className="section-title" style={{ marginBottom: 0 }}>Educational Content</h2>
        <button className="btn btn-primary" onClick={() => { setShowForm(true); setEditingId(null); setForm({ title: '', content: '', category: 'Basics', tags: '' }); }}>
          + New Article
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {content.map(item => (
          <div key={item.id} className="content-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="content-category-badge">{item.category}</span>
                <h3 className="content-title">{item.title}</h3>
                <p className="content-preview">{item.content}</p>
                <div className="content-meta">
                  <span>by {item.author?.fullName || 'Unknown'}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(item)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px' }}>
            <div className="modal-header">
              <h3 className="modal-title">{editingId ? 'Edit Article' : 'Create New Article'}</h3>
              <button className="modal-close" onClick={() => setShowForm(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Title</label>
                <input type="text" className="form-input" value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })} required
                  placeholder="Article title" />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-select" value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  <option>Basics</option>
                  <option>Risk Management</option>
                  <option>Investment Strategy</option>
                  <option>Tax Planning</option>
                  <option>Fund Selection</option>
                  <option>Portfolio Management</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Content</label>
                <textarea className="form-textarea" value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })} required
                  placeholder="Write your educational content here..."
                  style={{ minHeight: '250px' }} />
              </div>
              <div className="form-group">
                <label className="form-label">Tags (comma-separated)</label>
                <input type="text" className="form-input" value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="investing, mutual funds, basics" />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                {editingId ? 'Update Article' : 'Publish Article'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
