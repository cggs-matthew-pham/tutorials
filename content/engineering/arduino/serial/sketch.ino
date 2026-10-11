// Sketches for "Talking to the computer". Display only.

// region: sam
int level = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  level = analogRead(A0);
  Serial.println("Level: " + level);
  delay(250);
}
// endregion
