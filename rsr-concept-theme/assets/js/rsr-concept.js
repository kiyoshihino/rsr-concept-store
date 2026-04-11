/**
 * RSR Concept Store - Main JS
 * Side Cart, Scroll Reveal & AJAX updates
 */

jQuery(document).ready(function($) {
    
    // --- SIDE CART LOGIC ---
    
    const $drawer = $('.rsr-side-cart-drawer');
    const $overlay = $('.rsr-side-cart-overlay');
    const $cartBtn = $('.Header_cartButton'); // Nosso botão no header

    function openCart() {
        $drawer.addClass('active');
        $overlay.addClass('active');
        $('body').css('overflow', 'hidden');
    }

    function closeCart() {
        $drawer.removeClass('active');
        $overlay.removeClass('active');
        $('body').css('overflow', '');
    }

    // Escutas
    $cartBtn.on('click', function(e) {
        e.preventDefault();
        openCart();
    });

    $('#rsr-cart-close, .rsr-side-cart-overlay').on('click', closeCart);

    // Abrir automaticamente ao adicionar item (WooCommerce Trigger)
    $(document.body).on('added_to_cart', function() {
        openCart();
    });

    // --- SCROLL REVEAL LOGIC ---
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('revealed');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15
    });

    $('[data-reveal]').each(function() {
        revealObserver.observe(this);
    });

    // --- SMOOTH SCROLL ---
    $('a[href^="#"]').on('click', function(e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 100
            }, 800);
        }
    });

});
