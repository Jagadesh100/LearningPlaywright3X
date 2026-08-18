let a = { status: "pass" };
let b = { status: "pass" };

if (a === b) {
  console.log(`Two Object A AND B are same`);
} else {
  console.log(`Two Objects A AND B are not same`);
}

let c = { status: "fail" };
let d = c;

if (c === d) {
  console.log(`Two Object C AND D are same`);
} else {
  console.log(`Two Objects  C AND D are not same`);
}

/*
⠶ This is about how JavaScript compares objects — by reference, not by value.

  Why a and b are not same:

  let a = { status: "pass" };
    let b = { status: "pass" };

  These are two separate object literals. Even though their content is identical, each { } creates a brand-new object in memory at a different address. a
   points to object #1, b points to object #2. The === operator for objects doesn't compare contents — it asks "do both variables point to the exact same
   object in memory?" Since they point to different objects, the result is false.

  Why c and d are same:

  let c = { status: "fail" };
    let d = c;

  Here there's only one object created. d = c doesn't copy the object — it copies the reference (the memory address). Now both c and d point to the same
  object. So c === d is true.

  Visualizing it:

  a ───► { status: "pass" }   (memory address X)
    b ───► { status: "pass" }   (memory address Y)

    c ───┐
         ├──► { status: "fail" }  (memory address Z)
    d ───┘

  Key takeaways:

  - === on objects checks reference identity, not value equality
  - Primitive values (string, number, boolean) are compared by value, so "pass" === "pass" is true — objects are the exception
  - let d = c makes d an alias of c, not a copy. Mutating one affects the other: d.status = "new" would also change c.status
  - To compare object contents, you need to manually compare properties (or use JSON.stringify(a) === JSON.stringify(b), with caveats like key order)

*/