<?php
// RSR Concept Theme Functions

function rsr_concept_enqueue_styles() {
    // Fonts
    wp_enqueue_style('google-playfair', 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap', array(), null);
    wp_enqueue_style('google-cormorant', 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&display=swap', array(), null);
    wp_enqueue_style('google-josefin', 'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&display=swap', array(), null);
    
    // Main Style
    wp_enqueue_style('rsr-concept-style', get_stylesheet_uri(), array(), wp_get_theme()->get('Version'));
}
add_action('wp_enqueue_scripts', 'rsr_concept_enqueue_styles');

function rsr_concept_setup() {
    // Menu support
    register_nav_menus(array(
        'primary-menu' => __('Primary Menu', 'rsr-concept'),
        'footer-menu' => __('Footer Menu', 'rsr-concept')
    ));

    // WooCommerce support
    add_theme_support('woocommerce');
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'rsr_concept_setup');

// Allow WooCommerce default styles to load so Cart/Checkout work properly
// We will override typography and colors in style.css

// Auto-create essential pages
function rsr_concept_auto_create_pages() {
    if (get_option('rsr_concept_pages_created')) {
        return; // Já foi executado
    }

    $pages = array(
        'Home' => array('title' => 'Início', 'template' => '', 'set_front' => true, 'content' => ''),
        'Sobre' => array('title' => 'Sobre Nós', 'template' => 'page-sobre.php', 'set_front' => false, 'content' => ''),
        'Contato' => array('title' => 'Contato', 'template' => 'page-contato.php', 'set_front' => false, 'content' => ''),
        'Privacidade' => array(
            'title' => 'Política de Privacidade', 
            'template' => '', 
            'set_front' => false, 
            'content' => '<h2>1. Coleta de Dados</h2><p>A RSR Concept Store coleta apenas os dados necessários para o processamento de seus pedidos, como Nome, CPF, endereço e e-mail. Todos os dados são tratados conforme a LGPD.</p><h2>2. Uso das Informações</h2><p>Seus dados são utilizados exclusivamente para emissão de nota fiscal, entrega e comunicações sobre seu pedido.</p><h2>3. Seus Direitos</h2><p>Você pode solicitar a exclusão ou alteração de seus dados a qualquer momento através de nossos canais de atendimento.</p>'
        ),
        'Trocas' => array(
            'title' => 'Política de Trocas e Devoluções', 
            'template' => '', 
            'set_front' => false, 
            'content' => '<h2>1. Direito de Arrependimento</h2><p>Conforme o Art. 49 do Código de Defesa do Consumidor, você tem até 7 dias corridos após o recebimento para solicitar a devolução por arrependimento.</p><h2>2. Condições do Produto</h2><p>O produto deve estar em sua embalagem original, sem sinais de uso e com a etiqueta fixada.</p><h2>3. Logística Reversa</h2><p>A primeira troca é por nossa conta. Forneceremos uma etiqueta de postagem para que você envie o produto de volta sem custos.</p>'
        ),
        'Termos' => array(
            'title' => 'Termos e Condições de Uso', 
            'template' => '', 
            'set_front' => false, 
            'content' => '<h2>1. Aceitação dos Termos</h2><p>Ao navegar em nossa loja, você concorda com nossas regras de uso e políticas de venda.</p><h2>2. Pagamentos</h2><p>Aceitamos as principais bandeiras de cartão de crédito e PIX. O processamento é feito por ambiente seguro criptografado.</p><h2>3. Propriedade Intelectual</h2><p>Todo o conteúdo deste site (fotos, textos, logos) é de propriedade exclusiva da RSR Concept Store.</p>'
        ),
        'Frete' => array(
            'title' => 'Política de Envio e Frete', 
            'template' => '', 
            'set_front' => false, 
            'content' => '<h2>1. Prazos de Postagem</h2><p>Nossos produtos são despachados em até 48 horas úteis após a confirmação do pagamento.</p><h2>2. Formas de Envio</h2><p>Trabalhamos com Correios e Transportadoras parceiras para garantir a entrega rápida em todo o Brasil.</p><h2>3. Extravios</h2><p>Todas as nossas encomendas viajam com seguro total. Em caso de extravio confirmado pela transportadora, garantimos o reenvio do produto ou o estorno total do valor.</p>'
        )
    );

    foreach ($pages as $param => $page_data) {
        $existing_page = get_page_by_title($page_data['title'], OBJECT, 'page');

        if (!$existing_page) {
            $page_id = wp_insert_post(array(
                'post_title'   => $page_data['title'],
                'post_status'  => 'publish',
                'post_type'    => 'page',
                'post_content' => $page_data['content']
            ));
        } else {
            $page_id = $existing_page->ID;
            // Opcional: Atualizar conteúdo se estiver vazio
            if (empty($existing_page->post_content) && !empty($page_data['content'])) {
                wp_update_post(array(
                    'ID'           => $page_id,
                    'post_content' => $page_data['content']
                ));
            }
        }

        if ($page_data['template'] != '') {
            update_post_meta($page_id, '_wp_page_template', $page_data['template']);
        }

        if ($page_data['set_front']) {
            update_option('show_on_front', 'page');
            update_option('page_on_front', $page_id);
        }
    }

    update_option('rsr_concept_pages_created', true);
}
add_action('admin_init', 'rsr_concept_auto_create_pages');

// Enqueue Custom JS
function rsr_concept_scripts() {
    wp_enqueue_script('rsr-concept-js', get_template_directory_uri() . '/assets/js/rsr-concept.js', array('jquery'), '1.0.0', true);
    
    // Pass WooCommerce info to JS safely
    $cart_url = '#';
    if ( class_exists('WooCommerce') ) {
        $cart_url = wc_get_cart_url();
    }

    wp_localize_script('rsr-concept-js', 'rsr_params', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'cart_url' => $cart_url
    ));
}
add_action('wp_enqueue_scripts', 'rsr_concept_scripts');

// Customizer: Hero Banner Management
function rsr_concept_customize_register($wp_customize) {
    if ( ! $wp_customize ) return;

    $wp_customize->add_section('rsr_concept_hero', array(
        'title' => __('Hero Banner', 'rsr-concept'),
        'priority' => 30,
    ));

    for ($i = 1; $i <= 3; $i++) {
        $wp_customize->add_setting("rsr_hero_image_$i", array('default' => ''));
        $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, "rsr_hero_image_$i", array(
            'label' => __("Imagem do Banner $i", 'rsr-concept'),
            'section' => 'rsr_concept_hero',
        )));
    }
}
add_action('customize_register', 'rsr_concept_customize_register');

