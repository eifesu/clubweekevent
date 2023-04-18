import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { auth } from '@/util/firebase';

const useAuth = () => {
  const [user, setUser] = useState(null); // User object
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Firebase authentication state listener
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (auth.currentUser) {
        // If user is authenticated, set user object
        setUser(authUser as any);
        setLoading(false);
      } else {
        // If user is not authenticated, set user object to null
        setUser(null);
        setLoading(false);
      }
    });

    // Unsubscribe from the authentication state listener on unmount
    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export default useAuth;