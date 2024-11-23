// Importar funciones específicas de Firebase en lugar de importar todo el objeto firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDBT1FpskHuRQJ86qvMjtZO5nhTvu4mneA",
  authDomain: "productos-e6249.firebaseapp.com",
  projectId: "productos-e6249",
  storageBucket: "productos-e6249.firebasestorage.app",
  messagingSenderId: "850065897659",
  appId: "1:850065897659:web:4e6e1e66f3fa528aff519e",
  measurementId: "G-V8F5SBZ8LZ"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

export { db, collection, addDoc, getDocs };
