import { auth, db } from "../config";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  setDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { handleSuccess, handleError } from "../../utils/responseHandler";


const usersRef = collection(db, "users");


export const getUsers = async () => {
  try {
    const q = query(usersRef, where("deleted", "==", false));
    const snapshot = await getDocs(q);
    const users = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    return handleSuccess("Usuarios obtenidos correctamente", users, "getUsers");
  } catch (error) {
    console.log("error", error)
    return handleError(error, "getUsers");
  }
};


export const getUserById = async (userId) => {
  try {
    const docRef = doc(usersRef, userId);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
      return handleError({ message: "Usuario no encontrado" }, "getUserById");
    }
    return handleSuccess("Usuario obtenido correctamente", { id: snapshot.id, ...snapshot.data() }, "getUserById");
  } catch (error) {
    return handleError(error, "getUserById");
  }
};


export const updateUser = async (userId, user) => {
  try {
    const userDoc = doc(usersRef, userId);
    await updateDoc(userDoc, {
      ...user,
      updatedAt: new Date(),
    });
    return handleSuccess("Usuario actualizado correctamente", { userId, user }, "updateUser");
  } catch (error) {
    return handleError(error, "updateUser");
  }
};


export const softDeleteUser = async (userId) => {
  try {
    const userDoc = doc(usersRef, userId);
    await updateDoc(userDoc, {
      deleted: true,
      deletedAt: new Date(),
    });
    return handleSuccess("Usuario eliminado (soft delete) correctamente", { userId }, "softDeleteUser");
  } catch (error) {
    return handleError(error, "softDeleteUser");
  }
};


export const restoreUser = async (userId) => {
  try {
    const userDoc = doc(usersRef, userId);
    await updateDoc(userDoc, {
      deleted: false,
      deletedAt: null,
      updatedAt: new Date(),
    });
    return handleSuccess("Usuario restaurado correctamente", { userId }, "restoreUser");
  } catch (error) {
    return handleError(error, "restoreUser");
  }
};


export const createUser = async (email, password, userData) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    const userDoc = doc(db, "users", user.uid);
    await setDoc(userDoc, {
      uid: user.uid,
      email,
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false,
      deletedAt: null,
    });

    return handleSuccess(
      "Usuario creado correctamente",
      { uid: user.uid, email: user.email, ...userData },
      "createUser"
    );
  } catch (error) {
    return handleError(error, "createUser");
  }
};
