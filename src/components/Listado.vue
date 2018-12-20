<template>
  <section class="tasks grid grid-tasks">
    <div class="tasks-grid">
      <div class="tasks-container">
        <h2 class="tasks-title">Tareas pendientes</h2>
        <div class="tasks-list">
          <ul class="tasks-items">
            <li
              class="tasks-item"
              v-for="item in tasks"
              :class="{ 'p-0': item.edit }"
              :key="item.id">
              <template v-if="item.edit">
                <form
                  @submit.prevent="update(item)"
                  class="tasks-form">
                  <div class="tasks-item">
                    <textarea
                      :id="'tasks-input-' + item.id"
                      class="tasks-input"
                      v-model="item.textUpdate"
                      @keydown.enter="update(item)"
                      placeholder="Introduzca el título de la tarea para actualizar..."></textarea>
                  </div>
                  <button
                    class="btn btn-success btn-first"
                    type="submit">Guardar</button>
                  <button
                    title="Cancelar"
                    class="btn btn-icon"
                    @click="item.edit = false"
                    type="button"><span>✖️</span></button>
                </form>
              </template>
              <template v-else>
                <div class="tasks-text">{{ item.text }}</div>
                <div class="tasks-options">
                  <button
                    title="Finalizar"
                    @click="check(item)"
                    type="button"
                    class="btn btn-icon btn-sm">
                    <span>✔️</span>
                  </button>
                  <button
                    title="Actualizar"
                    @click="updateActive(item)"
                    type="button"
                    class="btn btn-icon btn-sm">
                    <span>✏️</span>
                  </button>
                  <button
                    class="btn btn-icon btn-sm"
                    title="Eliminar"
                    type="button"
                    @click="remove(item)">
                    <span>✖️</span>
                  </button>
                </div>
              </template>
            </li>
          </ul>
        </div>

        <a
          v-if="!openAdd"
          href=""
          class="tasks-add"
          @click.prevent="openAdd = true">
          ➕ <span>Añadir nueva tarea</span>
        </a>

        <form
          v-if="openAdd"
          @submit.prevent="add"
          class="tasks-form">
          <div class="tasks-item">
            <textarea
              id="tasks-input"
              class="tasks-input"
              v-model="task"
              @keydown.enter="add"
              placeholder="Introduzca el título de la tarea..."></textarea>
          </div>
          <button
            class="btn btn-success"
            type="submit">Agregar</button>
          <button
            title="Cancelar"
            class="btn btn-icon"
            @click="openAdd = false"
            type="button"><span>✖️</span></button>
        </form>
      </div>
    </div>
    <div class="tasks-grid">
      <div class="tasks-container">
        <h2 class="tasks-title">Tareas terminadas</h2>
        <div class="tasks-list">
          <label v-if="success.length === 0">No tiene ninguna tarea terminada</label>
          <ul class="tasks-items" v-else>
            <li
              class="tasks-item success"
              v-for="item in success"
              :key="item.id">
              ✔️ {{ item.text }}
              <div class="tasks-options">
                <button
                  class="btn btn-icon btn-sm"
                  title="Eliminar"
                  type="button"
                  @click="remove(item)">
                  <span>✖️</span>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      task: null,
      openAdd: false
    }
  },
  mounted () {
    this.$store.commit('init')
  },
  methods: {
    add () {
      if (this.task && this.task.length) {
        let task = {
          id: this.$store.getters.getId,
          text: this.task,
          status: 'CREATE',
          edit: false
        }
        this.$store.commit('addTask', task)
        this.task = null
        this.openAdd = false
      }
    },
    remove (task) {
      this.$store.commit('deleteTask', task)
    },
    check (task) {
      task.status = 'SUCCESS'
      task = Object.assign({}, task)
      this.$store.commit('updateTask', task)
    },
    updateActive (task) {
      task.textUpdate = task.text + ''
      task.edit = true
      task = Object.assign({}, task)
      this.$store.commit('updateTask', task)
      setTimeout(() => {
        document.getElementById(`tasks-input-${task.id}`).focus()
      }, 100)
    },
    update (task) {
      if (task.textUpdate && task.textUpdate.length) {
        task.text = task.textUpdate + ''
        task.textUpdate = null
        task.edit = false
        task = Object.assign({}, task)
        this.$store.commit('updateTask', task)
      }
    }
  },
  computed: {
    tasks () {
      return this.$store.getters.getTasks('CREATE')
    },
    success () {
      return this.$store.getters.getTasks('SUCCESS')
    }
  },
  watch: {
    openAdd (val) {
      if (val) {
        this.task = null
        setTimeout(() => {
          document.getElementById('tasks-input').focus()
        }, 100)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/_variables.scss';

$bgContainer: #DFE3E6;

.grid {
  &.grid-tasks {
    grid-template-columns: 310px 310px 1fr;
  }
}

.tasks {
  padding: 20px;
  height: calc(100vh - 40px);
  box-sizing: border-box;

  .btn {
    margin: 0;
  }

  .tasks-list {
    padding: 0 8px;

    label {
      padding: 9px 0;
      display: block;
    }
  }

  .tasks-container {
    display: inline-block;
    margin-right: 20px;
    width: 100%;
    max-width: 300px;
    background-color: $bgContainer;
    box-sizing: border-box;
    border-radius: 5px;
  }
  .tasks-items {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .tasks-item {
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(9,45,66,.25);
    cursor: pointer;
    display: block;
    margin-bottom: 8px;
    max-width: 300px;
    min-height: 20px;
    position: relative;
    text-decoration: none;
    z-index: 0;
    padding: 10px;

    &.success {
      background-color: $success;
      color: white;
    }

    &:hover {
      .tasks-options {
        display: block;
      }
    }

    .tasks-form {
      padding: 0;

      .tasks-item {
        margin: 0 0 6px 0;
        border-radius: 3px 3px 0 0;
      }
    }

    .btn-first {
      margin-left: 8px;
    }
  }
  .tasks-options {
    display: none;
    position: absolute;
    top: 2px;
    right: 2px;
    background-color: #e7e7e7;
  }
  li.tasks-item {
    &:hover {
      background-color: darken(#fff, 4%);
    }
  }
  li.tasks-item.success {
    &:hover {
      background-color: darken($success, 5%);
    }
  }
  .tasks-title {
    color: $primary;
    margin: 0;
    padding: 12px 8px;
    font-size: 1rem;
  }
  .tasks-input {
    border: none;
    box-shadow: none;
    background-color: transparent;
    resize: none;
    width: 100%;
    display: block;
  }
  .tasks-form {
    padding: 0 8px 8px 8px;

    .btn {
      vertical-align: top;
    }
  }
  .tasks-add {
    color: #6b808c;
    text-decoration: none;
    display: block;
    padding: 8px 8px 10px 8px;
    outline: none;
    border-radius: 0 0 3px 3px;

    &:hover {
      background-color: darken($bgContainer, 5%);
      border-radius: 0 0 3px 3px;
      span {
        color: darken(#6b808c, 20%);
        text-decoration: underline;
      }
    }
  }
}
</style>
