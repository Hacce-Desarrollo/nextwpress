<?php
$posts = array();

if( have_rows('miembros_del_equipo') ):
    while( have_rows('miembros_del_equipo') ) : the_row();
        $posts[] = get_sub_field('elementos');
    endwhile;
endif;

if ( $posts):
?>
    <div class="row slider-gallery">

        <?php foreach ( $posts as $post): ?>
            <div class="col-md-4">
                <div className="item-member full-team">
                    <?php $permalink = str_replace(home_url(), '', get_permalink($post->ID)); ?>
                    <a href="<?php echo $permalink; ?>">
                        <?php 
                            $imagen_destacada = get_the_post_thumbnail( $post->ID, 'full', array( 'class' => 'member-photo' ) );
                            if ( $imagen_destacada ) {
                                echo $imagen_destacada;
                            }
                        ?>
                        <div className="member-name"><?php echo $post->post_title; ?></div> 
                        <div className="member-cargo"><?php echo get_field('cargo', $post->ID); ?></div>
                    </a>
                </div>
            </div>
        <?php endforeach; ?>

    </div>

<?php
endif;
?>
