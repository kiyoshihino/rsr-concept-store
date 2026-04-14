<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            window.addEventListener("scroll", function() {
                var header = document.getElementById("main-header");
                if (window.scrollY > 50) {
                    header.classList.add("Header_scrolled");
                } else {
                    header.classList.remove("Header_scrolled");
                }
            });
            document.getElementById("menu-toggle").addEventListener("click", function() {
                document.getElementById("nav-links").classList.toggle("Header_open");
            });
        });
    </script>
</head>
<body <?php body_class("var(--font-playfair) var(--font-cormorant) var(--font-josefin)"); ?>>
<?php wp_body_open(); ?>

<?php if ( ! function_exists('is_checkout') || ! is_checkout() ) : ?>
<header id="main-header" class="Header_header">
    <div class="Header_container">
    <nav class="Header_nav">
        <a href="<?php echo home_url('/'); ?>" class="Header_logo">
            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo-light.svg" alt="RSR Concept Store" class="Header_logoImage logo-light">
            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo-dark.svg" alt="RSR Concept Store" class="Header_logoImage logo-dark">
        </a>
    </nav>

    <nav id="nav-links" class="Header_navLinks">
        <a href="<?php echo home_url('/'); ?>" class="Header_navLink">Início</a>
        <a href="<?php echo function_exists('wc_get_page_id') ? get_permalink( wc_get_page_id( 'shop' ) ) : '#'; ?>" class="Header_navLink">Shop</a>
        <a href="<?php echo site_url('/sobre'); ?>" class="Header_navLink">Sobre</a>
        <a href="<?php echo site_url('/contato'); ?>" class="Header_navLink">Contato</a>
    </nav>

    <div class="Header_actions">
        <?php 
        $myaccount_page = '#';
        if ( function_exists('wc_get_page_id') ) {
            $myaccount_page = get_permalink( wc_get_page_id( 'myaccount' ) );
        }
        ?>
        <a href="<?php echo $myaccount_page; ?>" class="Header_accountButton">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <?php if ( is_user_logged_in() ) : 
                $current_user = wp_get_current_user();
                $first_name = explode(' ', $current_user->display_name)[0];
            ?>
                <span class="Header_accountName"><?php echo esc_html( $first_name ); ?></span>
            <?php endif; ?>
        </a>

        <?php 
        $cart_url = '#';
        $cart_count = 0;
        if ( class_exists('WooCommerce') ) {
            $cart_url = wc_get_cart_url();
            $cart_count = WC()->cart->get_cart_contents_count();
        }
        ?>
        <a href="<?php echo $cart_url; ?>" class="Header_cartButton">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <?php if ( $cart_count > 0 ) : ?>
                <span class="Header_cartBadge"><?php echo $cart_count; ?></span>
            <?php endif; ?>
        </a>

        <button id="menu-toggle" class="Header_menuToggle" aria-label="Menu">
            <span class="Header_menuLine"></span>
        </button>
    </div>
    </div>
</header>
<?php endif; ?>

<main>
