import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { ref, onValue, push, runTransaction, serverTimestamp, query, limitToLast } from "firebase/database";

const STORAGE_VISITED_KEY = 'mahmood_portfolio_firebase_visited';
const STORAGE_COUNT_KEY = 'mahmood_portfolio_last_count';

export const useVisits = () => {
    const [count, setCount] = useState<number | null>(() => {
        const cached = localStorage.getItem(STORAGE_COUNT_KEY);
        return cached ? parseInt(cached) : null;
    });
    const [latestVisitor, setLatestVisitor] = useState<{ city: string; country: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // 1. Listen for total visit count changes
        const visitsRef = ref(db, 'stats/total_visits');
        const unsubscribeCount = onValue(visitsRef, (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                setCount(data);
                localStorage.setItem(STORAGE_COUNT_KEY, data.toString());
            }
        }, (err) => {
            console.error("Firebase Count Error:", err);
            setError("Firebase not configured or access denied.");
        });

        // 2. Listen for latest visitor
        const logsRef = ref(db, 'visitor_logs');
        const latestQuery = query(logsRef, limitToLast(1));
        const unsubscribeLogs = onValue(latestQuery, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Firebase query with limitToLast returns an object with the key
                const lastEntry: any = Object.values(data)[0];
                setLatestVisitor({ city: lastEntry.city, country: lastEntry.country });
            }
        }, (err) => {
            console.error("Firebase Log Error:", err);
        });

        // 3. Handle the tracking logic (only once per browser)
        const trackVisit = async () => {
            try {
                const hasVisited = localStorage.getItem(STORAGE_VISITED_KEY);
                if (hasVisited) {
                    setLoading(false);
                    return;
                }

                // Fetch location data from a more permissive API
                let geoData: any = {};
                try {
                    const geoResponse = await fetch('https://geolocation-db.com/json/');
                    if (geoResponse.ok) {
                        geoData = await geoResponse.json();
                    }
                } catch (e) {
                    console.warn('Geolocation failed, falling back to unknown:', e);
                }

                const visitorData = {
                    city: geoData.city || 'Unknown',
                    country: geoData.country_name || 'Unknown',
                    device: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
                    browser: navigator.userAgent.split(') ')[0] + ')', // Clean up UA string
                    timestamp: serverTimestamp()
                };

                // Update Total Count atomically using a transaction
                await runTransaction(visitsRef, (currentValue) => {
                    return (currentValue || 0) + 1;
                });

                // Log the detailed visit
                await push(logsRef, visitorData);

                localStorage.setItem(STORAGE_VISITED_KEY, 'true');
            } catch (err: any) {
                console.error('Tracking Error:', err);
            } finally {
                setLoading(false);
            }
        };

        trackVisit();

        return () => {
            unsubscribeCount();
            unsubscribeLogs();
        };
    }, []);

    return { count, latestVisitor, loading, error };
};
