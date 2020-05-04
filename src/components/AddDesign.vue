<template>
  <div>
    <div class="card">
      <div class="card-body">
        <form action="#" v-on:submit.prevent="Add">
          <div class="d-flex justify-content-center input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
              <div class="input-group-text">Design</div>
            </div>
            <input
              type="text"
              class="form-control col-4"
              id="inlineFormInputGroupUsername2"
              v-model="design"
              required
            />
            <div class="input-group-prepend">
              <button class="btn btn-dark" type="submit">Add Design</button>
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
  name: "AddColor",
  data() {
    return {
      design: ""
    };
  },
  methods: {
    Add() {
      axios({
        method: "post",
        url: "http://180.149.212.244:401/api/Design",
        data: {
          design: this.design
        }
      })
        .then(result => {
          this.design = "";
          this.$store.commit("adddesign", result.data);
        })
        .catch(() => {
          alert("Invalid Input");
        });
    }
  }
};
</script>