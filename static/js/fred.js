function getPointCategoryName(point, dimension) {
    var series = point.series,
        isY = dimension === 'y',
        axis = series[isY ? 'yAxis' : 'xAxis'];
    return axis.categories[point[isY ? 'y' : 'x']];
} 


d3.json("park_months").then(data=>
    arrayLoop(data)
);
    function arrayLoop(data){
        masterArray = [];
        var months = data[0].months;
        var parks = data[0].parks;
        // console.log(parks);
        months.forEach(month=>{
            if(month=="January"){
                monthWIP = 0;
            }
            else{
                monthWIP = monthWIP + 1;
            }
            // console.log(monthWIP) 
            parks.forEach(park=>{
                if(park=="Acadia"){
                    parkWIP = 0;
                }
                else{
                    parkWIP = parkWIP + 1;
                }
                addressWIP = [monthWIP,parkWIP,data[0][park][month]]
                masterArray.push(addressWIP);
            })
        })
        console.log(masterArray);


    Highcharts.chart('container', {

        chart: {
            type: 'heatmap',
            marginTop: 40,
            marginBottom: 80,
            plotBorderWidth: .5
        },

        title: {
            text: 'Average Park Visits per Month'
        },

        xAxis: {
            categories: ['January', 'February', 'March', 'April', 'May', 'June ', 'July', 'August', 'September', 'October', 'November', 'December']
        },

        yAxis: {
            categories: parks,
            title: null,
            reversed: true
        },

        accessibility: {
            point: {
                descriptionFormatter: function (point) {
                    var ix = point.index + 1,
                        xName = getPointCategoryName(point, 'x'),
                        yName = getPointCategoryName(point, 'y'),
                        val = point.value;
                    return ix + '. ' + xName + ' sales ' + yName + ', ' + val + '.';
                }
            }
        },

        colorAxis: {
            min: 0,
            minColor: '#FFFFFF',
            maxColor: Highcharts.getOptions().colors[0]
        },

        legend: {
            align: 'right',
            layout: 'vertical',
            margin: 0,
            verticalAlign: 'top',
            y: 25,
            symbolHeight: 280
        },

        tooltip: {
            formatter: function () {
                return '<b>' + getPointCategoryName(this.point, 'x') +
                    this.point.value + '</b> visits to <br><b>' + getPointCategoryName(this.point, 'y') + '</b>';
            }
        },

        series: [{
            name: 'Visit per Month',
            borderWidth: .2,
            data: masterArray,
            dataLabels: {
                enabled: true,
                color: '#000000'
            }
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    yAxis: {
                        labels: {
                            formatter: function () {
                                return this.value.charAt(0);
                            }
                        }
                    }
                }
            }]
        }

    });
};