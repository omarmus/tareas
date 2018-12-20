'use strict'

const appName = 'tasks'

export default {
  set (key, value) {
    window.localStorage.setItem(appName + '_' + key, JSON.stringify(value))
  },

  get (key) {
    let data = window.localStorage.getItem(appName + '_' + key)
    try {
      return JSON.parse(data)
    } catch (Exception) {
      return data
    }
  },

  remove (key) {
    window.localStorage.removeItem(appName + '_' + key)
  },

  exist (key) {
    let value = window.localStorage.getItem(appName + '_' + key)
    return typeof value !== 'undefined' && value !== undefined && value !== null && value !== 'null' && value !== '[]'
  },
  removeAll () {
    window.localStorage.clear()
  }
}
