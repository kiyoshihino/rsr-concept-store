<?php
/**
 * Main Template File
 * 
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 */

get_header(); ?>

<main id="primary" class="site-main" style="padding: 4rem 2rem; min-height: 50vh;">
	<?php
	if ( have_posts() ) :

		/* Start the Loop */
		while ( have_posts() ) :
			the_post();

			// Fallback content output
			echo '<article id="post-' . get_the_ID() . '" ' . get_post_class() . '>';
			echo '<header class="entry-header">';
			the_title( '<h1 class="entry-title" style="font-family: var(--font-playfair); color: #1a1a1a;">', '</h1>' );
			echo '</header>';
			
			echo '<div class="entry-content" style="margin-top: 2rem; font-family: var(--font-josefin);">';
			the_content();
			echo '</div>';
			echo '</article>';

		endwhile;

	else :
		echo '<p>Nenhum conteúdo encontrado.</p>';
	endif;
	?>
</main><!-- #main -->

<?php get_footer(); ?>
