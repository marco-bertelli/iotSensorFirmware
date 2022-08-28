load('api_gpio.js');
load('api_mqtt.js');
load('api_sys.js');
load('api_config.js');
load('api_timer.js');
load('api_dht.js');

let dht = DHT.create(21, DHT.DHT22);

Timer.set(300000, true, function() {
  publishData();
}, null)

function publishData() {
  let topic = 'machines';
  let temperature = randomNumber(20, 30);
  

  let message = JSON.stringify({
    sensorCode: Cfg.get('device.id'),
    total_ram: Sys.total_ram(),
    free_ram: Sys.free_ram(),
    value: dht.getTemp(),
    hum: dht.getHumidity(),
    timestamp: (Timer.now() * 1000) | 0
  });

  let ok = MQTT.pub(topic, message, 1);

  print('Published:', ok ? 'yes' : 'no', ', topic:', topic, ', message:', message);
}

function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};
