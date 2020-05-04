<template>
  <div class="row justify-content-center">
    <div class="col-lg-3" style="margin-top:10%">
      <div class="card">
        <div class="text-center">
          <img class src="../assets/LOGO2.png" width="200" alt />
        </div>

        <form v-on:submit.prevent="Login">
          <div class="card-body">
            <div class="form-group">
              <label for>User Name</label>
              <input type="text" class="form-control" v-model="un" required placeholder="User Name" />
            </div>
            <div class="form-group">
              <label for>Password</label>
              <input
                type="password"
                required
                class="form-control"
                v-model="pass"
                placeholder="Password"
              />
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary btn-block">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      un: "",
      pass: ""
    };
  },
  methods: {
    Login() {
      this.$store
        .dispatch("retrieve_token", { UserName: this.un, Password: this.pass })
        .then(() => {
          this.$store.dispatch("GetProfile").catch(() => {
            alert("error try again later");
          });
          this.$router.push("/");
        })
        .catch(error => {
          if (!error.response) {
            alert("Connection error");
          } else {
            alert("invalid username password");
          }
        });
    }
  }
};
</script>