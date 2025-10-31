import { db } from "../config"
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore"
import { handleError, handleSuccess } from "../../utils/responseHandler"

const categoriesRef = collection(db, "categories")

export const getCategories = async () => {
  try {
    const q = query(categoriesRef, where("deleted", "==", false))
    const snapshot = await getDocs(q)
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return handleSuccess("Categorías obtenidas correctamente", data)
  } catch (error) {
    return handleError(error, "Error al obtener los categories")
  }
}

export const createCategory = async (data) => {
  try {
    const response = await addDoc(categoriesRef, {
     ...data,
      deleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return handleSuccess("Categoria creada correctamente", response)
  } catch (error) {
    return handleError(error, "Error al crear el categoria")
  }
}

export const updateCategory = async (categoryId, category) => {
  try {
    const categoryDoc = doc(categoriesRef, categoryId);
    await updateDoc(categoryDoc, {
      ...category,
      updatedAt: new Date(),
    });
    return handleSuccess("Categoria actualizada correctamente", { categoryId, category }, "updateCategoryCategory");
  } catch (error) {
    return handleError(error, "updateCategoryCategory");
  }
};

export const getCategoryById = async (categoryId) => {
  try {
    const docRef = doc(categoriesRef, categoryId);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
      return handleError({ message: "Categoria no encontrada" }, "getCategoryById");
    }
    return handleSuccess("Categoria obtenida correctamente", { id: snapshot.id, ...snapshot.data() }, "getCategoryById");
  } catch (error) {
    return handleError(error, "getCategoryById");
  }
};


export const softDeleteCategory = async (categoryId) => {
  try {
    const categoryDoc = doc(categoriesRef, categoryId)
    const response = await updateDoc(categoryDoc, {
      deleted: true,
      deletedAt: new Date(),
    })
    return handleSuccess("Categoria eliminada correctamente", response)
  } catch (error) {
    return handleError(error, "Error al eliminar el rol")
  }
}

export const restoreCategory = async (categoryId) => {
  try {
    const categoryDoc = doc(categoriesRef, categoryId)
    const response = await updateDoc(categoryDoc, {
      deleted: false,
      deletedAt: null,
    })
    return handleSuccess("Categoria restaurada correctamente", response)
  } catch (error) {
    return handleError(error, "Error al restaurar el rol")
  }
}
