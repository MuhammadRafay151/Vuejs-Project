<template>
  <div class="container">
    <adddesign />
    <b-table striped table-variant="light mt-3 text-center" hover :items="Designs" :fields="fileds">
      <template v-slot:cell(Designs)="data" class="text-center">{{ data.item.design }}</template>
      <template v-slot:cell(action)="row">
        <b-button
          size="sm"
          @click="row.toggleDetails"
          class="mr-2"
        >{{ row.detailsShowing ? 'Hide' : 'Update'}}</b-button>
        <b-button size="sm" v-on:click="del(row)">delete</b-button>
        <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
      </template>
      <template v-slot:row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col>
              <input type="text" class="form-control" v-model="row.item.design" />
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col class="justify-content-center">
              <button class="btn btn-primary col-6" v-on:click="update(row)">Save Changes</button>
            </b-col>
          </b-row>
        </b-card>
      </template>
    </b-table>
    <b-modal id="modal-center" centered title="Message" ok-only>
      <p class="my-4 text-success">Updated Succesfully!</p>
    </b-modal>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
import adddesign from "../components/AddDesign";
export default {
  name: "Design",
  components: {
    adddesign
  },
  computed: mapState(["Designs"]),
  data() {
    return {
      fileds: ["Designs", "action"]
    };
  },
  methods: {
    update(row) {
      row.toggleDetails();
      axios({
        method: "put",
        url: "http://180.149.212.244:401/api/Design",
        data: {
          id: row.item.id,
          design: row.item.design
        }
      })
        .then(() => {
          this.$bvModal.show("modal-center");
        })
        .catch(error => {
          throw new Error(`API ${error}`);
        });
      // console.log(row.item);
      // this.$store.commit("increment");
    },
    del(row) {
      axios({
        method: "delete",
        url: "http://180.149.212.244:401/api/Design/" + row.item.id
      })
        .then(() => {
          this.$store.dispatch("loadDesigns");
        })
        .catch(error => {
          throw new Error(`API ${error}`);
        });
    }
  },
  created() {
      this.$store.dispatch("loadDesigns").catch(() => {
      this.$store.dispatch("destroy_token");
      this.$router.push("/");
    });
  }
};
</script>