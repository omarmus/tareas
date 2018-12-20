import Vue from 'vue'
import Vuex from 'vuex'
import Storage from './lib/storage.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: []
  },
  mutations: {
    addTask (state, task) {
      state.tasks.push(task)
      Storage.set('tasks', state.tasks)
    },
    deleteTask (state, task) {
      deleteItem(state.tasks, task.id)
      Storage.set('tasks', state.tasks)
    },
    updateTask (state, task) {
      let pos = searchPosition(state.tasks, task.id)
      if (pos !== -1) {
        state.tasks[pos] = task
        Storage.set('tasks', state.tasks)
      }
    },
    init (state) {
      state.tasks = Storage.get('tasks')
    }
  },
  getters: {
    getId (state) {
      let id = 0
      state.tasks.map(item => {
        if (item.id > id) {
          id = item.id
        }
      })

      return id + 1
    },
    getTaskById: (state) => (id) => {
      return state.tasks.find(task => task.id === id)
    },
    getTasks: (state) => (status = 'CREATE') => {
      if (Array.isArray(state.tasks)) {
        return state.tasks.filter(item => item.status === status)
      }
      return []
    }
  }
})

function deleteItem (arr, id) {
  let pos = searchPosition(arr, id)
  if (pos !== -1) {
    pos !== -1 && arr.splice(pos, 1)
  }
}

function searchPosition (arr, id) {
  for (let i in arr) {
    if (arr[i].id === id) {
      return i
    }
  }
  return -1
}
