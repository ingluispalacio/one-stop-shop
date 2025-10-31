import { auth, db } from "../config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getUserById } from "./userService";
import { handleError, handleSuccess } from "../../utils/responseHandler";

export const registerUser = async (email, password, displayName = "") => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    if (displayName) await updateProfile(user, { displayName });

    const userData = {
      uid: user.uid,
      email,
      displayName,
      role: "client",
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false,
      deletedAt: null,
    };

    await setDoc(doc(db, "users", user.uid), userData);

    return handleSuccess("Registro exitoso", { user: userData });
  } catch (error) {
    return handleError(error, "Error al registrar el usuario");
  }
};

export const loginUser = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    const token = await user.getIdToken(true);

    const userData = await getUserById(user.uid);

    return handleSuccess("Inicio de sesión exitoso", { user: userData, token });
  } catch (error) {
    return handleError(error, "Error al iniciar sesión");
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return handleSuccess("Sesión cerrada correctamente");
  } catch (error) {
    return handleError(error, "Error al cerrar sesión");
  }
};

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, async (authUser) => {
    if (authUser) {
      try {
        const userData = await getUserById(authUser.uid);
        callback(userData);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
        callback(null);
      }
    } else {
      callback(null);
    }
  });
};

export const getIdToken = async (user) => {
  if (!user) throw new Error("Usuario no autenticado");
  return await user.getIdToken(true);
};

export const getCurrentUser = async () => {
  const user = auth.currentUser;
  if (!user) return null;
  return await getUserById(user.uid);
};
