import Decimal from "decimal.js";

export function format(s) {
  if (Decimal.isDecimal(s)) {
    if (s.e > 9) {
      return s.toPrecision(4);
    } else {
      return s.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  } else {
    return s;
  }
}
