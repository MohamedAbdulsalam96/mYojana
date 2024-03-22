# Copyright (c) 2024, dhwaniris and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Organization(Document):
		def before_save(self):
			if(self.deleted_rows):
				for item in self.deleted_rows:
					ben = frappe.db.get_value('OrganizationMembers List', item, 'name_of_the_member')
					print(ben)
					if(ben):
						frappe.db.set_value('Beneficiary Profiling', ben, {
							'are_you_a_part_of_any_organization': 'No',
							'do_you_want_to_be_part_of_any_organization': 'No',
							'name_of_organization':'',
							'which_organization_are_you_part_of':''})
					
		def on_update(self):
			if self.get('localname'):
				return
			else:
				self.number_of_members = frappe.db.count("OrganizationMembers List", filters={"parent": self.name})
				# handeling of list of member add two way logics
				if len(self.list_of_members) > 0:  # Check if the list is not empty
					for data in self.list_of_members:
						are_you_a_part_of_any_organization ,which_organization_are_you_part_of , do_you_want_to_be_part_of_any_organization, name_of_organization   = frappe.db.get_value('Beneficiary Profiling', data.name_of_the_member, ['are_you_a_part_of_any_organization','which_organization_are_you_part_of','do_you_want_to_be_part_of_any_organization','name_of_organization'])
						# if user is already selected yeswhich_organization_are_you_part_of
						if(are_you_a_part_of_any_organization == "Yes"):
							frappe.db.set_value('Beneficiary Profiling', data.name_of_the_member, 'which_organization_are_you_part_of', self.name, update_modified=False)
						#  if user is selected no in "are you a part of collective" and yes in "do you want to be a part of collective"
						elif(are_you_a_part_of_any_organization == "No" and do_you_want_to_be_part_of_any_organization == "Yes"):
							frappe.db.set_value('Beneficiary Profiling', data.name_of_the_member, 'name_of_organization', self.name, update_modified=False)
						else:
							frappe.db.set_value('Beneficiary Profiling', data.name_of_the_member, 'are_you_a_part_of_any_organization', 'Yes', update_modified=False)
							frappe.db.set_value('Beneficiary Profiling', data.name_of_the_member, 'which_organization_are_you_part_of', self.name, update_modified=False)

