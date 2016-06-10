/**
 * stop scrolling
 */
function banTouchMove(page){
    page.bind('touchmove', function (event) {
        event.preventDefault();
    }, false);
}