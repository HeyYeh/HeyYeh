var clickedVG = 0;
var clickedUX = 0;
var clickedRM = 0;
var clickedTut = 0;
var clickedEt = 0;
var clickedCr = 0;

$(document).ready(function () {
    $("#VGamesCat").click(function () {

        var clickedUX = 0;
        var clickedRM = 0;
        var clickedTut = 0;
        var clickedEt = 0;
        var clickedCr = 0;

        if (clickedVG == 2) {
            clickedVG = 1;
        }

        if (clickedVG == 0) {

            $(".VGItem").show('slow');
            $(".UXItem").show('slow');
            $(".RMItem").show('slow');
            $(".TutItem").show('slow');
            $(".EtItem").show('slow');
            $(".CrItem").show('slow');
            $(".VGUXItem").show('slow');

            $(".UXItem").hide(500, 'linear');
            $(".RMItem").hide(500, 'linear');
            $(".TutItem").hide(500, 'linear');
            $(".EtItem").hide(500, 'linear');
            $(".CrItem").hide(500, 'linear');

            clickedVG = 2;
            return;
        }

        if (clickedVG == 1) {

            $(".VGUXItem").show('slow');
            $(".VGItem").show('slow');
            $(".UXItem").show('slow');
            $(".RMItem").show('slow');
            $(".TutItem").show('slow');
            $(".EtItem").show('slow');
            $(".CrItem").show('slow');
            clickedVG = 0;
            return;
        }
    })

    $("#UXCat").click(function () {
        
        var clickedVG = 0;
        var clickedRM = 0;
        var clickedTut = 0;
        var clickedEt = 0;
        var clickedCr = 0;

        if (clickedUX == 2) {
            clickedUX = 1;
        }

        if (clickedUX == 0) {

            $(".VGItem").show('slow');
            $(".UXItem").show('slow');
            $(".RMItem").show('slow');
            $(".TutItem").show('slow');
            $(".EtItem").show('slow');
            $(".CrItem").show('slow');
            $(".VGUXItem").show('slow');

            $(".VGItem").hide(500, 'linear');
            $(".RMItem").hide(500, 'linear');
            $(".TutItem").hide(500, 'linear');
            $(".EtItem").hide(500, 'linear');
            $(".CrItem").hide(500, 'linear');

            clickedUX = 2;
            return;
        }

        if (clickedUX == 1) {

            $(".VGUXItem").show('slow');
            $(".VGItem").show('slow');
            $(".UXItem").show('slow');
            $(".RMItem").show('slow');
            $(".TutItem").show('slow');
            $(".EtItem").show('slow');
            $(".CrItem").show('slow');
            clickedUX = 0;
            return;
        }

    })

    $("#RMCat").click(function () {
        
        var clickedVG = 0;
        var clickedUX = 0;
        var clickedTut = 0;
        var clickedEt = 0;
        var clickedCr = 0;

        if (clickedRM == 2) {
            clickedRM = 1;
        }

        if (clickedRM == 0) {

            $(".VGItem").show('slow');
            $(".UXItem").show('slow');
            $(".RMItem").show('slow');
            $(".TutItem").show('slow');
            $(".EtItem").show('slow');
            $(".CrItem").show('slow');
            $(".VGUXItem").show('slow');

            $(".VGItem").hide(500, 'linear');
            $(".VGUXItem").hide(500, 'linear');
            $(".TutItem").hide(500, 'linear');
            $(".EtItem").hide(500, 'linear');
            $(".CrItem").hide(500, 'linear');

            clickedRM = 2;
            return;
        }

        if (clickedRM == 1) {

            $(".VGUXItem").show('slow');
            $(".VGItem").show('slow');
            $(".UXItem").show('slow');
            $(".RMItem").show('slow');
            $(".TutItem").show('slow');
            $(".EtItem").show('slow');
            $(".CrItem").show('slow');
            clickedRM = 0;
            return;
        }

    })

    $("#TutCat").click(function () {
        
        var clickedVG = 0;
        var clickedUX = 0;
        var clickedRM = 0;
        var clickedEt = 0;
        var clickedCr = 0;

        if (clickedTut == 2) {
            clickedTut = 1;
        }

        if (clickedTut == 0) {

            $(".VGItem").show('slow');
            $(".UXItem").show('slow');
            $(".RMItem").show('slow');
            $(".TutItem").show('slow');
            $(".EtItem").show('slow');
            $(".CrItem").show('slow');
            $(".VGUXItem").show('slow');

            $(".VGItem").hide(500, 'linear');
            $(".VGUXItem").hide(500, 'linear');
            $(".RMItem").hide(500, 'linear');
            $(".EtItem").hide(500, 'linear');
            $(".CrItem").hide(500, 'linear');

            clickedTut = 2;
            return;
        }

        if (clickedTut == 1) {

            $(".VGUXItem").show('slow');
            $(".VGItem").show('slow');
            $(".UXItem").show('slow');
            $(".RMItem").show('slow');
            $(".TutItem").show('slow');
            $(".EtItem").show('slow');
            $(".CrItem").show('slow');
            clickedTut = 0;
            return;
        }

    })

    $("#EtCat").click(function () {
        
        var clickedVG = 0;
        var clickedUX = 0;
        var clickedRM = 0;
        var clickedTut = 0;
        var clickedCr = 0;

        if (clickedEt == 2) {
            clickedEt = 1;
        }

        if (clickedEt == 0) {

            $(".VGItem").show('slow');
            $(".UXItem").show('slow');
            $(".RMItem").show('slow');
            $(".TutItem").show('slow');
            $(".EtItem").show('slow');
            $(".CrItem").show('slow');
            $(".VGUXItem").show('slow');

            $(".VGItem").hide(500, 'linear');
            $(".VGUXItem").hide(500, 'linear');
            $(".RMItem").hide(500, 'linear');
            $(".TutItem").hide(500, 'linear');
            $(".CrItem").hide(500, 'linear');

            clickedEt = 2;
            return;
        }

        if (clickedEt == 1) {

            $(".VGUXItem").show('slow');
            $(".VGItem").show('slow');
            $(".UXItem").show('slow');
            $(".RMItem").show('slow');
            $(".TutItem").show('slow');
            $(".EtItem").show('slow');
            $(".CrItem").show('slow');
            clickedEt = 0;
            return;
        }


    })

    $("#CrCat").click(function () {
        
        var clickedVG = 0;
        var clickedUX = 0;
        var clickedRM = 0;
        var clickedTut = 0;
        var clickedEt = 0;

        if (clickedCr == 2) {
            clickedCr = 1;
        }

        if (clickedCr == 0) {

            $(".VGItem").show('slow');
            $(".UXItem").show('slow');
            $(".RMItem").show('slow');
            $(".TutItem").show('slow');
            $(".EtItem").show('slow');
            $(".CrItem").show('slow');
            $(".VGUXItem").show('slow');

            $(".VGItem").hide(500, 'linear');
            $(".VGUXItem").hide(500, 'linear');
            $(".RMItem").hide(500, 'linear');
            $(".TutItem").hide(500, 'linear');
            $(".EtItem").hide(500, 'linear');

            clickedCr = 2;
            return;
        }

        if (clickedCr == 1) {

            $(".VGUXItem").show('slow');
            $(".VGItem").show('slow');
            $(".UXItem").show('slow');
            $(".RMItem").show('slow');
            $(".TutItem").show('slow');
            $(".EtItem").show('slow');
            $(".CrItem").show('slow');
            clickedCr = 0;
            return;
        }

    })
})
