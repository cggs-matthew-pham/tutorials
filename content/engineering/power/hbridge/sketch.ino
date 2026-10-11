// Sketches for "Motor drivers". Display only.

// region: sam
void setup() {
  pinMode(8, OUTPUT);
  pinMode(7, OUTPUT);
}

void loop() {
  digitalWrite(8, HIGH);
  digitalWrite(7, LOW);
  analogWrite(8, 128);
  delay(2000);
}
// endregion
