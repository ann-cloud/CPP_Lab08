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
        <h1 style="text-align: center;"><strong>{{ `Building ${buildingId}` }}</strong></h1>
        <div class="building-content">
          <div class="building-info">
            <!-- Iterate through apartments -->
            <div class="apartments">
              <div v-for="(apartment, apartmentIndex) in buildingApartments" :key="apartmentIndex">
                <h2>Apartment {{ apartmentIndex + 1 }}:</h2>

                <!-- Iterate through floors in the apartment -->
                <div v-for="(floor, floorIndex) in apartment.floors" :key="floorIndex">
                  <h3>Floor {{ floor.number }}:</h3>

                  <!-- Iterate through rooms on the floor -->
                  <div v-for="(room, roomIndex) in floor.rooms" :key="roomIndex">
                    <h4>Room {{ roomIndex + 1 }}:</h4>

                    <!-- Display room details -->
                    <ul>
                      <li>Number of doors: {{ room.amountOfDoors }}</li>
                      <li>Number of windows: {{ room.amountOfWindows }}</li>
                      <li>Number of sensors: {{ room.sensorsForRoom.length }}</li>
                      <li>Normative type: {{ room.normativeType }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="building-info" style="padding-top: 2vh; padding-bottom: 2vh;">
            <BuildingBuildView style="width: 60vw;" :buildingApartments="buildingApartments"></BuildingBuildView>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
import BuildingBuildView from '../Builds/BuildingBuildView';

export default {
  components: {
    BuildingBuildView
  },
  props: {
    buildingId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isVisible: true,
      buildingApartments: []
    };
  },
  methods: {
    closeModal() {
      this.isVisible = false;
      this.$emit('closeBuildingModal');
    },
    async fetchData() {
      try {
        const responseBuildingsyUserId = await axios.get("http://localhost:8080/api/data/buildings/getBuildingById/" + this.buildingId,
          {
            headers:
            {
              "Authorization": `Bearer ${this.$store.getters.getAccessToken}`
            }
          });

        const userId = this.$store.getters.getUserId;
        const responseApartmentsByUserId = await axios.get('http://localhost:8080/api/data/apartments/getApartmentsByUserId/' + userId,
          {
            headers:
            {
              "Authorization": `Bearer ${this.$store.getters.getAccessToken}`
            }
          });

        let userApartmentsIds = responseApartmentsByUserId.data.map(x => x.id);

        let apartmentsSortedFloors = responseBuildingsyUserId.data.apartments.sort((a, b) => a.id - b.id).map(apartment => {
          const sortedFloors = apartment.floors.sort((floorA, floorB) => floorB.number - floorA.number);
          
          let isUsersApartments = userApartmentsIds.includes(apartment.id);
          return { ...apartment, sortedFloors, isUsersApartments };
        });

        this.buildingApartments = apartmentsSortedFloors;

      } catch (error) {
        alert('Fetching building data failed');
        console.error('Error fetching building data:', error);

        this.$router.push('/profile');
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
  
<style scoped>
.building-info {
  max-height: 450px;
  overflow-y: auto;
  background-color: #9197AE;
  border-radius: 5px;
  padding: 0px 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  color: white;
  margin-right: 20px;
}

ul {
  text-align: left;
}

.building-content {
  display: flex;
}

img,
.building-scheme {
  height: 400px;
}

.info-group {
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
  width: 90%;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.close-button {
  font-size: 24px;
  /* Adjust the font size as needed */
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
  