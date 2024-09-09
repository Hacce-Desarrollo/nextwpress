<?php
if( function_exists('acf_add_local_field_group') ):

    acf_add_local_field_group(array(
        'key' => 'group_6221fb6c4a230',
        'title' => 'BLOQUE - Post list',
        'fields' => array(
            array(
                'key' => 'field_6221fb73d95bd',
                'label' => 'Post type',
                'name' => 'post_type',
                'type' => 'text',
                'instructions' => 'Sino se pone se verá por defecto el post type "post" (entradas)',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '33',
                    'class' => '',
                    'id' => '',
                ),
                'default_value' => '',
                'placeholder' => '',
                'prepend' => '',
                'append' => '',
                'maxlength' => '',
            ),
            array(
                'key' => 'field_6221fc650ae5e',
                'label' => 'Número de elementos a mostrar',
                'name' => 'numero_de_elementos_post_list',
                'type' => 'number',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '33',
                    'class' => '',
                    'id' => '',
                ),
                'default_value' => '',
                'placeholder' => '',
                'prepend' => '',
                'append' => '',
                'min' => '',
                'max' => '',
                'step' => '',
            ),
            array(
                'key' => 'field_62260531d9479',
                'label' => 'Diseño de los elementos',
                'name' => 'diseno_de_los_elementos',
                'type' => 'select',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '33',
                    'class' => '',
                    'id' => '',
                ),
                'choices' => array(
                    'cards' => 'Cards',
                    'overlay' => 'Overlay',
                ),
                'default_value' => 'cards',
                'allow_null' => 0,
                'multiple' => 0,
                'ui' => 1,
                'ajax' => 0,
                'return_format' => 'value',
                'placeholder' => '',
            ),
            array(
                'key' => 'field_6221fce258ef6',
                'label' => 'Num elementos por fila escritorio',
                'name' => 'num_elementos_por_fila_escritorio',
                'type' => 'select',
                'instructions' => 'Si se elige la opcion de carrusel será el numero de elementos por pase en escritorio',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '33',
                    'class' => '',
                    'id' => '',
                ),
                'choices' => array(
                    1 => '1',
                    2 => '2',
                    3 => '3',
                    4 => '4',
                ),
                'default_value' => 4,
                'allow_null' => 0,
                'multiple' => 0,
                'ui' => 0,
                'return_format' => 'value',
                'ajax' => 0,
                'placeholder' => '',
            ),
            array(
                'key' => 'field_6221fd9ffbc60',
                'label' => 'Num elementos por fila tablet',
                'name' => 'num_elementos_por_fila_tablet_pt',
                'type' => 'select',
                'instructions' => 'Si se elige la opcion de carrusel será el numero de elementos por pase en tablet',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '33',
                    'class' => '',
                    'id' => '',
                ),
                'choices' => array(
                    1 => '1',
                    2 => '2',
                    3 => '3',
                ),
                'default_value' => 3,
                'allow_null' => 0,
                'multiple' => 0,
                'ui' => 0,
                'return_format' => 'value',
                'ajax' => 0,
                'placeholder' => '',
            ),
            array(
                'key' => 'field_6221fdbafbc61',
                'label' => 'Num elementos por fila móvil',
                'name' => 'num_elementos_por_fila_movil_pt',
                'type' => 'select',
                'instructions' => 'Si se elige la opcion de carrusel será el numero de elementos por pase en movil',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '33',
                    'class' => '',
                    'id' => '',
                ),
                'choices' => array(
                    1 => '1',
                    2 => '2',
                ),
                'default_value' => 1,
                'allow_null' => 0,
                'multiple' => 0,
                'ui' => 0,
                'return_format' => 'value',
                'ajax' => 0,
                'placeholder' => '',
            ),
            array(
                'key' => 'field_622207fada08e',
                'label' => 'Configuraciones de diseño',
                'name' => '',
                'type' => 'message',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'message' => '',
                'new_lines' => 'wpautop',
                'esc_html' => 0,
            ),
            array(
                'key' => 'field_62220805da08f',
                'label' => 'Mostrar fecha',
                'name' => 'mostrar_fecha',
                'type' => 'true_false',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '33',
                    'class' => '',
                    'id' => '',
                ),
                'message' => '',
                'default_value' => 1,
                'ui' => 1,
                'ui_on_text' => '',
                'ui_off_text' => '',
            ),
            array(
                'key' => 'field_6222081fda090',
                'label' => 'Mostrar extracto',
                'name' => 'mostrar_extracto',
                'type' => 'true_false',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '33',
                    'class' => '',
                    'id' => '',
                ),
                'message' => '',
                'default_value' => 1,
                'ui' => 1,
                'ui_on_text' => '',
                'ui_off_text' => '',
            ),
            array(
                'key' => 'field_62220838da091',
                'label' => 'Mostrar leer más',
                'name' => 'mostrar_estracto_mas',
                'type' => 'true_false',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => array(
                    array(
                        array(
                            'field' => 'field_62260531d9479',
                            'operator' => '!=',
                            'value' => 'overlay',
                        ),
                    ),
                ),
                'wrapper' => array(
                    'width' => '33',
                    'class' => '',
                    'id' => '',
                ),
                'message' => '',
                'default_value' => 1,
                'ui' => 1,
                'ui_on_text' => '',
                'ui_off_text' => '',
            ),
            array(
                'key' => 'field_622209a755ed3',
                'label' => 'Unificar imagenes con una relacion de	aspecto',
                'name' => 'img_relacion_aspecto',
                'type' => 'true_false',
                'instructions' => 'La imagen se cortara por los laterales, pero ocuparan todas las mismo',
                'required' => 0,
                'conditional_logic' => array(
                    array(
                        array(
                            'field' => 'field_62260531d9479',
                            'operator' => '!=',
                            'value' => 'overlay',
                        ),
                    ),
                ),
                'wrapper' => array(
                    'width' => '33',
                    'class' => '',
                    'id' => '',
                ),
                'message' => '',
                'default_value' => 1,
                'ui' => 1,
                'ui_on_text' => '',
                'ui_off_text' => '',
            ),
            array(
                'key' => 'field_622209f655ed4',
                'label' => 'Efecto zoom en imagen',
                'name' => 'efecto_zoom',
                'type' => 'true_false',
                'instructions' => 'La imagen se cortara por los laterales, pero ocuparan todas las mismo',
                'required' => 0,
                'conditional_logic' => array(
                    array(
                        array(
                            'field' => 'field_62260531d9479',
                            'operator' => '!=',
                            'value' => 'overlay',
                        ),
                    ),
                ),
                'wrapper' => array(
                    'width' => '33',
                    'class' => '',
                    'id' => '',
                ),
                'message' => '',
                'default_value' => 1,
                'ui' => 1,
                'ui_on_text' => '',
                'ui_off_text' => '',
            ),
            array(
                'key' => 'field_6225e24767f46',
                'label' => 'Responsive con carrusel',
                'name' => 'responsive_carrusel',
                'type' => 'true_false',
                'instructions' => 'A menos de 767px habra un carrusel con las cards',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '33',
                    'class' => '',
                    'id' => '',
                ),
                'message' => '',
                'default_value' => 1,
                'ui' => 1,
                'ui_on_text' => '',
                'ui_off_text' => '',
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'block',
                    'operator' => '==',
                    'value' => 'acf/post-list',
                ),
            ),
        ),
        'menu_order' => 0,
        'position' => 'normal',
        'style' => 'default',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
        'hide_on_screen' => '',
        'active' => true,
        'description' => '',
        'show_in_rest' => 0,
    ));

endif;