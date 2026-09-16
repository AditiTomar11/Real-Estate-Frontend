import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEnquiries } from '../context/EnquiriesContext';

export default function AdminInboxPage() {
  const { isAdmin, user } = useAuth();
  const { enquiries, loading, error, addReply } = useEnquiries();
  const [selectedId, setSelectedId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [sendEmail, setSendEmail] = useState(false);
  const [sending, setSending] = useState(false);
  const [replyError, setReplyError] = useState('');

  const selected = useMemo(
    () => enquiries.find((item) => item.id === selectedId) || enquiries[0] || null,
    [enquiries, selectedId],
  );

  // Select the first enquiry once the list arrives from the backend.
  useEffect(() => {
    if (!selectedId && enquiries.length > 0) {
      setSelectedId(enquiries[0].id);
    }
  }, [enquiries, selectedId]);

  if (!isAdmin) {
    return (
      <div className="container" style={{ padding: '80px 24px' }}>
        <h1>Admin access required</h1>
        <p>Please log in with an admin account to view the enquiry inbox.</p>
      </div>
    );
  }

  async function handleReplySubmit(event) {
    event.preventDefault();
    if (!selected || !replyText.trim()) return;

    setSending(true);
    setReplyError('');
    try {
      await addReply(selected.id, replyText);

      // Optional: open the admin's own mail client with the reply prefilled.
      // The reply is already saved in the database either way.
      if (sendEmail && selected.email) {
        const subject = encodeURIComponent(`Re: ${selected.propertyTitle || 'Property enquiry'}`);
        const body = encodeURIComponent(
          `Hi ${selected.name},\n\n${replyText}\n\nThanks,\n${user?.name || 'Bhoomi Team'}`,
        );
        window.open(`mailto:${selected.email}?subject=${subject}&body=${body}`, '_blank');
      }

      setReplyText('');
    } catch (err) {
      setReplyError(err.message || 'Could not send reply. Please try again.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="container" style={{ padding: '80px 24px 120px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1>Admin enquiry inbox</h1>
      </div>

      {loading && <p>Loading enquiries...</p>}
      {error && <p style={{ color: '#b23b3b' }}>{error}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24 }}>
        <aside style={{ background: '#fff', border: '1px solid #e4ddce', borderRadius: 12, padding: 16 }}>
          {enquiries.length === 0 && !loading ? (
            <p>No enquiries yet.</p>
          ) : (
            enquiries.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '14px 12px',
                  marginBottom: 8,
                  border: selected?.id === item.id ? '1px solid #b3873f' : '1px solid #e4ddce',
                  borderRadius: 10,
                  background: selected?.id === item.id ? '#faf7f0' : '#fff',
                  cursor: 'pointer',
                }}
              >
                <strong>{item.name}</strong>
                <div style={{ fontSize: 12, color: '#495467', marginTop: 4 }}>
                  {item.propertyTitle || 'General enquiry'}
                </div>
                <div style={{ fontSize: 11, marginTop: 6, color: item.status === 'NEW' ? '#8f6a2f' : '#4a7c59' }}>
                  {item.status}
                </div>
              </button>
            ))
          )}
        </aside>

        <section style={{ background: '#fff', border: '1px solid #e4ddce', borderRadius: 12, padding: 20 }}>
          {selected ? (
            <>
              <div style={{ marginBottom: 18 }}>
                <h2 style={{ marginBottom: 8 }}>{selected.name}</h2>
                <p style={{ color: '#495467' }}>
                  {selected.email || 'No email'} · {selected.phone}
                </p>
                <p style={{ marginTop: 6 }}>
                  <strong>Property:</strong> {selected.propertyTitle || 'General enquiry'}
                </p>
              </div>

              <div style={{ background: '#faf7f0', borderRadius: 10, padding: 16, marginBottom: 20 }}>
                <strong>Client message</strong>
                <p style={{ marginTop: 8, whiteSpace: 'pre-wrap' }}>{selected.message}</p>
              </div>

              <div style={{ marginBottom: 20 }}>
                <strong>Previous replies</strong>
                {!selected.replies || selected.replies.length === 0 ? (
                  <p style={{ marginTop: 10, color: '#495467' }}>No replies yet.</p>
                ) : (
                  <div style={{ marginTop: 12, display: 'grid', gap: 10 }}>
                    {selected.replies.map((reply) => (
                      <div key={reply.id} style={{ borderLeft: '3px solid #b3873f', paddingLeft: 12 }}>
                        <div style={{ fontSize: 12, color: '#495467', marginBottom: 6 }}>
                          {reply.sender} · {new Date(reply.createdAt).toLocaleString()}
                        </div>
                        <p style={{ whiteSpace: 'pre-wrap' }}>{reply.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <form onSubmit={handleReplySubmit}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}>Reply</label>
                <textarea
                  value={replyText}
                  onChange={(event) => setReplyText(event.target.value)}
                  rows={6}
                  style={{ width: '100%', borderRadius: 10, border: '1px solid #d7cbb5', padding: 12, resize: 'vertical' }}
                  placeholder="Write a response to the client..."
                />

                <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
                  <input
                    type="checkbox"
                    checked={sendEmail}
                    onChange={(event) => setSendEmail(event.target.checked)}
                  />
                  Also open this reply in my email app
                </label>

                {replyError && <p style={{ color: '#b23b3b', marginTop: 10 }}>{replyError}</p>}

                <div style={{ marginTop: 16 }}>
                  <button type="submit" className="btn btn-gold" disabled={sending}>
                    {sending ? 'Sending...' : 'Send reply'}
                  </button>
                </div>
              </form>
            </>
          ) : (
            !loading && <p>No enquiry selected.</p>
          )}
        </section>
      </div>
    </div>
  );
}
