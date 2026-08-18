const user = {
  _fullName: "Default", // actual storage
  get fullName() {
    return this._fullName; // reads the backing field, not the getter
  },
  set fullName(name) {
    this._fullName = name; // writes the backing field, not the setter
  },
};

console.log(`Get: ${user.fullName}`); // "Get: Default"
user.fullName = "Jagadesh";
console.log(`Get: ${user.fullName}`); // "Get: Jagadesh"
