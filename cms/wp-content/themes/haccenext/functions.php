<?php


// Permitir conexiones GET y POST (API WP)
add_action('init', 'allow_cors');
function allow_cors() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
}


// Añadir opciones personalizadas generales
if( function_exists('acf_add_options_page')){

    acf_add_options_page(array(
        'page_title' => 'Opciones',
        'menu_title' => 'Opciones de plantilla',
        'menu_slug' => 'opciones',
        'position' => 2,
        'icon_url' => 'dashicons-admin-tools',
    ));

    acf_add_options_sub_page(array(
        'page_title' => 'Header',
        'menu_title' => 'Header',
        'menu_slug' => 'opciones-header',
        'parent_slug' => 'opciones',
        'position' => false,
        'icon_url' => false,
    ));

   	acf_add_options_sub_page(array(
        'page_title' => 'Footer',
        'menu_title' => 'Footer',
        'menu_slug' => 'opciones-footer',
        'parent_slug' => 'opciones',
        'position' => false,
        'icon_url' => false,
    ));

    acf_add_options_sub_page(array(
        'page_title' => 'Generales',
        'menu_title' => 'Generales',
        'menu_slug' => 'opciones-generales',
        'parent_slug' => 'opciones',
        'position' => false,
        'icon_url' => false,
    ));

}


// Incluimos los bloques custom del tema padre
add_action(
	'hacce_blocks',
	function() {
		foreach ( glob( get_template_directory() . '/blocks/*/config.php' ) as $filename ) {
			include_once $filename;
		}
	}
);


/**
 * Menús, sidebars, widgets, ...
 */
register_nav_menus( array( 'primary' => __( 'Menu Primary', 'picostrap' ) ) );
register_nav_menus( array( 'legal' => __( 'Menu legal pie', 'picostrap' ) ) );
register_nav_menus( array( 'flotante' => __( 'Menu Flotante', 'picostrap' ) ) );
// register_nav_menus( array( 'third' => __( 'Third Menu', 'picostrap' ), 'fourth' => __( 'Fourth Menu', 'picostrap' ), 'fifth' => __( 'Fifth Menu', 'picostrap' ), ) );
// THEN USE SHORTCODE:  [lc_nav_menu theme_location="third" container_class="" container_id="" menu_class="navbar-nav"]
function custom_widgets_init() {
	register_sidebar(
		array(
			'name'          => __( 'Pie col 1', 'picostrap' ),
			'id'            => 'pie1',
			'description'   => '',
			'before_widget' => '<aside id="%1$s" class="widget-pie %2$s">',
			'after_widget'  => '</aside>',
			'before_title'  => '<h3 class="titulo-pie">',
			'after_title'   => '</h3>',
		)
	);
	register_sidebar(
		array(
			'name'          => __( 'Pie col 2', 'picostrap' ),
			'id'            => 'pie2',
			'description'   => '',
			'before_widget' => '<aside id="%1$s" class="widget-pie %2$s">',
			'after_widget'  => '</aside>',
			'before_title'  => '<h3 class="titulo-pie">',
			'after_title'   => '</h3>',
		)
	);
	register_sidebar(
		array(
			'name'          => __( 'Pie col 3', 'picostrap' ),
			'id'            => 'pie3',
			'description'   => '',
			'before_widget' => '<aside id="%1$s" class="widget-pie %2$s">',
			'after_widget'  => '</aside>',
			'before_title'  => '<h3 class="titulo-pie">',
			'after_title'   => '</h3>',
		)
	);

	if ( class_exists( 'woocommerce' ) ) {
		register_sidebar(
			array(
				'name'          => __( 'Categoría de productos', 'picostrap' ),
				'id'            => 'wc-sidebar',
				'description'   => '',
				'before_widget' => '<aside id="%1$s" class="widget-lateral %2$s">',
				'after_widget'  => '</aside>',
				'before_title'  => '<h3 class="titulo-sidebar">',
				'after_title'   => '</h3>',
			)
		);
	}
}
add_action( 'widgets_init', 'custom_widgets_init' );


// Incluimos los endpoints personalizados
include( 'api/api.php' );


// Incluimos el deploy automatico
include( 'api/deploy.php' );

/**
 * Custom Functions.
 */
//require get_stylesheet_directory() . '/hinc/functions.php';

add_theme_support( 'post-thumbnails' );


// CPTs
add_action( 'init', function() {
    
	register_post_type( 'equipo', [
        'show_ui' => true,
        'labels'  => [
            'menu_name'    => __( 'Equipo', 'haccenext' ),
            'add_new' 	   => __( 'Añadir un equipo', 'haccenext' ), // Cambia el texto del botón "Añadir nuevo"
            'add_new_item' => __( 'Añadir un equipo', 'haccenext' ), // Cambia el texto en el menú "Añadir nuevo"
            'edit_item'    => __( 'Editar equipo', 'haccenext' ), // Cambia el texto en el menú de edición
        ],
        'supports' 			  => array( 'title', 'editor', 'thumbnail', 'excerpt', 'revisions' ),
        'hierarchical' 		  => true,
        'show_in_graphql' 	  => true,
        'graphql_single_name' => 'persona',
        'graphql_plural_name' => 'equipo',
        'public' 			  => true,
        'publicly_queryable'  => true,
		'show_in_rest'        => true,
    ] );

} );