import { auth } from '@/lib/firebase'; // Importa a instância do passo anterior
import { 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";

// Sua própria função de login, que não expõe o Firebase
export async function loginComCredenciais(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Você pode retornar os dados do usuário de forma padronizada aqui
    return { success: true, user: userCredential.user };
  } catch (error) {
    // Retorna um erro padronizado
    return { success: false, error: error.message };
  }
}

export async function loginComGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return { success: true, user: result.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
