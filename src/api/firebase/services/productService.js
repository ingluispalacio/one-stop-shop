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
  documentId
} from "firebase/firestore"
import { handleError, handleSuccess } from "../../utils/responseHandler"

const productsRef = collection(db, "products")

export const getProducts = async () => {
  try {
    const q = query(productsRef, where("deleted", "==", false))
    const snapshot = await getDocs(q)
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return handleSuccess("Productos obtenidos correctamente", data)
  } catch (error) {
    return handleError(error, "Error al obtener los productos")
  }
}

export const createProduct = async (data) => {
  try {
    const response = await addDoc(productsRef, {
     ...data,
      deleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return handleSuccess("Producto creada correctamente", response)
  } catch (error) {
    return handleError(error, "Error al crear el producto")
  }
}

export const updateProduct = async (productId, product) => {
  try {
    const productDoc = doc(productsRef, productId);
    await updateDoc(productDoc, {
      ...product,
      updatedAt: new Date(),
    });
    return handleSuccess("Producto actualizado correctamente", { productId, product }, "updateProductProduct");
  } catch (error) {
    return handleError(error, "updateProductProduct");
  }
};

export const getProductById = async (productId) => {
  try {
    const docRef = doc(productsRef, productId);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
      return handleError({ message: "Producto no encontrado" }, "getProductById");
    }
    return handleSuccess("Producto obtenido correctamente", { id: snapshot.id, ...snapshot.data() }, "getProductById");
  } catch (error) {
    return handleError(error, "getProductById");
  }
};


export const getProductsByCategory = async (category_id, productId = null) => {
  try {
    if (!category_id) throw new Error("El category_id es obligatorio.");

    let q;

    if (productId) {
      q = query(
        productsRef,
        where("category_id", "==", category_id),
        where("deleted", "==", false),
        where(documentId(), "!=", productId)
      );
    } else {
      q = query(
        productsRef,
        where("category_id", "==", category_id),
        where("deleted", "==", false)
      );
    }

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return handleSuccess("Productos por categoría obtenidos correctamente", data, "getProductsByCategory");
  } catch (error) {
    return handleError(error, "Error al obtener los productos por categoría");
  }
};


export const softDeleteProduct = async (productId) => {
  try {
    const productDoc = doc(productsRef, productId)
    const response = await updateDoc(productDoc, {
      deleted: true,
      deletedAt: new Date(),
    })
    return handleSuccess("Producto eliminado correctamente", response)
  } catch (error) {
    return handleError(error, "Error al eliminar el rol")
  }
}

export const restoreProduct = async (productId) => {
  try {
    const productDoc = doc(productsRef, productId)
    const response = await updateDoc(productDoc, {
      deleted: false,
      deletedAt: null,
    })
    return handleSuccess("Producto restaurado correctamente", response)
  } catch (error) {
    return handleError(error, "Error al restaurar el producto")
  }
}
