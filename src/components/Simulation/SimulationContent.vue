<template>
  <div class="simulation-content">
    <div class="simulation-map">
      <div id="map"></div>
      <div class="simulation-buttons">
        <button id="startBtn" @click="startSimulation">Start</button>
        <button id="pauseBtn" @click="handlePause">{{ operation }}</button>
        <button id="stopBtn" @click="stopSimulation">Stop</button>
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import markerIcon from '@/assets/img/location.png';
import markerDetectedIcon from '@/assets/img/locationDetected.png';
import { socketIO } from "../../socket";

export default {
  name: "SimulationContent",
  data() {
    return {
      map: null,
      operation: "Pause",
      buildings: [],
      message: null,
    };
  },
  methods: {
    async getBuildingsOfUser() {
      try {
        // const userId = this.$store.getters.getUserId;

        // if (userId !== undefined && !isNaN(userId) && userId != null) {
        //   const promise = axios.get('http://localhost:8080/api/data/buildings/getBuildingsByUserId/' + userId,
        //     {
        //       headers: {
        //         "Authorization": `Bearer ${this.$store.getters.getAccessToken}`
        //       }
        //     });

        //   promise.then((response) => {
        //     this.buildings = response.data;
        //     this.updateMap();
        //   });

        const promise = axios.get('http://localhost:8080/api/data/buildings',
          {
            headers: {
              "Authorization": `Bearer ${this.$store.getters.getAccessToken}`
            }
          });

        promise.then((response) => {
          this.buildings = response.data;
          this.updateMap();
        });
      } catch (error) {
        alert('Building fetch failed!');
        console.error('Error fetching buildings:', error.response.data.message);
      }
    },
    handlePause() {
      if (this.operation == "Pause") {
        this.pauseSimulation();
      }
      else {
        this.resumeSimulation();
      }
    },
    async startSimulation() {

      try {
        const userId = this.$store.getters.getUserId;
        const token = this.$store.getters.getAccessToken;

        console.log(userId, token);

        if (userId !== undefined && !isNaN(userId) && userId != null) {
          const promise = axios.post('http://localhost:8080/api/data/simulation',
            {
              headers:
              {
                "Authorization": `Bearer ${this.$store.getters.getAccessToken}`
              }
            });

          promise.then(() => {

            console.log('try socket');

            var socket = socketIO("http://localhost:4004", {
              headers:
              {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                "Authorization": `Bearer ${this.$store.getters.getAccessToken}`
              }
            });

            socket.io.on('connect', () => {
              console.log('Connected to server');
              socket.emit('request_data');
            });


            socket.io.on('data', (jsonData) => {
              console.log('Received JSON data:', jsonData);
            });
          })
        }
      } catch (error) {
        alert('Simulation start failed!');
        console.error('Error starting simulation:', error.response.data.message);
      }
    },
    async pauseSimulation() {
      try {
        const userId = this.$store.getters.getUserId;

        if (userId !== undefined && !isNaN(userId) && userId != null) {
          const promise = axios.patch('http://localhost:8080/api/data/simulation/pause',
            {
              headers:
              {
                "Authorization": `Bearer ${this.$store.getters.getAccessToken}`
              }
            });

          promise.then((response) => {
            alert(response.data);
            this.operation = "Resume";
          })
        }
      } catch (error) {
        alert('Simulation pause failed!');
        console.error('Error pausing simulation:', error.response.data.message);
      }
    },
    async resumeSimulation() {
      try {
        const userId = this.$store.getters.getUserId;

        if (userId !== undefined && !isNaN(userId) && userId != null) {
          const promise = axios.patch('http://localhost:8080/api/data/simulation/resume',
            {
              headers:
              {
                "Authorization": `Bearer ${this.$store.getters.getAccessToken}`
              }
            });

          promise.then((response) => {
            alert(response.data);
            this.operation = "Pause";
          })
        }
      } catch (error) {
        alert('Simulation resume failed!');
        console.error('Error resuming simulation:', error.response.data.message);
      }
    },
    async stopSimulation() {
      try {
        const userId = this.$store.getters.getUserId;

        if (userId !== undefined && !isNaN(userId) && userId != null) {
          const promise = axios.patch('http://localhost:8080/api/data/simulation/stop');

          promise.then((response) => {
            console.log(response);
          })
        }
      } catch (error) {
        alert('Simulation stop failed!');
        console.error('Error stopping simulation:', error.response.data.message);
      }
    },
    updateMap() {
      this.map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer);
        }
      });

      let isViolationDetectedInBuilding = this.buildings.forEach(building =>
        building.apartments.forEach(apartment =>
          apartment.floors.forEach(floor =>
            floor.rooms.some(room => room.sensorsForRoom.isViolationDetected)
          )
        )
      );

      console.log(isViolationDetectedInBuilding);

      let locationIcon;

      if (isViolationDetectedInBuilding == true) {
        locationIcon = L.icon({
          iconUrl: markerDetectedIcon,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });
      }
      else {
        locationIcon = L.icon({
          iconUrl: markerIcon,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });
      }

      this.buildings.forEach(building => {
        L.marker([building.coordinateX, building.coordinateY], { icon: locationIcon })
          .addTo(this.map)
          .bindPopup(`<b>Building ${building.id}</b><br>${building.coordinateX, building.coordinateY}`);
      });
    },
  },
  mounted() {
    this.getBuildingsOfUser();

    this.map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  },
};
</script>

<style scoped>
.simulation-buttons {
  display: flex;
  justify-content: space-around;
}

.simulation-buttons button {
  padding: 20px 40px;
  font-weight: bold;
  font-size: 16px;
  color: white;
  background-color: #417B5A;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  border: none;
}

#stopBtn {
  background-color: #e70e0e;
}

#pauseBtn {
  background-color: #f2ec38;
  color: black;
}

.simulation-buttons button:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  background-color: #4d906a;
}

.simulation-content {
  display: flex;
  justify-content: space-around;
  margin-top: 70px;
}

.simulation-info {
  background-color: #9197AE;
  padding: 20px 70px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  max-height: 500px;
  overflow-y: auto;
}

#map {
  height: 500px;
  width: 500px;
  border: 1px solid black;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  margin-bottom: 30px
}
</style>
