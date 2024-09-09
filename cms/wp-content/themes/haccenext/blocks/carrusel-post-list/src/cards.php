<?php
/*
This loop is used in the Archive and in the Home [.php] templates.
*/

if($post_type =='post' || empty($post_type) ):
    $etiqueta_blog="h2";
    $clase_blog="h3";
else:
    $etiqueta_blog="h3";
    $clase_blog="";
endif;

?>
<div class="<?php echo $cols ?> card_wrap <?php if($mostrar_leermas==TRUE) echo ' card_leer_mas '; if($zoom_img!=TRUE) echo ' no_zoom_img '; if($img_rel_aspecto!=TRUE) echo ' no_rel_aspecto ';?>  ">
    <div class="card ">
        <div class="img_card">
            <?php
            if (has_post_thumbnail()):
                the_post_thumbnail('large', ['class' => 'w-100']);
            else:
                ?>
                <img src="<?php echo get_template_directory_uri() ?>/images/imagen_defecto.jpg" alt=""/>
            <?php endif; ?>
        </div>
        <div class="card-body">
            <?php if($mostrar_fecha==TRUE): ?>
            <small > <?php echo get_the_date() ?></small>
            <?php endif; ?>
            <<?php echo $etiqueta_blog ?> class="titulo_blog <?php echo $clase_blog ?>">
            <a class="stretched-link" href="<?php the_permalink() ?>"><?php the_title() ?></a>
        </<?php echo $etiqueta_blog ?>>
            <div class="categories">
                <?php $cats=wp_get_post_categories(get_the_ID());
                foreach($cats as $c){
                    echo '<strong>'.get_cat_name($c).'</strong>';

                }
                ?>
            </div>

            <?php if($mostrar_extracto==TRUE): ?>
            <p class="card-text"><?php echo wp_trim_words(get_the_excerpt(), 10); ?></p>
            <?php endif; ?>
            <?php if($mostrar_leermas==TRUE): ?>
            <span class=" d-block btn-link mt-3">
                <?php _e('Leer mas', 'picostrap')?>
            </span>
            <?php endif; ?>
        </div>
    </div>
</div>