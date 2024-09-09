<?php

/**
 * @global $block

 */

$post_type=get_field('post_type');
$num_elementos=get_field('numero_de_elementos_post_list');

$diseno_elementos=get_field('diseno_de_los_elementos');

$elementos_fila_pc=get_field('num_elementos_por_fila_escritorio');
$elementos_fila_tablet=get_field('num_elementos_por_fila_tablet_pt');
$elementos_fila_movil=get_field('num_elementos_por_fila_movil_pt');

$mostrar_fecha=get_field('mostrar_fecha');
$mostrar_extracto=get_field('mostrar_extracto');
$mostrar_leermas=get_field('mostrar_estracto_mas');

$zoom_img=get_field('efecto_zoom');
$img_rel_aspecto=get_field('img_relacion_aspecto');
$carrusel_movil=get_field('responsive_carrusel');


$cols_pc=""; $cols_tablet=""; $cols_movil="";
if($elementos_fila_pc==3){
    $cols_pc='col-lg-4';

}elseif($elementos_fila_pc==2){
    $cols_pc='col-lg-6';

}elseif($elementos_fila_pc==1){
    $cols_pc='col-lg-12';

}else{
    $cols_pc='col-lg-3';

}
if($elementos_fila_tablet==2){
    $cols_tablet='col-sm-6';

}elseif($elementos_fila_tablet==1){
    $cols_tablet='col-sm-12';

}else{
    $cols_tablet='col-sm-6 col-md-4';
}

if($elementos_fila_tablet==2){
    $cols_movil='col-6';

}else{
    $cols_movil='col-12';
}



$cols=$cols_pc.' '.$cols_tablet.' '.$cols_movil;

$query = new WP_Query(
    apply_filters(
        'hacce_block_post_list_query',
        array(
            'posts_per_page' => $num_elementos ?? 6,
            'post_type'      => $post_type ?? 'post',
        )
    )
);


?>