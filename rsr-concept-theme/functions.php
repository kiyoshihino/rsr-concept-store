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
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'rsr_concept_setup');

// Register Sidebars
function rsr_concept_widgets_init() {
    register_sidebar( array(
        'name'          => __( 'Loja Sidebar', 'rsr-concept' ),
        'id'            => 'sidebar-shop',
        'description'   => __( 'Widgets para a lateral da loja.', 'rsr-concept' ),
        'before_widget' => '<aside id="%1$s" class="widget %2$s">',
        'after_widget'  => '</aside>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ) );
}
add_action( 'widgets_init', 'rsr_concept_widgets_init' );

// Remove original WooCommerce wrappers
remove_action('woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10);
remove_action('woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10);

// Set products per row to 4 (Full Width Layout)
add_filter('loop_shop_columns', function() { return 4; });

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
        'cart_url' => $cart_url,
        'is_sabbath' => rsr_is_sabbath_mode()
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



// Helper: Get Dynamic WooCommerce Categories for Home
function rsr_get_best_categories() {
    if ( ! class_exists('WooCommerce') ) return array();

    $terms = get_terms( array(
        'taxonomy'   => 'product_cat',
        'number'     => 20,
        'hide_empty' => false, // Mostrar mesmo se vazia para garantir que apareça nos testes
        'orderby'    => 'name',
        'order'      => 'ASC'
    ) );
    
    if ( is_wp_error($terms) || empty($terms) ) return array();

    $cats = array();
    foreach($terms as $term) {
        // PULAR CATEGORIAS INDESEJADAS
        if ( in_array($term->slug, array('sem-categoria', 'uncategorized')) ) {
            continue;
        }
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

/**
 * WooCommerce: Reorganizar Menu da Conta
 */
function rsr_custom_my_account_menu_items( $items ) {
    // Remover Downloads
    unset( $items['downloads'] );
    
    // Reordenar para adicionar "Rastrear minha encomenda" após os Pedidos
    $new_items = array();
    foreach ( $items as $key => $value ) {
        $new_items[$key] = $value;
        if ( $key === 'orders' ) {
            $new_items['rastrear-encomenda'] = 'Rastrear minha encomenda';
        }
    }
    
    // Se orders não existir por algum motivo, adiciona no final (antes de sair)
    if (!isset($new_items['rastrear-encomenda'])) {
        $logout = $new_items['customer-logout'];
        unset($new_items['customer-logout']);
        $new_items['rastrear-encomenda'] = 'Rastrear minha encomenda';
        $new_items['customer-logout'] = $logout;
    }
    
    return $new_items;
}
add_filter( 'woocommerce_account_menu_items', 'rsr_custom_my_account_menu_items' );

/**
 * Direcionar aba Rastrear Encomenda para URL externa
 */
function rsr_custom_account_endpoint_url( $url, $endpoint, $value, $permalink ) {
    if ( $endpoint === 'rastrear-encomenda' ) {
        $url = 'https://rsrconceptstore.com.br/rastrear-encomenda/';
    }
    return $url;
}
add_filter( 'woocommerce_get_endpoint_url', 'rsr_custom_account_endpoint_url', 10, 4 );

/**
 * Pegar primeiro nome do usuário para o Dashboard
 */
function rsr_get_user_first_name() {
    $current_user = wp_get_current_user();
    return $current_user->user_firstname ? $current_user->user_firstname : $current_user->display_name;
}

/**
 * ============================================================================
 * RSR CONCEPT: ADMIN E LOGIN PERSONALIZADOS (WHITE LABEL)
 * ============================================================================
 */

// 1. Customizar a Tela de Login
function rsr_custom_login_style() {
    ?>
    <style type="text/css">
        body.login {
            background-color: #f7f7f7;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        #login {
            padding: 0 !important;
            margin: 0 !important;
            width: 380px;
        }
        .login h1 a {
            background-image: none !important; /* Removemos a logo do WP */
            text-indent: 0 !important;
            width: 100% !important;
            height: auto !important;
            font-size: 32px !important;
            color: #000 !important;
            font-family: 'Playfair Display', serif;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 20px;
        }
        .login h1 a::after {
            content: "RSR CONCEPT";
        }
        .login form {
            background: #fff !important;
            border: 1px solid #111 !important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05) !important;
            border-radius: 0px; /* Estilo boutique, cantos retos */
            padding: 40px !important;
            margin-top: 0 !important;
        }
        .login label {
            font-family: 'Josefin Sans', sans-serif;
            text-transform: uppercase;
            font-size: 11px !important;
            letter-spacing: 1px;
            color: #333 !important;
            margin-bottom: 5px;
            display: block;
        }
        .login input[type="text"], 
        .login input[type="password"] {
            border: 1px solid #ddd !important;
            border-radius: 0px !important;
            box-shadow: none !important;
            padding: 10px 15px !important;
            font-family: 'Josefin Sans', sans-serif;
            font-size: 14px;
        }
        .login input[type="text"]:focus, 
        .login input[type="password"]:focus {
            border-color: #000 !important;
            box-shadow: none !important;
        }
        .login .button-primary {
            background: #000 !important;
            border-color: #000 !important;
            color: #fff !important;
            text-transform: uppercase;
            font-family: 'Josefin Sans', sans-serif;
            font-weight: 600;
            letter-spacing: 1px;
            border-radius: 0px !important;
            padding: 5px 20px !important;
            height: 48px !important;
            text-shadow: none !important;
            box-shadow: none !important;
            width: 100%;
            margin-top: 15px;
            transition: all 0.3s ease;
        }
        .login .button-primary:hover {
            background: #333 !important;
        }
        .login #backtoblog, .login #nav {
            text-align: center;
        }
        .login #backtoblog a, .login #nav a {
            color: #666 !important;
            font-family: 'Josefin Sans', sans-serif;
            font-size: 12px !important;
            text-transform: uppercase;
        }
        .login #backtoblog a:hover, .login #nav a:hover {
            color: #000 !important;
        }
        .login p.submit { float: none; }
        .login-action-login #nav { display: none; } /* Ocultar Recuperar Senha provisoriamente para ficar clean */
    </style>
    <?php
}
add_action('login_enqueue_scripts', 'rsr_custom_login_style');

// Alterar URL da logo no login apontando para o site
function rsr_login_logo_url() {
    return home_url();
}
add_filter('login_headerurl', 'rsr_login_logo_url');

// Alterar texto do logo pro nome da loja
function rsr_login_logo_url_title() {
    return 'RSR Concept Store';
}
add_filter('login_headertext', 'rsr_login_logo_url_title');


// 2. Limpar o Painel do Administrador (Esconder Menus)
function rsr_remove_admin_menus() {
    // Pega as informações do usuário logado
    $user = wp_get_current_user();
    
    // Remover menus nativos que a loja não usaria para poluir menos
    remove_menu_page( 'edit-comments.php' ); // Remove Comentários
    
    // Se o usuário não for o dono ou não for 'admin_master', poderíamos ocultar coisas mais perigosas:
    // O WooCommerce geralmente cria a role "Shop Manager" que já esconde configurações sensíveis do tema,
    // mas se o lojista usar a conta de "Administrator", você pode descomentar o código abaixo 
    // e trocar 'admin_master' pelo Login (username) do SEU acesso
    
    /*
    if ( $user->user_login !== 'admin_master' ) {
        remove_menu_page( 'themes.php' );                 // Aparência
        remove_menu_page( 'plugins.php' );                // Plugins
        remove_menu_page( 'tools.php' );                  // Ferramentas
        remove_menu_page( 'options-general.php' );        // Configurações
    }
    */
}
add_action( 'admin_menu', 'rsr_remove_admin_menus' );

// 3. Limpar os Widgets do Dashboard e adicionar um Widget da Marca
function rsr_custom_dashboard_widgets() {
    // Remover Widgets Padrões (Eventos do WP e Notícias, Rascunho, etc)
    remove_meta_box('dashboard_primary', 'dashboard', 'side'); 
    remove_meta_box('dashboard_quick_press', 'dashboard', 'side');
    remove_meta_box('dashboard_activity', 'dashboard', 'normal'); 
    
    // Adicionar nosso Widget
    wp_add_dashboard_widget('rsr_welcome_widget', 'Gerenciamento RSR Concept', 'rsr_welcome_widget_content');
}
add_action('wp_dashboard_setup', 'rsr_custom_dashboard_widgets', 999);

function rsr_welcome_widget_content() {
    echo '<div style="text-align: center; padding: 25px 0;">';
    echo '<h2 style="font-family: \'Playfair Display\', serif; font-size: 26px; font-weight: normal; text-transform: uppercase; margin-bottom: 5px; color:#000;">RSR Concept</h2>';
    echo '<p style="font-size: 13px; color: #666; font-family: \'Josefin Sans\', sans-serif; text-transform: uppercase; letter-spacing: 1px;">Painel de Gerenciamento da Boutique</p>';
    echo '<hr style="border: 0; border-top: 1px solid #ddd; margin: 25px 0;">';
    echo '<p><strong>Ações Rápidas:</strong></p>';
    echo '<div style="display: flex; justify-content: center; gap: 10px; margin-top:20px;">';
    echo '<a href="'.admin_url('edit.php?post_type=shop_order').'" class="button button-primary" style="background:#000; border-color:#000; border-radius:0; height:36px; line-height:34px; padding:0 20px; font-family:\'Josefin Sans\', sans-serif; text-transform:uppercase; letter-spacing:1px; font-size:11px;">Ver Pedidos</a>';
    echo '<a href="'.admin_url('edit.php?post_type=product').'" class="button" style="border-radius:0; height:36px; line-height:34px; padding:0 20px; font-family:\'Josefin Sans\', sans-serif; text-transform:uppercase; letter-spacing:1px; font-size:11px;">Ver Produtos</a>';
    echo '</div>';
    echo '</div>';
}

// 4. Estilos Customizados para o Painel do WordPress
function rsr_custom_admin_css() {
    echo '<style>
        /* Transformar a barra lateral (Admin Menu) para preto sólido com fonte requintada */
        #adminmenu, #adminmenu .wp-submenu, #adminmenuback, #adminmenuwrap {
            background-color: #050505 !important;
        }
        #adminmenu a {
            color: #aaaaaa !important;
            font-family: "Josefin Sans", sans-serif;
            font-size: 13px !important;
            transition: all 0.2s ease;
        }
        #adminmenu a:hover, #adminmenu li.menu-top:hover, #adminmenu li.opensub>a.menu-top, #adminmenu li>a.menu-top:focus {
            color: #ffffff !important;
            background-color: #1a1a1a !important;
        }
        #adminmenu .wp-has-current-submenu .wp-submenu, #adminmenu .wp-has-current-submenu .wp-submenu.sub-open, #adminmenu .wp-has-current-submenu.opensub .wp-submenu, #adminmenu a.wp-has-current-submenu:focus+.wp-submenu {
            background-color: #0f0f0f !important;
        }
        #adminmenu li.wp-has-current-submenu a.wp-has-current-submenu, #adminmenu li.current a.menu-top, .folded #adminmenu li.wp-has-current-submenu, .folded #adminmenu li.current.menu-top {
            background: #111111 !important;
            color: #ffffff !important;
            font-weight: 500;
        }
        /* Limpar a logo nativa no topo do WP Admin Bar */
        #wpadminbar #wp-admin-bar-wp-logo > .ab-item .ab-icon:before {
            content: "\f110"; /* Ícone de uma estrela ao invés do logo do WP, ou f115 (tag) */
        }
        /* Mudar a cor de destaque (ex: bolinhas de update) */
        #adminmenu .awaiting-mod, #adminmenu .update-plugins {
            background-color: #ffffff !important;
            color: #000000 !important;
            border-radius: 2px !important;
            font-weight: bold;
        }
        /* Mudar botões primários da interface */
        .wp-core-ui .button-primary {
            background: #000 !important;
            border-color: #000 !important;
            border-radius: 0 !important;
            color: #fff !important;
            box-shadow: none !important;
            text-shadow: none !important;
            font-family: "Josefin Sans", sans-serif;
            text-transform: uppercase;
            font-size: 11px !important;
            letter-spacing: 1px;
            padding: 0 15px !important;
            height: 32px !important;
            line-height: 30px !important;
        }
        .wp-core-ui .button-primary:hover {
            background: #222 !important;
        }
        /* Estilizar elementos de inputs focados */
        input[type=checkbox]:checked:before {
            content: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2020%2020%27%3E%3Cpath%20d%3D%27M14.83%204.89l1.34.94-5.81%208.38H9.02L5.78%209.67l1.34-1.25%202.57%202.4z%27%20fill%3D%27%23000%27%2F%3E%3C%2Fsvg%3E");
        }
        input[type="checkbox"]:focus, input[type="color"]:focus, input[type="date"]:focus, input[type="datetime-local"]:focus, input[type="datetime"]:focus, input[type="email"]:focus, input[type="month"]:focus, input[type="number"]:focus, input[type="password"]:focus, input[type="radio"]:focus, input[type="search"]:focus, input[type="tel"]:focus, input[type="text"]:focus, input[type="time"]:focus, input[type="url"]:focus, input[type="week"]:focus, select:focus, textarea:focus {
            border-color: #000;
            box-shadow: 0 0 0 1px #000;
        }
    </style>';
}
add_action('admin_head', 'rsr_custom_admin_css');

