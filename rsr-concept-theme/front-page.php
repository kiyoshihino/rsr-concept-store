<?php get_header(); ?>

<!-- Hero Carousel -->
<section class="HeroCarousel_carousel">
    <div class="HeroCarousel_slideContainer">
        <?php 
        $banners = array();
        for ($i = 1; $i <= 3; $i++) {
            $img = get_theme_mod("rsr_hero_image_$i");
            if ($img) {
                $banners[] = array('src' => $img, 'alt' => 'Banner ' . $i);
            }
        }

        // Fallback banners if none set in Customizer
        if (empty($banners)) {
            $theme_dir = get_template_directory_uri();
            $banners = [
                ['src' => $theme_dir . '/assets/banner/Carrossel01.png', 'alt' => 'Coleção Lifestyle'],
                ['src' => $theme_dir . '/assets/banner/2.png', 'alt' => 'Moda Fitness'],
                ['src' => $theme_dir . '/assets/banner/3.png', 'alt' => 'Peça de croché detalhes']
            ];
        }

        foreach ($banners as $index => $banner): 
        ?>
        <div class="HeroCarousel_slide <?php echo $index === 0 ? 'HeroCarousel_active' : ''; ?>" data-index="<?php echo $index; ?>">
            <img src="<?php echo esc_url( $banner['src'] ); ?>" alt="<?php echo esc_attr($banner['alt']); ?>" class="HeroCarousel_image" />
            <div class="HeroCarousel_overlay"></div>
        </div>
        <?php endforeach; ?>
    </div>

    <div class="HeroCarousel_logoOverlay">
        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo-light.svg" alt="RSR Concept Store" class="HeroCarousel_logoImage">
        <span class="HeroCarousel_logoTagline">Estilo para toda a vida</span>
    </div>

    <button class="HeroCarousel_navButton HeroCarousel_prev" onclick="hcPrev()" aria-label="Anterior">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </button>
    <button class="HeroCarousel_navButton HeroCarousel_next" onclick="hcNext()" aria-label="Próximo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </button>

    <div class="HeroCarousel_dots">
        <?php foreach ($banners as $index => $banner): ?>
        <button class="HeroCarousel_dot <?php echo $index === 0 ? 'HeroCarousel_activeDot' : ''; ?>" onclick="hcGoTo(<?php echo $index; ?>)"></button>
        <?php endforeach; ?>
    </div>
</section>

<script>
    let hcCurrent = 0;
    const hcSlides = document.querySelectorAll('.HeroCarousel_slide');
    const hcDots = document.querySelectorAll('.HeroCarousel_dot');
    function hcGoTo(index) {
        if(hcSlides.length === 0) return;
        hcSlides[hcCurrent].classList.remove('HeroCarousel_active');
        hcDots[hcCurrent].classList.remove('HeroCarousel_activeDot');
        hcCurrent = index;
        hcSlides[hcCurrent].classList.add('HeroCarousel_active');
        hcDots[hcCurrent].classList.add('HeroCarousel_activeDot');
    }
    function hcNext() { hcGoTo((hcCurrent + 1) % hcSlides.length); }
    function hcPrev() { hcGoTo((hcCurrent - 1 + hcSlides.length) % hcSlides.length); }
    if(hcSlides.length > 1) setInterval(hcNext, 5000);
</script>

<!-- Hero Section -->
<section class="Hero_hero" data-reveal>
    <div class="Hero_pattern"></div>
    <div class="Hero_content">
        <span class="Hero_subtitle" style="text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.1em; color: var(--color-terracotta);">Lifestyle | Conforto & Estilo</span>
        <h1 class="Hero_title" style="margin-top: 1rem;">
            <span style="color: var(--color-forest);">Conforto em</span><br />
            <em style="color: var(--color-terracotta); font-style: italic;">Cada Instante</em>
        </h1>
        <p class="Hero_description" style="margin-top: 1rem;">
            Desde a delicadeza ímpar do Artesanato em Tricô e Crochê até a performance da Moda Fitness, T-shirts 100% Algodão e nossa nova linha Healthy. O guarda-roupa inteligente da sua família passa por aqui.
        </p>
    </div>
    <div class="Hero_imageWrapper">
        <div class="Hero_imageDecor">
            <img src="<?php echo esc_url(get_template_directory_uri().'/assets/banner/Inverno.png'); ?>" alt="Coleção Dinâmica" />
        </div>
    </div>
