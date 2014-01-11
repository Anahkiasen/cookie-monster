/**
 * Remove an element from the DOM
 *
 * @return {void}
 */
Element.prototype.remove = function() {
	this.parentElement.removeChild(this);
};