// AJAX Cart Fragments (Updates Side Cart automatically)
function rsr_concept_cart_fragments($fragments) {
    if ( ! class_exists('WooCommerce') ) return $fragments;
    
    ob_start();
    ?>
    <div class="rsr-side-cart-content">
        <?php woocommerce_mini_cart(); ?>
    </div>
    <?php
    $fragments['.rsr-side-cart-content'] = ob_get_clean();
    return $fragments;
}
add_filter('woocommerce_add_to_cart_fragments', 'rsr_concept_cart_fragments');

// Helper: Get Dynamic WooCommerce Categories for Home
function rsr_get_best_categories() {
    if ( ! class_exists('WooCommerce') ) return array();

    $terms = get_terms( array(
        'taxonomy'   => 'product_cat',
        'number'     => 7,
        'hide_empty' => false,
        'orderby'    => 'count',
        'order'      => 'DESC'
    ) );
    
    if ( is_wp_error($terms) || empty($terms) ) return array();

    $cats = array();
    foreach($terms as $term) {
        $thumbnail_id = get_term_meta( $term->term_id, 'thumbnail_id', true );
        $image = wp_get_attachment_url( $thumbnail_id );
        
        $cats[] = array(
            'name' => $term->name,
            'slug' => $term->slug,
            'desc' => $term->description ? $term->description : 'Confira nossa coleção',
            'img'  => $image ? $image : 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800'
        );
    }
    return $cats;
}
