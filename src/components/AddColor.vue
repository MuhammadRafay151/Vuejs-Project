<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-center input-group mb-2 mr-sm-2">
          <div class="input-group-prepend">
            <div class="input-group-text">Color</div>
          </div>
          <input
            type="text"
            class="form-control col-4"
            id="inlineFormInputGroupUsername2"
            v-model="color"
          />
          <div class="input-group-prepend">
            <button class="btn btn-dark" v-on:click="Add">Add Color</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "AddColor",
  data() {
    return {
      color: ""
    };
  },
  methods: {
    Add() {
      axios({
        method: "post",
        url: "http://180.149.212.244:401/api/color",
        data: {
          color: this.color
        }
      }).then(result => {
        console.log(result.data);
        this.$store.commit("addcolor", result.data);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    }
  }
};
</script>