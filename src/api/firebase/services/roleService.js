import { db } from "../config"
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore"
import { handleError, handleSuccess } from "../../utils/responseHandler"

const rolesRef = collection(db, "roles")

export const getRoles = async () => {
  try {
    const q = query(rolesRef, where("deleted", "==", false))
    const snapshot = await getDocs(q)
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return handleSuccess("Roles obtenidos correctamente", data)
  } catch (error) {
    return handleError(error, "Error al obtener los roles")
  }
}

export const createRole = async (name, description = "") => {
  try {
    const response = await addDoc(rolesRef, {
      name,
      description,
      deleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return handleSuccess("Rol creado correctamente", response)
  } catch (error) {
    return handleError(error, "Error al crear el rol")
  }
}

export const softDeleteRole = async (roleId) => {
  try {
    const roleDoc = doc(db, "roles", roleId)
    const response = await updateDoc(roleDoc, {
      deleted: true,
      deletedAt: new Date(),
    })
    return handleSuccess("Rol eliminado correctamente", response)
  } catch (error) {
    return handleError(error, "Error al eliminar el rol")
  }
}

export const restoreRole = async (roleId) => {
  try {
    const roleDoc = doc(db, "roles", roleId)
    const response = await updateDoc(roleDoc, {
      deleted: false,
      deletedAt: null,
    })
    return handleSuccess("Rol restaurado correctamente", response)
  } catch (error) {
    return handleError(error, "Error al restaurar el rol")
  }
}
