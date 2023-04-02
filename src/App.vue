<template>
  <div id="app">
    <SelectEdit />
  </div>
</template>

<script>
import Basic from "./components/Basic.vue";
import CreateForm from "./components/CreateForm.vue";
import SchemaForm from "./components/Schema.vue";
import SelectEdit from "./components/SelectEdit.vue";

export default {
  name: "App",
  components: {
    Basic,
    CreateForm,
    SchemaForm,
    SelectEdit
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
