/**
 * RSR Concept Store - Main JS
 * Side Cart, Scroll Reveal & AJAX updates
 */

jQuery(document).ready(function($) {
    

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

    // --- SABBATH MODE LOGIC ---
    
    function showSabbathModal() {
        $('#rsr-sabbath-modal').addClass('rsr-active');
        $('body').css('overflow', 'hidden'); // Prevent scroll
    }

    function hideSabbathModal() {
        $('#rsr-sabbath-modal').removeClass('rsr-active');
        $('body').css('overflow', '');
    }

    // Intercept Add to Cart
    $(document).on('click', '.add_to_cart_button, .single_add_to_cart_button, button[name="add-to-cart"]', function(e) {
        if (typeof rsr_params !== 'undefined' && rsr_params.is_sabbath) {
            e.preventDefault();
            e.stopImmediatePropagation();
            showSabbathModal();
            return false;
        }
    });

    // Close Modal
    $(document).on('click', '#rsr-close-sabbath, .rsr-modal-overlay', function() {
        hideSabbathModal();
    });

    // Handle Escape key
    $(document).on('keydown', function(e) {
        if (e.key === "Escape") {
            hideSabbathModal();
        }
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