</section>

<!-- Features -->
<section class="Features_features" data-reveal>
    <div class="Features_container">
        <div class="Features_header" style="text-align: center; margin-bottom: 3rem;">
            <span class="Features_label" style="text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.1em; color: var(--color-terracotta);">Essência | Durabilidade | Design</span>
            <h2 class="Features_title" style="color: var(--color-forest); font-family: var(--font-playfair); font-size: 2.5rem; margin-top: 1rem;">Qualidade Impecável</h2>
        </div>
        <div class="Features_grid">
            <div class="Features_card" style="background: white; padding: 2rem; border-radius: 8px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <span class="Features_icon" style="font-size: 2rem;">🏆</span>
                <h3 class="Features_cardTitle" style="color: var(--color-forest); margin: 1rem 0;">Exigência nos Fios</h3>
                <p class="Features_cardDescription" style="font-size: 0.9rem;">De malhas de algodão penteado aos tecidos esportivos respiráveis.</p>
            </div>
            <div class="Features_card" style="background: white; padding: 2rem; border-radius: 8px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <span class="Features_icon" style="font-size: 2rem;">🌿</span>
                <h3 class="Features_cardTitle" style="color: var(--color-forest); margin: 1rem 0;">Arte & Exclusividade</h3>
                <p class="Features_cardDescription" style="font-size: 0.9rem;">Linha especial de Tricô e Crochê que preserva o carinho clássico.</p>
            </div>
            <div class="Features_card" style="background: white; padding: 2rem; border-radius: 8px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <span class="Features_icon" style="font-size: 2rem;">🛡️</span>
                <h3 class="Features_cardTitle" style="color: var(--color-forest); margin: 1rem 0;">Alta Durabilidade</h3>
                <p class="Features_cardDescription" style="font-size: 0.9rem;">Uniformes escolares e moletons construídos para durar o ano inteiro.</p>
            </div>
            <div class="Features_card" style="background: white; padding: 2rem; border-radius: 8px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <span class="Features_icon" style="font-size: 2rem;">🌺</span>
                <h3 class="Features_cardTitle" style="color: var(--color-forest); margin: 1rem 0;">Versatilidade</h3>
                <p class="Features_cardDescription" style="font-size: 0.9rem;">T-shirts vibrantes e Moda Fitness modeladora perfeita.</p>
            </div>
        </div>
    </div>
</section>

<!-- Categories -->
<section class="Categories_categories" data-reveal>
    <div class="Categories_container">
        <div class="Categories_header" style="text-align: center; margin-bottom: 3rem;">
            <span class="Categories_label" style="text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.1em; color: var(--color-terracotta);">Nosso Universo</span>
            <h2 class="Categories_title" style="color: var(--color-forest); font-family: var(--font-playfair); font-size: 2.5rem; margin-top: 1rem;">Por Categoria</h2>
        </div>
        <div class="Categories_grid">
            <?php 
            $cats = rsr_get_best_categories();
            $theme_uri = get_template_directory_uri();
            
            // Fallback Mockup Categories if none found
            if ( empty($cats) || !is_array($cats) ) {
                $cats = [
                    ['name'=>'Tricô', 'slug'=>'trico', 'desc'=>'Aconchego em cada laçada', 'img'=>$theme_uri.'/assets/banner/Manta Peluda Cloud.png'],
                    ['name'=>'Crochê', 'slug'=>'croche', 'desc'=>'Arte manual para sua vida', 'img'=>$theme_uri.'/assets/banner/Bolsa croche.png'],
                    ['name'=>'Moda Fitness', 'slug'=>'fitness', 'desc'=>'Performance e liberdade', 'img'=>$theme_uri.'/assets/banner/Carrossel01.png'],
                    ['name'=>'T-Shirts 100% Algodão', 'slug'=>'t-shirts', 'desc'=>'Conforto respirável', 'img'=>$theme_uri.'/assets/banner/Vestuário.png']
                ];
            }

            $shop_url = function_exists('wc_get_page_id') ? get_permalink( wc_get_page_id( 'shop' ) ) : '#';
            foreach($cats as $cat): 
                $link = get_term_link($cat['slug'], 'product_cat');
                $cat_url = is_wp_error($link) ? add_query_arg('product_cat', $cat['slug'], $shop_url) : $link;
            ?>
                <a href="<?php echo esc_url( $cat_url ); ?>" class="Categories_card">
                    <div class="Categories_imageWrapper">
                        <img src="<?php echo esc_url($cat['img']); ?>" alt="" class="Categories_image" />
                        <div class="Categories_overlay"></div>
                    </div>
                    <div class="Categories_content">
                        <h3 class="Categories_name"><?php echo esc_html($cat['name']); ?></h3>
                        <p class="Categories_description"><?php echo esc_html($cat['desc']); ?></p>
                    </div>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Featured Products Loop -->
