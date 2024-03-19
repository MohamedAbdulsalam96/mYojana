# Copyright (c) 2024, dhwaniris and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Collectives(Document):
	def validate(self):
		pass

	
	def on_update(self):
		if self.get('localname'):
			return
		else:
			self.number_of_members = frappe.db.count("CollectiveMembers", filters={"parent": self.name})