import { Instance, SnapshotOut, types } from "mobx-state-tree"
import Gun from "gun"

const gun = new Gun()
const user = gun.user()
/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model("User")
  .props({
    username: types.maybeNull(types.string),
    authenticated: types.maybeNull(types.boolean),
  })
  .views((self) => ({
    get isAuthenticated() {
      return user.is
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    login,
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type UserType = Instance<typeof UserModel>
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>
export interface UserSnapshot extends UserSnapshotType {}
export const createUserDefaultModel = () => types.optional(UserModel, {})
