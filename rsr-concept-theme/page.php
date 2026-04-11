<?php get_header(); ?>

<div class="StandardPage_container">
    <div class="StandardPage_hero">
        <div class="container">
            <h1 class="StandardPage_title"><?php the_title(); ?></h1>
            <div class="StandardPage_breadcrumb">
                <a href="<?php echo home_url(); ?>">Início</a> / <span><?php the_title(); ?></span>
            </div>
        </div>
    </div>

    <div class="StandardPage_contentWrapper">
        <div class="container">
            <div class="StandardPage_content">
                <?php
                if ( have_posts() ) :
                    while ( have_posts() ) : the_post();
                        the_content();
                    endwhile;
                endif;
                ?>
            </div>
        </div>
    </div>
</div>

<?php get_footer(); ?>
