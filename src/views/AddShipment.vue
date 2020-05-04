<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <div class="row">
          <h3 class="card-text col">Shipping Order</h3>
          <b-form-select class="w-75" v-model="Dealer" :options="Dealers"></b-form-select>
        </div>
      </div>
      <div class="row">
        <div class="card-body">
          <SLI />
        </div>
      </div>

      
    </div>
    <div class="mt-3">
      <b-table striped hover table-variant="light" :items="Shipment.LineItem" :fields="fields">
          <template v-slot:cell(Fabric)="data">
       {{ data.item.Fabric }}
      </template>
       <template v-slot:cell(Action)="data">
      <b-btn v-on:click="del(data.item)" >Delete</b-btn>
      </template>
      </b-table>
    </div>
  </div>
</template>
<script>
import SLI from "../components/ShippingLineItem";
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "AddShipment",
  components: {
    SLI
  },
  computed: {
    ...mapState(["shippingDealer"]), ...mapState(["Shipment"]),
    Dealers() {
      var opt = [];
      opt = [{ value: null, text: "Please select Dealer", disabled: true }];
      if (this.shippingDealer) {
        var x = this.shippingDealer;
        for (var i = 0; i < x.length; i++) {
          opt.push({ value: x[i].UserId, text: x[i].Name });
        }
      }
      return opt;
    }
  },
  data() {
    return {
      Dealer: null,
      lineitem: [],
      fields: ['Fabric','Action'],
    };
  },
  methods: {
 
    sub() {
      this.lineitem.pop();
    },
    Submit() {
      var form = new FormData();
      form.append();
      axios({
        method: "post",
        url: "",
        data: {}
      });
    },
    del(item){
      console.log(item);
    }
  },
  created() {
    this.$store.dispatch("loadColors");
    this.$store.dispatch("GetshippingDealer");
    this.$store.dispatch("loadFabric");
  }
};
</script>