( function( $ ) {
	"use strict";

	var Genesis_Layout = function( options ) {
		this.init( 'genesis_layout', options, Genesis_Layout.defaults );
	};

	$.fn.editableutils.inherit( Genesis_Layout, $.fn.editabletypes.select );

	$.extend( Genesis_Layout.prototype, {
		value2input : function( value ) {

			if ( !value ) {
				this.$input.find( 'input' ).first().prop('checked',true);
				return;
			}
			this.$input.find( 'input[value='+value+']' ).prop('checked',true);
		},

		input2value : function() {
			return this.$input.find( 'input:checked' ).val();
		},

		renderList: function() {
			this.$input.empty();
			//var escape = this.options.escape;

			var fillItems = function($el, data) {
				var attr;
				if($.isArray(data)) {
					for(var i=0; i<data.length; i++) {
						attr = {};
						if(data[i].children) {
							attr.label = data[i].text;
							$el.append(fillItems($('<ul>', attr), data[i].children));
						} else {
							var $img = $('<div>').html(data[i].text).find('img');
							var text = data[i].text;
							if ( $img.length ) {
								text = $img.attr('alt');
							}
							attr.type = 'radio';
							attr.alt = text;
							attr.title = text;
							attr.value = data[i].value;
							// Make sure the radio buttons work like expected (only one is selectable)
							attr.name = 'genesis_layout';
							if(data[i].disabled) {
								attr.disabled = true;
							}
							var css_class = ( $img.length ) ? 'img' : 'default';
							var $option = $('<label>', { 'class': css_class } );
							$option.append( $('<input>', attr) );
							if ( $img.length ) {
								$option.append( $img );
							} else {
								$option.append( ' '+text );
							}
							//$option[escape ? 'text' : 'html'](data[i].text);
							$el.append($option);
						}
					}
				}
				return $el;
			};

			fillItems(this.$input, this.sourceData);

			this.setClass();

			//enter submit
			this.$input.on('keydown.editable', function (e) {
				if (e.which === 13) {
					$(this).closest('form').submit();
				}
			});
		}
	} );

	var template = '<div>';

	Genesis_Layout.defaults = $.extend( {}, $.fn.editabletypes.select.defaults, {
		//inputclass: 'input-large',
		tpl: template
	} );

	$.fn.editabletypes.genesis_layout = Genesis_Layout;
}( window.jQuery ) );

jQuery.fn.cacie_edit_genesis_layout = function( column, item ) {

	var el = $( this );
	var value = el.cacie_get_value( column, item );
	var options = column.editable.options;

	el.cacie_xeditable( {
		type : 'genesis_layout',
		value : value,
		source : cacie_options_format_editable( options )
	}, column, item );
};