<template>
    <div class="modal" v-if="showModal">
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-content">
        <div class="modal-header">
          <button class="close-button" @click="closeModal">&times;</button>
        </div>
        <div class="modal-body">
            <h1 style="color: white;">Add Building</h1>
            <h2 style="text-align: left; "><strong>Address: <input type="text" id="address" name="address" v-model="address" placeholder="Enter building address" required></strong></h2>
            <h2 style="text-align: left; "><strong>Coordinate X: <input type="text" id="coordinateX" name="coordinateX" v-model="coordinateX" placeholder="Enter building coordinate X" required></strong></h2>
            <h2 style="text-align: left; "><strong>Coordinate Y: <input type="text" id="coordinateY" name="coordinateY" v-model="coordinateY" placeholder="Enter building coordinate Y" required></strong></h2>
            <div class="add-apartment-btn">
                <button @click="addApartment">Add apartment</button>
            </div>
            <div class="apartments">
                <div v-for="(apartment, apartmentIndex) in buildingApartments" :key="apartmentIndex">
                    <div class="apartment">
                        <h2>Apartment {{ apartmentIndex + 1 }}</h2>
                        <div class="add-floor-btn">
                            <button @click="addFloor(apartmentIndex)">Add floor</button>
                        </div>

                        <div class="floors">
                        <!-- Iterate through floors in the apartment -->
                            <div v-for="(floor, floorIndex) in apartment.floors" :key="floorIndex">
                                <div class="floor">
                                    <h3>Floor {{ floorIndex + 1 }}</h3>
                                    <div class="add-room-btn">
                                        <button @click="showAddRoomModal = true">Add room</button>
                                        <button style="background-color: #273043; margin-left: 10px;" @click="deleteFloor">Delete floor</button>
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
                                                    <button @click="deleteRoom">
                                                        <img src="@/assets/img/delete.png" alt="Delete room">
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
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
    <ConfirmDeleteModal v-if="showDeleteModal" :type="deletiontype" @closeConfirmDeleteModal="showDeleteModal = false"/>
    <AddRoomModal v-if="showAddRoomModal" @closeAddRoomModal="showAddRoomModal = false"/>
    <EditRoomModal v-if="showEditRoomModal" @closeEditRoomModal="showEditRoomModal = false"/>
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
        EditRoomModal
  },
    name: 'AddBuildingComponent',
    data() {
      return {
        address: "",
        coordinateX: "",
        coordinateY: "",
        showAddRoomModal: false,
        showDeleteModal: false,
        showEditRoomModal: false,
        deletiontype: "",
        currentApartmentIdx: "",
        currentFloorIdx: "",
        buildingApartments: [],
        showModal: true,
      }
    },
    emits: ['closeAddModal'],
    methods: {
      closeModal() {
        this.showModal = false;
        this.$emit('closeAddModal');
      },
      async handleSaveBuilding()
      {
        try {    
          console.log(localStorage.getItem('accessToken'))
          const userId = this.$store.getters.getUserId;
          axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
          const response = await axios.post('http://localhost:8080/api/buildings', {
            user_id: userId, 
            address: this.address,
            coordinatex: this.coordinateX,
            coordinatey: this.coordinateY,
          });

          console.log(response.data);

        } catch (error) {
          alert('Building save failed!');
          console.error('Error saving building:', error.response.data.message);
        }
      },
      addApartment()
      {
        const newApartment = {
            floors: [
              {
                rooms: [
            
                ],
              },
            ],
          };
          this.buildingApartments.push(newApartment);
      },
      addFloor(apartmentIndex)
      {
        const newFloor = {
        rooms: [
            
            ],
        };
        this.buildingApartments[apartmentIndex].floors.push(newFloor);
      },
      async deleteFloor()
      {
        this.showDeleteModal = true;
        this.deletiontype = 'floor';
      },
      addRoom()
      {

      },
      async editRoom()
      {

      },
      async deleteRoom()
      {
        this.showDeleteModal = true;
        this.deletiontype = 'room';
      },
    }
  };
  </script>

  
<style scoped>


input {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
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
