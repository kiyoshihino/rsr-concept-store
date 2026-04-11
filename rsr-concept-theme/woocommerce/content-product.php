<?php
/**
 * The template for displaying product content within loops
 * Overridden by RSR Concept Theme
 */

defined( 'ABSPATH' ) || exit;

global $product;

// Ensure visibility.
if ( empty( $product ) || ! $product->is_visible() ) {
	return;
}

$categories = wc_get_product_category_list( $product->get_id(), ', ' );
// Strip HTML tags to just get plain text for our category badge mapping
$category_text = wp_strip_all_tags( $categories );
?>

<div <?php wc_product_class( 'ProductCard_card', $product ); ?>>
	<a href="<?php echo esc_url( $product->get_permalink() ); ?>" class="woocommerce-LoopProduct-link woocommerce-loop-product__link" style="text-decoration: none; color: inherit; display: block;">
		
		<div class="ProductCard_imageWrapper">
			<?php
			$image_size = apply_filters( 'single_product_archive_thumbnail_size', 'woocommerce_thumbnail' );
			echo $product->get_image( $image_size, array( 'class' => 'ProductCard_image' ) );
			?>
		</div>

		<div class="ProductCard_content">
			<?php if ( $category_text ) : ?>
				<div class="ProductCard_category"><?php echo esc_html( $category_text ); ?></div>
			<?php endif; ?>

			<h3 class="ProductCard_title"><?php echo get_the_title(); ?></h3>
			
			<div class="ProductCard_price">
				<?php echo $product->get_price_html(); ?>
			</div>
		</div>
	</a> <!-- end link -->

	<!-- We append the WooCommerce add to cart button but style it with our CSS class -->
	<div class="ProductCard_addToCartContainer" style="padding: 0 1.5rem 1.5rem; display: flex; justify-content: flex-end;">
		<?php
		woocommerce_template_loop_add_to_cart( array(
			'class' => implode( ' ', array(
				'button',
				'product_type_' . $product->get_type(),
				$product->is_purchasable() && $product->is_in_stock() ? 'add_to_cart_button' : '',
				$product->supports( 'ajax_add_to_cart' ) && $product->is_purchasable() && $product->is_in_stock() ? 'ajax_add_to_cart' : '',
				'ProductCard_addToCart' // Our custom CSS style to snap to the corner/look like an icon!
			) ),
		) );
		?>
	</div>
</div>
