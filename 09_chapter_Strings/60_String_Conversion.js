let myNumber= 200;
console.log(myNumber.toString());
console.log(String(myNumber));

null.toString(); //TypeError: Cannot read properties of null (reading 'toString')
console.log(String(null));

/**
 *   myNumber.toString() — the method call

  - toString() is a method that exists on the value itself (numbers inherit it from Number.prototype)
  - It must be called on the value: value.toString()
  - Radix support: you can pass a base — myNumber.toString(2) → "11001000" (binary), .toString(16) → "c8" (hex)
  - Fails on null/undefined: null.toString() throws TypeError because null and undefined have no methods
  - Customizable: objects can override toString() to define their own string form

  String(myNumber) — the global function

  - String() is a global function that converts anything to a string
  - Works on every type, including null and undefined:

  - String(null) → "null"
  - String(undefined) → "undefined"
  - Never throws — it's the safe, universal converter
  - No radix parameter
  - Under the hood, when you pass a non-null object/value, it essentially calls that value's toString() (via the ToPrimitive internal operation — for
  objects it tries Symbol.toPrimitive, then valueOf(), then toString())

  Comparison:

  ┌────────────────────┬────────────────────────────────┬─────────────────────────┐
  │                    │ x.toString()                   │ String(x)               │
  ├────────────────────┼────────────────────────────────┼─────────────────────────┤
  │ Kind               │ method                         │ global function         │
  ├────────────────────┼────────────────────────────────┼─────────────────────────┤
  │ Call on            │ the value itself               │ wraps the value         │
  ├────────────────────┼────────────────────────────────┼─────────────────────────┤
  │ null / undefined   │ ❌ throws                      │ ✅ "null" / "undefined" │
  ├────────────────────┼────────────────────────────────┼─────────────────────────┤
  │ Radix (binary/hex) │ ✅ x.toString(2)               │ ❌                      │
  ├────────────────────┼────────────────────────────────┼─────────────────────────┤
  │ Throws             │ can                            │ never                   │
  ├────────────────────┼────────────────────────────────┼─────────────────────────┤
  │ Objects            │ uses their toString() override │ same (via ToPrimitive)  │
  └────────────────────┴────────────────────────────────┴─────────────────────────┘

  Other ways to convert that you'll see:

    myNumber + ""        // "200"  (string concatenation coerces)
    `${myNumber}`        // "200"  (template literal coerces)
 */