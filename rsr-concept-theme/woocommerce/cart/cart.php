<?php
/**
 * Cart Page
 *
 * @package WooCommerce/Templates
 * @version 3.8.0
 */

defined( 'ABSPATH' ) || exit;

do_action( 'woocommerce_before_cart' ); ?>

<div class="Cart_container" style="padding: 4rem 2rem; max-width: 1200px; margin: 0 auto;">
	<h1 class="Cart_title" style="font-family: var(--font-display); font-size: 2.5rem; color: var(--color-forest); margin-bottom: 3rem;">Seu Carrinho</h1>

	<div class="Cart_layout" style="display: grid; grid-template-columns: 1fr 350px; gap: 4rem; align-items: start;">
		
		<form class="woocommerce-cart-form" action="<?php echo esc_url( wc_get_cart_url() ); ?>" method="post">
			<?php do_action( 'woocommerce_before_cart_table' ); ?>

			<table class="shop_table shop_table_responsive cart woocommerce-cart-form__contents" cellspacing="0" style="width: 100%; border-collapse: collapse;">
				<thead>
					<tr>
						<th class="product-thumbnail" style="border-bottom: 1px solid #eee; padding: 1rem 0;">&nbsp;</th>
						<th class="product-name" style="border-bottom: 1px solid #eee; padding: 1rem 0; text-align: left; font-family: var(--font-accent); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em;"><?php esc_html_e( 'Product', 'woocommerce' ); ?></th>
						<th class="product-price" style="border-bottom: 1px solid #eee; padding: 1rem 0; text-align: left; font-family: var(--font-accent); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em;"><?php esc_html_e( 'Price', 'woocommerce' ); ?></th>
						<th class="product-quantity" style="border-bottom: 1px solid #eee; padding: 1rem 0; text-align: left; font-family: var(--font-accent); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em;"><?php esc_html_e( 'Quantity', 'woocommerce' ); ?></th>
						<th class="product-subtotal" style="border-bottom: 1px solid #eee; padding: 1rem 0; text-align: left; font-family: var(--font-accent); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em;"><?php esc_html_e( 'Subtotal', 'woocommerce' ); ?></th>
						<th class="product-remove" style="border-bottom: 1px solid #eee; padding: 1rem 0;">&nbsp;</th>
					</tr>
				</thead>
				<tbody>
					<?php do_action( 'woocommerce_before_cart_contents' ); ?>

					<?php
					foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
						$_product   = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
						$product_id = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );

						if ( $_product && $_product->exists() && $cart_item['quantity'] > 0 && apply_filters( 'woocommerce_cart_item_visible', true, $cart_item, $cart_item_key ) ) {
							$product_permalink = apply_filters( 'woocommerce_cart_item_permalink', $_product->is_visible() ? $_product->get_permalink( $cart_item ) : '', $cart_item, $cart_item_key );
							?>
							<tr class="woocommerce-cart-form__cart-item <?php echo esc_attr( apply_filters( 'woocommerce_cart_item_class', 'cart_item', $cart_item, $cart_item_key ) ); ?>">

								<td class="product-thumbnail" style="padding: 2rem 0; border-bottom: 1px solid #f9f9f9;">
								<?php
								$thumbnail = apply_filters( 'woocommerce_cart_item_thumbnail', $_product->get_image(), $cart_item, $cart_item_key );

								if ( ! $product_permalink ) {
									echo $thumbnail; // PHPCS: XSS ok.
								} else {
									printf( '<a href="%s">%s</a>', esc_url( $product_permalink ), $thumbnail ); // PHPCS: XSS ok.
								}
								?>
								</td>

								<td class="product-name" data-title="<?php esc_attr_e( 'Product', 'woocommerce' ); ?>" style="padding: 2rem 0; border-bottom: 1px solid #f9f9f9;">
								<?php
								if ( ! $product_permalink ) {
									echo wp_kses_post( apply_filters( 'woocommerce_cart_item_name', $_product->get_name(), $cart_item, $cart_item_key ) . '&nbsp;' );
								} else {
									echo wp_kses_post( apply_filters( 'woocommerce_cart_item_name', sprintf( '<a href="%s" style="font-family: var(--font-display); font-size: 1.2rem; color: var(--color-forest);">%s</a>', esc_url( $product_permalink ), $_product->get_name() ), $cart_item, $cart_item_key ) );
								}

								do_action( 'woocommerce_after_cart_item_name', $cart_item, $cart_item_key );

								// Meta data.
								echo wc_get_formatted_cart_item_data( $cart_item ); // PHPCS: XSS ok.

								// Backorder notification.
								if ( $_product->backorders_require_notification() && $_product->is_on_backorder( $cart_item['quantity'] ) ) {
									echo wp_kses_post( apply_filters( 'woocommerce_cart_item_backorder_notification', '<p class="backorder_notification">' . esc_html__( 'Available on backorder', 'woocommerce' ) . '</p>', $product_id ) );
								}
								?>
								</td>

								<td class="product-price" data-title="<?php esc_attr_e( 'Price', 'woocommerce' ); ?>" style="padding: 2rem 0; border-bottom: 1px solid #f9f9f9; color: var(--color-terracotta); font-family: var(--font-accent);">
									<?php
										echo apply_filters( 'woocommerce_cart_item_price', WC()->cart->get_product_price( $_product ), $cart_item, $cart_item_key ); // PHPCS: XSS ok.
									?>
								</td>

								<td class="product-quantity" data-title="<?php esc_attr_e( 'Quantity', 'woocommerce' ); ?>" style="padding: 2rem 0; border-bottom: 1px solid #f9f9f9;">
								<?php
								if ( $_product->is_sold_individually() ) {
									$product_quantity = sprintf( '1 <input type="hidden" name="cart[%s][qty]" value="1" />', $cart_item_key );
								} else {
									$product_quantity = woocommerce_quantity_input(
										array(
											'input_name'   => "cart[{$cart_item_key}][qty]",
											'input_value'  => $cart_item['quantity'],
											'max_value'    => $_product->get_max_purchase_quantity(),
											'min_value'    => '0',
											'product_name' => $_product->get_name(),
										),
										$_product,
										false
									);
								}

								echo apply_filters( 'woocommerce_cart_item_quantity', $product_quantity, $cart_item_key, $cart_item ); // PHPCS: XSS ok.
								?>
								</td>

								<td class="product-subtotal" data-title="<?php esc_attr_e( 'Subtotal', 'woocommerce' ); ?>" style="padding: 2rem 0; border-bottom: 1px solid #f9f9f9; font-weight: bold; color: var(--color-forest);">
									<?php
										echo apply_filters( 'woocommerce_cart_item_subtotal', WC()->cart->get_product_subtotal( $_product, $cart_item['quantity'] ), $cart_item, $cart_item_key ); // PHPCS: XSS ok.
									?>
								</td>

								<td class="product-remove" style="padding: 2rem 0; border-bottom: 1px solid #f9f9f9;">
									<?php
										echo apply_filters( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
											'woocommerce_cart_item_remove_link',
											sprintf(
												'<a href="%s" class="remove" aria-label="%s" data-product_id="%s" data-product_sku="%s" style="color: #ccc; font-size: 1.5rem;">&times;</a>',
												esc_url( wc_get_cart_remove_url( $cart_item_key ) ),
												esc_html__( 'Remove this item', 'woocommerce' ),
												esc_attr( $product_id ),
												esc_attr( $_product->get_sku() )
											),
											$cart_item_key
										);
									?>
								</td>
							</tr>
							<?php
						}
					}
					?>

					<?php do_action( 'woocommerce_cart_contents' ); ?>

					<tr style="height: 4rem;">
						<td colspan="6" class="actions" style="padding: 2rem 0;">

							<?php if ( wc_coupons_enabled() ) { ?>
								<div class="coupon" style="display: flex; gap: 1rem;">
									<input type="text" name="coupon_code" class="input-text" id="coupon_code" value="" placeholder="<?php esc_attr_e( 'Coupon code', 'woocommerce' ); ?>" style="padding: 0.8rem 1.5rem; border: 1px solid #eee; border-radius: 50px; outline: none;" /> 
									<button type="submit" class="button" name="apply_coupon" value="<?php esc_attr_e( 'Apply coupon', 'woocommerce' ); ?>" style="background: none; border: 1px solid var(--color-forest); color: var(--color-forest); border-radius: 50px; padding: 0.8rem 2rem; cursor: pointer;"><?php esc_attr_e( 'Apply coupon', 'woocommerce' ); ?></button>
									<?php do_action( 'woocommerce_cart_coupon' ); ?>
								</div>
							<?php } ?>

							<button type="submit" class="button" name="update_cart" value="<?php esc_attr_e( 'Update cart', 'woocommerce' ); ?>" style="float: right; opacity: 0.5; cursor: not-allowed;"><?php esc_html_e( 'Update cart', 'woocommerce' ); ?></button>

							<?php do_action( 'woocommerce_cart_actions' ); ?>

							<?php wp_nonce_field( 'woocommerce-cart', 'woocommerce-cart-nonce' ); ?>
						</td>
					</tr>

					<?php do_action( 'woocommerce_after_cart_contents' ); ?>
				</tbody>
			</table>
			<?php do_action( 'woocommerce_after_cart_table' ); ?>
		</form>

		<div class="cart-collaterals">
			<?php
				/**
				 * Cart collaterals hook.
				 *
				 * @hooked woocommerce_cross_sell_display
				 * @hooked woocommerce_cart_totals - 10
				 */
				do_action( 'woocommerce_cart_collaterals' );
			?>
		</div>
	</div>
</div>

<?php do_action( 'woocommerce_after_cart' ); ?>
