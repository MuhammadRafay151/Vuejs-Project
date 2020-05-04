<template>
  <div>
    <div class="row">
      <div class="col">
        <b-form-select v-model="LineItem.Fabric" :options="_Fabric"></b-form-select>
      </div>
      <div class="col">
        <input
          list="color"
          class="form-control"
          name="browser"
          v-on:input="change"
          autocomplete="off"
          placeholder="Select Color"
        />
        <datalist id="color">
          <option v-for="x in colors" :key="x.id" v-on:click="change">{{x.color}}</option>
        </datalist>

        <!-- <b-form-select v-model="data.Color" :options="colors"></b-form-select> -->
      </div>

      <div class="col">
        <b-form-group>
          <b-form-file v-model="LineItem.Image" placeholder="Attach Image"></b-form-file>
        </b-form-group>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <input class="form-control" v-model="LineItem.Yard" type="text" placeholder="yard" />
      </div>
      <div class="col">
        <input class="form-control" v-model="LineItem.Rate" type="number" placeholder="Rate" />
      </div>
      <div class="col">
        <input class="form-control" v-model="LineItem.Quantity" type="text" placeholder="Quantity" />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <textarea
          name
          class="form-control"
          v-model="LineItem.Description"
          placeholder="Description"
          id
          cols="30"
          rows="3"
        ></textarea>
      </div>
    </div>
    <button class="btn btn-primary btn-block mt-3" v-on:click="Submit">Add</button>
  </div>
</template>
<script>
export default {
  name: "SLI",
  data() {
    return {
      LineItem:{selected: null,
      Fabric: null,
      Color: null,
      Quantity: null,
      Yard: null,
      Rate: null,
      Image: null,
      Description: null}
    };
  },
  computed: {
    options() {
      var opt = [];
      opt = [
        { value: null, text: "Please select Fabric", disabled: true },
        { value: "a", text: "Ali" },
        { value: "b", text: "Ismail" }
      ];
      return opt;
    },
    colors() {
      return this.$store.state.color;
    },
    _Fabric() {
      var x = this.$store.state.Fabrics;
      var opt = [];
      opt = [{ value: null, text: "Please select Fabric", disabled: true }];
      if (x) {
        for (var i = 0; i < x.length; i++) {
          opt.push({ value: x[i].id, text: x[i].fabric });
        }
      }

      return opt;
    }
  },
  methods: {
    change(evt) {
      for (var i = 0; i < this.colors.length; i++) {
        if (evt.target.value == this.colors[i].color) {
          this.LineItem.Color = this.colors[i].id;
        }
      }
    },
    Submit(){
      this.$store.commit("AddShipmentLineItem",this.LineItem)
      this.LineItem=[{
      Fabric: null,
      Color: null,
      Quantity: null,
      Yard: null,
      Rate: null,
      Image: null,
      Description: null}]
    }
  }
};
</script>