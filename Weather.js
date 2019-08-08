//更新省份列表
function GetProvinces() {
    $.ajax({
        dataType: 'jsonp',
        data: {
            grade: 'province',
        },
        url: 'https://cdn.weather.hao.360.cn/sed_api_area_query.php',
        jsonp: '_jsonp',
        jsonpCallback: 'loadProvince',
        success: function(data) {
            // console.log(data);
            var fragment = document.createDocumentFragment();
            $.each(data, function(index, val) {
                //郑州180101
                // console.log(val);
                let option = $('<option value=' + val[1] + '>' + val[0] + '</option>').get(0);
                fragment.appendChild(option);
            });
            if (fragment.childElementCount > 0) {
                $('#provinces').html('');
                $('#provinces').append(fragment);
                let province = $('#provinces').val();
                GetCitys(province);
            }
        }
    })
}

//更新城市列表
function GetCitys(code) {

    $.ajax({
        dataType: 'jsonp',
        data: {
            grade: 'city',
            code: code,
        },
        url: 'http://cdn.weather.hao.360.cn/sed_api_area_query.php',
        jsonp: '_jsonp',
        jsonpCallback: 'loadCity2',
        success: function(data) {
            // console.log(data);
            var fragment = document.createDocumentFragment();
            $.each(data, function(index, val) {
                //郑州180101
                // console.log(val[0] + val[1]);
                let option = $('<option value=' + val[1] + '>' + val[0] + '</option>').get(0);
                fragment.appendChild(option);
            });
            if (fragment.childElementCount > 0) {
                $('#citys').html('');
                $('#citys').append(fragment);
                let city = $('#citys').val();
                // console.log(city);
                //获取区域
                GetAreas(city);
            }



        }
    })
}
//更新区域列表
function GetAreas(city) {

    $.ajax({
        dataType: 'jsonp',
        data: {
            grade: 'town',
            code: city,
        },
        url: 'http://cdn.weather.hao.360.cn/sed_api_area_query.php',
        jsonp: '_jsonp',
        jsonpCallback: 'loadTown',
        success: function(data) {
            // console.log(data);
            var fragment = document.createDocumentFragment();
            $.each(data, function(index, val) {
                //郑州180101
                // console.log(val);
                let option = $('<option value=' + val[1] + '>' + val[0] + '</option>').get(0);
                fragment.appendChild(option);
            });
            if (fragment.childElementCount > 0) {
                $('#areas').html('');
                $('#areas').append(fragment);
            }
        }
    })
}
//得到天气
function GetWeather(city) {
    var t = codeselect(city);
    $.ajax({
        dataType: 'jsonp',
        data: {
            code: city,
            app: 'tq360',
            t: t[0],
            c: t[1],
        },
        url: 'http://tq.360.cn/api/weatherquery/querys',
        jsonp: '_jsonp',
        jsonpCallback: 'renderData',
        success: function(data) {
            console.log(data);
            Array.prototype.splice.call(data.weather, 5);
            var temp = template('Weather_temp', data);
            // console.log(temp);

            $('#weather_info').html(temp);
            $('#weather_info').animate({ 'opacity': 1 }, 1000);


        }
    })
}

function codeselect(e) {
    var t = (new Date).getTime(),
        n = parseInt(e) + (new Date).getTime(),
        r = [t, n];
    return r
}

//天气信息模板
