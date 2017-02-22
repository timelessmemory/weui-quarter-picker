+ function($) {
  "use strict";

  $.fn.productorPicker = function(params) {

    var productorsData = [];
    var productor = ["傅佳", "大永", "平衡", "明光", "康维", "索尼"];
    if (params.options) {
      productor = params.options;
    }

    productorsData.push({
      "name" : "全部",
      "code" : "0001"
    });

    for(var i = 0; i < productor.length; i++) {
      var tmpPdr = {
        "name" : productor[i],
        "code" : i + "00"
      }
      productorsData.push(tmpPdr);
    }

    var defaults;
    var raw = productorsData;

    var toCode = function(raw, val) {
      if (val == "全部 全部") val = "全部";
      var p;
      raw.map(function (t) {
        if (t.name === val) p = t;
      });

      return [p.code];
    }

    params = $.extend({}, defaults, params);

    return this.each(function() {
      var self = this;

      var provincesName = raw.map(function(d) {
        return d.name;
      });
      var provincesCode = raw.map(function(d) {
        return d.code;
      });

      var currentProvince = provincesName[0];

      var cols = [
        {
          displayValues: provincesName,
          textAlign: 'center',
          values: provincesCode,
          cssClass: "col-province"
        }
      ];

      var config = {

        cssClass: "city-picker",
        rotateEffect: false,
        formatValue: function (p, values, displayValues) {
          return displayValues.join(' ');
        },
        onChange: function (picker, values, displayValues) {
          var newProvince = picker.cols[0].displayValue;
          if(newProvince !== currentProvince) {
            currentProvince = newProvince;
            picker.updateValue();
            return false;
          }
          var len = (values[values.length-1] ? values.length - 1 : values.length - 2)
          $(self).attr('data-code', values[len]);
          $(self).attr('data-codes', values.join(','));
          if (params.onChange) {
            params.onChange.call(self, picker, values, displayValues);
          }
        },
        cols: cols,
        rawCitiesData : productorsData,
        toCode : toCode
      };

      if(!this) return;

      var p = $.extend({}, params, config);

      var val = $(this).val();

      if (!val) val = '全部';

      p.value = toCode(raw, val);

      $(this).picker(p);
    });
  };

}($);
