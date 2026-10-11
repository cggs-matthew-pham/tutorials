// The reaction game's loop, for the ordering task. Display only.

// region: loop
waitTime = random(2000, 5001);
start = millis();
while (millis() - start < waitTime) { if (digitalRead(2) == HIGH) { falseStart(); return; } }
digitalWrite(13, HIGH);
lit = millis();
while (digitalRead(2) == LOW) { }
Serial.println(millis() - lit);
digitalWrite(13, LOW);
// endregion
