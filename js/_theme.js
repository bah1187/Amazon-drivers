/* =========================================================================
global variables
========================================================================== */
//watchers for major breakpoint changes - move from small screen to large screen layout/styles
//these match up to
(function () {
    var mq = {
        end: window.matchMedia("(max-width: 799px)")
    };

    //container ID/class names called by specific functions
    var selectors = {
        searchForm: '.search-form',
        advancedSearchForm: '.advanced-search-form',
        pageWrap: '#page',
        socialShare: '.social-share',
        socialShareMore: '.share-more',
        getStarted: '#btn-getStarted'
    };
    var noCount = 0;

    //
    // Debounce
    // orginally from https://davidwalsh.name/javascript-debounce-function
    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.

    function debounce(func, wait, immediate) {
    	var timeout;
    	return function() {
    		var context = this, args = arguments;
    		var later = function() {
    			timeout = null;
    			if (!immediate) func.apply(context, args);
    		};
    		var callNow = immediate && !timeout;
    		clearTimeout(timeout);
    		timeout = setTimeout(later, wait);
    		if (callNow) func.apply(context, args);
    	};
    };

    /* =========================================================================
    search form panel
    ========================================================================== */
    //make search form expandable only on small screens
    function searchFormExpandable() {
        if (mq.end.matches) {
            $(selectors.searchForm).expandable('revive');
            $(selectors.advancedSearchForm).expandable('revive');
        }
        else {
            $(selectors.searchForm).expandable('kill');
            $(selectors.searchForm).children('div').removeAttr('style');
            $(selectors.advancedSearchForm).expandable('kill');
            $(selectors.advancedSearchForm).children('div').removeAttr('style');
        }
        return;
    }
    searchFormExpandable();
    mq.end.addListener(searchFormExpandable);

    /* =========================================================================
    slideout filters for search results on small screens
    ========================================================================= */
    if ($('#search-results').length === 1) window.APP.MODELS.FilterSlideOut.create({
        breakpoint: 800,
        animationSpeed: 200,
        pageWrapId: 'page',
        filterType: 'search',
        openToggle: 'Filter',
        closeToggle: 'Close'
    });

    /* =========================================================================
    social share open/close toggle
    ========================================================================== */
    $(selectors.socialShare)
        .on('click', selectors.socialShareMore, function () {
            var parent = $(this).parents(selectors.socialShare);
            parent.toggleClass('share-open');
            parent.find('.more-link:first').attr('tabindex', '-1').focus();
            var moreText = $(this).attr('data-more-text');
            var lessText = $(this).attr('data-less-text');
            //on large screens, move the second list items into the first list, instead of sliding the list down
            if (parent.hasClass('share-open')) {
                $(this).text(lessText);
            }
            else {
                $(this).text(moreText);
            }
            return;
    });


    $(selectors.getStarted).on('click', getStarted);

    function getStarted() {
        window.location.href = "/#form";
        $('body,html').scrollTop(0);
        window.location.reload();

        //$(".data-form").fadeIn(500);
        // $(".data-form .form-instructions").fadeIn(500);
        // $(".data-form p:nth-of-type(2).form-field").fadeIn(500);
    }

    // $('input[type="text"]').keyup(debounce(function(e){
    //     if (e.keyCode !== 9) {
    //         console.log(e);
    //         $(this).closest(".form-field").next().fadeIn(500);
    //     }
    // },300));

     $('input[type="radio"]').change(debounce(function(e){
         if ($(this).is(':checked') && $(this).val() === "No") {
             noCount++;
         }
         if ($(this).closest(".form-field").next().find("legend").text() === "Result") {
                 if (noCount > 0) {
                     $(this).closest(".form-field").next().find('input[value="Rejected"]').prop('checked', true);
                 }
                 else if (noCount === 0) {
                     $(this).closest(".form-field").next().find('input[value="Passed"]').prop('checked', true);
                 }
                 $(this).closest(".form-field").siblings(".submit").fadeIn(500);
             }
             else {
                 $(this).closest(".form-field").next().fadeIn(500);
             }

         },300));



$.extend($.expr[":"], {
        containsExact: $.expr.createPseudo ?
         $.expr.createPseudo(function (text) {
             return function (elem) {
                 return $.trim(elem.innerHTML.toLowerCase()) === text.toLowerCase();
             };
         }) :
         // support: jQuery <1.8
         function (elem, i, match) {
             return $.trim(elem.innerHTML.toLowerCase()) === match[3].toLowerCase();
         }
    });

    var locMap = [
              ['Arizona','Chandler'],
    ['California','Chino'],
    ['California','Irvine'],
    ['California','National City'],
    ['California','Sacramento'],
    ['California','Pasadena'],
    ['California','Stockton'],
    ['California','Riverside'],
    ['California','San Jose'],
    ['California','San Diego'],
    ['California','Richmond, CA'],
    ['California','San Leandro'],
    ['California','San Francisco'],
    ['Colorado','Aurora'],
    ['Colorado','Centennial'],
    ['Colorado','Colorado Springs'],
    ['Florida','Orlando'],
    ['Florida','Davenport'],
    ['Florida','Palmetto'],
    ['Florida','Gainesville'],
    ['Florida','Miami'],
    ['Florida','Tampa'],
    ['Florida','St. Petersburg'],
    ['Georgia','Lawrenceville'],
    ['Georgia','Savannah'],
    ['Idaho','Boise'],
    ['Illinois','Champaign'],
    ['Illinois','Chicago'],
    ['Illinois','Elgin'],
    ['Illinois','Lake Bluff'],
    ['Indiana','Indianapolis'],
    ['Kansas','Kansas City'],
    ['Kentucky','Lexington'],
    ['Kentucky','Louisville'],
    ['Louisiana','Baton Rouge'],
    ['Louisiana','New Orleans'],
    ['Maine','Portland, ME'],
    ['Massachusetts','Boston'],
    ['Michigan','Grand Rapids'],
    ['Michigan','Romulus '],
    ['Minnesota','Minneapolis'],
    ['Missouri','Hazelwood'],
    ['Nebraska','Omaha'],
    ['New Hampshire','Nashua'],
    ['New Jersey','Bellmawr'],
    ['New York','Bethpage'],
    ['New York','Manhattan'],
    ['North Carolina','Charlotte'],
    ['Ohio','Cincinnati'],
    ['Ohio','Euclid'],
    ['Oklahoma','Oklahoma City'],
    ['Oregon','Portland, OR'],
    ['Pennsylvania','King of Prussia'],
    ['Pennsylvania','Langhorne'],
    ['Tennessee','Knoxville'],
    ['Tennessee','Memphis'],
    ['Texas','Dallas'],
    ['Texas','Garland'],
    ['Texas','Austin'],
    ['Texas','Houston'],
    ['Utah','Salt Lake City'],
    ['Utah','West Valley City'],
    ['Virginia','Arlington'],
    ['Virginia','Chesapeake'],
    ['Virginia','Richmond, VA'],
    ['Washington','Everett, WA'],
    ['Washington','Renton'],
    ['Washington','Seattle'],
    ['Washington','Sumner'],
    ['Wisconsin','Milwaukee'],
    ];

        $(document).ready(function () {


            var $stateCtrl = $(".data-form label:containsExact('State')").next();
            var $cityCtrl = $(".data-form label:containsExact('City')").next();

             $stateCtrl.empty();
             $stateCtrl.append('<option value="">--Select--</option>');
             $cityCtrl.empty();
             $cityCtrl.append('<option value="">--Select--</option>');


            $.each(locMap, function (i, item) {
                var state = item[0];

                if ($stateCtrl.find("option[value='" + state + "']").length == 0)
                {
                    $stateCtrl.append('<option value="' + state + '">' + state + '</option>');
                }
            });

           sortSelect($stateCtrl, 'text', 'asc');

            $stateCtrl.change(function () {


                $cityCtrl.empty();
                $cityCtrl.append('<option value="">-Select from list-</option>');

                var sState = $stateCtrl.val();

                var city = "";


                //$cityCtrl.append('<option value="All">All</option>');

                $.each(locMap, function (i, item) {

                    var state = item[0];

                    if (sState == state) {
                        city = item[1];
                        $cityCtrl.append('<option value="' + city.replace(",","") + '">' + city.split(',')[0] + '</option>');
                    }
                });


                $cityCtrl.val($cityCtrl.find("option:first").val());
                sortSelect($cityCtrl, 'text', 'asc');
            });

            $('.data-form select').change(function () {
                $(this).closest(".form-field").next().fadeIn(500);
            });
        });



})();

 function validateQA()
{

    if ($('.data-form').valid())
    {

        var twentyOneOld = $(".data-form legend:containsExact('I am at least 21 years old')").parent().find('input[type=radio]:checked').val();
        var liftLBS = $(".data-form legend:containsExact('I can repeatedly lift up to 50 lbs with or without reasonable accommodation')").parent().find('input[type=radio]:checked').val();
        var driverLicense = $(".data-form legend:contains('driver')").parent().find('input[type=radio]:checked').val();
        var drugTest = $(".data-form legend:containsExact('I acknowledge that I will need to consent to a drug test')").parent().find('input[type=radio]:checked').val();



        if (twentyOneOld == "Yes" && liftLBS == "Yes" && driverLicense == "Yes" && drugTest == "Yes")
        {
            console.log("true");
            setTimeout(function(){ location.href = "/accepted"; }, 500);

        }
        else {
            console.log("false");
             setTimeout(function(){ location.href = "/rejected"; }, 500);
        }

    }

    return true;
}


$('.getstarted_bottom').click(function(){
    window.location.href = "/#form";
    $('body,html').scrollTop(0);
    window.location.reload();
});


if(window.location.hash === "#form") {
    $(".data-form").fadeIn(500);
}

var sortSelect = function (select, attr, order) {
    if(attr === 'text'){
        if(order === 'asc'){
            $(select).html($(select).children('option').sort(function (x, y) {
                return $(x).text().toUpperCase() < $(y).text().toUpperCase() ? -1 : 1;
            }));
            $(select).get(0).selectedIndex = 0;

        }// end asc
        if(order === 'desc'){
            $(select).html($(select).children('option').sort(function (y, x) {
                return $(x).text().toUpperCase() < $(y).text().toUpperCase() ? -1 : 1;
            }));
            $(select).get(0).selectedIndex = 0;

        }// end desc
    }

};
