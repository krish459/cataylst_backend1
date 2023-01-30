const savefav = (myfav) => {
  localStorage.setItem("fav", JSON.stringify(myfav));
};
const addtofav = (itemCode, name) => {
  let newfav = fav;
  if (itemCode in fav) {
    console.log("already added");
  } else {
    newfav[itemCode] = { itemCode, name };
  }
  setfav(newfav);
  savefav(newfav);
};
const removeFromfav = (itemCode, name) => {
  let newfav = JSON.parse(JSON.stringify(fav));
  if (itemCode in fav) {
    delete newfav[itemCode];
  }
  setfav(newfav);
  savefav(newfav);
};
const clearfav = () => {
  setfav({});
  savefav({});
  console.log("fav has been cleared");
};
