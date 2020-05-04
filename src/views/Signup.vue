<template>
  <div class>
    <div class="row justify-content-center">
      <div class="col d-flex justify-content-center" style="margin-top:5%">
        <div class="card col-12 col-sm-12 col-md-6 col-lg-4 ">
          <form v-on:submit.prevent="Register">
            <div class="card-body">
              <div class="col">
                <div class="text-center">
                  <img class src="../assets/LOGO2.png" width="200" alt />
                </div>
                <div class="form-group">
                  <label for>Name</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="Name"
                    required
                    placeholder="Name"
                  />
                </div>
                <div class="form-group">
                  <label for>User Name</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="UserName"
                    placeholder="User Name"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for>Password</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="Password"
                    placeholder="Password"
                    required
                  />
                </div>

                <b-form-group label="User Rights" v-if="User.IsAdmin">
                  <b-form-checkbox v-model="IsAdmin" value="true" inline >AllowAdmin</b-form-checkbox>
                  <b-form-checkbox v-model="IsEmbd" value="true" inline>Embrodery Dealer</b-form-checkbox>
                  <b-form-checkbox v-model="IsCalenadring" value="true" inline>Calendaring Dealer</b-form-checkbox>
                  <b-form-checkbox v-model="IsShipping" value="true" inline>Shipping Dealer</b-form-checkbox>
                  <b-form-checkbox v-model="IsStitching" value="true" inline>Stitching Dealer</b-form-checkbox>
                </b-form-group>
              </div>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary btn-block">
                <b-spinner v-if="submitting" small type="grow"></b-spinner>
                <span v-if="submitting">submitting...</span>

                <span v-else>Signup</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "Signup",
  computed: mapState(["User"]),
  data() {
    return {
      Name: "",
      UserName: "",
      Password: "",
      IsAdmin: false,
      IsEmbd: false,
      IsStitching: false,
      IsShipping: false,
      IsCalenadring: false,
      submitting: false
    };
  },
  methods: {
    Register() {
      this.submitting = true;
      axios({
        method: "post",
        url: "http://localhost:64601/api/Register",
        data: {
          Name: this.Name,
          UserName: this.UserName,
          Password: this.Password,
          IsAdmin: this.IsAdmin,
          IsEmbd: this.IsEmbd,
          IsStitching: this.IsStitching,
          IsShipping: this.IsShipping,
          IsCalenadring: this.IsCalenadring
        },
      })
        .then(() => {
          this.submitting = false;
          this.Name = this.UserName = this.Password = "";
          this.IsAdmin = this.IsEmbd = this.IsStitching = this.IsShipping = this.IsCalenadring = false;
        })
        .catch(error => {
          this.submitting = false;
          throw new Error(`API ${error}`);
        });
    }
  }
};
</script>