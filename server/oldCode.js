// let query = {};
      // if (req.query.buyOrRent) {
      //   query.buyOrRent = req.query.buyOrRent
      // }
      // if (req.query.locality) {
      //   console.log(query.locality);
      //   query.locality = req.query.locality
      // }
      // if (req.query.propertyType) {
      //   query.$or = [
      //     console.log(title)
      //   ];
      //   // query.propertyType = req.query.propertyType
      // }
      // if (req.query.keyword) {
      //   query.$or = [
      //     { title: { $regex: req.query.keyword, $options: "i" } },
      //     { description: { $regex: req.query.keyword, $options: "i" } },
      //     { locality: { $regex: req.query.keyword, $options: "i" } },
      //     { state: { $regex: req.query.keyword, $options: "i" } },
          
      //   ];
      // }
      
      // let properties1 = await Property.find(query)
      // if (Object.keys(req.query).length != 0) {
      //           properties1.forEach((element) => {
      //             if (element.details[0].propertyType == req.query.propertyType && req.query.propertyType ) {
      //               // console.log(element.details[0].propertyType);
      //               // element.details[0].propertyType == req.query.propertyType
      //               console.log("here");
      //             }
      //         })}

      
      // let properties = await Property.paginate(query,{propertyType : req.query.propertyType}, options)
      // // .populate("flatOwner", "name")
      
      // res.status(200).json({ properties });


//       // let query = [
//       //   {
//       //     $lookup:
//       //     {
//       //       from: "users",
//       //       localField: "flatOwner",
//       //       foreignField: "_id",
//       //       as: "creator"
//       //     }
//       //   },
//       //   {$unwind: "$creator"},
//       //   // {
//       //   //   $lookup:
//       //   //   {
//       //   //     from: "users",
//       //   //     localField: "flatOwner",
//       //   //     foreignField: "_id",
//       //   //     as: "creator"
//       //   //   }
//       //   // },
//       //   // {$unwind: "$creator"},
//       // ]

//       // let properties = await Property.aggregate(query)
//       // res.status(200).json({ properties });
      

// router.get(
//   "/get-properties",
//   // userAuth,
//   // checkRole(["admin"]),
//   async (req, res) => {
//     try {
//       let query = {};
//       if (req.query.keyword) {
//         query.$or = [
//           { title: { $regex: req.query.keyword, $options: "i" } },
//           { description: { $regex: req.query.keyword, $options: "i" } },
//           { locality: { $regex: req.query.keyword, $options: "i" } },
//           { state: { $regex: req.query.keyword, $options: "i" } },
//         ];
//       }
//       // let properties = await Property.find(query).populate("flatOwner", "name");

//       const { page, perPage } = req.query;
//       const options = {
//         page: parseInt(page, 10) || 1,
//         limit: parseInt(perPage, 10) || 3,
//       };
//       let properties = await Property.paginate({}, options);

//       let details = [];
//       if (Object.keys(req.query).length != 0) {
//         properties.docs.forEach((element) => {
//           if (
//             element.locality == req.query.locality ||
//             element.buyOrRent == req.query.buyOrRent ||
//             element.area >= parseInt(req.query.minarea) ||
//             element.rent >= parseInt(req.query.price) ||
//             (parseInt(req.query.bedrooms) >= 6
//               ? element.details[0].bedrooms >= parseInt(req.query.bedrooms)
//               : element.details[0].bedrooms == parseInt(req.query.bedrooms)) ||
//             (parseInt(req.query.bathroom) >= 3
//               ? element.details[0].bathroom >= parseInt(req.query.bathroom)
//               : element.details[0].bathroom == parseInt(req.query.bathroom)) ||
//             (parseInt(req.query.propertyAge) >= 3
//               ? element.details[0].propertyAge >=
//                 parseInt(req.query.propertyAge)
//               : element.details[0].propertyAge ==
//                 parseInt(req.query.propertyAge)) ||
//             element.details[0].furnishing == req.query.furnishing ||
//             element.details[0].propertyType == req.query.propertyType ||
//             (parseInt(req.query.tenants) >= 3
//               ? element.details[0].tenants >= parseInt(req.query.tenants)
//               : element.details[0].tenants == parseInt(req.query.tenants)) ||
//             (parseInt(req.query.deposit) >= 10000
//               ? element.details[0].deposit >= parseInt(req.query.deposit)
//               : element.details[0].deposit == parseInt(req.query.deposit)) ||
//             element.details[0].foodPreferance == req.query.foodPreferance ||
//             (parseInt(req.query.flatFloor) >= 3
//               ? element.details[0].flatFloor >= parseInt(req.query.flatFloor)
//               : element.details[0].flatFloor ==
//                 parseInt(req.query.flatFloor)) ||
//             (parseInt(req.query.totalFloors) >= 10000
//               ? element.details[0].totalFloors >=
//                 parseInt(req.query.totalFloors)
//               : element.details[0].totalFloors ==
//                 parseInt(req.query.totalFloors)) ||
//             element.details[0].facing == req.query.facing ||
//             (parseInt(req.query.monthlymaintenance) >= 3
//               ? element.details[0].monthlymaintenance >=
//                 parseInt(req.query.monthlymaintenance)
//               : element.details[0].monthlymaintenance ==
//                 parseInt(req.query.monthlymaintenance)) ||
//             (parseInt(req.query.waterSupply) >= 10000
//               ? element.details[0].waterSupply >=
//                 parseInt(req.query.waterSupply)
//               : element.details[0].waterSupply ==
//                 parseInt(req.query.waterSupply)) ||
//             element.amenities.includes(req.query.amenities) ||
//             (parseInt(req.query.availableFromYear) >= 2026
//               ? element.details[0].availableFrom.getFullYear().toString() >=
//                 parseInt(req.query.availableFromYear)
//               : element.details[0].availableFrom.getFullYear().toString() ==
//                 parseInt(req.query.availableFromYear))
//           ) {
//             details.push(element);
//           }
//         });
//       }
//       if (details.length == 0) {
//         res.status(200).json({ properties });
//       } else {
//         res.status(200).json({ details });
//       }
//       // } else {
//       //   res.status(200).json({ properties });
//       // }
//     } catch (error) {
//       return res.status(400).json({ message: `${error}` });
//     }
//   }
// );



//////////////////////////////////////////////////////