/**
 * Adiciona CTA para Minha Conta na página de agradecimento (Pedido Recebido)
 */
function rsr_add_my_account_call_to_thankyou($order_id) {
    if (!$order_id) return;
    ?>
    <div class="rsr-order-received-cta animate-fade-in-up">
        <div class="rsr-order-received-cta-inner">
            <h3>Acompanhe seu Pedido</h3>
            <p>Sua compra foi confirmada com sucesso. Você pode acompanhar o status e detalhes do seu pedido em sua área exclusiva a qualquer momento.</p>
            <a href="<?php echo esc_url( wc_get_page_permalink( 'myaccount' ) ); ?>" class="button rsr-cta-black">
                Ir para Minha Conta
            </a>
        </div>
    </div>
    <?php
}
add_action('woocommerce_thankyou', 'rsr_add_my_account_call_to_thankyou', 25);

/**
 * ============================================================================
 * RSR CONCEPT: MODO SABBATH (SÁBADO)
 * ============================================================================
 */

/**
 * Verifica se a loja está em "Modo Sabbath" (Sexta 18:00 até Sábado 19:00)
 */
function rsr_is_sabbath_mode() {
    // Pegar o timezone do site
    $timezone = wp_timezone();
    $now = new DateTime('now', $timezone);
    
    $day_of_week = (int) $now->format('w'); // 0 (Domingo) a 6 (Sábado)
    $hour = (int) $now->format('G');
    $minute = (int) $now->format('i');
    $time_val = $hour * 100 + $minute; // Ex: 18:00 -> 1800

    // Sexta-feira (5) a partir das 18:00
    if ($day_of_week === 5 && $time_val >= 1800) {
        return true;
    }

    // Sábado (6) até as 19:00
    if ($day_of_week === 6 && $time_val < 1900) {
        return true;
    }

    return false;
}

