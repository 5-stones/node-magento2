"use strict";

var _ = require('lodash');

class RequestHelper {

  buildSearchFilterGroups(groups) {
    const qs = {};

    _.forEach(groups, (group, i) => {
        var filters = this.buildSearchFilters(group, i);
        qs = _.assign(qs, filters);
    });

    return qs;
  }

  buildSearchFilters(filters, group_number) {
    group_number = group_number || 0;
    const qs = {};
    const key = 'searchCriteria[filter_groups][' + group_number + '][filters]';

    _.forEach(filters, (filter, i) => {
      qs[key + '[' + i + '][field]'] = filter[0];
      qs[key + '[' + i + '][condition_type]'] = filter[1];

      // doesn't always exist
      if (filter[2]) {
        qs[key + '[' + i + '][value]'] = filter[2];
      }
    });

    return qs;
  }
}

module.exports = RequestHelper;
