var ShowSpeed = 400;
var HideSpeed = 400;

var clickedVG = 0;
var clickedUX = 0;
var clickedRM = 0;
var clickedTut = 0;
var clickedEt = 0;
var clickedCr = 0;

var clickedFilm = 0;
var clickedDes = 0;
var clickedCraft = 0;
var clickedCook = 0;
var clickedCode = 0;
var clickedMisc = 0;

$(document).ready(function () {
    /*JS for article navigation
    Categories:
    VGItem - Videogames
    UXItem - UX
    RMItem - Research Methods
    TutItem - Tutorials
    ETItem - Etymology
    CrItem - Craft
    VGUXItem - Videogames and UX*/

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

            $(".VGItem").show(ShowSpeed);
            $(".UXItem").show(ShowSpeed);
            $(".RMItem").show(ShowSpeed);
            $(".TutItem").show(ShowSpeed);
            $(".EtItem").show(ShowSpeed);
            $(".CrItem").show(ShowSpeed);
            $(".VGUXItem").show(ShowSpeed);

            $(".UXItem").hide(HideSpeed, 'linear');
            $(".RMItem").hide(HideSpeed, 'linear');
            $(".TutItem").hide(HideSpeed, 'linear');
            $(".EtItem").hide(HideSpeed, 'linear');
            $(".CrItem").hide(HideSpeed, 'linear');

            clickedVG = 2;
            return;
        }

        if (clickedVG == 1) {

            $(".VGUXItem").show(ShowSpeed);
            $(".VGItem").show(ShowSpeed);
            $(".UXItem").show(ShowSpeed);
            $(".RMItem").show(ShowSpeed);
            $(".TutItem").show(ShowSpeed);
            $(".EtItem").show(ShowSpeed);
            $(".CrItem").show(ShowSpeed);
            clickedVG = 0;
            $("#VGamesCat").blur();
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

            $(".VGItem").show(ShowSpeed);
            $(".UXItem").show(ShowSpeed);
            $(".RMItem").show(ShowSpeed);
            $(".TutItem").show(ShowSpeed);
            $(".EtItem").show(ShowSpeed);
            $(".CrItem").show(ShowSpeed);
            $(".VGUXItem").show(ShowSpeed);

            $(".VGItem").hide(HideSpeed, 'linear');
            $(".RMItem").hide(HideSpeed, 'linear');
            $(".TutItem").hide(HideSpeed, 'linear');
            $(".EtItem").hide(HideSpeed, 'linear');
            $(".CrItem").hide(HideSpeed, 'linear');

            clickedUX = 2;
            return;
        }

        if (clickedUX == 1) {

            $(".VGUXItem").show(ShowSpeed);
            $(".VGItem").show(ShowSpeed);
            $(".UXItem").show(ShowSpeed);
            $(".RMItem").show(ShowSpeed);
            $(".TutItem").show(ShowSpeed);
            $(".EtItem").show(ShowSpeed);
            $(".CrItem").show(ShowSpeed);
            clickedUX = 0;
            $("#UXCat").blur();
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

            $(".VGItem").show(ShowSpeed);
            $(".UXItem").show(ShowSpeed);
            $(".RMItem").show(ShowSpeed);
            $(".TutItem").show(ShowSpeed);
            $(".EtItem").show(ShowSpeed);
            $(".CrItem").show(ShowSpeed);
            $(".VGUXItem").show(ShowSpeed);

            $(".VGItem").hide(HideSpeed, 'linear');
            $(".VGUXItem").hide(HideSpeed, 'linear');
            $(".TutItem").hide(HideSpeed, 'linear');
            $(".EtItem").hide(HideSpeed, 'linear');
            $(".CrItem").hide(HideSpeed, 'linear');

            clickedRM = 2;
            return;
        }

        if (clickedRM == 1) {

            $(".VGUXItem").show(ShowSpeed);
            $(".VGItem").show(ShowSpeed);
            $(".UXItem").show(ShowSpeed);
            $(".RMItem").show(ShowSpeed);
            $(".TutItem").show(ShowSpeed);
            $(".EtItem").show(ShowSpeed);
            $(".CrItem").show(ShowSpeed);
            clickedRM = 0;
            $("#RMCat").blur();
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

            $(".VGItem").show(ShowSpeed);
            $(".UXItem").show(ShowSpeed);
            $(".RMItem").show(ShowSpeed);
            $(".TutItem").show(ShowSpeed);
            $(".EtItem").show(ShowSpeed);
            $(".CrItem").show(ShowSpeed);
            $(".VGUXItem").show(ShowSpeed);

            $(".VGItem").hide(HideSpeed, 'linear');
            $(".VGUXItem").hide(HideSpeed, 'linear');
            $(".RMItem").hide(HideSpeed, 'linear');
            $(".EtItem").hide(HideSpeed, 'linear');
            $(".CrItem").hide(HideSpeed, 'linear');

            clickedTut = 2;
            return;
        }

        if (clickedTut == 1) {

            $(".VGUXItem").show(ShowSpeed);
            $(".VGItem").show(ShowSpeed);
            $(".UXItem").show(ShowSpeed);
            $(".RMItem").show(ShowSpeed);
            $(".TutItem").show(ShowSpeed);
            $(".EtItem").show(ShowSpeed);
            $(".CrItem").show(ShowSpeed);
            clickedTut = 0;
            $("#TutCat").blur();
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

            $(".VGItem").show(ShowSpeed);
            $(".UXItem").show(ShowSpeed);
            $(".RMItem").show(ShowSpeed);
            $(".TutItem").show(ShowSpeed);
            $(".EtItem").show(ShowSpeed);
            $(".CrItem").show(ShowSpeed);
            $(".VGUXItem").show(ShowSpeed);

            $(".VGItem").hide(HideSpeed, 'linear');
            $(".VGUXItem").hide(HideSpeed, 'linear');
            $(".RMItem").hide(HideSpeed, 'linear');
            $(".TutItem").hide(HideSpeed, 'linear');
            $(".CrItem").hide(HideSpeed, 'linear');

            clickedEt = 2;
            return;
        }

        if (clickedEt == 1) {

            $(".VGUXItem").show(ShowSpeed);
            $(".VGItem").show(ShowSpeed);
            $(".UXItem").show(ShowSpeed);
            $(".RMItem").show(ShowSpeed);
            $(".TutItem").show(ShowSpeed);
            $(".EtItem").show(ShowSpeed);
            $(".CrItem").show(ShowSpeed);
            clickedEt = 0;
            $("#EtCat").blur();
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

            $(".VGItem").show(ShowSpeed);
            $(".UXItem").show(ShowSpeed);
            $(".RMItem").show(ShowSpeed);
            $(".TutItem").show(ShowSpeed);
            $(".EtItem").show(ShowSpeed);
            $(".CrItem").show(ShowSpeed);
            $(".VGUXItem").show(ShowSpeed);

            $(".VGItem").hide(HideSpeed, 'linear');
            $(".VGUXItem").hide(HideSpeed, 'linear');
            $(".RMItem").hide(HideSpeed, 'linear');
            $(".TutItem").hide(HideSpeed, 'linear');
            $(".EtItem").hide(HideSpeed, 'linear');

            clickedCr = 2;
            return;
        }

        if (clickedCr == 1) {

            $(".VGUXItem").show(ShowSpeed);
            $(".VGItem").show(ShowSpeed);
            $(".UXItem").show(ShowSpeed);
            $(".RMItem").show(ShowSpeed);
            $(".TutItem").show(ShowSpeed);
            $(".EtItem").show(ShowSpeed);
            $(".CrItem").show(ShowSpeed);
            clickedCr = 0;
            $("#CrCat").blur();
            return;
        }

    })



    /*JS for portfolio navigation
    Categories:
    FilmItem - Film
    DesItem - Craft Design
    CraftItem - General Craft
    CookItem - Cooking
    CodeItem - Coding
    MiscItem - Misc.
    DesCraftItem - Design and Craft*/

    $("#FilmCat").click(function () {

        var clickedDes = 0;
        var clickedCraft = 0;
        var clickedCook = 0;
        var clickedCode = 0;
        var clickedMisc = 0;

        if (clickedFilm == 2) {
            clickedFilm = 1;
        }

        if (clickedFilm == 0) {

            $(".FilmItem").show(ShowSpeed);
            $(".DesItem").show(ShowSpeed);
            $(".CraftItem").show(ShowSpeed);
            $(".CookItem").show(ShowSpeed);
            $(".CodeItem").show(ShowSpeed);
            $(".MiscItem").show(ShowSpeed);
            $(".DesCraftItem").show(ShowSpeed);

            $(".DesItem").hide(HideSpeed, 'linear');
            $(".CraftItem").hide(HideSpeed, 'linear');
            $(".CookItem").hide(HideSpeed, 'linear');
            $(".CodeItem").hide(HideSpeed, 'linear');
            $(".MiscItem").hide(HideSpeed, 'linear');
            $(".DesCraftItem").hide(HideSpeed, 'linear');

            clickedFilm = 2;
            return;
        }

        if (clickedFilm == 1) {

            $(".DesCraftItem").show(ShowSpeed);
            $(".FilmItem").show(ShowSpeed);
            $(".DesItem").show(ShowSpeed);
            $(".CraftItem").show(ShowSpeed);
            $(".CookItem").show(ShowSpeed);
            $(".CodeItem").show(ShowSpeed);
            $(".MiscItem").show(ShowSpeed);
            clickedFilm = 0;
            $("#FilmCat").blur();
            return;
        }
    })

    $("#DesCat").click(function () {

        var clickedFilm = 0;
        var clickedCraft = 0;
        var clickedCook = 0;
        var clickedCode = 0;
        var clickedMisc = 0;

        if (clickedDes == 2) {
            clickedDes = 1;
        }

        if (clickedDes == 0) {

            $(".FilmItem").show(ShowSpeed);
            $(".DesItem").show(ShowSpeed);
            $(".CraftItem").show(ShowSpeed);
            $(".CookItem").show(ShowSpeed);
            $(".CodeItem").show(ShowSpeed);
            $(".MiscItem").show(ShowSpeed);
            $(".DesCraftItem").show(ShowSpeed);

            $(".FilmItem").hide(HideSpeed, 'linear');
            $(".CraftItem").hide(HideSpeed, 'linear');
            $(".CookItem").hide(HideSpeed, 'linear');
            $(".CodeItem").hide(HideSpeed, 'linear');
            $(".MiscItem").hide(HideSpeed, 'linear');

            clickedDes = 2;
            return;
        }

        if (clickedDes == 1) {

            $(".DesCraftItem").show(ShowSpeed);
            $(".FilmItem").show(ShowSpeed);
            $(".DesItem").show(ShowSpeed);
            $(".CraftItem").show(ShowSpeed);
            $(".CookItem").show(ShowSpeed);
            $(".CodeItem").show(ShowSpeed);
            $(".MiscItem").show(ShowSpeed);
            clickedDes = 0;
            $("#DesCat").blur();
            return;
        }

    })

    $("#CraftCat").click(function () {

        var clickedFilm = 0;
        var clickedDes = 0;
        var clickedCook = 0;
        var clickedCode = 0;
        var clickedMisc = 0;

        if (clickedCraft == 2) {
            clickedCraft = 1;
        }

        if (clickedCraft == 0) {

            $(".FilmItem").show(ShowSpeed);
            $(".DesItem").show(ShowSpeed);
            $(".CraftItem").show(ShowSpeed);
            $(".CookItem").show(ShowSpeed);
            $(".CodeItem").show(ShowSpeed);
            $(".MiscItem").show(ShowSpeed);
            $(".DesCraftItem").show(ShowSpeed);

            $(".FilmItem").hide(HideSpeed, 'linear');
            $(".DesItem").hide(HideSpeed, 'linear');
            $(".CookItem").hide(HideSpeed, 'linear');
            $(".CodeItem").hide(HideSpeed, 'linear');
            $(".MiscItem").hide(HideSpeed, 'linear');

            clickedCraft = 2;
            return;
        }

        if (clickedCraft == 1) {

            $(".DesCraftItem").show(ShowSpeed);
            $(".FilmItem").show(ShowSpeed);
            $(".DesItem").show(ShowSpeed);
            $(".CraftItem").show(ShowSpeed);
            $(".CookItem").show(ShowSpeed);
            $(".CodeItem").show(ShowSpeed);
            $(".MiscItem").show(ShowSpeed);
            clickedCraft = 0;
            $("#CraftCat").blur();
            return;
        }

    })

    $("#CookCat").click(function () {

        var clickedFilm = 0;
        var clickedDes = 0;
        var clickedCraft = 0;
        var clickedCode = 0;
        var clickedMisc = 0;

        if (clickedCook == 2) {
            clickedCook = 1;
        }

        if (clickedCook == 0) {

            $(".FilmItem").show(ShowSpeed);
            $(".DesItem").show(ShowSpeed);
            $(".CraftItem").show(ShowSpeed);
            $(".CookItem").show(ShowSpeed);
            $(".CodeItem").show(ShowSpeed);
            $(".MiscItem").show(ShowSpeed);
            $(".DesCraftItem").show(ShowSpeed);

            $(".FilmItem").hide(HideSpeed, 'linear');
            $(".DesCraftItem").hide(HideSpeed, 'linear');
            $(".DesItem").hide(HideSpeed, 'linear');
            $(".CraftItem").hide(HideSpeed, 'linear');
            $(".CodeItem").hide(HideSpeed, 'linear');
            $(".MiscItem").hide(HideSpeed, 'linear');

            clickedCook = 2;
            return;
        }

        if (clickedCook == 1) {

            $(".DesCraftItem").show(ShowSpeed);
            $(".FilmItem").show(ShowSpeed);
            $(".DesItem").show(ShowSpeed);
            $(".CraftItem").show(ShowSpeed);
            $(".CookItem").show(ShowSpeed);
            $(".CodeItem").show(ShowSpeed);
            $(".MiscItem").show(ShowSpeed);
            clickedCook = 0;
            $("#CookCat").blur();
            return;
        }

    })

    $("#CodeCat").click(function () {

        var clickedFilm = 0;
        var clickedDes = 0;
        var clickedCraft = 0;
        var clickedCook = 0;
        var clickedMisc = 0;

        if (clickedCode == 2) {
            clickedCode = 1;
        }

        if (clickedCode == 0) {

            $(".FilmItem").show(ShowSpeed);
            $(".DesItem").show(ShowSpeed);
            $(".CraftItem").show(ShowSpeed);
            $(".CookItem").show(ShowSpeed);
            $(".CodeItem").show(ShowSpeed);
            $(".MiscItem").show(ShowSpeed);
            $(".DesCraftItem").show(ShowSpeed);

            $(".FilmItem").hide(HideSpeed, 'linear');
            $(".DesCraftItem").hide(HideSpeed, 'linear');
            $(".DesItem").hide(HideSpeed, 'linear');
            $(".CraftItem").hide(HideSpeed, 'linear');
            $(".CookItem").hide(HideSpeed, 'linear');
            $(".MiscItem").hide(HideSpeed, 'linear');

            clickedCode = 2;
            return;
        }

        if (clickedCode == 1) {

            $(".DesCraftItem").show(ShowSpeed);
            $(".FilmItem").show(ShowSpeed);
            $(".DesItem").show(ShowSpeed);
            $(".CraftItem").show(ShowSpeed);
            $(".CookItem").show(ShowSpeed);
            $(".CodeItem").show(ShowSpeed);
            $(".MiscItem").show(ShowSpeed);
            clickedCode = 0;
            $("#CodeCat").blur();
            return;
        }


    })

    $("#MiscCat").click(function () {

        var clickedFilm = 0;
        var clickedDes = 0;
        var clickedCraft = 0;
        var clickedCook = 0;
        var clickedCode = 0;

        if (clickedMisc == 2) {
            clickedMisc = 1;
        }

        if (clickedMisc == 0) {

            $(".FilmItem").show(ShowSpeed);
            $(".DesItem").show(ShowSpeed);
            $(".CraftItem").show(ShowSpeed);
            $(".CookItem").show(ShowSpeed);
            $(".CodeItem").show(ShowSpeed);
            $(".MiscItem").show(ShowSpeed);
            $(".DesCraftItem").show(ShowSpeed);

            $(".FilmItem").hide(HideSpeed, 'linear');
            $(".DesCraftItem").hide(HideSpeed, 'linear');
            $(".DesItem").hide(HideSpeed, 'linear');
            $(".CraftItem").hide(HideSpeed, 'linear');
            $(".CookItem").hide(HideSpeed, 'linear');
            $(".CodeItem").hide(HideSpeed, 'linear');

            clickedMisc = 2;
            return;
        }

        if (clickedMisc == 1) {

            $(".DesCraftItem").show(ShowSpeed);
            $(".FilmItem").show(ShowSpeed);
            $(".DesItem").show(ShowSpeed);
            $(".CraftItem").show(ShowSpeed);
            $(".CookItem").show(ShowSpeed);
            $(".CodeItem").show(ShowSpeed);
            $(".MiscItem").show(ShowSpeed);
            clickedMisc = 0;
            $("#MiscCat").blur();
            return;
        }

    })

})
