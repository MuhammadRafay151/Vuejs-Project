 <template>
  <b-modal centered id="c_pass">
    <template v-slot:modal-header>
      <!-- Emulate built in modal header close button action -->

      <h5>Change Password</h5>
    </template>

    <template v-slot:default>
      <form id="f1" @submit.prevent="ChangePass">
        <div class="form-form-group">
          <label for>Previous Password</label>
          <input type="password" class="form-control" v-model.trim="$v.PreviousPassword.$model" />
        </div>
        <div class="text-danger" v-if="$v.PreviousPassword.$error">Required</div>
        <div class="form-form-group">
          <label for>NewPassword</label>
          <input type="password" class="form-control" v-model.trim="$v.NewPassword.$model" required />
        </div>
        <div class="text-danger" v-if="$v.NewPassword.$error">Required</div>
        <div class="form-form-group">
          <label for>ReEnter Password</label>
          <input
            type="password"
            class="form-control"
           v-model.trim="$v.RePassword.$model"
          />
        </div>
        <div class="text-danger" v-if="$v.RePassword.$error">
          <div class="text-danger" v-if="!$v.RePassword.required">Required</div>
          <div class="error" v-if="!$v.RePassword.sameAsPassword">Passwords must be identical.</div>
        </div>
      </form>
      <p v-if="error">{{error}}</p>
    </template>

    <template v-slot:modal-footer>
      <b-button block variant="primary" v-on:click="ChangePass" type="submit">Change Password</b-button>
    </template>
  </b-modal>
</template>
<script>
import { required, sameAs } from "vuelidate/lib/validators";
export default {
  name: "ChangePassword",
  data() {
    return {
      NewPassword: "",
      RePassword: "",
      PreviousPassword: "",
      error: null
    };
  },
  validations: {
    NewPassword: {
      required
    },
    RePassword: {
      required,
      sameAsPassword: sameAs("NewPassword")
    },
    PreviousPassword: {
      required
    }
  },
  methods: {
    ChangePass() {
      console.log("submit");
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("error");
      } else {
        console.log("noerror");
      }
      // if (this.NewPassword != this.RePassword) {
      //   this.error = "Password not matched";
      //   setTimeout(2000, () => {
      //     this.error = "";
      //   });
      // } else {
      //   console.log("ok");
      // }
    }
  }
};
</script>