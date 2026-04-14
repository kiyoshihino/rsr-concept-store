<?php
/**
 * The template for displaying all WooCommerce pages.
 *
 * @package RSR_Concept_Theme
 */

get_header(); ?>

<?php if ( is_shop() || is_product_category() || is_product_tag() ) : ?>
    <?php
    // Logica para o Banner Dinâmico
    $banner_title = 'RSR';
    $banner_desc = 'Coleções que Elevam o seu Estilo';
    $banner_img = get_template_directory_uri().'/assets/banner/4.png'; // Padrão Luxo

    if ( is_product_category() ) {
        $queried_object = get_queried_object();
        $banner_title = single_term_title('', false);
        
        // Tenta pegar a imagem da categoria
        $thumbnail_id = get_term_meta( $queried_object->term_id, 'thumbnail_id', true );
        if ( $thumbnail_id ) {
            $banner_img = wp_get_attachment_url( $thumbnail_id );
        }
        
        // Frases dinâmicas abrangentes por categoria
        $cat_slug = $queried_object->slug;
        if (strpos($cat_slug, 'vestuario') !== false) $banner_desc = 'Design e Sofisticação ao Vestir';
        elseif (strpos($cat_slug, 'decoracao') !== false) $banner_desc = 'Onde o Estilo Encontra o Lar';
        elseif (strpos($cat_slug, 'acessorios') !== false) $banner_desc = 'Detalhes que Definem a Autenticidade';
        else $banner_desc = 'Curadoria Exclusiva RSR Concept';
    }
    ?>

    <!-- NEW CREATIVE FULL-WIDTH BANNER -->
    <section class="ShopHero_modern">
        <div class="ShopHero_bg" style="background-image: url('<?php echo esc_url($banner_img); ?>');"></div>
        <div class="ShopHero_overlay"></div>
        <div class="ShopHero_content container">
            <div class="ShopHero_textWrap">
                <span class="ShopHero_accent animate-fade-in"><?php echo esc_html($banner_desc); ?></span>
                <h1 class="ShopHero_mainTitle animate-fade-in-up"><?php echo esc_html($banner_title); ?></h1>
                <div class="ShopHero_line animate-scale-x"></div>
            </div>
        </div>
    </section>

    <!-- HORIZONTAL CATEGORY NAVIGATION (STICKY) -->
    <nav class="ShopNav_horizontal">
        <div class="container">
            <div class="ShopNav_wrapper">
                <?php 
                $cats = rsr_get_best_categories();
                $shop_url = function_exists('wc_get_page_id') ? get_permalink( wc_get_page_id( 'shop' ) ) : '#';
                ?>
                <a href="<?php echo $shop_url; ?>" class="ShopNav_item <?php echo is_shop() ? 'is-active' : ''; ?>">Ver Tudo</a>
                <?php foreach($cats as $cat): ?>
                    <a href="<?php echo esc_url( get_term_link($cat['slug'], 'product_cat') ); ?>" class="ShopNav_item <?php echo (is_product_category($cat['slug'])) ? 'is-active' : ''; ?>">
                        <?php echo esc_html($cat['name']); ?>
                    </a>
                <?php endforeach; ?>
            </div>
        </div>
    </nav>
<?php endif; ?>

<div class="container Shop_mainContainer">
    <div id="primary" class="Shop_contentArea Shop_fullWidth">
        <main id="main" class="site-main" role="main">
            <?php woocommerce_content(); ?>
        </main>
    </div>
</div>

<!-- Trust Section: Luxury Mural -->
<section class="ShopTrust_section">
    <div class="container">
        <div class="ShopTrust_header">
            <span class="ShopTrust_subtitle">Experiência RSR Concept</span>
            <h2 class="ShopTrust_mainTitle">Excelência em Cada Detalhe</h2>
        </div>
        <div class="ShopTrust_grid">
            <div class="ShopTrust_item">
                <span class="ShopTrust_icon">✧</span>
                <h3>Exclusividade</h3>
                <p>Peças selecionadas para garantir um estilo único e autêntico.</p>
            </div>
            <div class="ShopTrust_item">
                 <span class="ShopTrust_icon">✧</span>
                <h3>Design Atemporal</h3>
                <p>Produtos que transcendem tendências, criados para durar conosco.</p>
            </div>
            <div class="ShopTrust_item">
                 <span class="ShopTrust_icon">✧</span>
                <h3>Curadoria Premium</h3>
                <p>Cuidado absoluto da origem do produto até as suas mãos.</p>
            </div>
        </div>
    </div>
</section>

<?php get_footer(); ?>
