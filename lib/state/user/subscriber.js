"use strict";

module.exports = (function () {
  /**
   * @description Allows subscribers to unsubscribe
   * @param {number} membership_cost - MoM
   */
  function Subscriber(membership_cost) {
    this.membership_cost = membership_cost;
    let reg_date = new Date;
    this.registration_date = reg_date.toISOString();
  }

  return Subscriber;
})

