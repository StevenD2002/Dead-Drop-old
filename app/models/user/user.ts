import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model("User")
  .props({
    username: types.maybeNull(types.string)
  })
  .views((self) => ({
    isLoggedIn() {
      return self.username !== null
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setUsername(username: string) {
      if (username.length == 0) {
        return false;
      }
      self.username = username
      return true;
    },
    forget() {
      self.username = null
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type UserType = Instance<typeof UserModel>
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>
export interface UserSnapshot extends UserSnapshotType {}
export const createUserDefaultModel = () => types.optional(UserModel, {})
