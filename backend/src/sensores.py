#!/usr/bin/python

# Internet de las Cosas - http://internetdelascosas.cl
#
# Descripcion  : Programa que permite obtener la lectura de un sensor DHT11 
# Lenguaje     : Python
# Autor        : Jose Zorrilla <jzorrilla@iot.cl>
# Dependencias : Libreria de Adafruit https://github.com/adafruit/Adafruit_Python_DHT
# Web          : http://internetdelascosas.cl/
 
# Importa las librerias necesarias 
import RPi.GPIO as GPIO
import time
import sys
import Adafruit_DHT
import requests #pip install requests

# Configuracion del puerto GPIO al cual esta conectado  (GPIO 23)
pinDht = 23
pinTilt = 21
# Configuracion del tipo de sensor DHT
sensor = Adafruit_DHT.DHT11
GPIO.setmode(GPIO.BOARD)
GPIO.setup(29, GPIO.OUT)
GPIO.setup(pinTilt, GPIO.IN, pull_up_down=GPIO.PUD_UP)

def alert(ev=None):
	tilt = 'Tilt Detectado'
	return tilt

# Intenta ejecutar las siguientes instrucciones, si falla va a la instruccion except
try:	
	# Ciclo principal infinito
	while True:
		# Valores del tilt
		newTilt = GPIO.add_event_detect(pinTilt, GPIO.FALLING, callback=alert, bouncetime=100)

		# Obtiene la humedad y la temperatura desde el sensor 
		humedad, temperatura = Adafruit_DHT.read_retry(sensor, pinDht)
		
		# HTTP REQUEST
		datos = { 'temperatura': format(temperatura), 'humedad': format(humedad), 'tilt': newTilt }
		r = requests.post("http://localhost:8080/values/add/", json=datos)
		r.status_code
		r.json()

		# Imprime en la consola las variables temperatura y humedad con un decimal
		print('Temperatura={0:0.1f}*  Humedad={1:0.1f}%'.format(temperatura, humedad))
		GPIO.output(29,True)
		
		# Duerme 10 segundos
		time.sleep(10)
		GPIO.output(29, False)


# Se ejecuta en caso de que falle alguna instruccion dentro del try
except Exception as e:
	# Imprime en pantalla el error e
	print str(e)
	cnx.close()
