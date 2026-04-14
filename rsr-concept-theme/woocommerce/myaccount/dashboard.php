<?php
/**
 * My Account dashboard.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 4.4.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

$allowed_html = array(
	'a' => array(
		'href' => array(),
	),
);
?>

<div class="Account_dashboardWrapper animate-fade-in-up" style="animation-delay: 0.1s;">
    <header class="Account_headerCard">
        <div class="Account_welcome">
            <span class="Account_welcomeSubtitle">Sua Experiência RSR</span>
            <h1 class="Account_welcomeTitle">
                <?php
                printf(
                    /* translators: 1: user display name 2: logout url */
                    wp_kses( __( 'Olá, <span class="Account_userName">%1$s</span>, é um prazer ter você aqui!', 'woocommerce' ), $allowed_html ),
                    esc_html( rsr_get_user_first_name() )
                );
                ?>
            </h1>
            <p class="Account_welcomeText">
                A partir do painel de controle de sua conta, você pode visualizar seus pedidos recentes, gerenciar seus endereços de entrega e faturamento, e editar sua senha e detalhes da conta.
            </p>
        </div>
    </header>

    <div class="Account_gridCards">
        <a href="<?php echo esc_url( wc_get_account_endpoint_url( 'orders' ) ); ?>" class="Account_cardItem">
            <div class="Account_cardIcon">📦</div>
            <div class="Account_cardContent">
                <h3>Meus Pedidos</h3>
                <p>Acompanhe suas compras e histórico.</p>
            </div>
            <span class="Account_cardArrow">→</span>
        </a>

        <a href="<?php echo esc_url( wc_get_account_endpoint_url( 'edit-address' ) ); ?>" class="Account_cardItem">
            <div class="Account_cardIcon">🏠</div>
            <div class="Account_cardContent">
                <h3>Meus Endereços</h3>
                <p>Gerencie seus locais de entrega.</p>
            </div>
            <span class="Account_cardArrow">→</span>
        </a>

        <a href="<?php echo esc_url( wc_get_account_endpoint_url( 'edit-account' ) ); ?>" class="Account_cardItem">
            <div class="Account_cardIcon">👤</div>
            <div class="Account_cardContent">
                <h3>Dados da Conta</h3>
                <p>Altere sua senha e perfil.</p>
            </div>
            <span class="Account_cardArrow">→</span>
        </a>

        <a href="<?php echo esc_url( wc_logout_url() ); ?>" class="Account_cardItem Account_cardLogout">
            <div class="Account_cardIcon">✕</div>
            <div class="Account_cardContent">
                <h3>Sair da Conta</h3>
                <p>Encerrar sua sessão atual.</p>
            </div>
            <span class="Account_cardArrow">→</span>
        </a>
    </div>
</div>

<?php
	/**
	 * My Account dashboard.
	 *
	 * @since 2.6.0
	 */
	do_action( 'woocommerce_account_dashboard' );

	/**
	 * Deprecated woocommerce_before_my_account action.
	 *
	 * @deprecated 2.6.0
	 */
	do_action( 'woocommerce_before_my_account' );

	/**
	 * Deprecated woocommerce_after_my_account action.
	 *
	 * @deprecated 2.6.0
	 */
	do_action( 'woocommerce_after_my_account' );

/* OIBE */
