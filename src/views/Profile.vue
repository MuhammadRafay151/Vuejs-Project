<template>
  <div class="d-flex justify-content-center">
    <b-card img-alt="Card image" style="max-width: 30rem;">
      <div class="text-center mb-1">
        <img v-if="ImageUrl" v-bind:src="ImageUrl" class="rounded-circle" style="width:65%" alt />
        <img v-else v-bind:src="PImage" class="rounded-circle" style="width:65%" alt />
      </div>
      <div class="row">
        <div class="col d-flex justify-content-center mt-1">
          <b-form-group>
            <b-form-file v-model="Image" v-on:input="Change" id="file-default"></b-form-file>
          </b-form-group>
        </div>
        <div class="col-1 h2 mb-0 d-flex justify-content-end mt-1">
          <a href="#" class="text-dark" @click="$bvModal.show('modal-scoped')">
            <b-icon-pencil-square></b-icon-pencil-square>
          </a>
        </div>
      </div>
      <div class="row" v-if="Image">
        <div class="col">
          <button
            class="btn btn-block btn-primary"
            v-on:click="UpdateProfileImage"
            :disabled="submitting"
          >
            <b-spinner v-if="submitting" small type="grow"></b-spinner>
            <span v-if="submitting">Updating...</span>

            <span v-else>Update Profile</span>
          </button>
        </div>
      </div>
      <b-card-text>
        <table class="table">
          <tbody>
            <!-- <row v-bind:row="User"/> -->
            <tr>
              <th scope="row">Name</th>
              <td>{{User.Name}}</td>
            </tr>
            <tr>
              <th scope="row">UserName</th>
              <td>{{User.UserName}}</td>
            </tr>
            <tr>
              <th scope="row">Contact number</th>
              <td v-if="User.contactnumber">{{User.contactnumber}}</td>
              <td v-else>Not Provided</td>
            </tr>
            <tr>
              <th scope="row">Address</th>
              <td v-if="User.Address">{{User.Address}}</td>
              <td v-else>Not Provided</td>
            </tr>
            <tr>
              <th scope="row">Admin</th>
              <td v-if="User.IsAdmin">Yes</td>
              <td v-else>No</td>
            </tr>
            <tr>
              <th scope="row">Calenadring Dealer</th>
              <td v-if="User.IsCalenadring">Yes</td>
              <td v-else>No</td>
            </tr>
            <tr>
              <th scope="row">Embroidery Dealer</th>
              <td v-if="User.IsEmbd">Yes</td>
              <td v-else>No</td>
            </tr>
            <tr>
              <th scope="row">Shipping Dealer</th>
              <td v-if="User.IsShipping">Yes</td>
              <td v-else>No</td>
            </tr>
            <tr>
              <th scope="row">Stitching Dealer</th>
              <td v-if="User.IsStitching">Yes</td>
              <td v-else>No</td>
            </tr>
          </tbody>
        </table>
      </b-card-text>
      <div class="d-flex justify-content-center">
        <a href="#" @click="$bvModal.show('c_pass')">Change Password</a>
      </div>
    </b-card>
    <!-- edit modal -->
    <template>
      <b-modal centered id="modal-scoped">
        <template v-slot:modal-header>
          <!-- Emulate built in modal header close button action -->

          <h5>Edit Profile</h5>
        </template>

        <template v-slot:default>
          <div class="form-form-group">
            <label for>Name</label>
            <input type="text" class="form-control" v-model="us.Name" />
            <p class="text-danger" v-if="!us.Name">Name is Required</p>
          </div>
          <div class="form-form-group">
            <label for>ContactNumber</label>
            <input
              type="text"
              class="form-control"
              v-model="us.contactnumber"
              placeholder="Ex => 0340-78383753"
            />
          </div>
          <div class="form-form-group">
            <label for>Address</label>
            <input
              type="text"
              v-model="us.Address"
              class="form-control"
              placeholder="Ex => street 123"
            />
          </div>
        </template>

        <template v-slot:modal-footer>
          <b-button block variant="primary" v-on:click="UpdateProfile" :disabled="submittinginfo">
            <b-spinner v-if="submittinginfo" small type="grow"></b-spinner>
            <span v-if="submittinginfo">Updating...</span>

            <span v-else>Update</span>
          </b-button>
        </template>
      </b-modal>
    </template>
    <c_pass />
  </div>
</template>
<script>
//import row from "../components/row";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import c_pass from "../components/ChangePassword";

export default {
  name: "Profile",
  components: {
    c_pass
  },
  data() {
    return {
      Image: null,
      ImageUrl: null,
      submitting: false,
      submittinginfo: false
    };
  },
  methods: {
    UpdateProfileImage() {
      this.submitting = true;
      this.$store.dispatch("UpdateProfileImage", this.Image).then(() => {
        this.submitting = false;
        this.Image = null;
      });
    },
    UpdateProfile() {
      if (this.us.Name) {
        this.submittinginfo = true;
        this.$store.dispatch("UpdateProfile", this.us).then(() => {
          this.submittinginfo = false;
          this.$bvModal.hide('modal-scoped');
        });
      }
    },
    Change(evt) {
      console.log(evt);
      const x = window.URL.createObjectURL(evt);
      this.ImageUrl = x;
    }
  },
  computed: {
    ...mapState(["User"]),
    ...mapGetters(["us"]),
    PImage() {
      var byteArray = new Uint8Array(this.User.Image);
      var blob = new Blob([byteArray], { type: "Image/jpeg" });
      return URL.createObjectURL(blob);
    }
  },
  created() {
    this.$store.dispatch("GetPImage");
  }
};
</script>