document.getElementById('next').onclick = function () {
    const widthItem = document.querySelector('.div__item').offsetWidth;
    document.getElementById('section__list').scrollLeft += widthItem;
}
document.getElementById('prev').onclick = function () {
    const widthItem = document.querySelector('.div__item').offsetWidth;
    document.getElementById('section__list').scrollLeft -= widthItem;
}
