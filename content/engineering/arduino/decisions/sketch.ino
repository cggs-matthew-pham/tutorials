// Sketches for "Values and decisions". Display only.

// region: sam
int level = 0;

void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  level = analogRead(A0);
  if (level = 500) {
    digitalWrite(13, HIGH);
  } else {
    digitalWrite(13, LOW);
  }
}
// endregion