<div class="container" style="padding: 4rem 2rem;" data-reveal>
    <h2 class="FeaturedProducts_title" style="font-family: var(--font-playfair); font-size: 2.5rem; margin-bottom: 3rem; color: var(--color-forest);">Peças em Destaque</h2>
    <div class="ProductGrid_grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; justify-content: center;">
        <?php
        if (class_exists('WooCommerce')) {
            $args = array(
                'post_type' => 'product', 
                'posts_per_page' => 4, 
                'tax_query' => array(
                    array(
                        'taxonomy' => 'product_visibility',
                        'field' => 'name',
                        'terms' => 'featured'
                    )
                )
            );
            $loop = new WP_Query($args);
            if ($loop->have_posts()) {
                while ($loop->have_posts()) : $loop->the_post();
                    wc_get_template_part('content', 'product');
                endwhile;
            } else { 
                // Fallback Mockup Products if none tag as featured
                ?>
                <div class="ProductCard_card" style="background: white; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);"><div class="ProductCard_imageWrapper"><img src="https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80" style="width: 100%; height: 300px; object-fit: cover;" /></div><div class="ProductCard_content" style="padding: 1.5rem;"><div class="ProductCard_category" style="font-size: 0.75rem; text-transform: uppercase; color: #888;">Coleção RSR</div><h3 class="ProductCard_title" style="margin: 0.5rem 0; font-family: var(--font-playfair); font-size: 1.25rem;">Exemplo de Produto Premium</h3><div class="ProductCard_price" style="color: var(--color-terracotta); font-weight: 500;">R$ 99,90</div></div></div>
                <div class="ProductCard_card" style="background: white; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);"><div class="ProductCard_imageWrapper"><img src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80" style="width: 100%; height: 300px; object-fit: cover;" /></div><div class="ProductCard_content" style="padding: 1.5rem;"><div class="ProductCard_category" style="font-size: 0.75rem; text-transform: uppercase; color: #888;">Moda Fitness</div><h3 class="ProductCard_title" style="margin: 0.5rem 0; font-family: var(--font-playfair); font-size: 1.25rem;">Legging High Performance</h3><div class="ProductCard_price" style="color: var(--color-terracotta); font-weight: 500;">R$ 129,90</div></div></div>
                <?php
            }
            wp_reset_postdata();
        }
        ?>
    </div>
</div>

<!-- Banner 1 -->
<section class="Banner_banner" data-reveal>
    <div class="Banner_imageSection">
        <img src="<?php echo esc_url(get_template_directory_uri().'/assets/banner/Fios de qualidade.png'); ?>" alt="" class="Banner_image" />
        <div class="Banner_overlay"></div>
    </div>
    <div class="Banner_content">
        <span class="Banner_subtitle" style="text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.1em; color: var(--color-terracotta);">Matérias-Primas Elevadas</span>
        <h2 class="Banner_title" style="color: var(--color-forest); font-family: var(--font-playfair); font-size: 2.5rem; margin-top: 1rem;">Excelência Têxtil</h2>
        <p class="Banner_description" style="margin-top: 1rem;">Selecionamos minuciosamente o algodão de nossas malhas e os tecidos importados fitness.</p>
        <a href="<?php echo site_url('/sobre'); ?>" class="Banner_ctaButton" style="margin-top: 2rem;">Conheça Nosso Padrão</a>
    </div>
