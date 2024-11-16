<script setup lang="ts">

definePageMeta({
  layout: false
})

interface Sensor {
  id:          number;
  token:       string;
  name:        string;
  description: string;
  tags:        any[];
  dataPoint:   DataPoint[];
  date:        Date;
}


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

const tutorialOpen = ref(false);
const dataPoints = ref<Record<string, any>>([]);
const userSensors = ref<Sensor[]>([]);
const sensors = ref<Record<string, any>>([]);

interface Step {
  title?: string
  description?: string
  completion: 'complete' | 'current' | 'upcoming'
}

const setupSteps : Step[] = [
  {
    title: "Step 1",
    description: "Power the ESP32 device by connecting it to a power source.",
    completion: 'current',
  },
  {
    title: "Step 2",
    description: "Connect to the WiFi network 'yourap' using the password '01010101'.",
    completion: 'upcoming',
  },
  {
    title: "Step 3",
    description: "Open a browser and navigate to 'http://192.168.1.169' to follow the on-screen instructions.",
    completion: 'upcoming',
  },
];

onBeforeMount(async () => {
  const user = useUserStore();

  if (!user.token) {
    const router = useRouter();
    await router.push('/');
  } else {
    setPageLayout('default');

    // fetch /api/v3/get-user-data and console.log the response
    const request = await fetch('https://iot.hik-up.fr/api/v3/find-datapoint', {
      method: 'POST',
      headers: {
        'authToken': `${user.token}`
      },
      body: JSON.stringify({
      })
    });

    const response = await request.json();

    if (response.success) {
      dataPoints.value = response.result.dataPoint;
    } else {
      alert('An error occured while fetching data');
    }

    const request2 = await fetch('https://iot.hik-up.fr/api/v3/search-sensor', {
      method: 'POST',
      headers: {
        'authToken': `${user.token}`
      },
    });

    const response2 = await request2.json();

    if (response2.success) {
      sensors.value = response2.sensors;
    } else {
      alert('An error occured while fetching sensors');
    }

    dataPoints.value.forEach((dataPoint: any) => {
      if (!userSensors.value.find((sensor: any) => sensor.token === dataPoint['sensor_token'])) {
        userSensors.value.push(sensors.value.find((sensor: any) => sensor.token === dataPoint['sensor_token']));
      }
    });

    //console.table(userSensors.value);


  }
});

</script>

<template>
  <main class="min-h-screen w-full">
    <button @click="tutorialOpen = true" type="button" class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      <span class="w-full flex justify-center items-center">
        <img class="w-32" src="/arduino.svg" alt="arduino">
      </span>
      <span class="mt-2 block text-sm font-semibold text-gray-900">Add a new device</span>
    </button>

    <div class="mt-6">
      <YuSensor v-for="sensor in userSensors" :key="sensor.token" :sensor="sensor" />
    </div>
  </main>

  <YuStepModal v-model="tutorialOpen" @finish="tutorialOpen = false" :steps="setupSteps" @close="tutorialOpen = false"/>
</template>

<style scoped>

</style>
