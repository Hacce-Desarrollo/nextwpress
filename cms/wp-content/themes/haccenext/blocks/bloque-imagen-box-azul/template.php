<?php
    $imagen_fondo = get_field('imagen_del_fondo');
    $titulo = get_field('titulo_cta');
    $imagen_adicional = get_field('imagen_adicional');
    $contenido = get_field('contenido_cta');
    $enlace = get_field('enlace_cta');
    $posicion_imagen = get_field('posicion_de_la_imagen');
    $color = get_field('color_del_fondo');
    
    if ($posicion_imagen == 'Izquierda') {
        $tipo = 'cta-left';
    } else {
        $tipo = 'cta-right';
    }

    if ($color == 'Gris') {
        $bg = 'bg-grey text-primary';
    } elseif ($color == 'Azul') {
        $bg = 'bg-blue text-white';
    } else {
        $bg = 'bg-transparent text-primary';
    }

?>

<div class="bloque-cta <?php echo $tipo; ?>">

    <div class="container">
        <div class="cta-info <?php echo $bg; ?>">

            <?php if ($imagen_adicional) { ?>
                <img src="<?php echo $imagen_adicional['url']; ?>" alt="<?php echo $imagen_adicional['alt']; ?>">
            <?php } ?>

            <?php if ($titulo) { ?>
                <h2 class="h2-title"><?php echo $titulo; ?></h2>
            <?php } ?>

            <?php if ($contenido) { ?>
                <div class="contenido">
                    <?php echo $contenido; ?>
                </div>
            <?php } ?>

            <?php if ($enlace) { ?>
                <div class="btn-custom btn-outline-white">
                    <a href="<?php echo $enlace['url']; ?>"><?php echo $enlace['title']; ?></a>
                </div>
            <?php } ?>
            
        </div>
    </div>

    <div class="img-fondo" style="background-image:url('<?php echo $imagen_fondo['url']; ?>');">
        <img class="img-mobile" src="<?php echo $imagen_fondo['url']; ?>" alt="<?php echo $imagen_fondo['alt']; ?>">
    </div>
</div>