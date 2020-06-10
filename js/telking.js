//导航栏
$("#nav_right li").click( function(event) {
    console.log(event.currentTarget.offsetLeft);
    $("#nav_right li").removeClass("nav_links_active");
    $(this).addClass("nav_links_active");
    window.location = "#";
})

//轮播图
$(document).ready(function() {
    var i = 0;
    var timer;

    //显示第一张图片
    $('.carousel_img').eq(0).show().siblings('.carousel_img').hide();

    //调用轮播函数
    showTime();

    //点击小方块
    $('.rectangle').click(function() {
        console.log($(this));
        clearInterval(timer);
        i = $(this).index();
        show();
        showTime();
    });



    //鼠标点击左按钮
    $('.leftbtn').click(function() {
        clearInterval(timer);
        if (i == 0) {
            i = 5;
        }
        i --;
        show();
        showTime();
    });

    //鼠标点击右按钮
    $('.rightbtn').click(function() {
        clearInterval(timer);
        if (i == 4) {
            i = -1;
        }
        i ++;
        show();
        showTime();
    });

    //定时器
    function showTime() {
        timer = setInterval(function() {
            show();
            i ++;
            if (i == 5) {
                i = 0;
            }
        }, 2000);
    };

    function show() {
        $('.item').eq(i).fadeIn(300).siblings('.item').fadeOut(300);
        $('.rectangle').eq(i).addClass('select').siblings('.rectangle').removeClass('select');
    }
    
});

//曲线图
var lineChart = echarts.init(document.getElementById('displayline'));
$.get('https://edu.telking.com/api/?type=month', function (data) {
    lineChart.setOption({
        grid: {
            x: 200,
            y: 20
        },
        tooltip : {},
        lengend: {},
        xAxis: {
            data: data.data.xAxis
        },
        yAxis: {},
        series : [
            {
                name: '商品数',
                type: 'line',    // 设置图表类型为折线图
                smooth: true,
                data: data.data.series,
                itemStyle: {
                    normal: {
                        color: "#4587f0",
                        label: {
                            show: true
                        }
                    }
                }
            }
        ]
    })
}, 'json')

//饼状图
var pieChart = echarts.init(document.getElementById('displaypie'));
var url = "https://edu.telking.com/api/?type=week";
var request = new XMLHttpRequest();
request.open("get", url);
request.send(null);
request.onload = function() {
    if (request.status == 200) {
        var json = JSON.parse(request.responseText);
        var pieValue = json.data.series;
        var pieName = json.data.xAxis;
        var pieData = {};
        for (i = 0; i < 7; i ++) {
            pieData[i] = {};
            pieData[i]['value'] = pieValue[i];
            pieData[i]['name'] = pieName[i];
        }
        pieChart.setOption({
            series:[
                {
                    name: '商品数',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data:[
                        pieData[0],
                        pieData[1],
                        pieData[2],
                        pieData[3],
                        pieData[4],
                        pieData[5],
                        pieData[6]
                    ]
                }
            ]
        })

    }
}

//柱形图
var barChart = echarts.init(document.getElementById('displaybar'));
$.get('https://edu.telking.com/api/?type=week', function (data) {
    barChart.setOption({
        grid: {
            x: 40,
            y: 50
        },
        xAxis: {
            axisLine: {
                show: false
            },
            data: data.data.xAxis
        },
        yAxis: {
            name: '商品数'
        
        },
        series : [
            {
                name: '商品数',
                type: 'bar',    // 设置图表类型为柱状图
                barWidth: 15,
                data: data.data.series,
                itemStyle: {
                    normal: {
                        color: "#4587f0"
                    }
                }
            }
        ]
    })
}, 'json')
