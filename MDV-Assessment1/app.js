$(document).ready(function() {
    var loader = {
        show: function() {
            $.mobile.loading('show');
            $('#content').hide();
        },
        hide: function() {
            $.mobile.loading('hide');
            $('#content').show();
        }
    };
    // Add loader widget until json loaded and content created
    loader.show();

    // Requesting data. Most of logic declaration is happening after successfull response.
    $.getJSON('response.json')
        .done(function(data) {
            var packages = data,
                pageContent = '',
                packagesList = $('#packages-list'),
                slides = '',
                slideshow = $('.slideshow-container'),
                slideIndex = 1,
                plusSlides = function(n) {
                    showSlides(slideIndex += n);
                },
                nextSlide = function() {
                    plusSlides(1);
                },
                timer = setInterval(nextSlide, 10000),
                showSlides = function(n) {
                    var slides = document.getElementsByClassName("mySlides");
                    if (n > slides.length) { slideIndex = 1 }
                    if (n < 1) { slideIndex = slides.length }
                    for (var i = 0; i < slides.length; i++) {
                        slides[i].style.display = "none";
                    }
                    slides[slideIndex - 1].style.display = "block";
                },
                sortObject = function(obj) {
                    return Object.keys(obj).sort().reduce(function(result, key) {
                        result[key] = obj[key];
                        return result;
                    }, {});
                },
                sortArray = function(arr) {
                    return arr.sort(function(a, b) {
                        return (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1;
                    });
                },
                pageCreation = function(city) {
                    slides += '<li><a data-transition="slide" href="#' + city.name + '">' + city.name + '</a></li>';
                    slideshow.append('<div class="mySlides"><a data-transition="slide" href="#' + city.name + '"><img src="assets/' + city.images[0] + '" style="width:100%"></a><div class="text">Travel to ' + city.name + ' from only ' + city.price + '€pp</div>')
                    pageContent += '<div data-role="page" id=' + city.name + '>' +
                        '<div data-role="header">' +
                        '<h1>' + city.name + '</h1><a href="#" data-transition="slide" data-direction="reverse" data-rel="back" class="ui-btn ui-icon-back ui-btn-icon-left">Back</a>' +
                        '</div>' +
                        '<div role="main" class="ui-content">' +
                        '<img class="center-image" src="assets/' + city.images[0] + '">' +
                        '<div class="center-image"><ul class="no-bullets">' +
                        '<li><b>Airline</b> - ' + city.airline + '</li>' +
                        '<li><b>Hotel</b> - ' + city.hotelName + '</li>' +
                        '<li><b>Departure</b> - ' + city.departure + '</li>' +
                        '<li><b>Duration</b> - ' + city.nights + ' nights</li>' +
                        '<li><b>Price</b> - ' + city.price + '€pp</li></ul>' +
                        '<p>' + city.desc + '</p>' +
                        '<a data-transition="slide" href="#booking" class="ui-btn">Book</a>' +
                        '</div></div>' +
                        '<div data-role="footer" data-position="fixed">' +
                        '<h4>Digital Skills Travel 2017</h4>' +
                        '</div>' +
                        '</div>';
                };

            for (var key in packages) {
                if (packages.hasOwnProperty(key)) {
                    // Add continents to listview
                    packagesList
                        .append('<li data-corners="false" id="' + key + '"></li>')
                        .listview()
                        .listview('refresh');

                    // Sort by country
                    packages[key] = sortObject(packages[key]);

                    for (var keyCountry in packages[key]) {
                        if (packages[key].hasOwnProperty(keyCountry)) {
                            $('#' + key).append('<div data-role="collapsible"><h2><img class="flag" src="assets/flags/' + keyCountry + '.png">' + keyCountry +
                                '</h2><ul  data-role="listview" data-shadow="false" data-inset="true" id="' + keyCountry +
                                '"></ul></div>').collapsibleset().trigger('create');

                            // Sort cities subcollection    
                            packages[key][keyCountry] = sortArray(packages[key][keyCountry]);

                            // Create jqm pages and slides
                            packages[key][keyCountry].forEach(pageCreation);
                        }
                        // Add slides
                        $('#' + keyCountry)
                            .append(slides)
                            .listview()
                            .listview('refresh');
                        slides = '';
                    }
                }
            }

            // Add content to DOM
            $('body').append(pageContent);

            // Custom text for autodividers
            packagesList.listview({
                autodividers: true,
                autodividersSelector: function(li) {
                    return li.attr('id');
                }
            }).listview("refresh");

            // Init slideshow
            showSlides(slideIndex);

            // Slideshow click handlers
            $('.prev').on('click', function() {
                plusSlides(-1);
                clearInterval(timer);
                timer = setInterval(nextSlide, 10000);
            });

            $('.next').on('click', function() {
                plusSlides(1);
                clearInterval(timer);
                timer = setInterval(nextSlide, 10000);
            });

            // Remove loader and show content
            loader.hide();
        })
        .fail(function(err) {
            // Remove loader and show content
            loader.hide();
            $('.content-primary').html('<h2>Connection error. ' + err.responseText + ' Please try again later!</h2>')
        });

});