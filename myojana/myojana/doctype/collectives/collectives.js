// Copyright (c) 2024, dhwaniris and contributors
// For license information, please see license.txt
// frappe.require('../../public/js/utils/utils.js');
frappe.ui.form.on("Collectives", {
	refresh(frm) {
        hide_advance_search(frm , ['state','district'])
        extend_options_length(frm , ['state', 'district'])
        apply_filter("district", "State", frm, frm.doc.state)
	},
    date_of_formation:function(frm){
        if (new Date(frm.doc.date_of_formation) > new Date(frappe.datetime.get_today())) {
            frm.doc.date_of_formation = ''
            frm.set_value("date_of_formation", '')
            refresh_field('date_of_formation')
            frappe.throw(__("<b>Date of formation</b> can't be greater than today's date"))
          }
    },
    state:function(frm){
        apply_filter("district", "State", frm, frm.doc.state)
    }

});
