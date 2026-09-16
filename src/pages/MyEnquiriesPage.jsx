import { useAuth } from '../context/AuthContext';
import { useEnquiries } from '../context/EnquiriesContext';

export default function MyEnquiriesPage() {
  const { user, isAuthenticated } = useAuth();
  const { enquiries, loading, error } = useEnquiries();

  if (!isAuthenticated) {
    return (
      <div className="container" style={{ padding: '80px 24px' }}>
        <h1>My enquiries</h1>
        <p>Please log in to view your property enquiries and replies.</p>
      </div>
    );
  }

  const myEnquiries = enquiries.filter(
    (item) => (item.email || '').toLowerCase() === (user.email || '').toLowerCase(),
  );

  return (
    <div className="container" style={{ padding: '80px 24px 120px' }}>
      <h1>My enquiries</h1>
      {loading && <p style={{ marginTop: 12 }}>Loading your enquiries...</p>}
      {error && <p style={{ marginTop: 12, color: '#b23b3b' }}>{error}</p>}
      {!loading && myEnquiries.length === 0 ? (
        <p style={{ marginTop: 12 }}>You have not sent any enquiries yet.</p>
      ) : (
        <div style={{ display: 'grid', gap: 18, marginTop: 24 }}>
          {myEnquiries.map((item) => (
            <div key={item.id} style={{ background: '#fff', border: '1px solid #e4ddce', borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <div>
                  <strong>{item.propertyTitle || 'General enquiry'}</strong>
                  <div style={{ color: '#495467', marginTop: 4 }}>{new Date(item.createdAt).toLocaleString()}</div>
                </div>
                <span
                  style={{
                    background: item.status === 'REPLIED' ? '#ecf7ee' : '#f9f1e3',
                    color: item.status === 'REPLIED' ? '#4a7c59' : '#8f6a2f',
                    borderRadius: 999,
                    padding: '6px 10px',
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {item.status}
                </span>
              </div>

              <div style={{ marginTop: 14, background: '#faf7f0', borderRadius: 10, padding: 12 }}>
                <strong>Your message</strong>
                <p style={{ marginTop: 8, whiteSpace: 'pre-wrap' }}>{item.message}</p>
              </div>

              <div style={{ marginTop: 16 }}>
                <strong>Replies</strong>
                {!item.replies || item.replies.length === 0 ? (
                  <p style={{ marginTop: 8, color: '#495467' }}>No reply yet.</p>
                ) : (
                  <div style={{ display: 'grid', gap: 10, marginTop: 10 }}>
                    {item.replies.map((reply) => (
                      <div key={reply.id} style={{ borderLeft: '3px solid #b3873f', paddingLeft: 12 }}>
                        <div style={{ fontSize: 12, color: '#495467', marginBottom: 6 }}>
                          {reply.sender} · {new Date(reply.createdAt).toLocaleString()}
                        </div>
                        <p style={{ whiteSpace: 'pre-wrap' }}>{reply.message}</p>
                        {reply.sentViaEmail && <small style={{ color: '#495467' }}>Also sent to email</small>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
