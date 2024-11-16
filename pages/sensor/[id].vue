<script setup lang="ts">
import { Line } from 'vue-chartjs'


const sensorPing = ref(false)
const sensorPingError = ref(false)
const loaded = ref(false)

interface Dataset {
  labels: string[],
  datasets: {
    label: string,
    data: number[],
    fill: boolean,
    borderColor: string,
    tension: number,
  }[],
}

const humidityDataset = ref<Dataset>({
  labels: [],
  datasets: [
    {
      label: 'Humidity',
      data: [],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    },
  ],
})

const lightLevelDataset = ref<Dataset>({
  labels: [],
  datasets: [
    {
      label: 'Light Level',
      data: [],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    },
  ],
})

const temperatureDataset = ref<Dataset>({
  labels: [],
  datasets: [
    {
      label: 'Temperature',
      data: [],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    },
  ],
})

const token = useRoute().params.id

enum DataS {
  Humidity = "Humidity",
  LightLevel = "LightLevel",
  Temperature = "Temperature",
}

interface DataPoint {
  id:    number;
  date:  string;
  dataF: string;
  dataI: number;
  dataS: DataS;
}

interface Sensor {
  id:          number;
  token:       string;
  name:        string;
  description: string;
  tags:        any[];
  dataPoint:   DataPoint[];
  date:        Date;
}

const datePoints = ref<DataPoint[] | null | undefined>([]);
const sensor = ref<Sensor | null>(null);
const user = useUserStore();

onMounted(async () => {
  const request = await fetch('https://iot.hik-up.fr/api/v3/search-sensor', {
    method: 'POST',
    headers: {
      'authToken': `${user.token}`
    },
  });

  const response = await request.json();

  if (response.success) {
    sensor.value = response.sensors.find((sensor: Sensor) => sensor.token === token);
    datePoints.value = sensor.value?.dataPoint;

    // create the array of labels for the chart with the datapoint for humidity, lightlevel and temperature, by date formated
    datePoints.value?.reverse().forEach((dataPoint: DataPoint) => {
      if (dataPoint.dataS === DataS.Humidity) {
        humidityDataset.value.labels.push(new Date(Number(dataPoint.date)).toLocaleTimeString());
        humidityDataset.value.datasets[0].data.push(dataPoint.dataI);
      } else if (dataPoint.dataS === DataS.LightLevel) {
        lightLevelDataset.value.labels.push(new Date(Number(dataPoint.date)).toLocaleTimeString());
        lightLevelDataset.value.datasets[0].data.push(dataPoint.dataI);
      } else if (dataPoint.dataS === DataS.Temperature) {
        temperatureDataset.value.labels.push(new Date(Number(dataPoint.date)).toLocaleTimeString());
        temperatureDataset.value.datasets[0].data.push(dataPoint.dataI);
      }
    });

    console.log(humidityDataset.value);

    loaded.value = true;

  }

});

const pingSensor = async () => {
  const request = await fetch('https://iot.hik-up.fr/api/v3/ping-sensor', {
    method: 'POST',
    headers: {
      'authToken': `${user.token}`,
    },
    body: JSON.stringify({
      sensor_id: sensor.value?.id
    })
  });

  const response = await request.json();

  if (response.success) {
    sensorPing.value = true;

    setTimeout(() => {
      sensorPing.value = false;
    }, 3000);
  } else {
    sensorPingError.value = true;

    setTimeout(() => {
      sensorPingError.value = false;
    }, 3000);
  }
}



</script>

<template>
  <YuNotification v-model="sensorPing" title="Sensor pinged" description="The sensor has been pinged successfully" />
  <YuNotification :error="true" v-model="sensorPingError" title="Error" description="An error occured while pinging the sensor" />
  <div class="flex flex-col gap-16 w-screen overflow-auto">
    <div class="mb-4">
      <button @click="pingSensor" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ping sensor</button>
    </div>
    <div>
      <Line :data="humidityDataset" :options="{responsive: true, maintainAspectRatio: false}" v-if="loaded" />
    </div>
    <div>
      <Line :data="lightLevelDataset" :options="{responsive: true, maintainAspectRatio: false}" v-if="loaded" />
    </div>
    <div>
      <Line :data="temperatureDataset" :options="{responsive: true, maintainAspectRatio: false}" v-if="loaded" />
    </div>
  </div>
</template>

<style scoped>

</style>
