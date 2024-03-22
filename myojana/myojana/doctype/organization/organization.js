// Copyright (c) 2024, dhwaniris and contributors
// For license information, please see license.txt

let removed_item = []
const apply_filter_in_child_table = async (frm) => {
    //  APPLY Filter in ID DOCUMENT
    var child_table = frm.fields_dict['list_of_members'].grid;
    if (child_table) {
      try {
        child_table.get_field('name_of_the_member').get_query = function () {
          return {
            filters: [
              ['Beneficiary Profiling', 'which_organization_are_you_part_of', '=' ,""],
              ['Beneficiary Profiling', 'name_of_organization', '=' ,""]
            ]
          };
        };
      } catch (error) {
        console.error(error)
      }
    }
  }
frappe.ui.form.on("Organization", {
    before_save:async function(frm){
        //  set deleted item in frm
        frm.doc.deleted_rows = removed_item
      },
	refresh(frm) {
        apply_filter_in_child_table(frm)
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
frappe.ui.form.on('OrganizationMembers List', {
    // child table remove events
    list_of_members_remove:async function(frm, cdt, cdn){
     removed_item.push(cdn)
   }
   });
   