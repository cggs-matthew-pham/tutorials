# The plant-water alarm in MicroPython on a Raspberry Pi Pico (LED on GP15, the sensor on GP26 / ADC0).
# Display only: these regions are read and ordered on the page, not run.

# region: alarm
from machine import Pin, ADC
import time
led = Pin(15, Pin.OUT)
sensor = ADC(26)
while True:
    level = sensor.read_u16()
    if level <= 19200:
        led.value(1)
        time.sleep(0.25)
        led.value(0)
        time.sleep(0.25)
    else:
        led.value(0)
        time.sleep(0.1)
# endregion

# region: sam
from machine import Pin, ADC
import time
led = Pin(15, Pin.OUT)
sensor = ADC(26)
while True:
    if sensor.read_u16() <= 300:
        led.value(1)
        time.sleep(250)
        led.value(0)
        time.sleep(250)
# endregion
