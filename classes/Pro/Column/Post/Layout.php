<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class ACA_Genesis_Pro_Column_Post_Layout extends ACA_Genesis_Column_Post_Layout
	implements \ACP\Editing\Editable, \ACP\Sorting\Sortable, \ACP\Filtering\Filterable, \ACP\Search\Searchable
{
	// Pro

	public function editing() {
		return new ACA_Genesis_Pro_Editing_Layout( $this );
	}

	public function sorting() {
		return new ACA_Genesis_Pro_Sorting( $this );
	}

	public function filtering() {
		return new ACA_Genesis_Pro_Filtering( $this );
	}

	public function search() {
		return new ACA_Genesis_Pro_Searching_Layout( $this->get_meta_key(), $this->get_genesis_layouts() );
	}

	public function scripts() {
		parent::scripts();
		wp_enqueue_script( 'aca-genesis-xeditable-input-genesis_layout' );
	}

}
