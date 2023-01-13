﻿/* eslint-disable */
import { jsPDF } from "jspdf";
var font =
  "T1RUTwAMAIAAAwBAQ0ZGIPi23+MAAA+YAABUf0dERUYCYAMIAABkGAAAACJHUE9ToziktAAAZDwAAAOmR1NVQo3vjtQAAGfkAAAAbk9TLzJoyYmEAAAGBAAAAGBjbWFwDK7+XAAACegAAAWOaGVhZAWnEEsAAADUAAAANmhoZWEG6QRSAAAF4AAAACRobXR4vsNGNAAAAQwAAATUbWF4cAE1UAAAAADMAAAABm5hbWXSGR5MAAAGZAAAA4Rwb3N0/7gAMgAAD3gAAAAgAABQAAE1AAAAAQAAAAEAg5DMYKVfDzz1AAMEAAAAAADRw2YSAAAAANHDZhL/H/8AA+oDrAAAAAMAAgAAAAAAAAHgAFgBLAAAArMACgKzAAkCswAKArMACgKzAAoCswAJArMACQKzAAoCswAKArMACgQ6AAkCsABtAqIAMQKiADECogAxAqIAMQL3AG0C9wALAvcAbQL3AAsCiQBtAokAbQKJAG0CiQBtAokAbQKJAG0CiQBtAokAbQKJAG0CewBtAr0AMQK9ADEDDgBtAhgAbQNTAG0CGABtAhgAbQIYAGcCGABcAhgAYAIYAG0BO//JAqAAbQKgAG0CfABtAnwAbQJFAG0CfABtAkwAbQJ8AAoDSwBtAwsAbQMLAG0DCwBtAwsAbQL5AG0DCwBtAyYAMQMmADEDJgAxAyYAMQMmADEDJgAxAyYAMQMmADEDJgAxBA4AMQKUAG0CegBtAz8AMQKaAG0CmgBtApoAbQKaAG0CCwAxAgsAMQILADECCwAxAmMAHQJjAB0CYwAdAmMAHQLwAGMC8ABjAvAAYwLwAGMC8ABjAvAAYwLwAGMC8ABjAvAAYwKzAAkDsAAKA7AACgOwAAoDsAAKA7AACgKEAAoCdwAJAncACgJ3AAoCdwAKAncACQKLAEICiwBCAosAQgKLAEICbgAxAm4AMQJuADECbgAxAm4AMQJuADECbgAxAm4AMQJuADECbgAxA9sAMQJuAFQB/wAxAf8AMQH/ADEB/wAxAm4AMQJpADEC0wAxAmQAMQI7ADECOwAxAjsAMQI7ADECOwAxAjsAMQI7ADECOwAxAjsAMQFwACQCbgAxAm4AMQJJAFQBNAA2AS0ANgEtADYBK//2AS0ABwEt//wCVQA2AbgAIgEjABgBIf/7AisAVAIrAFUA/ABUAPwASQF0AFQA/AAhAXcAVAEtAAkDnwBUAkkAVAJJAFQCSQBUAkkAVAJJAFQCSQBUAm4AMQJuADECbgAxAm4AMQJuADECbgAxAm4AMQJkAC4CbgAxA/YAMQJuAFQCbgBUAm4AMQGSAFQBkgBUAZIAQAGSACUBrAAxAawAMQGsADEBrAAxAogAVAGxACwBrAAqAboALAGxACwCNABFAjQARQI0AEUCNABFAjQARQI0AEUCNABFAjQARQI0AEUCHQAOAvQADwL0AA4C9AAPAvQADgL0AA8CLwAOAjsADgI7AA4COwAPAjsADwI7AA4CJQA2AiUANgIlADYCJQA2AiYAGAImAGsCJgA+AiYARgImABoCJgA+AiYALwImADICJgA1AiYALQHuAFkBbP/2ASwATwGnAE8BLABPARoAMQNIAE8BLABPASwATwMCAE8BLABPAjAATwIwAE8BugBPAPIATwFgAE8BngAnAeoAAAGyAE8BsgAnAXsATwF7ACcBawBFAYkARQN4ADsCYgA7AaUAOwGwACcBsAAnAbAAJwDoACcA1AATATgAMQH/ADECHgAxAiYATAJpADECAQBZAncACQIMADsCDAA7AicATwInAE8B9AAnAhUATwH0ADsCFQBPAicATwH0AE8CJwBPAzgAJwImAE8CEwBPAOYATwDmAE8DOAAxAsUAMQKXADEDdAAxA3QAMQILADEB/wAnAbsAMQJbADsBuwAnAlgAJwAA/x8BOgBFAeQATwHkAE8BYQBUAeQATwHwAE8BLABWAToAEgHbADECEgBZAlgAtgFFAE8B1gBLAxIALAABAAAD3f8QAAAEOv8f/9ID6gABAAAAAAAAAAAAAAAAAAABNQADAkgBkAAFAAgCmQJmAAAATAKZAmYAAAFmADIBLAAAAAAFAAAAAAAAAAAAAAcAAAAAAAAAAAAAAABVS1dOAEAAICJlAtD/EAENA90A8AAAAIMAAAAAAfQCngAAACAAAgAAABQA9gABAAAAAAAAAD4AAAABAAAAAAABAAMAPgABAAAAAAACAAcAQQABAAAAAAADABYASAABAAAAAAAEAAMAPgABAAAAAAAFADwAXgABAAAAAAAGAAsAmgABAAAAAAAIAAkApQABAAAAAAAJABQArgABAAAAAAAMABgAwgADAAEECQAAAHwA2gADAAEECQABAAYBVgADAAEECQACAA4BXAAD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aWxsYVRiYXJUY2Fyb251bmkwMTYyVWh1bmdhcnVtbGF1dFVtYWNyb25Vb2dvbmVrVXJpbmdXYWN1dGVXY2lyY3VtZmxleFdkaWVyZXNpc1dncmF2ZVljaXJjdW1mbGV4WWdyYXZlWmFjdXRlWmRvdGFjY2VudGFicmV2ZWFtYWNyb25hb2dvbmVrY2FjdXRlY2Nhcm9uZGNhcm9uZGNyb2F0ZWNhcm9uZWRvdGFjY2VudGVtYWNyb25lb2dvbmVrZ2NvbW1hYWNjZW50aWppbWFjcm9uaW9nb25la2tjb21tYWFjY2VudGxhY3V0ZWxjYXJvbmxjb21tYWFjY2VudGxkb3RuYWN1dGVuY2Fyb25uY29tbWFhY2NlbnRlbmdvaHVuZ2FydW1sYXV0b21hY3JvbnJhY3V0ZXJjYXJvbnJjb21tYWFjY2VudHNhY3V0ZXNjZWRpbGxhdGJhcnRjYXJvbnVuaTAxNjN1aHVuZ2FydW1sYXV0dW1hY3JvbnVvZ29uZWt1cmluZ3dhY3V0ZXdjaXJjdW1mbGV4d2RpZXJlc2lzd2dyYXZleWNpcmN1bWZsZXh5Z3JhdmV6YWN1dGV6ZG90YWNjZW50RXVyb2FwcHJveGVxdWFsZ3JlYXRlcmVxdWFsbGVzc2VxdWFsbm90ZXF1YWx1bmkwMzI2dHRDb3B5cmlnaHQgwqkgMjAxNSBieSBLb3NhbCBTZW4sIFBoaWxhdHlwZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5TZW4gUmVndWxhcgCIAgABAEMAbgB0AKYA0gDXAPkA/QEuAU8BVQFbAbABygHcAfoCBQIcAkwCbAJ5ArYCwQLLAtwC4ALqAvMC9wMVAykDPANAA1gDYgNqA3IDeQOSA5YDnwOnA64DywPWA+MD6APwA/QD+wQIBAwEFQQbBCgELwQ8BGMEhwSNBLYExQTLBNEE2QT7BQ0FFgUaBSgFLwVOBVMFVwVuBXgFfgWJBY0FlQWZBZ8FqgWvBbMFugXHBdEF3QXhBecF7AX2BfoGAQYXBiAGKgYvBjUGOwZBBkcGWwZrBm8GdgaIBpAGlgacBqAGrgayBrYGugbHBswG1wbgBuYG6gbwBvUG+wcBBwUHEwcYByEHLQcxBzUHOQc/B0YV+177K/sy+1T7VPcr//9iAo/3Xvde9yv/AJ39cfdU91T7K/cy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";
var callAddFont = function () {
  this.addFileToVFS("Sen-wZy2-italic.ttf", font);
  this.addFont("Sen-wZy2-italic.ttf", "Sen-wZy2", "italic");
};
jsPDF.API.events.push(["addFonts", callAddFont]);
