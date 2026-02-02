import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appAPI, reviewAPI } from '../services/api';
import { logout, getUser } from '../utils/auth';
import logo2 from '../assets/logo2.png';

const TesterDashboard = () => {
    const navigate = useNavigate();
    const user = getUser();
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedApp, setSelectedApp] = useState(null);
    
    // Review form state
    const [reviewData, setReviewData] = useState({
        content: '',
        rating: 5
    });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        
        // Redirect only developers to their dashboard
        if (user.role === 'developer') {
            navigate('/dashboard');
            return;
        }
        
        // Testers and clients can access this dashboard
        fetchApps();
    }, []);

    const fetchApps = async () => {
        try {
            const response = await appAPI.getApps();
            if (response.success) {
                setApps(response.apps);
            }
        } catch (error) {
            console.error('Failed to fetch apps', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (appId, appTitle) => {
        try {
            const response = await fetch(`http://localhost:5000/api/apps/download/${appId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('betalink_token')}`
                }
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${appTitle}.apk`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            } else {
                alert('Download failed. Please try again.');
            }
        } catch (error) {
            console.error('Download error:', error);
            alert('Download failed. Please try again.');
        }
    };

    const handleReviewClick = (app) => {
        setSelectedApp(app);
        setShowReviewModal(true);
        setMessage({ type: '', text: '' });
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        if (!reviewData.content.trim()) {
            setMessage({ type: 'error', text: 'Please enter your feedback' });
            return;
        }

        try {
            setSubmitting(true);
            const response = await reviewAPI.addReview({
                appId: selectedApp._id,
                content: reviewData.content,
                rating: reviewData.rating
            });

            if (response.success) {
                setMessage({ type: 'success', text: 'Review submitted successfully!' });
                setReviewData({ content: '', rating: 5 });
                setTimeout(() => {
                    setShowReviewModal(false);
                    setSelectedApp(null);
                }, 1500);
            }
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Failed to submit review' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleContactClick = (app) => {
        // Navigate to chat page with developer
        navigate(`/chat/${app.developer._id}?appId=${app._id}&appTitle=${encodeURIComponent(app.title)}`);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const styles = {
        container: {
            minHeight: '100vh',
            backgroundColor: '#f8f9fa',
            fontFamily: "'Inter', sans-serif",
            padding: '2rem',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '3rem',
            padding: '1rem',
            backgroundColor: '#fff',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        },
        title: {
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#111827',
        },
        subtitle: {
            fontSize: '0.9rem',
            color: '#6b7280',
            marginTop: '0.25rem',
        },
        btnLogout: {
            backgroundColor: '#fff',
            color: '#ef4444',
            border: '1px solid #ef4444',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem',
        },
        card: {
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            transition: 'transform 0.2s, box-shadow 0.2s',
        },
        cardHover: {
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        },
        appLogo: {
            width: '80px',
            height: '80px',
            borderRadius: '12px',
            backgroundColor: '#e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            fontWeight: '700',
            color: '#9ca3af',
            marginBottom: '1rem',
        },
        cardTitle: {
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '0.5rem',
        },
        cardMeta: {
            fontSize: '0.85rem',
            color: '#6b7280',
            marginBottom: '0.5rem',
        },
        cardDesc: {
            color: '#374151',
            fontSize: '0.95rem',
            lineHeight: '1.5',
            marginBottom: '1rem',
            flexGrow: 1,
        },
        cardActions: {
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
        },
        btnAction: {
            flex: 1,
            minWidth: '90px',
            padding: '0.6rem',
            borderRadius: '8px',
            border: 'none',
            fontWeight: '600',
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
        },
        btnDownload: {
            backgroundColor: '#10b981',
            color: '#fff',
        },
        btnReview: {
            backgroundColor: '#3b82f6',
            color: '#fff',
        },
        btnContact: {
            backgroundColor: '#8b5cf6',
            color: '#fff',
        },
        modalOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        },
        modal: {
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '2rem',
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        },
        modalHeader: {
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '1.5rem',
        },
        formGroup: {
            marginBottom: '1.5rem',
        },
        label: {
            display: 'block',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem',
        },
        textarea: {
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontFamily: 'inherit',
            resize: 'vertical',
            minHeight: '120px',
        },
        select: {
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontFamily: 'inherit',
        },
        modalActions: {
            display: 'flex',
            gap: '1rem',
            marginTop: '1.5rem',
        },
        btnSubmit: {
            flex: 1,
            padding: '0.75rem',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '1rem',
            cursor: 'pointer',
        },
        btnCancel: {
            flex: 1,
            padding: '0.75rem',
            backgroundColor: '#e5e7eb',
            color: '#374151',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '1rem',
            cursor: 'pointer',
        },
        alert: {
            padding: '0.75rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            fontSize: '0.9rem',
        },
        alertSuccess: {
            backgroundColor: '#d1fae5',
            color: '#065f46',
        },
        alertError: {
            backgroundColor: '#fee2e2',
            color: '#991b1b',
        },
        loading: {
            textAlign: 'center',
            fontSize: '1.2rem',
            color: '#6b7280',
            marginTop: '3rem',
        },
        emptyState: {
            textAlign: 'center',
            padding: '3rem',
            color: '#6b7280',
        },
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>Loading apps...</div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={logo2} alt="BetaLink Logo" style={{ height: '44px', width: 'auto' }} />
                    <div>
                        <div style={styles.title}>Tester Dashboard</div>
                        <div style={styles.subtitle}>Welcome, {user?.fullName}</div>
                    </div>
                </div>
                <button style={styles.btnLogout} onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {apps.length === 0 ? (
                <div style={styles.emptyState}>
                    <h2>No apps available yet</h2>
                    <p>Check back later when developers upload apps for testing.</p>
                </div>
            ) : (
                <div style={styles.grid}>
                    {apps.map((app) => (
                        <div key={app._id} style={styles.card}>
                            <div style={styles.appLogo}>
                                {app.title.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <div style={styles.cardTitle}>{app.title}</div>
                                <div style={styles.cardMeta}>
                                    By {app.developer?.fullName || 'Unknown Developer'}
                                </div>
                                <div style={styles.cardDesc}>{app.description}</div>
                            </div>
                            <div style={styles.cardActions}>
                                <button
                                    style={{ ...styles.btnAction, ...styles.btnDownload }}
                                    onClick={() => handleDownload(app._id, app.title)}
                                >
                                    Download
                                </button>
                                <button
                                    style={{ ...styles.btnAction, ...styles.btnReview }}
                                    onClick={() => handleReviewClick(app)}
                                >
                                    Review
                                </button>
                                <button
                                    style={{ ...styles.btnAction, ...styles.btnContact }}
                                    onClick={() => handleContactClick(app)}
                                >
                                    Contact
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Review Modal */}
            {showReviewModal && selectedApp && (
                <div style={styles.modalOverlay} onClick={() => setShowReviewModal(false)}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            Review: {selectedApp.title}
                        </div>

                        {message.text && (
                            <div style={{
                                ...styles.alert,
                                ...(message.type === 'success' ? styles.alertSuccess : styles.alertError)
                            }}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleReviewSubmit}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Rating</label>
                                <select
                                    style={styles.select}
                                    value={reviewData.rating}
                                    onChange={(e) => setReviewData(prev => ({ ...prev, rating: Number(e.target.value) }))}
                                >
                                    <option value={5}>5 - Excellent</option>
                                    <option value={4}>4 - Good</option>
                                    <option value={3}>3 - Average</option>
                                    <option value={2}>2 - Poor</option>
                                    <option value={1}>1 - Very Poor</option>
                                </select>
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>
                                    Testing Feedback (Bugs, Errors, Test Results)
                                </label>
                                <textarea
                                    style={styles.textarea}
                                    placeholder="Describe any bugs, errors, or test results you encountered..."
                                    value={reviewData.content}
                                    onChange={(e) => setReviewData(prev => ({ ...prev, content: e.target.value }))}
                                    required
                                />
                            </div>

                            <div style={styles.modalActions}>
                                <button
                                    type="button"
                                    style={styles.btnCancel}
                                    onClick={() => setShowReviewModal(false)}
                                    disabled={submitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={styles.btnSubmit}
                                    disabled={submitting}
                                >
                                    {submitting ? 'Sending...' : 'Send'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TesterDashboard;