/**
 * Bloquear compras no backend se estiver no Modo Sabbath
 */
function rsr_block_purchases_on_sabbath($purchasable, $product) {
    if (rsr_is_sabbath_mode()) {
        return false;
    }
    return $purchasable;
}
add_filter('woocommerce_is_purchasable', 'rsr_block_purchases_on_sabbath', 10, 2);
add_filter('woocommerce_variation_is_purchasable', 'rsr_block_purchases_on_sabbath', 10, 2);

/**
 * Injetar o Modal do Sabbath no Footer
 */
function rsr_inject_sabbath_modal() {
    if (!rsr_is_sabbath_mode()) {
        // Opcional: injetar sempre para permitir debug via parâmetro URL se necessário,
        // mas por padrão só injetamos quando ativo.
        // return; 
    }
    
    $bg_url = get_template_directory_uri() . '/assets/images/sabbath-sunset.png';
    ?>
    <div id="rsr-sabbath-modal" class="rsr-modal">
        <div class="rsr-modal-overlay"></div>
        <div class="rsr-modal-content" style="background-image: url('<?php echo esc_url($bg_url); ?>');">
            <div class="rsr-modal-body">
                <button class="rsr-modal-close" id="rsr-close-sabbath">&times;</button>
                
                <div class="rsr-modal-header-brand">
                    <span class="rsr-brand-text">RSR</span>
                    <span class="rsr-brand-subtext">CONCEPT STORE</span>
                </div>

                <div class="rsr-modal-message-container">
                    <div class="rsr-quote-section">
                        <p class="rsr-quote">“Lembra-te do dia de sábado, para o santificar.”</p>
                        <p class="rsr-verse">— Êxodo 20:8 —</p>
                        <p class="rsr-label">Mandamento</p>
                    </div>

                    <div class="rsr-main-text">
                        <p>Em respeito ao mandamento, nossa loja virtual não realiza atendimentos nem o processamento de pedidos do pôr do sol de sexta-feira ao pôr do sol de sábado.</p>
                        
                        <div class="rsr-divider-star">✦</div>

                        <p>Retornamos após esse período, mantendo o cuidado, a excelência e o propósito que nos definem.</p>
                        
                        <p class="rsr-gratitude">Agradecemos sua compreensão e confiança. <span class="rsr-heart">♥</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php
}
add_action('wp_footer', 'rsr_inject_sabbath_modal');
