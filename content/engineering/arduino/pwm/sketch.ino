// Sketches for "Outputs that vary". Display only.

// region: sam
int level = 0;

void setup() {
}

void loop() {
  level = analogRead(A0);
  analogWrite(9, level);
  delay(50);
}
// endregion
