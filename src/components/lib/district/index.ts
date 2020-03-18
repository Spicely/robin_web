const districtData = require('./location.json')

const district: any[] = [];
Object.keys(districtData).forEach((index) => {
    let itemLevel1: any = {};
    let itemLevel2: any = {};
    itemLevel1.value = districtData[index].code;
    itemLevel1.label = districtData[index].name;
    itemLevel1.children = [];
    let data = districtData[index].cities;
    Object.keys(data).forEach((index) => {
        itemLevel2.value = data[index].code;
        itemLevel2.label = data[index].name;
        itemLevel2.children = [];
        let data2 = data[index].districts;
        let itemLevel3: any = {};
        itemLevel3.children = [];
        Object.keys(data2).forEach((index) => {
            itemLevel3.value = index;
            itemLevel3.label = data2[index];
            itemLevel2.children.push(itemLevel3);
            itemLevel3 = {};
        });
        itemLevel1.children.push(itemLevel2);
        itemLevel2 = {};
    });
    district.push(itemLevel1)
});

export default district