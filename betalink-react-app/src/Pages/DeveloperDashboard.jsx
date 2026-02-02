import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appAPI } from '../services/api';
import { logout, getUser } from '../utils/auth';

const DeveloperDashboard = () => {
    const navigate = useNavigate();
    const user = getUser();
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Form state
    const [appData, setAppData] = useState({
        title: '',
        description: '',
        apk: null
    });
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        
        // Redirect testers to their dashboard
        if (user.role === 'tester') {
            navigate('/tester-dashboard');
            return;
        }
        
        fetchApps();
    }, []);

    const fetchApps = async () => {
        try {
            // If developer, maybe show OWN apps? Or all apps?
            // "All uploaded apps are displayed on the dashboard" - usually implies Store view for testers, 
            // but "The dashboard includes an Add Apps button" implies this is the Developer's workspace.
            // I will default to showing "My Apps" for developers if I implemented that filter, 
            // but the prompt says "All uploaded apps". Let's assume the Dashboard is "My Apps" for Developer, 
            // but maybe a "Marketplace" for Tester? 
            // Let's stick to: "Get Apps".
            const mode = user?.role === 'developer' ? 'developer' : '';
            const response = await appAPI.getApps(mode);
            if (response.success) {
                setApps(response.apps);
            }
        } catch (error) {
            console.error('Failed to fetch apps', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAppData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setAppData(prev => ({ ...prev, apk: e.target.files[0] }));
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        if (!appData.apk) {
            setMessage({ type: 'error', text: 'Please select an APK file' });
            return;
        }

        const formData = new FormData();
        formData.append('title', appData.title);
        formData.append('description', appData.description);
        formData.append('apk', appData.apk);

        try {
            setUploading(true);
            const response = await appAPI.uploadApp(formData);
            if (response.success) {
                setMessage({ type: 'success', text: 'App uploaded successfully!' });
                setShowModal(false);
                setAppData({ title: '', description: '', apk: null });
                fetchApps();
            }
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Upload failed' });
        } finally {
            setUploading(false);
        }
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
        controls: {
            display: 'flex',
            gap: '1rem',
        },
        btnPrimary: {
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontSize: '0.9rem',
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
        },
        card: {
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            transition: 'transform 0.2s',
        },
        cardTitle: {
            fontSize: '1.25rem',
            fontWeight: '600',
            marginBottom: '0.5rem',
            color: '#1f2937',
        },
        cardDesc: {
            color: '#6b7280',
            marginBottom: '1.5rem',
            fontSize: '0.95rem',
            lineHeight: '1.5',
            flexGrow: 1,
        },
        cardActions: {
            display: 'flex',
            gap: '0.75rem',
            marginTop: 'auto',
        },
        btnAction: {
            flex: 1,
            padding: '0.6rem',
            borderRadius: '6px',
            border: '1px solid #e5e7eb',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            fontWeight: '500',
            cursor: 'pointer',
            textAlign: 'center',
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
            padding: '2rem',
            borderRadius: '16px',
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        },
        formGroup: {
            marginBottom: '1rem',
        },
        label: {
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#374151',
        },
        input: {
            width: '100%',
            padding: '0.75rem',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            fontSize: '0.95rem',
            outline: 'none',
        },
        fileInput: {
            border: '1px dashed #9ca3af',
            padding: '2rem',
            textAlign: 'center',
            borderRadius: '8px',
            cursor: 'pointer',
            width: '100%',
            boxSizing: 'border-box',
        },
        modalActions: {
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1rem',
            marginTop: '1.5rem',
        },
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>Loading...</div>;

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.title}>
                    BetaLink <span style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: '400' }}>| {user?.role === 'developer' ? 'Developer Dashboard' : 'App Evaluation'}</span>
                </div>
                <div style={styles.controls}>
                    {user?.role === 'developer' && (
                        <button style={styles.btnPrimary} onClick={() => setShowModal(true)}>
                            + Add App
                        </button>
                    )}
                    <button style={styles.btnLogout} onClick={handleLogout}>Logout</button>
                </div>
            </header>

            <div style={styles.grid}>
                {apps.length === 0 ? (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#6b7280', padding: '3rem' }}>
                        No apps found. {user?.role === 'developer' && 'Upload your first app to get started!'}
                    </div>
                ) : apps.map(app => (
                    <div key={app._id} style={styles.card}>
                        <div>
                            <h3 style={styles.cardTitle}>{app.title}</h3>
                            <p style={styles.cardDesc}>{app.description}</p>
                        </div>
                        <div style={styles.cardActions}>
                            <button
                                style={{ ...styles.btnAction, backgroundColor: '#000', color: '#fff', border: 'none' }}
                                onClick={() => navigate(`/reviews/${app._id}`)}
                            >
                                View Reviews
                            </button>
                            {/* Add Download/Test button if we had the logic */}
                        </div>
                    </div>
                ))}
            </div>

            {/* Add App Modal */}
            {showModal && (
                <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div style={styles.modal} onClick={e => e.stopPropagation()}>
                        <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Upload New App</h2>

                        {message.text && (
                            <div style={{
                                padding: '0.75rem',
                                marginBottom: '1rem',
                                borderRadius: '6px',
                                backgroundColor: message.type === 'error' ? '#fee2e2' : '#d1fae5',
                                color: message.type === 'error' ? '#991b1b' : '#065f46'
                            }}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleUpload}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>App Title</label>
                                <input
                                    style={styles.input}
                                    name="title"
                                    value={appData.title}
                                    onChange={handleInputChange}
                                    placeholder="e.g. FitTracker Pro"
                                    required
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Description</label>
                                <textarea
                                    style={{ ...styles.input, minHeight: '100px' }}
                                    name="description"
                                    value={appData.description}
                                    onChange={handleInputChange}
                                    placeholder="Describe your app..."
                                    required
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>APK File</label>
                                <input
                                    type="file"
                                    accept=".apk,application/vnd.android.package-archive"
                                    onChange={handleFileChange}
                                    style={styles.fileInput}
                                    required
                                />
                            </div>
                            <div style={styles.modalActions}>
                                <button
                                    type="button"
                                    style={{ ...styles.btnAction, flex: 0, padding: '0.75rem 1.5rem' }}
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={styles.btnPrimary}
                                    disabled={uploading}
                                >
                                    {uploading ? 'Uploading...' : 'Upload App'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeveloperDashboard;
