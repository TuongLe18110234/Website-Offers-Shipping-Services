//Import model
const District = require('../models/District');
const Distance = require('../models/Distance');
const User = require('../models/User');
const Fares = require('../models/Fares');
//const XLSX = require('xlsx');

// //Ham bat dong bo
// exports.createDistrictByExcelFile = async (req, res, next)=>{
//     try{
//         //var workbook = XLSX.readFile('E:/luubai/Phan_Mem/EC_VNDelivery/DanhSachCacQuan.xlsx');
//         var workbook = XLSX.readFile('E:/luubai/Phan_Mem/EC_VNDelivery/DanhSachKhoanCach.xlsx');
//         var sheet_name_list = workbook.SheetNames;
//         var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

//         // // xlData.forEach(element =>{
//         // //     var dis = new District();
//         // //     dis.name = element.Name;
//         // //     dis.save();
//         // // });

//         xlData.forEach(element =>{
//             var dis = new Distance();
//             dis.from = element.From;
//             dis.to = element.To;
//             dis.distance = element.Distance;
//             dis.save();

//             console.log(dis);
//             dis.save();
//         });

//         res.status(200).json({
//             status: 'success',
//             data: {xlData}
//         })
//     } catch(error){
//         next(error);
//     }
// }

//Ham bat dong bo
exports.getAllDistricts = async (req, res, next)=>{
    try{
        const districts = await District.find({});

        res.status(200).json({
            status: 'success',
            results: districts.length,
            data:{districts}
        })
    } catch(error){
        next(error);
    }
}

//Ham bat dong bo
exports.getAllDistances = async (req, res, next)=>{
    try{
        const distances = await Distance.find({});

        res.status(200).json({
            status: 'success',
            results: distances.length,
            data:{distances}
        })
    } catch(error){
        next(error);
    }
}

//Ham bat dong bo
exports.caculateDistanceAndCost = async (req, res, next)=>{
    try{
        var from = req.params.from;;
        var to = req.params.to;
        var {weight} = req.params;

        var range = 10;
        if(from == to){
            var range = 1;
        }

        var distance = await Distance.findOne({
            from: from,
            to: to
        });

        if(distance == null){
            distance = await Distance.findOne({
                from: from,
                to: to
            });
        }
        
        if(distance != null){
            range = distance.distance;
        }


        //We have distance
        const businesses = await User.find({role: 'business'});
        const fares = await Fares.find({});

        var allCost = [];
        businesses.forEach(business => {
            var costDelivery = 0;
            var dateDeivery = new Date();
            var addHour = 0;
            var isAdd = false;
            fares.forEach(fare => {
                if(fare.busId == business._id){
                    if(fare.unit == "KM"){
                        if(weight <= fare.constraints || fare.constraints == 0){
                            if(fare.minValue < range && range <= fare.maxValue) {
                                costDelivery = fare.cost;
                                addHour = fare.time; 
                                isAdd = true;
                            }

                            if(fare.minValue < range && fare.maxValue == 0){
                                maxUnit = fare.minValue;
                                isAdd = true;

                                fares.forEach(fare_level => {
                                    if(fare_level.busId == business._id && fare_level.unit == fare.unit){
                                        if(fare_level.minValue < maxUnit && maxUnit <= fare_level.maxValue) {
                                            costDelivery = fare_level.cost;
                                        }
                                    }
                                });
                                costDelivery += (range - maxUnit)*fare.cost;
                                addHour = fare.time; 
                            }
                        }
                    } else if(fare.unit == "KG"){
                        if(fare.minValue < weight && weight <= fare.maxValue) {
                            costDelivery = fare.cost;
                            addHour = fare.time; 
                            isAdd = true;
                        }

                        if(fare.minValue < weight && fare.maxValue == 0){
                            maxUnit = fare.minValue;
                            isAdd = true;

                            fares.forEach(fare_level => {
                                if(fare_level.busId == business._id && fare_level.unit == fare.unit){
                                    if(fare_level.minValue < maxUnit && maxUnit <= fare_level.maxValue) {
                                        costDelivery = fare_level.cost;
                                    }
                                }
                            });
                            costDelivery += (weight - maxUnit)*fare.cost;
                            addHour = fare.time;
                        }
                    }
                }
            });

            if(isAdd == true){
                dateDeivery.setHours(dateDeivery.getHours() + addHour);
                allCost.push({
                    busId: business._id,
                    busName: business.name,
                    costDelivery: costDelivery,
                    weight: weight,
                    distance: range,
                    dateDeivery: dateDeivery
                })
            }

        });

        res.status(200).json({
            status: 'success',
            distance: range,
            weight: weight,
            allCost: allCost
        })
    } catch(error){
        next(error);
    }
}
