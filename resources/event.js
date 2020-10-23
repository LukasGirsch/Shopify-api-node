'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const baseChild = require('../mixins/base-child');

/**
 * Creates an Event instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Event(shopify) {
  this.shopify = shopify;

  this.parentName = 'orders';
  this.name = 'events';
  this.key = 'event';
}

assign(
  Event.prototype,
  pick(baseChild, ['buildUrl', 'create', 'delete', 'update'])
);

/**
 * Gets a list of events for an order.
 *
 * @param {Number} orderId Order ID
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Event.prototype.list = function list(orderID, params) {
  const url = this.buildUrl(orderID, undefined, params);
  return this.shopify.request(url, 'GET', this.name);
};

module.exports = Event;
