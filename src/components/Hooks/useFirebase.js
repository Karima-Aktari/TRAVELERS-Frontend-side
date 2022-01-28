import { useState, useEffect } from 'react';
import {
    getAuth, signInWithPopup, GoogleAuthProvider, signOut,
    onAuthStateChanged, createUserWithEmailAndPassword, updateProfile,
    signInWithEmailAndPassword,
} from "firebase/auth";
import initializeAuthentication from '../Firebase/Firebasae.init';

initializeAuthentication();
const useFirebase = () => {
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [admin, setAdmin] = useState(false);

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    // Sign in with google
    const signInUsingGoogle = (location, navigate) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                setUser(user);
                saveUser(user?.email, user?.displayName, 'PUT');
                setAuthError('');
                const destination = location?.state?.from || '/';
                navigate(destination);

            }).catch((error) => {

                setAuthError(error.message);

            })
            .finally(() => setIsLoading(false));
    }

    const logout = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => setIsLoading(false));
    }

    //Sign in using Email
    const registerUser = (email, password, name, navigate) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setAuthError('');
                const newUser = { email, displayName: name }
                setUser(newUser);
                //save user to the database
                saveUser(email, name, 'POST');

                // Send name to firebase after creation
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {

                }).catch((error) => {

                });

                navigate('/');
            })
            .catch((error) => {
                setAuthError(error.message);
                // ..
            })
            .finally(() => setIsLoading(false));
    }

    //Sign in using Email-Password
    const loginUser = (email, password, location, navigate) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const destination = location?.state?.from || '/';
                navigate(destination);
                setAuthError('');
                // ...
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    //observe user state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unsubscribe;
    }, [auth])

    // // //set Admin
    // useEffect(() => {
    //     fetch(`https://limitless-castle-21515.herokuapp.com/users/${user?.email}`)
    //         .then(res => res.json())
    //         .then(data => setAdmin(data?.admin))
    // }, [user.email])


    //Make user and save in database
    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('http://localhost:5000/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()

    }

    return {
        user,
        isLoading,
        authError,
        admin,
        registerUser,
        loginUser,
        logout,
        signInUsingGoogle,
    }
};

export default useFirebase;