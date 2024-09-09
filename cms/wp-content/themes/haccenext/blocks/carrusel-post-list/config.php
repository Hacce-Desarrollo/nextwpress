<?php

HacceBlocks::register(array(

	/*
	 * Propiedades obligatorias
	 */

	//el nombre tiene que ser el mismo al de la carpeta
	'name'				=> 'carrusel-post-list',

	//título y descripción a mostrar en la lista de bloques
	'title'				=> __('Listado de Carrusel posts', 'hacce'),
	'description'		=> __('Muestra un listado de posts personalizado.', 'hacce'),

	/*
	 * Propiedades personalizadas
	 */
	// 'enqueue_styles'            => array('assets/style.css'),
	// 'enqueue_scripts'           => array('assets/script.js'),

	/*
	 * Propiedades opcionales
	 * (si no se asignan funcionarán por defecto)
	 */
	//'category'		=> 'formatting',
	//'icon'			=> 'dashicons-admin-appearance',
	//'keywords'		=> array( 'hacce', 'prueba' ),
	//'render_callback' => function($block){}

	'styles' => array(

		array(
			'name' => 'cards',
			'label' => 'Grid'
		),
        array(
            'name' => 'carrusel',
            'label' => 'Carrusel'
        ),

	)

));


//wp_enqueue_style('style-postlist-block', get_stylesheet_directory_uri().'/blocks/post-list/style.css');