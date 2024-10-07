import { Autoplay } from "swiper";
import mixitup from 'mixitup';

$(function () {

    $('.header__btn').on('click', function () {
        $('.rightside-menu').removeClass('rightside-menu--close');
    });
    $('.rightside-menu__close').on('click', function () {
        $('.rightside-menu').addClass('rightside-menu--close');
    });

    $('.top__slider').slick({
        dots: true,
        arrows: false,
        fade: true,
        autoplay: true,
        autoplaySpeed: 1000
    });

    var mixer = mixitup('.gallery__inner');
    var mixer = mixitup('.gallery__page', {
        load: {
            filter: '.living'
        }
    });
})