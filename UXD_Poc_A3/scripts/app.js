function openNav() {
    document.getElementById("side-drawer").style.width = "66%";
}

function closeNav() {
    document.getElementById("side-drawer").style.width = "0";
}



$(function() {

    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }


    function initializeClock(id, endtime) {
        var clock = document.getElementById(id);
        if (clock) {
            var daysSpan = clock.querySelector('.days');
            var hoursSpan = clock.querySelector('.hours');
            var minutesSpan = clock.querySelector('.minutes');
            var secondsSpan = clock.querySelector('.seconds');

            function updateClock() {
                var t = getTimeRemaining(endtime);

                daysSpan.innerHTML = ('0' + t.days).slice(-2);
                hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
                minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
                secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

                if (t.total <= 0) {
                    clearInterval(timeinterval);
                }
            }

            updateClock();
            var timeinterval = setInterval(updateClock, 1000);
        }
    }
    //var deadline = 'July 17 2017 07:59:59 GMT-0700';
    var deadline = new Date(Date.parse(new Date()) + 100 * 24 * 60 * 60 * 1000); // sets 15 day countdown
    initializeClock('clockdiv', deadline);

    $('#submit-results').click(function() {
        if (window.location.host === 'site232.digitalskillsacademy.me') {
            window.location.href = 'http://site232.digitalskillsacademy.me/ethical-eaters/calculator.html'
        } else {
            window.location.href = window.location.origin + '/calculator.html';
        }
    })

    if (window.location.pathname.indexOf('/calculator.html') >= 0) {
        Highcharts.chart('container0', {
            chart: {
                type: 'areaspline'
            },
            title: {
                text: 'Food carbon emissions'
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 150,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            },
            xAxis: {
                categories: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday'
                ],
                plotBands: [{ // visualize the weekend
                    from: 4.5,
                    to: 6.5,
                    color: 'rgba(68, 170, 213, .2)'
                }]
            },
            yAxis: {
                title: {
                    text: 'Kg CO2e'
                }
            },
            tooltip: {
                shared: true,
                valueSuffix: ' Kg CO2e'
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.5
                }
            },
            series: [{
                name: 'Christos',
                data: [3, 4, 3, 5, 4, 10, 12]
            }]
        });


        var ranges = [
                [1246406400000, 14.3, 27.7],
                [1246492800000, 14.5, 27.8],
                [1246579200000, 15.5, 29.6],
                [1246665600000, 16.7, 30.7],
                [1246752000000, 16.5, 25.0],
                [1246838400000, 17.8, 25.7],
                [1246924800000, 13.5, 24.8],
                [1247011200000, 10.5, 21.4],
                [1247097600000, 9.2, 23.8],
                [1247184000000, 11.6, 21.8],
                [1247270400000, 10.7, 23.7],
                [1247356800000, 11.0, 23.3],
                [1247443200000, 11.6, 23.7],
                [1247529600000, 11.8, 20.7],
                [1247616000000, 12.6, 22.4],
                [1247702400000, 13.6, 19.6],
                [1247788800000, 11.4, 22.6],
                [1247875200000, 13.2, 25.0],
                [1247961600000, 14.2, 21.6],
                [1248048000000, 13.1, 17.1],
                [1248134400000, 12.2, 15.5],
                [1248220800000, 12.0, 20.8],
                [1248307200000, 12.0, 17.1],
                [1248393600000, 12.7, 18.3],
                [1248480000000, 12.4, 19.4],
                [1248566400000, 12.6, 19.9],
                [1248652800000, 11.9, 20.2],
                [1248739200000, 11.0, 19.3],
                [1248825600000, 10.8, 17.8],
                [1248912000000, 11.8, 18.5],
                [1248998400000, 10.8, 16.1]
            ],
            averages = [
                [1246406400000, 21.5],
                [1246492800000, 22.1],
                [1246579200000, 23],
                [1246665600000, 23.8],
                [1246752000000, 21.4],
                [1246838400000, 21.3],
                [1246924800000, 18.3],
                [1247011200000, 15.4],
                [1247097600000, 16.4],
                [1247184000000, 17.7],
                [1247270400000, 17.5],
                [1247356800000, 17.6],
                [1247443200000, 17.7],
                [1247529600000, 16.8],
                [1247616000000, 17.7],
                [1247702400000, 16.3],
                [1247788800000, 17.8],
                [1247875200000, 18.1],
                [1247961600000, 17.2],
                [1248048000000, 14.4],
                [1248134400000, 13.7],
                [1248220800000, 15.7],
                [1248307200000, 14.6],
                [1248393600000, 15.3],
                [1248480000000, 15.3],
                [1248566400000, 15.8],
                [1248652800000, 15.2],
                [1248739200000, 14.8],
                [1248825600000, 14.4],
                [1248912000000, 15],
                [1248998400000, 13.6]
            ];


        Highcharts.chart('container1', {

            title: {
                text: 'Water consumption'
            },

            xAxis: {
                type: 'datetime'
            },

            yAxis: {
                title: {
                    text: null
                }
            },

            tooltip: {
                crosshairs: true,
                shared: true,
                valueSuffix: 'lt'
            },

            legend: {},

            series: [{
                name: 'Water',
                data: averages,
                zIndex: 1,
                marker: {
                    fillColor: 'white',
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[0]
                }
            }, {
                name: 'Range',
                data: ranges,
                type: 'arearange',
                lineWidth: 0,
                linkedTo: ':previous',
                color: Highcharts.getOptions().colors[0],
                fillOpacity: 0.3,
                zIndex: 0
            }]
        });
    }

    $("#slideshow > img:gt(0)").hide();

    setInterval(function() {
        $('#slideshow > img:first')
            .hide()
            .next()
            .fadeIn(1000)
            .end()
            .appendTo('#slideshow');
    }, 8000);

    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                this.style.borderRadius = "5px";
                panel.style.maxHeight = null;
            } else {
                this.style.borderRadius = "5px 5px 0px 0px";
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        }
    }

    var quotes = $(".moto");
    var quoteIndex = -1;

    function showNextQuote() {
        ++quoteIndex;
        quotes.eq(quoteIndex % quotes.length)
            .fadeIn(2000)
            .delay(15000)
            .fadeOut(2000, showNextQuote)
    }

    showNextQuote();
});