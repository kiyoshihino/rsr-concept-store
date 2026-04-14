<?php
/**
 * The sidebar containing the shop widget area.
 * 
 * We have pre-configured this to display essential WooCommerce filters automatically.
 */

if ( ! class_exists( 'WooCommerce' ) ) {
	return;
}
?>

<aside id="secondary" class="widget-area shop-sidebar" role="complementary">
    
    <?php 
    // Se a sidebar estiver ativa e tiver widgets manuais, exibe eles antes
    if ( is_active_sidebar( 'sidebar-shop' ) ) {
        dynamic_sidebar( 'sidebar-shop' );
    } else {
        // Caso contrário, exibe os filtros "Premium" padrão automaticamente
        
        // 1. Busca de Produtos
        the_widget( 'WC_Widget_Product_Search', array( 'title' => 'O que você procura?' ), array(
            'before_widget' => '<aside class="widget woocommerce widget_product_search">',
            'after_widget'  => '</aside>',
            'before_title'  => '<h3 class="widget-title">',
            'after_title'   => '</h3>'
        ) );

        // 2. Filtro de Preço
        the_widget( 'WC_Widget_Price_Filter', array( 'title' => 'Filtrar por Preço' ), array(
            'before_widget' => '<aside class="widget woocommerce widget_price_filter">',
            'after_widget'  => '</aside>',
            'before_title'  => '<h3 class="widget-title">',
            'after_title'   => '</h3>'
        ) );

        // 3. Categorias de Produtos
        the_widget( 'WC_Widget_Product_Categories', array( 'title' => 'Categorias' ), array(
            'before_widget' => '<aside class="widget woocommerce widget_product_categories">',
            'after_widget'  => '</aside>',
            'before_title'  => '<h3 class="widget-title">',
            'after_title'   => '</h3>'
        ) );

        // 4. Tags ou Nuvem de Etiquetas
        the_widget( 'WC_Widget_Product_Tag_Cloud', array( 'title' => 'Etiquetas' ), array(
            'before_widget' => '<aside class="widget woocommerce widget_product_tag_cloud">',
            'after_widget'  => '</aside>',
            'before_title'  => '<h3 class="widget-title">',
            'after_title'   => '</h3>'
        ) );
    }
    ?>

</aside>
