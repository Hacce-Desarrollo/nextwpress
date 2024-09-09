<?php

/**
 * CPTs
 */
foreach ( glob( get_stylesheet_directory() . '/hinc/cpt/cpt-*.php' ) as $filename ) {
	include_once $filename;
}