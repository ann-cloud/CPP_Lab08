<template>
  <div class="modal" v-if="showModal">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <div class="modal-header">
        <button class="close-button" @click="closeModal">&times;</button>
      </div>
      <div class="modal-body">
        <h1 style="color: white;">Add Apartment</h1>
        <div class="select-building">
          <label for="buildingSelect">Select a Building:</label>
          <select id="buildingSelect" v-model="selectedBuilding">
            <option v-for="building in buildingsList" :key="building.id" :value="building">
              Building {{ building.id }}
            </option>
          </select>
          <p>Selected Building: {{ selectedBuilding ? "Building " + selectedBuilding.id : 'None' }}</p>
        </div>
        <div class="add-floor-btn">
          <button @click="addFloor">Add floor</button>
        </div>
        <div class="floors">
          <div v-for="(floor, floorIndex) in floors" :key="floorIndex">
            <div class="floor">
              <h3>Floor {{ floorIndex + 1 }}</h3>
              <label for="floorNumber">Floor number</label>
              <input type="number" id="floorNumber" name="floorNumber" v-model="floorNumber" @input="saveFloor"/>
              <div class="add-room-btn">
                <button @click="showAddRoomModal = true">Add room</button>
                <button style="background-color: #273043; margin-left: 10px;" @click="deleteFloor(floorIndex)">Delete floor</button>
              </div>
              <div class="rooms">
                <!-- Iterate through rooms on the floor -->
                <div v-for="(room, roomIndex) in floor.rooms" :key="roomIndex">
                  <div class="room">
                    <h4>Room {{ roomIndex + 1 }}: Square: 20, doors: {{ room.doors }}, windows: {{ room.windows }}, normative: ordinary</h4>
                    <div class="action-buttons">
                      <button @click="showEditRoomModal = true">
                        <img src="@/assets/img/edit.png" alt="Edit room">
                      </button>
                      <button @click="deleteRoom(floorIndex, roomIndex)">
                        <img src="@/assets/img/delete.png" alt="Delete room">
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button class="save-button" @click="handleSaveBuilding">Save</button>
      </div>
    </div>
  </div>
  <ConfirmDeleteModal v-if="showDeleteModal" :type="deletiontype" @closeConfirmDeleteModal="showDeleteModal = false" />
  <AddRoomModal v-if="showAddRoomModal" @closeAddRoomModal="showAddRoomModal = false" />
  <EditRoomModal v-if="showEditRoomModal" @closeEditRoomModal="showEditRoomModal = false" />
</template>

<script>
import ConfirmDeleteModal from './ConfirmDeleteModal.vue';
import AddRoomModal from './AddRoomModal.vue';
import EditRoomModal from './EditRoomModal.vue';
import axios from 'axios';

export default {
  components: {
    ConfirmDeleteModal,
    AddRoomModal,
    EditRoomModal,
  },
  name: 'AddApartmentComponent',
  data() {
    return {
      buildingsList: [],
      showAddRoomModal: false,
      showDeleteModal: false,
      showEditRoomModal: false,
      showModal: true,
      floors: [],
      apartmentId: 0,
      floorNumber: 0,
      deletiontype: '',
      selectedBuilding: '',
    };
  },
  emits: ['closeAddModal'],
  methods: {
    closeModal() {
      this.showModal = false;
      this.$emit('closeAddModal');
    },
    async saveApartment() {
      try {
        const promise = axios.post(
          'http://localhost:8080/api/data/apartments',
          {
            building: {
              id: this.selectedBuilding.id,
              coordinateX: this.selectedBuilding.coordinateX,
              coordinateY: this.selectedBuilding.coordinateY,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
            },
          }
        );

        promise.then((response) => {
          alert(response.data);
          this.apartmentId = response.data.id;
          console.log('Add apartment successful', response.data);
        });
      } catch (error) {
        alert('Apartment add failed!');
        console.error('Error adding apartment:', error.response.data.message);
      }
    },

    async saveFloor() {
      try {
        const promise = axios.post(
          'http://localhost:8080/api/data/floors',
          {
            number: this.floorNumber,
            apartment: 
            {
              id: this.apartmentId,
            }
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
            },
          }
        );

        promise.then((response) => {
          console.log(this.apartmentId);
          console.log('Add floor successful', response.data);
        });
      } catch (error) {
        alert('Floor add failed!');
        console.error('Error adding floor:', error.response.data.message);
      }
    },

    handleSaveBuilding() {
      this.saveApartment();
    },

    async getBuildingsOfUser() {
      try {
        const userId = this.$store.getters.getUserId;
        const promise = axios.get('http://localhost:8080/api/data/buildings/getBuildingsByUserId/' + userId, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
          },
        });

        promise.then((response) => {
          this.buildingsList = response.data;
        });
      } catch (error) {
        alert('Building fetch failed!');
        console.error('Error fetching buildings:', error.response.data.message);
      }
    },
    addFloor() {
      this.floors.push({
        apartmentId: '',
        floorNumber: '',
        rooms: [],
      });
    },
    deleteFloor(floorIndex) {
      this.floors.splice(floorIndex, 1);
    },
    deleteRoom(floorIndex, roomIndex) {
      this.floors[floorIndex].rooms.splice(roomIndex, 1);
    },
  },
  created() {
    this.getBuildingsOfUser();
  },
};
</script>
  
<style scoped>

.select-building
{
  text-align: left;
  font-weight: bold;
  font-size: 18px;
}

select
{
  width: 150px;
  margin-left: 20px;
}

input, select {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-left: 30px;
}

.save-button {
    color: white;
    padding: 10px 30px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    background-color: #417B5A;
    margin-top: 50px;
    align-self: flex-end;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  .save-button:hover {
    background-color: #45a049;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /* Shadow on hover */
  }
.room
{
    background-color: #D9D9D9;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.floor
{
    background-color: #EFF6EE;
}

.apartment
{
    background-color: #767C94;
}
.apartments, .floors, .rooms
{
    margin-top: 20px;
}
.apartment, .floor, .room
{
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    border: 0.5px solid rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    padding: 20px;
    margin-top: 20px;
}
.room
{
    padding: 0px 10px;
}
.apartments
{
    width: 700px;
    max-height: 300px;
    overflow-y: auto;
    text-align: left;
}

.rooms
{
    max-height: 100px;
    overflow-y: auto;
}

.add-apartment-btn, .add-floor-btn, .add-room-btn
{
  display: flex;
  justify-content: flex-end;
}

.add-apartment-btn button
{
    background-color: #417B5A;
}

.add-floor-btn button, .add-room-btn button
{
    background-color: #C4DEC0;
}
.add-apartment-btn button, .add-floor-btn button, .add-room-btn button
{
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 10px 30px;
  color: white;
  font-size: 16px;
  font-weight: bold;
}

.add-room-btn button
{
    padding: 5px 20px;
    font-size: 14px;
}

.add-apartment-btn button:hover {
  background-color: #45a049;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /* Shadow on hover */
}

.add-floor-btn button:hover,  
.add-room-btn button:hover
{
  background-color: #abe0a3;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /* Shadow on hover */
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
  padding: 10px 30px;
  background-color: #9197AE;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 10;
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
}

.login-button, .signup-button {
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
}

.login-button {
  background-color: #417B5A;
}
.login-button:hover {
  background-color: #45a049;
}

.signup-button {
  background-color: #273043;
}

.signup-button:hover {
  background-color: #435273;
}

.action-buttons button {
    background: none;
    border: none;
    height: 20px;
}

.action-buttons img
{
    height: 20px;
}
</style>
