try {
  let reqquest = await Promise.reject(`500 Server Error`);
  console.log(`Result:` + reqquest);
} catch (error) {
  console.log(`Error: ` + error);
} finally {
  console.log(`Finally Block`);
}

try {
  let request = await Promise.resolve(`200 Success`);
  console.log(`Result:` + request);
} catch (error) {
  console.log(`Error: ` + error);
} finally {
  console.log(`Finally Block`);
}
