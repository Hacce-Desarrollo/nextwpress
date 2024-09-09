<?php include('comun.php'); ?>
<div class="last_posts_cards <?php echo $block['className']; ?>" id="bloque_<?php echo $block['id']; ?>">
	<div class="row justify-content-center justify-content-md-start " id="carrusel_<?php echo $block['id']; ?>">
		<?php
		global $post;
		foreach ( $query->posts as $post ) :
			setup_postdata( $post );
		if($diseno_elementos=='overlay'):
            include('src/overlay.php');
		else:
            include('src/cards.php');
		endif;

		endforeach;
		wp_reset_postdata();
		?>
	</div>

</div> <!-- .container -->

<?php
if($carrusel_movil==TRUE):
wp_enqueue_style('slick-style', get_stylesheet_directory_uri() . '/blocks/post-list/slick/slick.css');
wp_enqueue_script('slick-js', get_stylesheet_directory_uri() . '/blocks/post-list/slick/slick.min.js');
?>

<script>

        jQuery(document).on('ready', function () {
            if (jQuery(window).width() < 768){
            jQuery('#carrusel_<?php echo $block["id"] ?>').slick({
                // centerMode: true,
                slidesToShow: 1,
                arrows:false,
                dots : true,
                autoplay:true,
                responsive: [
                    {
                        breakpoint: 500,
                        settings: {
                            slidesToShow: 1,
                            arrows:false,

                        }
                    }
                ]
            });
            }
        });


</script>

<?php endif; ?>