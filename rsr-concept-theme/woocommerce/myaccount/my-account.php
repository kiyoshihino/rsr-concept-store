<?php
/**
 * My Account page
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/myaccount/my-account.php.
 *
 * @package WooCommerce/Templates
 * @version 3.5.0
 */

defined( 'ABSPATH' ) || exit;
?>

<div class="MyAccount_container" style="padding: 6rem 2rem; max-width: 1200px; margin: 0 auto;">
	<h1 class="MyAccount_title" style="font-family: var(--font-display); font-size: 2.5rem; color: var(--color-forest); margin-bottom: 3rem;">Minha Conta</h1>

	<div class="MyAccount_layout" style="display: grid; grid-template-columns: 250px 1fr; gap: 4rem; align-items: start;">
		
		<nav class="woocommerce-MyAccount-navigation">
			<ul style="list-style: none; padding: 0; margin: 0; border-right: 1px solid #eee;">
				<?php foreach ( wc_get_account_menu_items() as $endpoint => $label ) : ?>
					<li class="<?php echo wc_get_account_menu_item_classes( $endpoint ); ?>" style="margin-bottom: 0.5rem;">
						<a href="<?php echo esc_url( wc_get_account_endpoint_url( $endpoint ) ); ?>" style="display: block; padding: 1rem; font-family: var(--font-accent); text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.1em; color: var(--color-stone); transition: all 0.3s ease;">
							<?php echo esc_html( $label ); ?>
						</a>
					</li>
				<?php endforeach; ?>
			</ul>
		</nav>

		<div class="woocommerce-MyAccount-content" style="background: white; padding: 2.5rem; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
			<?php
				/**
				 * My Account content.
				 *
				 * @hooked woocommerce_account_content - 10
				 */
				do_action( 'woocommerce_account_content' );
			?>
		</div>

	</div>
</div>