</section>

<!-- Trust Badges -->
<section class="TrustBadges_section" data-reveal>
    <div class="TrustBadges_container">
        <div class="TrustBadge_item">
            <span class="TrustBadge_icon">🛡️</span>
            <span class="TrustBadge_text">Compra 100% Segura</span>
        </div>
        <div class="TrustBadge_item">
            <span class="TrustBadge_icon">🚚</span>
            <span class="TrustBadge_text">Entrega Garantida</span>
        </div>
        <div class="TrustBadge_item">
            <span class="TrustBadge_icon">✨</span>
            <span class="TrustBadge_text">Qualidade Premium</span>
        </div>
        <div class="TrustBadge_item">
            <span class="TrustBadge_icon">↩️</span>
            <span class="TrustBadge_text">Troca Facilitada</span>
        </div>
    </div>
</section>

<!-- Testimonials -->
<section class="Testimonials_testimonials" style="background: var(--color-forest); color: white; padding: 4rem 2rem;" data-reveal>
    <div class="Testimonials_container" style="max-width: 1200px; margin: 0 auto;">
        <div class="Testimonials_header" style="text-align: center; margin-bottom: 3rem;">
            <span class="Testimonials_label" style="text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.1em; color: var(--color-terracotta);">Feedbacks Reais</span>
            <h2 class="Testimonials_title" style="font-family: var(--font-playfair); font-size: 2.5rem; margin-top: 1rem;">O que dizem nossas clientes</h2>
        </div>
        <div class="Testimonials_grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
            <?php 
            $testimonials = [
                ['quote' => 'As t-shirts de algodão são inacreditavelmente macias!', 'name' => 'Fernanda Silva', 'product' => 'T-Shirt 100% Algodão Premium'],
                ['quote' => 'Melhor material de uniforme que já comprei para os meus filhos.', 'name' => 'Renata Oliveira', 'product' => 'Uniforme Escolar RSR'],
                ['quote' => 'O encanto do feito à mão! A bolsa e a manta transformaram minha sala.', 'name' => 'Juliana Costa', 'product' => 'Bolsa Crochê Clássica']
            ];
            foreach($testimonials as $t): ?>
                <div class="Testimonials_card" style="background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 8px;">
                    <div class="Testimonials_quoteIcon" style="color: var(--color-terracotta); font-size: 3rem; line-height: 1; margin-bottom: 1rem;">"</div>
                    <p class="Testimonials_quote" style="font-style: italic; margin-bottom: 1.5rem;"><?php echo esc_html($t['quote']); ?></p>
                    <div class="Testimonials_author" style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem;">
                        <span class="Testimonials_name" style="display: block; font-weight: bold;"><?php echo esc_html($t['name']); ?></span>
                        <span class="Testimonials_product" style="display: block; font-size: 0.85rem; color: var(--color-terracotta);"><?php echo esc_html($t['product']); ?></span>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Newsletter -->
<section class="Newsletter_newsletter" style="background: var(--color-cream); padding: 4rem 2rem;" data-reveal>
    <div class="Newsletter_container" style="max-width: 800px; margin: 0 auto; text-align: center;">
        <h2 class="Newsletter_title" style="color: var(--color-forest); font-family: var(--font-playfair); font-size: 2.5rem;">Fique por dentro</h2>
        <p class="Newsletter_description" style="margin-top: 1rem; margin-bottom: 2rem;">Inscreva seu email na nossa newsletter para ficar sabendo de lançamentos.</p>
        <form class="Newsletter_form" action="#" style="display: flex; max-width: 500px; margin: 0 auto; background: white; border-radius: 50px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            <input type="email" placeholder="Seu melhor email" class="Newsletter_input" required style="flex: 1; border: none; padding: 1rem 1.5rem; outline: none;" />
            <button type="submit" class="Newsletter_button" style="background: var(--color-terracotta); color: white; border: none; padding: 1rem 2rem; font-weight: bold; cursor: pointer;">Inscrever-se</button>
        </form>
    </div>
</section>

<?php get_footer(); ?>
