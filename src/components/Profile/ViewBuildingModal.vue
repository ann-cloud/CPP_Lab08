<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-header">
        <button class="close-button" @click="closeModal">&times;</button>
      </div>
      </div>
      <div class="modal-body">
        <h1 style="text-align: center;"><strong>{{ `Building ${buildingNumber}` }}</strong></h1>
        <h3><strong>Address: {{address}}</strong></h3>
        <div class="building-content">
          <div class="building-info">
            <!-- Iterate through apartments -->
            <div class="apartments">
              <div v-for="(apartment, apartmentIndex) in buildingApartments" :key="apartmentIndex">
                <h2>Apartment {{ apartmentIndex + 1 }}:</h2>

                <!-- Iterate through floors in the apartment -->
                <div v-for="(floor, floorIndex) in apartment.floors" :key="floorIndex">
                  <h3>Floor {{ floorIndex + 1 }}:</h3>

                  <!-- Iterate through rooms on the floor -->
                  <div v-for="(room, roomIndex) in floor.rooms" :key="roomIndex">
                    <h4>Room {{ roomIndex + 1 }}:</h4>

                    <!-- Display room details -->
                    <ul>
                      <li>Number of doors: {{ room.doors }}</li>
                      <li>Number of windows: {{ room.windows }}</li>
                      <li>Number of controllers: {{ room.controllers }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="building-scheme">
            <img src="@/assets/img/building.png" alt="Building">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import axios from 'axios';

  export default {
    props: {
      buildingNumber: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        address: "some address",
        isVisible: true,
        buildingApartments: [
          {
            floors: [
              {
                rooms: [
                  { doors: 2, windows: 4, controllers: 4 },
                  { doors: 3, windows: 4, controllers: 5 },
                ],
              },
              {
                rooms: [
                  { doors: 2, windows: 4, controllers: 4 },
                  { doors: 3, windows: 4, controllers: 5 },
                ],
              },
            ],
          },
          {
            floors: [
              {
                rooms: [
                  { doors: 2, windows: 4, controllers: 4 },
                  { doors: 3, windows: 4, controllers: 5 },
                ],
              },
              {
                rooms: [
                  { doors: 2, windows: 4, controllers: 4 },
                  { doors: 3, windows: 4, controllers: 5 },
                ],
              },
            ],
          },
        ]
      };
    },
    methods: {
      closeModal() {
        this.isVisible = false;
        this.$emit('closeBuildingModal');
      },
      async fetchData() {
        try {
          const response = await axios.get(`http://localhost:8080/api/buildings/${this.buildingNumber}`);
          
          this.address = response.data.coordinates;
          console.log('Fetching building data successful:', response.data);
        } catch (error) {
          alert('Fetching building data failed');
          console.error('Error fetching building data:', error);
          console.log(axios.defaults.headers.common['Authorization']);
          this.$router.push('/profile');
          }
      },
    },
    mounted() {
      //this.fetchData();
    },
  };
  </script>
  
  <style scoped>

.building-info
{
  max-height: 400px;
  overflow-y: auto;
  background-color: #9197AE;
  border-radius: 5px;
  padding: 0px 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  color: white;
  margin-right: 20px;
}

ul
{
  text-align: left;
}
.building-content
{
  display: flex;
}

img, .building-scheme
{
  height: 400px;
}

.info-group
{
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  font-size: large;
  justify-content: space-between;
  align-items: center;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-background {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal-content {
  background-color: #EFF6EE;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 10;
  height: 600px;
  padding-bottom: 50px;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.close-button {
  font-size: 24px; /* Adjust the font size as needed */
  cursor: pointer;
  border: none;
  background: none;
}

.modal-body {
  padding: 20px 100px;
  display: flex;
  flex-direction: column;
  text-align: left;
}

  </style>
  