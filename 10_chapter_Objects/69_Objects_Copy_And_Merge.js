// spread operator used to copy the properties of one object to another

let object1 = { a: 1, b: 2, c: 3 };
let object2 = { d: 4, e: 5, f: 6 };

let object3 = { ...object1 };
console.log(object1, object2, object3);

object1.a = 256; // since object follows refrence, updating the other object will not impact the copied
console.log(object1, object2, object3);

let object4 = { ...object1, ...object2, ...object3 };
console.log(object4);

/**
 *   let object3 = { ...object1 };   // object3 = { a: 1, b: 2, c: 3 }  ← copied BEFORE the change
    object1.a = 256;                 // object1 = { a: 256, b: 2, c: 3 }
                                    // object3 STILL = { a: 1, b: 2, c: 3 } (independent copy)

  Then when building object4:

  let object4 = { ...object1, ...object2, ...object3 };
    // step 1: { ...object1 }  → { a: 256, b: 2, c: 3 }
    // step 2: { ...object2 }  → { a: 256, b: 2, c: 3, d: 4, e: 5, f: 6 }
    // step 3: { ...object3 }  → { a: 1,  b: 2, c: 3, d: 4, e: 5, f: 6 }  ← a overwritten back to 1!

  Rule: when two spread objects share the same key, the later one wins. object1 and object3 both have a, b, c. Since object3 comes last and still holds
  the old values (a: 1), it clobbers the a: 256 that object1 contributed.

  So object4 is:

  { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }

  To get a: 256 in the merge, just spread object3 before object1:

  let object4 = { ...object3, ...object2, ...object1 };
    // → { a: 256, b: 2, c: 3, d: 4, e: 5, f: 6 }
 */
