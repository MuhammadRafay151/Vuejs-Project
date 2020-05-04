import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    color: null,
    Designs: null,
    Fabrics: null,
    Stitchings: null,
    count: 0,
    User: JSON.parse(localStorage.getItem("profile")) || { IsAdmin: false },
    Token: localStorage.getItem('access_token') || null,
    shippingDealer: null,
    Shipment:{DealerId:null,ShipmentId:null,LineItem:[]}
  },
  mutations: {
    SAVE_Colors(state, Colors) {
      state.color = Colors;
    },
    addcolor(state, value) {
      state.color.push(value);
    },
    SAVE_Designs(state, Designs) {
      state.Designs = Designs;
    },
    adddesign(state, value) {
      state.Designs.push(value);
    },
    SAVE_Fabrics(state, Fabrics) {
      state.Fabrics = Fabrics;
      console.log(Fabrics);
    },
    addfabrics(state, value) {
      state.Fabrics.push(value);
    },
    SAVE_Stitching(state, Stitchings) {
      state.Stitchings = Stitchings;
      console.log(Stitchings);
    },
    addstitching(state, value) {
      state.Stitchings.push(value);
    },
    save_token(state, value) {
      state.Token = value;

    },
    delete_token(state) {
      state.Token = null;
      state.User = { IsAdmin: false }
    },
    save_profile(state, value) {

      state.User = value;
    },
    shippingDealer(state, value) {
      state.shippingDealer = value;
    },
    SetProfilePicture(state,value) {
      state.User.Image=value;
    },
    UpdateProfile(state, value) {
      state.User.Name = value.Name;
      state.User.contactnumber = value.contactnumber;
      state.User.Address = value.Address;
    },
    AddShipmentLineItem(state,value){
      state.Shipment.LineItem.push(value);
    }
  },
  actions: {
    loadColors({ commit }) {
      const AuthStr = 'Bearer '.concat(this.state.Token);
      axios.get('http://localhost:64601/api/color', { headers: { Authorization: AuthStr } }).then(result => {
        commit('SAVE_Colors', result.data)
      }).catch(error => {
        throw new Error(`API ${error}`);
      });

    },
    loadDesigns({ commit }) {
      return new Promise((resolve, reject) => {
        const AuthStr = 'Bearer '.concat(this.state.Token);
        // axios.get('http://localhost:64601/api/Design').then(result => {
        //   commit('SAVE_Designs', result.data)
        // }).catch(error => {
        //   throw new Error(`API ${error}`);
        // });
        axios.get('http://localhost:64601/api/Design', { headers: { Authorization: AuthStr } }).then(result => {
          commit('SAVE_Designs', result.data)
          resolve();
        }).catch(error => {
          reject();
          throw new Error(`API ${error}`);
        });
      })


    },
    loadFabric({ commit }) {
      axios.get('http://localhost:64601/api/Fabric').then(result => {
        commit('SAVE_Fabrics', result.data)
      }).catch(error => {
        throw new Error(`API ${error}`);
      });

    },
    loadStitching({ commit }) {
      axios.get('http://180.149.212.244:401/api/Stitching').then(result => {
        commit('SAVE_Stitching', result.data)
      }).catch(error => {
        throw new Error(`API ${error}`);
      });

    },
    GetProfile({ commit }) {
      const AuthStr = 'Bearer '.concat(this.state.Token);
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: 'http://localhost:64601/api/Profile',
          headers: { Authorization: AuthStr }
        }).then((response) => {
          commit("save_profile", response.data);
          console.log(JSON.stringify(response.data))
          localStorage.setItem("profile", JSON.stringify(response.data));
          resolve(response);

        }).catch((error) => {
          reject(error);
        })
      })
    },
    retrieve_token({ commit }, cred) {
      return new Promise((resolve, reject) => {

        var reqData = `grant_type=password&UserName=${cred.UserName}&Password=${cred.Password}`;
        axios({
          method: 'post',
          url: 'http://localhost:64601/token',
          data: (reqData),

          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          }
        }).then((response) => {
          const token = response.data.access_token;
          localStorage.setItem("access_token", token);
          commit('save_token', token)
          resolve(response);

        }).catch((error) => {
          reject(error);
        })
      });


    },
    destroy_token({ commit }) {
      return new Promise((resolve) => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("profile");
        commit('delete_token')
        resolve();
      });

    },
    GetshippingDealer({ commit }) {
      const AuthStr = 'Bearer '.concat(this.state.Token);
      axios.get('http://localhost:64601/api/Dealers/GetshippingDealer', { headers: { Authorization: AuthStr } }).then(result => {
        commit('shippingDealer', result.data)

      }).catch(error => {

        throw new Error(`API ${error}`);
      });
    },
    UpdateProfileImage({ commit }, image) {
      return new Promise((res, rej) => {
        const AuthStr = 'Bearer '.concat(this.state.Token);
        let data = new FormData()
        data.append('Image', image)
        axios({
          method: 'post',
          url: 'http://localhost:64601/api/Profile/UpdatePI',
          data: data,
          headers: { Authorization: AuthStr, 'Content-Type': 'multipart/form-data' },


        }).then((response) => {
          commit('SetProfilePicture')
          res(response);
        }).catch((error) => {
          rej(error);
        })
      })


    },
    UpdateProfile({ commit }, us) {
      const AuthStr = 'Bearer '.concat(this.state.Token);
      return new Promise((res, rej) => {
        axios({
          method: "put",
          url: "http://localhost:64601/api/Profile",
          headers: { Authorization: AuthStr },
          data: {
            Name: us.Name,
            contactnumber: us.contactnumber,
            Address: us.Address,
          }

        }).then(() => {
          commit("UpdateProfile", us)
          localStorage.setItem("profile", JSON.stringify(us));
          res();
          
        }).catch(() => {
          rej();
        })
      })
    },
    GetPImage({ commit }) {
      const AuthStr = 'Bearer '.concat(this.state.Token);
      axios.get('http://localhost:64601/api/Profile/PImage', { headers: { Authorization: AuthStr }, responseType: 'arraybuffer', })
        .then(response => {
          commit('SetProfilePicture', response.data)
        })
    }

  },
  getters: {
    IsLoggedIn(state) {
      return state.Token != null
    },
    us(state) {
      return state.User
    }
  },
  modules: {}
});
