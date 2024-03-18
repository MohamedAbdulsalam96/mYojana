// Copyright (c) 2024, dhwaniris and contributors
// For license information, please see license.txt

frappe.ui.form.on("Advocacy", {
	refresh(frm) {
        hide_advance_search(frm , ['state','city','stakeholder'])
        extend_options_length(frm , ['state', 'city', 'stakeholder'])
        apply_filter("city", "State", frm, frm.doc.state)
	},
    date:function(frm){
        if (new Date(frm.doc.date) < new Date(frappe.datetime.get_today())) {
            frm.doc.date = ''
            frm.set_value("date", '')
            refresh_field('date')
            frappe.throw(__("<b>Date</b> can't be less than today's date"))
          }
    },
    state:function(frm){
        apply_filter("city", "State", frm, frm.doc.state)
    }
});
