<?php
/**
 * Checkout Form
 *
 * @package WooCommerce/Templates
 * @version 3.5.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

do_action( 'woocommerce_before_checkout_form', $checkout );

// If checkout registration is disabled and not logged in, the user cannot checkout.
if ( ! $checkout->is_registration_enabled() && $checkout->is_registration_required() && ! is_user_logged_in() ) {
	echo esc_html( apply_filters( 'woocommerce_checkout_must_be_logged_in_message', __( 'You must be logged in to checkout.', 'woocommerce' ) ) );
	return;
}

?>

<div class="Checkout_container" style="padding: 4rem 2rem; max-width: 1200px; margin: 0 auto;">
	<h1 class="Checkout_title" style="font-family: var(--font-display); font-size: 2.5rem; color: var(--color-forest); margin-bottom: 3rem;">Finalizar Compra</h1>

	<form name="checkout" method="post" class="checkout woocommerce-checkout" action="<?php echo esc_url( wc_get_checkout_url() ); ?>" enctype="multipart/form-data" style="display: grid; grid-template-columns: 1fr 450px; gap: 4rem; align-items: start;">

		<?php if ( $checkout->get_checkout_fields() ) : ?>

			<?php do_action( 'woocommerce_checkout_before_customer_details' ); ?>

			<div class="col2-set Checkout_billing" id="customer_details">
				<div class="col-1">
					<?php do_action( 'woocommerce_checkout_billing' ); ?>
				</div>

				<div class="col-2">
					<?php do_action( 'woocommerce_checkout_shipping' ); ?>
				</div>
			</div>

			<?php do_action( 'woocommerce_checkout_after_customer_details' ); ?>

		<?php endif; ?>
		
		<div class="Checkout_orderReview" style="background: white; padding: 2.5rem; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); position: sticky; top: 120px;">
			<h3 id="order_review_heading" style="font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 2rem; color: var(--color-forest); border-bottom: 1px solid #eee; padding-bottom: 1rem;"><?php esc_html_e( 'Your order', 'woocommerce' ); ?></h3>

			<?php do_action( 'woocommerce_checkout_before_order_review' ); ?>

			<div id="order_review" class="woocommerce-checkout-review-order">
				<?php do_action( 'woocommerce_checkout_order_review' ); ?>
			</div>

			<?php do_action( 'woocommerce_checkout_after_order_review' ); ?>
		</div>

	</form>
</div>

<?php do_action( 'woocommerce_after_checkout_form', $checkout ); ?>
