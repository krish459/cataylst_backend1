const { z, ZodError } = require("zod");

async function saveData(DataUser, rawData) {
  try {
    const data1 = DataUser.parse(rawData);
    console.log(data1);
  } catch (error) {
    if (error instanceof ZodError) {
      return { success: false, error: error.flatten() };
    } else {
      console.log(`Error : ${error}`);
    }
  }
  return { success: true, errors: null };
}

module.exports = { saveData };
