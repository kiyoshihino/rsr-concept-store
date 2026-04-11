<?php
/**
 * The Template for displaying product archives, including the main shop page which is a post type archive.
 * Overridden by RSR Concept Theme
 */

defined( 'ABSPATH' ) || exit;

get_header( 'shop' );
?>

<div class="shop_container" style="padding: 4rem 2rem; max-width: 1200px; margin: 0 auto;">

	<header class="woocommerce-products-header">
		<?php if ( apply_filters( 'woocommerce_show_page_title', true ) ) : ?>
			<h1 class="woocommerce-products-header__title page-title" style="font-family: var(--font-playfair); font-size: 2.5rem; text-align: center; margin-bottom: 2rem;"><?php woocommerce_page_title(); ?></h1>
		<?php endif; ?>

		<?php do_action( 'woocommerce_archive_description' ); ?>
	</header>

	<?php
	if ( woocommerce_product_loop() ) {
		do_action( 'woocommerce_before_shop_loop' );

		// We will wrap the products in our custom Grid from Next.js!
		echo '<div class="ProductGrid_grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; margin-top: 2rem;">';

		woocommerce_product_loop_start();

		if ( wc_get_loop_prop( 'total' ) ) {
			while ( have_posts() ) {
				the_post();
				do_action( 'woocommerce_shop_loop' );
				wc_get_template_part( 'content', 'product' );
			}
		}

		woocommerce_product_loop_end();

		echo '</div>'; // close custom grid

		do_action( 'woocommerce_after_shop_loop' );
	} else {
		do_action( 'woocommerce_no_products_found' );
	}
	?>

</div> <!-- close shop container -->

<?php
get_footer( 'shop' );
