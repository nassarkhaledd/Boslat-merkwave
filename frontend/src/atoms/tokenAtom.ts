import { atom } from 'jotai';

const storedToken = localStorage.getItem('token') || '';
const storedIsAdmin = localStorage.getItem('isAdmin') === 'true'; 

export const tokenAtom = atom<string>(storedToken);

// store admin status directly
export const isAdminAtom = atom<boolean>(storedIsAdmin);
