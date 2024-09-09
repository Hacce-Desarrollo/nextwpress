<?php include('comun.php');

?>

     <div class="last_posts_cards carrusel_posts_wrap <?php echo $block['className']; ?>" id="bloque_<?php echo $block['id']; ?>"> 
     <div class="row justify-content-center justify-content-md-start " id="carrusel_<?php echo $block['id']; ?>">
		<?php
		global $post;
		foreach ( $query->posts as $post ) :


            setup_postdata( $post );

            if($diseno_elementos=='overlay'):
                $cols="";
                include('src/overlay.php');
            else:
                $cols="";
                include('src/cards.php');
            endif;
		endforeach;
		wp_reset_postdata();
		?>
	</div>

</div> <!-- .container -->

 <?php

//wp_enqueue_style('slick-style', get_stylesheet_directory_uri() . '/blocks/post-list/slick/slick.css');
//wp_enqueue_script('slick-js', get_stylesheet_directory_uri() . '/blocks/post-list/slick/slick.min.js');
?>


<!-- <script>

        jQuery(document).on('ready', function () {
            jQuery('#carrusel_<?php //echo $block["id"] ?>').slick({
                centerMode: true,
                centerPadding: '30px',
                slidesToShow: <?php //echo $elementos_fila_pc ?>,
                arrows: true,
                infinite: true,

                responsive: [

                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: <?php //echo $elementos_fila_tablet ?>,
                            arrows: true,
                            dots : false,
                        }
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow:  <?php //echo $elementos_fila_movil ?>,
                            arrows: true,
                            dots : false,
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            arrows: false,
                            dots : false,
                        }
                    }
                ]
            });

        });


</script>
 -->
