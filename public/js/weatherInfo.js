function weatherInfo(json, city) {
    let weather = {};
    let M_highest = 0, M_lowest = 99, N_highest = 0, N_lowest = 99;
    let M_minT, M_maxT, N_minT, N_maxT, i = 0, index = 0;

    for (i = 0; i < 22; i++) {
        // Morning 
        if (json.records.location[i].locationName === city) {
            index = i;
            // console.log(json.records.location[i]);
            // console.log('--------------');
            // for (let j = 0;  < 3; j++) {
            // M_min Temperature
            M_minT = json.records.location[i].weatherElement[0].time[0].parameter.parameterName;
            if (M_minT < M_lowest) {
                M_lowest = M_minT;
            }
            //console.log('M_minT:', M_minT);

            // M_max Temperature
            M_maxT = json.records.location[i].weatherElement[1].time[0].parameter.parameterName;
            if (M_maxT > M_highest) {
                M_highest = M_maxT;
            }
            //console.log('M_maxT', M_maxT);
        }

        // Night
        if (json.records.location[i].locationName === city) {
            // console.log(json.records.location[i]);
            // console.log('--------------');
            // for (let j = 0;  < 3; j++) {
            // N_min Temperature
            N_minT = json.records.location[i].weatherElement[0].time[1].parameter.parameterName
            if (N_minT < N_lowest) {
                N_lowest = N_minT;
            }
            //console.log('N_minT:', N_minT);

            // N_max Temperature
            N_maxT = json.records.location[i].weatherElement[1].time[1].parameter.parameterName
            if (N_maxT > N_highest) {
                N_highest = N_maxT;
            }
            //console.log('N_maxT', N_maxT);
        }
    }
    weather = { city, M_lowest, M_highest, N_lowest, N_highest };
    // console.log('M_lowest:', M_lowest);
    // console.log('M_highest:', M_highest);
    // console.log(weather[i]);
    return weather; // Return an object
};

module.exports = weatherInfo;