<?php
/**
 * The Template for displaying all single products
 *
 * @package WooCommerce/Templates
 * @version 1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

get_header( 'shop' ); ?>

<div class="SingleProduct_container" style="padding: 4rem 2rem; max-width: 1200px; margin: 0 auto;">

	<?php while ( have_posts() ) : ?>
		<?php the_post(); ?>

		<div id="product-<?php the_ID(); ?>" <?php wc_product_class( 'SingleProduct_layout', $product ); ?> style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start;">
			
			<!-- Imagem do Produto -->
			<div class="SingleProduct_imageSection">
				<?php
				/**
				 * Hook: woocommerce_before_single_product_summary.
				 *
				 * @hooked woocommerce_show_product_sale_flash - 10
				 * @hooked woocommerce_show_product_images - 20
				 */
				do_action( 'woocommerce_before_single_product_summary' );
				?>
			</div>

			<!-- Info do Produto -->
			<div class="SingleProduct_infoSection">
				<div class="summary entry-summary">
					<?php
					/**
					 * Hook: woocommerce_single_product_summary.
					 *
					 * @hooked woocommerce_template_single_title - 5
					 * @hooked woocommerce_template_single_rating - 10
					 * @hooked woocommerce_template_single_price - 10
					 * @hooked woocommerce_template_single_excerpt - 20
					 * @hooked woocommerce_template_single_add_to_cart - 30
					 * @hooked woocommerce_template_single_meta - 40
					 * @hooked woocommerce_template_single_sharing - 50
					 * @hooked WC_Structured_Data::generate_product_data() - 60
					 */
					do_action( 'woocommerce_single_product_summary' );
					?>
				</div>
			</div>

		</div>

		<!-- Abas e Produtos Relacionados -->
		<div class="SingleProduct_footer" style="margin-top: 6rem; border-top: 1px solid #eee; padding-top: 4rem;">
			<?php
			/**
			 * Hook: woocommerce_after_single_product_summary.
			 *
			 * @hooked woocommerce_output_product_data_tabs - 10
			 * @hooked woocommerce_upsell_display - 15
			 * @hooked woocommerce_output_related_products - 20
			 */
			do_action( 'woocommerce_after_single_product_summary' );
			?>
		</div>

	<?php endwhile; // end of the loop. ?>

</div>

<?php
get_footer( 'shop' );

/* ODS: Add custom single product CSS if needed */
?>
