<template>
  <div>
    <tr v-for="x in col" :key="x.Key">
      <th scope="row">{{x.key}}</th>
      <td>{{x.value}}</td>
    </tr>
  </div>
</template>
<script>
export default {
  name: "row",
  props: ["row"],
  computed: {
    col() {
      var col = [];
      for (let [k, v] of Object.entries(this.row)) {
        col.push({ key: k, value: v });
      }
      return col;
    }
  }
};
</script>