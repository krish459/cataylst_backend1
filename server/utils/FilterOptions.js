function buildFilter(query) {
  const filter = {};
  if (query.keyword && query.keyword !== undefined) {
    filter.$or = [
      { title: { $regex: query.keyword, $options: "i" } },
      { description: { $regex: query.keyword, $options: "i" } },
      { locality: { $regex: query.keyword, $options: "i" } },
      { state: { $regex: query.keyword, $options: "i" } },
    ];
  }
  if (query.locality && query.locality !== undefined) {
    filter.locality = query.locality;
  }
  if (query.buyOrRent && query.buyOrRent !== undefined) {
    filter.buyOrRent = query.buyOrRent;
  }
  if (query.minarea && !isNaN(parseInt(query.minarea))) {
    filter.area = { $gte: parseInt(query.minarea) };
  }
  if (query.price && !isNaN(parseInt(query.price))) {
    filter.rent = { $gte: parseInt(query.price) };
  }
  if (query.bedrooms && !isNaN(parseInt(query.bedrooms))) {
    // filter["details.bedrooms"] = {
    //   $eq: parseInt(query.bedrooms),
    //   $gte: 6 ? { $gte: parseInt(query.bedrooms) } : null,
    // };
    if (parseInt(query.bedrooms) >= 6) {
        filter["details.bedrooms"] = { $gte: parseInt(query.bedrooms) };
      } else {
        filter["details.bedrooms"] = parseInt(query.bedrooms);
      }
  }
  if (query.bathroom && !isNaN(parseInt(query.bathroom))) {
    if (parseInt(query.bathroom) >= 3) {
      filter["details.bathroom"] = { $gte: parseInt(query.bathroom) };
    } else {
      filter["details.bathroom"] = parseInt(query.bathroom);
    }
  }
  if (query.propertyAge && !isNaN(parseInt(query.propertyAge))) {
    if (parseInt(query.propertyAge) >= 3) {
        filter["details.propertyAge"] = { $gte: parseInt(query.propertyAge) };
      } else {
        filter["details.propertyAge"] = parseInt(query.propertyAge);
      }
  }
  if (query.furnishing && query.furnishing !== undefined) {
    filter["details.furnishing"] = query.furnishing;
  }
  if (query.propertyType && query.propertyType !== undefined) {
    filter["details.propertyType"] = query.propertyType;
  }
  //   if (query.tenants) {
  //     filter["details.tenants"] = {
  //       $eq: parseInt(query.tenants),
  //       $gte: 3 ? { $gte: parseInt(query.tenants) } : null,
  //     };
  //   }
  //   if (query.deposit) {
  //     filter["details.deposit"] = {
  //       $eq: parseInt(query.deposit),
  //       $gte: 10000 ? { $gte: parseInt(query.deposit) } : null,
  //     };
  //   }
  if (query.foodPreferance && query.foodPreferance !== undefined) {
    filter["details.foodPreferance"] = query.foodPreferance;
  }
  if (query.flatFloor && !isNaN(parseInt(query.flatFloor))) {
    if (parseInt(query.flatFloor) >= 3) {
        filter["details.flatFloor"] = { $gte: parseInt(query.flatFloor) };
      } else {
        filter["details.flatFloor"] = parseInt(query.flatFloor);
      }
  }
  if (query.totalFloors && !isNaN(parseInt(query.totalFloors))) {
    if (parseInt(query.totalFloors) >= 3) {
        filter["details.totalFloors"] = { $gte: parseInt(query.totalFloors) };
      } else {
        filter["details.totalFloors"] = parseInt(query.totalFloors);
      }
  }
  return filter;
  //   console.log("filter function", filter);
}

module.exports = { buildFilter };
