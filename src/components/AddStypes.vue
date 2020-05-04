<template>
  <div>
    <div class="card">
      <div class="card-body">
        <form action="#" v-on:submit.prevent="Add">
          <div class="d-flex justify-content-center input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
              <div class="input-group-text">Stitching</div>
            </div>
            <input
              type="text"
              class="form-control col-4"
              id="inlineFormInputGroupUsername2"
              v-model="type"
              required
            />
            <div class="input-group-prepend">
              <button class="btn btn-dark" type="submit">Add Stitching type</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddStitching",
  data() {
    return {
      type: ""
    };
  },
  methods: {
    Add() {
      axios({
        method: "post",
        url: "http://180.149.212.244:401/api/Stitching",
        data: {
          type: this.type
        }
      })
        .then(result => {
          this.fabric = "";
          this.$store.commit("addstitching", result.data);
        })
        .catch(() => {
          alert("Invalid Input");
        });
    }
  }
};
</script>