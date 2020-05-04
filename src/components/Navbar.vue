<template>
  <div class="mb-5">
    <b-navbar toggleable="lg" type="light" style="background-color:  #f9d342;">
      <b-navbar-brand href="#">
        <img src="../assets/LOGO2.png" width="80" alt="Kitten" />
      </b-navbar-brand>
      <b-navbar-brand href="#">HHV FABRICS</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/">Products</b-nav-item>

          <b-nav-item-dropdown v-if="User.IsAdmin && IsLoggedIn" text="Add Orders" left>
            <b-dropdown-item to="/color">Stitching Orders</b-dropdown-item>
            <b-dropdown-item to="/Fabric">Embroidery Orders</b-dropdown-item>
            <b-dropdown-item to="/design">Calendaring Orders</b-dropdown-item>
            <b-dropdown-item to="/Shipment/Add">Shipping Orders</b-dropdown-item>
          </b-nav-item-dropdown>
          <!-- For delears -->
          <b-nav-item-dropdown
            v-if="IsLoggedIn&&(User.IsStitching||User.IsEmbd||User.IsCalenadring||User.IsShipping)"
            text="Dealer"
            left
          >
            <b-dropdown-item v-if="User.IsStitching" to="/color">Stitching Orders</b-dropdown-item>
            <b-dropdown-item v-if="User.IsEmbd" to="/Fabric">Embroidery Orders</b-dropdown-item>
            <b-dropdown-item v-if="User.IsCalenadring" to="/design">Calendaring Orders</b-dropdown-item>
            <b-dropdown-item v-if="User.IsShipping" to="/stitching">Shipping Orders</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown v-if="User.IsAdmin && IsLoggedIn" text="Configurations" left>
            <b-dropdown-item to="/color">Color</b-dropdown-item>
            <b-dropdown-item to="/Fabric">Fabric</b-dropdown-item>
            <b-dropdown-item to="/design">Design</b-dropdown-item>
            <b-dropdown-item to="/stitching">Stitching</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-if="!IsLoggedIn" to="/Signup">Signup</b-nav-item>
          <b-nav-item v-else-if="User.IsAdmin" to="/Signup">Register User</b-nav-item>
          <b-nav-item v-if="!IsLoggedIn" to="/Login">Login</b-nav-item>
          <!-- <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>-->
          <b-nav-item-dropdown v-if="IsLoggedIn" right no-caret>
            <!-- Using 'button-content' slot -->

            <template v-slot:button-content>
              <img src="../assets/ssswees22.png" width="30" alt />
            </template>
            <b-dropdown-item to="/Profile">Profile</b-dropdown-item>
            <b-dropdown-item href="#" to="/Logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "Navbar",
  computed: { ...mapState(["User"]), ...mapGetters(["IsLoggedIn"]) }
};
</script>
