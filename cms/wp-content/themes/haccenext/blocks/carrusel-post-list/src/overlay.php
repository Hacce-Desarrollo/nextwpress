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
<div class="<?php echo $cols ?> overlay_card fake-a card_wrap">
    <div class="card card_overlay shadow-sm">
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
            <div>
            <?php if($mostrar_fecha==TRUE): ?>
            <small > <?php echo get_the_date() ?></small>
            <?php endif; ?>
            <<?php echo $etiqueta_blog ?> class="titulo_blog <?php echo $clase_blog ?>">
                <a class="stretched-link" href="<?php the_permalink() ?>"><?php the_title() ?></a>
            </<?php echo $etiqueta_blog ?>>

            <?php if($mostrar_extracto==TRUE): ?>
            <p class="card-text"><?php echo wp_trim_words(get_the_excerpt(), 10); ?></p>
            <?php endif; ?>
                <?php
                if($post_type =='post' || empty($post_type) ): ?>
                <div class="inferior_post post-meta  d-flex align-items-center justify-content-start">
                    <div class="categories">
                        <?php
                        $cats=wp_get_post_categories(get_the_ID());
                        foreach($cats as $c){
                            ?>
                        <a href="<?php echo get_category_link($c) ?>">
                           <strong>
                               <?php echo get_cat_name($c) ?>
                           </strong>
                        </a>
<?php
                        }
                        ?>
                    </div>
                    <?php include(get_stylesheet_directory() . '/parts/misc/share_post.php'); ?>
                </div>

<?php endif; ?>
                <?php if($mostrar_leermas==TRUE): ?>
            <span class=" d-block btn-link mt-3">
                <?php _e('Leer mas', 'picostrap')?>
            </span>
            <?php endif; ?>
            </div>
        </div>
    </div>
</div>